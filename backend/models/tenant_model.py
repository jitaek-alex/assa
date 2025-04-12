from sqlalchemy import Column, Integer, String, DateTime, Boolean
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from ..config.database import Base

class Tenant(Base):
    __tablename__ = "tenants"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, index=True)
    business_number = Column(String(20), unique=True, nullable=False)
    address = Column(String(200), nullable=True)
    phone = Column(String(20), nullable=True)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
    is_active = Column(Boolean, default=True)

    users = relationship("User", back_populates="tenant")
    vouchers = relationship("Voucher", back_populates="tenant")
    sales = relationship("Sale", back_populates="tenant")
    daily_sales = relationship("DailySale", back_populates="tenant") 