from pydantic import BaseModel, Field


class RatingCreate(BaseModel):
    destination_id: int
    rating: int = Field(..., ge=1, le=5)


class RatingResponse(BaseModel):
    id: int
    user_id: int
    destination_id: int
    rating: int

    class Config:
        from_attributes = True