from sqlalchemy.orm import Session

from app.models.favorite import Favorite
from app.models.rating import Rating
from app.models.destination import Destination


def get_user_preferences(db: Session, user_id: int):
    """
    Analyze a user's favorite categories
    and highly rated destinations.
    """

    category_scores = {}

    favorites = (
        db.query(Favorite)
        .filter(Favorite.user_id == user_id)
        .all()
    )

    for favorite in favorites:
        destination = (
            db.query(Destination)
            .filter(Destination.id == favorite.destination_id)
            .first()
        )

        if destination:
            category = destination.category
            category_scores[category] = (
                category_scores.get(category, 0) + 3
            )

    ratings = (
        db.query(Rating)
        .filter(Rating.user_id == user_id)
        .all()
    )

    for rating in ratings:

        if rating.rating >= 4:

            destination = (
                db.query(Destination)
                .filter(Destination.id == rating.destination_id)
                .first()
            )

            if destination:
                category = destination.category
                category_scores[category] = (
                    category_scores.get(category, 0) + rating.rating
                )

    return category_scores