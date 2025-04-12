from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime

from ..config.database import get_db
from ..models.daily_sale_model import DailySale
from ..models.user_model import User
from ..schemas.daily_sale_schema import DailySaleCreate, DailySaleResponse
from ..utils.auth import get_current_user

router = APIRouter()

@router.post("/", response_model=DailySaleResponse)
def create_daily_sale(
    daily_sale: DailySaleCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db_daily_sale = DailySale(
        date=daily_sale.date,
        total_amount=daily_sale.total_amount,
        cash_amount=daily_sale.cash_amount,
        card_amount=daily_sale.card_amount,
        transfer_amount=daily_sale.transfer_amount,
        other_amount=daily_sale.other_amount,
        tenant_id=current_user.tenant_id,
        creator_id=current_user.id
    )
    db.add(db_daily_sale)
    db.commit()
    db.refresh(db_daily_sale)
    return db_daily_sale

@router.get("/", response_model=List[DailySaleResponse])
def read_daily_sales(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    daily_sales = db.query(DailySale).filter(
        DailySale.tenant_id == current_user.tenant_id
    ).offset(skip).limit(limit).all()
    return daily_sales

@router.get("/{daily_sale_id}", response_model=DailySaleResponse)
def read_daily_sale(
    daily_sale_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    daily_sale = db.query(DailySale).filter(
        DailySale.id == daily_sale_id,
        DailySale.tenant_id == current_user.tenant_id
    ).first()
    if daily_sale is None:
        raise HTTPException(status_code=404, detail="Daily sale not found")
    return daily_sale 