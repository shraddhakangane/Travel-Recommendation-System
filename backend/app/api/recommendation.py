from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.dependencies.database import get_db
from app.services.recommendation import get_recommendations

router = APIRouter(
    prefix="/recommendations",
    tags=["Recommendations"]
)


@router.get("/")
def recommend_destinations(db: Session = Depends(get_db)):
    return get_recommendations(db)