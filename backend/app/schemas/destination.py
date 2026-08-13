from pydantic import BaseModel


class DestinationCreate(BaseModel):
    name: str
    city: str
    state: str
    country: str
    description: str
    category: str
    average_cost: float
    best_time_to_visit: str


class DestinationResponse(DestinationCreate):
    id: int

    class Config:
        from_attributes = True