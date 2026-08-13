from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.dependencies.database import get_db
from app.services.personalized_recommendation import recommend_for_user

router = APIRouter(
    prefix="/recommendations",
    tags=["Personalized Recommendations"],
)


@router.get("/user/{user_id}")
def get_user_recommendations(
    user_id: int,
    db: Session = Depends(get_db),
):
    return recommend_for_user(
        db=db,
        user_id=user_id,
    )