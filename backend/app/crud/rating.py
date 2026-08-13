from sqlalchemy.orm import Session

from app.models.rating import Rating
from app.schemas.rating import RatingCreate


def create_rating(
    db: Session,
    user_id: int,
    rating: RatingCreate,
):
    db_rating = Rating(
        user_id=user_id,
        destination_id=rating.destination_id,
        rating=rating.rating,
    )

    db.add(db_rating)
    db.commit()
    db.refresh(db_rating)

    return db_rating


def get_destination_ratings(
    db: Session,
    destination_id: int,
):
    return (
        db.query(Rating)
        .filter(Rating.destination_id == destination_id)
        .all()
    )


def get_user_ratings(
    db: Session,
    user_id: int,
):
    return (
        db.query(Rating)
        .filter(Rating.user_id == user_id)
        .all()
    )