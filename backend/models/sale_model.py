from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Enum, Float
from sqlalchemy.orm import relationship
from datetime import datetime

from ..config.database import Base
from .voucher_model import PaymentType, PaymentMethod

class Sale(Base):
    __tablename__ = "sales"

    id = Column(Integer, primary_key=True, index=True)
    amount = Column(Float)
    payment_type = Column(Enum(PaymentType))
    payment_method = Column(Enum(PaymentMethod))
    description = Column(String(200))
    tenant_id = Column(Integer, ForeignKey("tenants.id"))
    creator_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)

    # 관계 설정
    tenant = relationship("Tenant", back_populates="sales")
    creator = relationship("User", back_populates="sales") 