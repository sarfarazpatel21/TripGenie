"""API routes for trip generation and the AI chat assistant."""

import logging

from fastapi import APIRouter, HTTPException

from app.schemas.trip import (
    ChatRequest,
    ChatResponse,
    TripGenerateApiResponse,
    TripRequest,
    TripResponse,
)
from app.services.gemini_service import answer_trip_question, generate_trip_plan

logger = logging.getLogger("trip_planner")

router = APIRouter(prefix="/api/trip", tags=["trip"])


@router.post("/generate", response_model=TripGenerateApiResponse)
async def generate_trip(payload: TripRequest) -> TripGenerateApiResponse:
    """Generate a full AI travel itinerary for the given trip parameters."""
    try:
        raw_json = generate_trip_plan(payload)
        trip_data = TripResponse.model_validate(raw_json)
        return TripGenerateApiResponse(success=True, data=trip_data)
    except RuntimeError as exc:
        logger.exception("Gemini generation failed")
        raise HTTPException(status_code=502, detail=str(exc)) from exc
    except Exception as exc:  # noqa: BLE001 - surface a clean error to the client
        logger.exception("Unexpected error generating trip")
        raise HTTPException(
            status_code=500, detail="Something went wrong while planning your trip."
        ) from exc


@router.post("/chat", response_model=ChatResponse)
async def chat_about_trip(payload: ChatRequest) -> ChatResponse:
    """Answer a follow-up question about an already-generated trip."""
    try:
        history = [m.model_dump() for m in payload.messages]
        answer = answer_trip_question(payload.trip_context, history, payload.question)
        return ChatResponse(success=True, answer=answer)
    except RuntimeError as exc:
        logger.exception("Gemini chat failed")
        raise HTTPException(status_code=502, detail=str(exc)) from exc
    except Exception as exc:  # noqa: BLE001
        logger.exception("Unexpected error in chat")
        raise HTTPException(
            status_code=500, detail="Something went wrong answering your question."
        ) from exc
