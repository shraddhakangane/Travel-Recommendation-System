from sqlalchemy.orm import Session

from app.models.destination import Destination
from app.services.personalization import get_user_preferences


def recommend_for_user(
    db: Session,
    user_id: int,
):
    preferences = get_user_preferences(db, user_id)

    destinations = db.query(Destination).all()

    recommendations = []

    for destination in destinations:

        score = preferences.get(destination.category, 0)

        recommendations.append(
            {
                "id": destination.id,
                "name": destination.name,
                "city": destination.city,
                "state": destination.state,
                "country": destination.country,
                "category": destination.category,
                "recommendation_score": score,
            }
        )

    recommendations.sort(
        key=lambda x: x["recommendation_score"],
        reverse=True,
    )

    return recommendations