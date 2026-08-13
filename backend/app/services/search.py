from sqlalchemy.orm import Session

from app.models.destination import Destination


def search_destinations(
    db: Session,
    name: str = None,
    city: str = None,
    state: str = None,
    country: str = None,
    category: str = None,
    max_cost: float = None,
    best_time_to_visit: str = None,
):
    query = db.query(Destination)

    if name:
        query = query.filter(Destination.name.ilike(f"%{name}%"))

    if city:
        query = query.filter(Destination.city.ilike(f"%{city}%"))

    if state:
        query = query.filter(Destination.state.ilike(f"%{state}%"))

    if country:
        query = query.filter(Destination.country.ilike(f"%{country}%"))

    if category:
        query = query.filter(Destination.category.ilike(f"%{category}%"))

    if max_cost is not None:
        query = query.filter(Destination.average_cost <= max_cost)

    if best_time_to_visit:
        query = query.filter(
            Destination.best_time_to_visit.ilike(f"%{best_time_to_visit}%")
        )

    return query.all()