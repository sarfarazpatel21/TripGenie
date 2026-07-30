"""
Builds the prompt sent to Gemini for itinerary generation.

Keeping this in its own module makes it easy to tweak prompt wording
without touching the service/networking logic.
"""

from app.schemas.trip import TripRequest

RESPONSE_SCHEMA_HINT = """
Return ONLY valid JSON (no markdown fences, no commentary, no leading or
trailing text) matching EXACTLY this structure:

{
  "summary": "string - a short, exciting trip overview",
  "weather": "string - typical weather during the trip",
  "best_time": "string - best time of year to visit",
  "budget_breakdown": {
    "accommodation": number,
    "transport": number,
    "food": number,
    "shopping": number,
    "activities": number,
    "emergency_buffer": number
  },
  "hotels": [
    {"name": "string", "area": "string", "price_per_night": number, "rating": number, "why": "string"}
  ],
  "places_to_visit": [
    {"name": "string", "description": "string", "category": "string", "entry_fee": "string"}
  ],
  "restaurants": [
    {"name": "string", "cuisine": "string", "price_range": "string", "must_try": "string"}
  ],
  "itinerary": [
    {"day": number, "title": "string", "activities": [
      {"time": "string", "activity": "string", "location": "string", "notes": "string"}
    ]}
  ],
  "packing_list": ["string"],
  "travel_tips": ["string"],
  "instagram_spots": ["string"],
  "hidden_gems": ["string"],
  "local_foods": ["string"],
  "scam_alerts": ["string"],
  "safety_tips": ["string"],
  "shopping_areas": ["string"],
  "nightlife": ["string"],
  "family_activities": ["string"],
  "adventure_activities": ["string"],
  "rainy_day_alternatives": ["string"],
  "photography_spots": ["string"],
  "best_sunrise_location": "string",
  "best_sunset_location": "string",
  "free_attractions": ["string"],
  "paid_attractions": ["string"],
  "one_day_backup_plan": "string",
  "emergency_numbers": {"police": "string", "ambulance": "string", "tourist_helpline": "string"},
  "estimated_total_cost": number
}

Rules:
- All numbers in budget_breakdown must sum to approximately the total budget given.
- "itinerary" must contain exactly one entry per day of the trip.
- Do not wrap the JSON in markdown code fences.
- Do not include any text before or after the JSON object.
"""


def build_trip_prompt(trip: TripRequest) -> str:
    starting_location = trip.starting_location or "Not specified"
    preferences = trip.preferences or "None specified"

    return f"""You are the world's best professional travel planner with deep,
up-to-date local knowledge of destinations worldwide. Create a detailed,
realistic, and genuinely useful travel itinerary based on the trip details
below.

Trip details:
- Destination: {trip.destination}
- Starting location: {starting_location}
- Duration: {trip.days} day(s)
- Total budget: {trip.budget} (in the traveller's local currency)
- Budget type: {trip.budget_type.value}
- Number of travellers: {trip.travellers}
- Travel style: {trip.travel_style.value}
- Preferred transportation: {trip.transport.value}
- Preferred accommodation: {trip.accommodation.value}
- Food preference: {trip.food.value}
- Extra preferences from traveller: {preferences}

Generate a complete plan covering: trip summary, weather, best time to visit,
a budget breakdown, hotel suggestions, tourist attractions, a day-wise
itinerary, nearby restaurants, packing list, travel tips, Instagram-worthy
spots, hidden gems, local foods to try, scam alerts, safety tips, shopping
areas, nightlife recommendations, family activities, adventure activities,
rainy day alternatives, photography spots, best sunrise/sunset locations,
free and paid attractions, a one-day backup plan, and emergency numbers
relevant to the destination.

{RESPONSE_SCHEMA_HINT}
"""
