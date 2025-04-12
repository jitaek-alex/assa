from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime, timedelta

from ..config.database import get_db
from ..models.sale_model import Sale
from ..models.daily_sale_model import DailySale
from ..models.user_model import User
from ..utils.auth import get_current_user

router = APIRouter()

@router.get("/sales/daily")
def get_daily_sales(
    start_date: datetime,
    end_date: datetime,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    daily_sales = db.query(DailySale).filter(
        DailySale.date >= start_date,
        DailySale.date <= end_date,
        DailySale.tenant_id == current_user.tenant_id
    ).all()
    return daily_sales

@router.get("/sales/monthly")
def get_monthly_sales(
    year: int,
    month: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    start_date = datetime(year, month, 1)
    if month == 12:
        end_date = datetime(year + 1, 1, 1)
    else:
        end_date = datetime(year, month + 1, 1)
    
    daily_sales = db.query(DailySale).filter(
        DailySale.date >= start_date,
        DailySale.date < end_date,
        DailySale.tenant_id == current_user.tenant_id
    ).all()
    return daily_sales 