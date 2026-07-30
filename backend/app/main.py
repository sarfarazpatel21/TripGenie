"""FastAPI application entrypoint for the AI Trip Planner backend."""

import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import trip

load_dotenv()

app = FastAPI(
    title="AI Trip Planner API",
    description="Generates personalised travel itineraries using Google Gemini.",
    version="1.0.0",
)

allowed_origins = os.getenv(
    "ALLOWED_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173"
).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.strip() for origin in allowed_origins],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(trip.router)


@app.get("/", tags=["health"])
async def root() -> dict:
    return {"status": "ok", "service": "AI Trip Planner API"}


@app.get("/api/health", tags=["health"])
async def health() -> dict:
    return {"status": "healthy"}
