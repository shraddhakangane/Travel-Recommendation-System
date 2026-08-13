from pydantic import BaseModel


class FavoriteCreate(BaseModel):
    user_id: int
    destination_id: int


class FavoriteResponse(BaseModel):
    id: int
    user_id: int
    destination_id: int

    model_config = {
        "from_attributes": True
    }