from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from datetime import date

from ..config.database import get_db
from ..models.daily_sale_model import DailySale
from ..schemas.daily_sale_schema import DailySaleCreate, DailySaleResponse
from ..utils.auth import get_current_user
from ..models.user_model import User
from ..models.sale_model import Sale
from ..schemas.sale_schema import SaleCreate, SaleResponse

router = APIRouter()

@router.get("/summary")
async def get_sales_summary(
    start_date: date,
    end_date: date,
    tenant_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    sales = db.query(DailySale).filter(
        DailySale.date >= start_date,
        DailySale.date <= end_date,
        DailySale.tenant_id == tenant_id
    ).all()
    
    total_amount = sum(sale.amount for sale in sales)
    total_count = len(sales)
    
    return {
        "total_amount": total_amount,
        "total_count": total_count,
        "average_amount": total_amount / total_count if total_count > 0 else 0
    }

@router.get("/")
async def get_sales(db: Session = Depends(get_db)):
    # 판매 목록을 반환하는 엔드포인트
    return {"message": "Sales list"}

@router.post("/", response_model=SaleResponse)
def create_sale(
    sale: SaleCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db_sale = Sale(
        amount=sale.amount,
        payment_type=sale.payment_type,
        payment_method=sale.payment_method,
        description=sale.description,
        tenant_id=current_user.tenant_id,
        creator_id=current_user.id
    )
    db.add(db_sale)
    db.commit()
    db.refresh(db_sale)
    return db_sale

@router.get("/", response_model=List[SaleResponse])
def read_sales(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    sales = db.query(Sale).offset(skip).limit(limit).all()
    return sales

@router.get("/{sale_id}", response_model=SaleResponse)
def read_sale(
    sale_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db_sale = db.query(Sale).filter(Sale.id == sale_id).first()
    if db_sale is None:
        raise HTTPException(status_code=404, detail="Sale not found")
    return db_sale

@router.put("/{sale_id}", response_model=SaleResponse)
def update_sale(sale_id: int, sale: SaleCreate, db: Session = Depends(get_db)):
    db_sale = db.query(Sale).filter(Sale.id == sale_id).first()
    if db_sale is None:
        raise HTTPException(status_code=404, detail="Sale not found")
    
    for key, value in sale.dict().items():
        setattr(db_sale, key, value)
    
    db.commit()
    db.refresh(db_sale)
    return db_sale

@router.delete("/{sale_id}")
def delete_sale(sale_id: int, db: Session = Depends(get_db)):
    db_sale = db.query(Sale).filter(Sale.id == sale_id).first()
    if db_sale is None:
        raise HTTPException(status_code=404, detail="Sale not found")
    
    db.delete(db_sale)
    db.commit()
    return {"message": "Sale deleted successfully"} 