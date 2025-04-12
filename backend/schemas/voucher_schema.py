from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from enum import Enum

class PaymentType(str, Enum):
    CASH = "cash"
    CARD = "card"
    TRANSFER = "transfer"
    OTHER = "other"

class PaymentMethod(str, Enum):
    CASH = "cash"
    CARD = "card"
    TRANSFER = "transfer"
    OTHER = "other"

class VoucherBase(BaseModel):
    voucher_number: str
    amount: int
    payment_type: PaymentType
    payment_method: PaymentMethod
    description: Optional[str] = None

class VoucherCreate(VoucherBase):
    pass

class VoucherResponse(VoucherBase):
    id: int
    tenant_id: int
    creator_id: int
    created_at: datetime

    class Config:
        orm_mode = True 