from sqlalchemy.orm import Session

from app.models.destination import Destination
from app.models.rating import Rating


def get_recommendations(db: Session, limit: int = 10):
    """
    Returns the best destinations using:
    1. User ratings when available
    2. Kaggle/Google rating as fallback
    """

    destinations = db.query(Destination).all()

    recommendations = []

    for destination in destinations:

        ratings = (
            db.query(Rating)
            .filter(Rating.destination_id == destination.id)
            .all()
        )

        # Use user ratings when available
        if ratings:
            average_rating = sum(
                rating.rating for rating in ratings
            ) / len(ratings)

        # Otherwise use the rating imported from Kaggle
        else:
            average_rating = destination.rating or 0

        recommendations.append({
            "id": destination.id,
            "name": destination.name,
            "city": destination.city,
            "state": destination.state,
            "country": destination.country,
            "category": destination.category,
            "average_rating": round(average_rating, 2),
            "average_cost": destination.average_cost,
            "best_time_to_visit": destination.best_time_to_visit,
            "description": destination.description,
        })

    recommendations.sort(
        key=lambda x: x["average_rating"],
        reverse=True
    )

    return recommendations[:limit]