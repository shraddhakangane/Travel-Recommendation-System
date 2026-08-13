from sqlalchemy.orm import Session

from app.models.destination import Destination
from app.models.rating import Rating


def get_recommendations(db: Session, limit: int = 10):
    """
    Returns destinations sorted by average rating.
    """

    destinations = db.query(Destination).all()

    recommendations = []

    for destination in destinations:
        ratings = (
            db.query(Rating)
            .filter(Rating.destination_id == destination.id)
            .all()
        )

        if ratings:
            avg_rating = sum(r.rating for r in ratings) / len(ratings)
        else:
            avg_rating = 0

        recommendations.append({
            "id": destination.id,
            "name": destination.name,
            "city": destination.city,
            "state": destination.state,
            "country": destination.country,
            "category": destination.category,
            "average_rating": round(avg_rating, 2)
        })

    recommendations.sort(
        key=lambda x: x["average_rating"],
        reverse=True
    )

    return recommendations[:limit]