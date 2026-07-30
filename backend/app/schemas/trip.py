"""
Pydantic schemas for the AI Trip Planner API.

These models define the shape of incoming requests and outgoing
responses so FastAPI can validate data automatically and generate
accurate OpenAPI docs.
"""

from enum import Enum
from typing import Any, Dict, List, Optional

from pydantic import BaseModel, Field, field_validator


# --------------------------------------------------------------------------
# Enums - keep the frontend dropdowns and backend validation in sync
# --------------------------------------------------------------------------
class BudgetType(str, Enum):
    BUDGET = "Budget"
    STANDARD = "Standard"
    LUXURY = "Luxury"


class TravelStyle(str, Enum):
    SOLO = "Solo"
    FAMILY = "Family"
    COUPLE = "Couple"
    FRIENDS = "Friends"
    ADVENTURE = "Adventure"
    LUXURY = "Luxury"
    BACKPACKING = "Backpacking"


class Transport(str, Enum):
    FLIGHT = "Flight"
    TRAIN = "Train"
    BUS = "Bus"
    CAR = "Car"


class Accommodation(str, Enum):
    HOTEL = "Hotel"
    HOSTEL = "Hostel"
    RESORT = "Resort"
    HOMESTAY = "Homestay"


class Food(str, Enum):
    VEG = "Veg"
    NON_VEG = "Non-Veg"
    MIXED = "Mixed"


# --------------------------------------------------------------------------
# Request schema
# --------------------------------------------------------------------------
class TripRequest(BaseModel):
    destination: str = Field(..., min_length=2, max_length=100, examples=["Goa"])
    days: int = Field(..., ge=1, le=30, examples=[5])
    budget: float = Field(..., gt=0, examples=[30000])
    budget_type: BudgetType = Field(default=BudgetType.STANDARD)
    travellers: int = Field(..., ge=1, le=20, examples=[2])
    travel_style: TravelStyle = Field(default=TravelStyle.COUPLE)
    transport: Transport = Field(default=Transport.FLIGHT)
    accommodation: Accommodation = Field(default=Accommodation.HOTEL)
    food: Food = Field(default=Food.MIXED)
    starting_location: Optional[str] = Field(default=None, max_length=100)
    preferences: Optional[str] = Field(default=None, max_length=1000)

    @field_validator("destination")
    @classmethod
    def strip_destination(cls, v: str) -> str:
        return v.strip()


# --------------------------------------------------------------------------
# Response schema
#
# Gemini is instructed to return this exact shape as JSON. We keep the
# fields loosely typed (Dict / List[Dict[str, Any]]) because AI-generated
# JSON structures can vary slightly between requests, and we don't want a
# minor shape mismatch to break the whole API response.
# --------------------------------------------------------------------------
class TripResponse(BaseModel):
    summary: str = ""
    weather: str = ""
    best_time: str = ""
    budget_breakdown: Dict[str, Any] = Field(default_factory=dict)
    hotels: List[Dict[str, Any]] = Field(default_factory=list)
    places_to_visit: List[Dict[str, Any]] = Field(default_factory=list)
    restaurants: List[Dict[str, Any]] = Field(default_factory=list)
    itinerary: List[Dict[str, Any]] = Field(default_factory=list)
    packing_list: List[str] = Field(default_factory=list)
    travel_tips: List[str] = Field(default_factory=list)

    # Extra AI insights
    instagram_spots: List[str] = Field(default_factory=list)
    hidden_gems: List[str] = Field(default_factory=list)
    local_foods: List[str] = Field(default_factory=list)
    scam_alerts: List[str] = Field(default_factory=list)
    safety_tips: List[str] = Field(default_factory=list)
    shopping_areas: List[str] = Field(default_factory=list)
    nightlife: List[str] = Field(default_factory=list)
    family_activities: List[str] = Field(default_factory=list)
    adventure_activities: List[str] = Field(default_factory=list)
    rainy_day_alternatives: List[str] = Field(default_factory=list)
    photography_spots: List[str] = Field(default_factory=list)
    best_sunrise_location: str = ""
    best_sunset_location: str = ""
    free_attractions: List[str] = Field(default_factory=list)
    paid_attractions: List[str] = Field(default_factory=list)
    one_day_backup_plan: str = ""
    emergency_numbers: Dict[str, Any] = Field(default_factory=dict)
    estimated_total_cost: Optional[float] = None


class TripGenerateApiResponse(BaseModel):
    """Top-level envelope returned by POST /api/trip/generate."""

    success: bool = True
    data: Optional[TripResponse] = None
    error: Optional[str] = None


class ChatMessage(BaseModel):
    role: str = Field(..., pattern="^(user|assistant)$")
    content: str


class ChatRequest(BaseModel):
    trip_context: Dict[str, Any] = Field(
        default_factory=dict, description="The generated trip JSON, used as context"
    )
    messages: List[ChatMessage] = Field(default_factory=list)
    question: str = Field(..., min_length=1, max_length=1000)


class ChatResponse(BaseModel):
    success: bool = True
    answer: Optional[str] = None
    error: Optional[str] = None
