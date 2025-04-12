from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime

from ..config.database import get_db
from ..models.voucher_model import Voucher, PaymentType, PaymentMethod
from ..models.user_model import User
from ..schemas.voucher_schema import VoucherCreate, VoucherResponse
from ..utils.auth import get_current_user

router = APIRouter()

@router.post("/", response_model=VoucherResponse)
def create_voucher(
    voucher: VoucherCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db_voucher = Voucher(
        voucher_number=voucher.voucher_number,
        amount=voucher.amount,
        payment_type=voucher.payment_type,
        payment_method=voucher.payment_method,
        description=voucher.description,
        tenant_id=current_user.tenant_id,
        creator_id=current_user.id
    )
    db.add(db_voucher)
    db.commit()
    db.refresh(db_voucher)
    return db_voucher

@router.get("/", response_model=List[VoucherResponse])
def read_vouchers(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    vouchers = db.query(Voucher).offset(skip).limit(limit).all()
    return vouchers

@router.get("/{voucher_id}", response_model=VoucherResponse)
def read_voucher(
    voucher_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db_voucher = db.query(Voucher).filter(Voucher.id == voucher_id).first()
    if db_voucher is None:
        raise HTTPException(status_code=404, detail="Voucher not found")
    return db_voucher 