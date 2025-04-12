from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from .voucher_schema import PaymentType, PaymentMethod

class SaleBase(BaseModel):
    amount: float
    payment_type: PaymentType
    payment_method: PaymentMethod
    description: Optional[str] = None

class SaleCreate(SaleBase):
    pass

class SaleResponse(SaleBase):
    id: int
    tenant_id: int
    creator_id: int
    created_at: datetime

    class Config:
        orm_mode = True 