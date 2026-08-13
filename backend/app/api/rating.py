from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.dependencies.database import get_db
from app.dependencies.auth import get_current_user
from app.schemas.rating import RatingCreate, RatingResponse
from app.crud.rating import create_rating, get_destination_ratings
from app.models.user import User

router = APIRouter(
    prefix="/ratings",
    tags=["Ratings"],
)


@router.post("/", response_model=RatingResponse)
def add_rating(
    rating: RatingCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return create_rating(
        db=db,
        user_id=current_user.id,
        rating=rating,
    )


@router.get("/{destination_id}")
def list_destination_ratings(
    destination_id: int,
    db: Session = Depends(get_db),
):
    return get_destination_ratings(db, destination_id)