from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Float
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from ..config.database import Base

class DailySale(Base):
    __tablename__ = "daily_sales"

    id = Column(Integer, primary_key=True, index=True)
    date = Column(DateTime, nullable=False)
    total_amount = Column(Float, nullable=False)
    cash_amount = Column(Float, nullable=False)
    card_amount = Column(Float, nullable=False)
    transfer_amount = Column(Float, nullable=False)
    other_amount = Column(Float, nullable=False)
    tenant_id = Column(Integer, ForeignKey("tenants.id"))
    creator_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())

    tenant = relationship("Tenant", back_populates="daily_sales")
    creator = relationship("User", back_populates="daily_sales") 