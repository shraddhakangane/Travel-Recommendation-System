from sqlalchemy.orm import Session

from app.models.favorite import Favorite
from app.schemas.favorite import FavoriteCreate


def add_favorite(db: Session, favorite: FavoriteCreate):
    db_favorite = Favorite(
        user_id=favorite.user_id,
        destination_id=favorite.destination_id
    )

    db.add(db_favorite)
    db.commit()
    db.refresh(db_favorite)

    return db_favorite


def get_user_favorites(db: Session, user_id: int):
    return (
        db.query(Favorite)
        .filter(Favorite.user_id == user_id)
        .all()
    )


def remove_favorite(db: Session, favorite_id: int):
    favorite = (
        db.query(Favorite)
        .filter(Favorite.id == favorite_id)
        .first()
    )

    if favorite:
        db.delete(favorite)
        db.commit()

    return favorite