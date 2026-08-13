from fastapi import APIRouter

from app.schemas.trip import TripRequest
from app.services.ai_trip_planner import generate_trip_plan

router = APIRouter(
    prefix="/trip",
    tags=["AI Trip Planner"],
)


@router.post("/plan")
def create_trip_plan(request: TripRequest):
    plan = generate_trip_plan(
        destination=request.destination,
        days=request.days,
        budget=request.budget,
        interests=request.interests,
    )

    return {
        "trip_plan": plan
    }