from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.dependencies.database import get_db
from app.schemas.destination import DestinationCreate, DestinationResponse
from app.services.search import search_destinations
from app.crud.destination import (
    create_destination,
    get_all_destinations,
    get_destination_by_id,
)

router = APIRouter(
    prefix="/destinations",
    tags=["Destinations"],
)


@router.post("/", response_model=DestinationResponse)
def add_destination(
    destination: DestinationCreate,
    db: Session = Depends(get_db),
):
    return create_destination(db, destination)


@router.get("/", response_model=list[DestinationResponse])
def list_destinations(db: Session = Depends(get_db)):
    return get_all_destinations(db)
@router.get("/search")
def search_destination(
    name: str | None = None,
    city: str | None = None,
    state: str | None = None,
    country: str | None = None,
    category: str | None = None,
    max_cost: float | None = None,
    best_time_to_visit: str | None = None,
    db: Session = Depends(get_db),
):
    return search_destinations(
        db=db,
        name=name,
        city=city,
        state=state,
        country=country,
        category=category,
        max_cost=max_cost,
        best_time_to_visit=best_time_to_visit,
    )

@router.get("/{destination_id}", response_model=DestinationResponse)
def get_destination(destination_id: int, db: Session = Depends(get_db)):
    return get_destination_by_id(db, destination_id)