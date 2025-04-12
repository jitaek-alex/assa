from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class DailySaleBase(BaseModel):
    date: datetime
    total_amount: float
    cash_amount: float
    card_amount: float
    transfer_amount: float
    other_amount: float

class DailySaleCreate(DailySaleBase):
    pass

class DailySaleResponse(DailySaleBase):
    id: int
    tenant_id: int
    creator_id: int
    created_at: datetime

    class Config:
        orm_mode = True 