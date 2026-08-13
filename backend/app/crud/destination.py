from sqlalchemy.orm import Session

from app.models.destination import Destination
from app.schemas.destination import DestinationCreate


def create_destination(db: Session, destination: DestinationCreate):
    db_destination = Destination(
        name=destination.name,
        city=destination.city,
        state=destination.state,
        country=destination.country,
        description=destination.description,
        category=destination.category,
        average_cost=destination.average_cost,
        best_time_to_visit=destination.best_time_to_visit,
    )

    db.add(db_destination)
    db.commit()
    db.refresh(db_destination)

    return db_destination


def get_all_destinations(db: Session):
    return db.query(Destination).all()


def get_destination_by_id(db: Session, destination_id: int):
    return (
        db.query(Destination)
        .filter(Destination.id == destination_id)
        .first()
    )