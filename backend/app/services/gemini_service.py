"""
Thin wrapper around the Google Gemini SDK.

Isolating all Gemini-specific logic here means routers stay simple, and
if the SDK or model name changes later, this is the only file that needs
to change.
"""

import json
import os
import re
from typing import Any, Dict, List, Optional

import google.generativeai as genai
from dotenv import load_dotenv

from app.schemas.trip import TripRequest
from app.utils.prompt_builder import build_trip_prompt

load_dotenv()

_API_KEY = os.getenv("GEMINI_API_KEY")
_MODEL_NAME = os.getenv("GEMINI_MODEL", "gemini-3.5-flash")


_configured = False


def _ensure_configured() -> None:
    global _configured
    if _configured:
        return
    if not _API_KEY:
        raise RuntimeError(
            "GEMINI_API_KEY is not set. Add it to your backend/.env file."
        )
    genai.configure(api_key=_API_KEY)
    _configured = True


def _extract_json(raw_text: str) -> Dict[str, Any]:
    """
    Gemini is asked to return raw JSON, but models sometimes wrap output in
    markdown fences or add stray text. This defensively extracts the first
    valid JSON object from the response.
    """
    text = raw_text.strip()

    # Strip markdown code fences if present
    fence_match = re.search(r"```(?:json)?\s*([\s\S]*?)```", text)
    if fence_match:
        text = fence_match.group(1).strip()

    # Fall back to grabbing the outermost { ... } block
    if not text.startswith("{"):
        brace_start = text.find("{")
        brace_end = text.rfind("}")
        if brace_start != -1 and brace_end != -1:
            text = text[brace_start : brace_end + 1]

    return json.loads(text)


def generate_trip_plan(trip: TripRequest) -> Dict[str, Any]:
    """Calls Gemini and returns a parsed JSON dict matching TripResponse."""
    _ensure_configured()

    model = genai.GenerativeModel(
        model_name=_MODEL_NAME,
        generation_config={
            "temperature": 0.9,
            "top_p": 0.95,
            "response_mime_type": "application/json",
        },
    )

    prompt = build_trip_prompt(trip)
    response = model.generate_content(prompt)

    raw_text = getattr(response, "text", None)
    if not raw_text:
        raise RuntimeError("Gemini returned an empty response.")

    try:
        return _extract_json(raw_text)
    except json.JSONDecodeError as exc:
        raise RuntimeError(
            f"Gemini returned invalid JSON that could not be parsed: {exc}"
        ) from exc


def answer_trip_question(
    trip_context: Dict[str, Any], history: List[Dict[str, str]], question: str
) -> str:
    """Simple chat helper that answers follow-up questions using the trip
    context already generated, so the assistant stays grounded in the
    user's actual itinerary."""
    _ensure_configured()

    model = genai.GenerativeModel(model_name=_MODEL_NAME)

    context_json = json.dumps(trip_context, ensure_ascii=False)[:6000]
    history_text = "\n".join(
        f"{m.get('role', 'user')}: {m.get('content', '')}" for m in history[-6:]
    )

    prompt = f"""You are a friendly, knowledgeable travel assistant helping a
traveller with questions about a trip you already planned for them.

Trip context (JSON):
{context_json}

Recent conversation:
{history_text}

Traveller's new question: {question}

Answer helpfully and concisely (2-5 sentences unless more detail is clearly
needed). Base your answer on the trip context where relevant."""

    response = model.generate_content(prompt)
    answer = getattr(response, "text", None)
    if not answer:
        raise RuntimeError("Gemini returned an empty response.")
    return answer.strip()
