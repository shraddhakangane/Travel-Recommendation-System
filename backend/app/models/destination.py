from sqlalchemy import Column, Integer, String, Text, Float

from app.database.database import Base


class Destination(Base):
    __tablename__ = "destinations"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(150), nullable=False)
    city = Column(String(100), nullable=False)
    state = Column(String(100), nullable=False)
    country = Column(String(100), nullable=False)

    description = Column(Text, nullable=True)

    category = Column(String(50), nullable=False)
    average_cost = Column(Float, nullable=True)
    rating = Column(Float, default=0)
    best_time_to_visit = Column(String(100), nullable=True)

    image_url = Column(String(500), nullable=True)