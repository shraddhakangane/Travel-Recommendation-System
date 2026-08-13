from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.dependencies.database import get_db
from app.schemas.favorite import FavoriteCreate
from app.crud.favorite import (
    add_favorite,
    get_user_favorites,
    remove_favorite
)

router = APIRouter(
    prefix="/favorites",
    tags=["Favorites"]
)


@router.post("/")
def create_favorite(
    favorite: FavoriteCreate,
    db: Session = Depends(get_db)
):
    return add_favorite(db, favorite)


@router.get("/{user_id}")
def list_favorites(
    user_id: int,
    db: Session = Depends(get_db)
):
    return get_user_favorites(db, user_id)


@router.delete("/{favorite_id}")
def delete_favorite(
    favorite_id: int,
    db: Session = Depends(get_db)
):
    return remove_favorite(db, favorite_id)