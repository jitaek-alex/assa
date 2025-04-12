"""
인증 라우터 모듈
이 모듈은 사용자 인증과 관련된 엔드포인트를 제공합니다.
주요 기능:
- 로그인 (토큰 발급)
- 현재 사용자 정보 조회
"""

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from typing import Optional
import logging
import os
from dotenv import load_dotenv

from ..config.database import get_db
from ..models.user_model import User
from ..schemas.user_schema import Token, TokenData, UserResponse
from ..utils.auth import (
    verify_password,
    get_password_hash,
    create_access_token,
    get_current_user
)

# 환경 변수 로드
load_dotenv()

# 로깅 설정
logger = logging.getLogger("auth")

# JWT 설정
SECRET_KEY = os.getenv("JWT_SECRET", "dev_secret_key_123")
ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "60"))

# OAuth2 스키마
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

router = APIRouter(
    prefix="/api",
    tags=["auth"]
)

def authenticate_user(db: Session, username: str, password: str) -> Optional[User]:
    """
    사용자 인증을 수행합니다.
    
    Args:
        db: 데이터베이스 세션
        username: 사용자 이름
        password: 비밀번호
        
    Returns:
        인증 성공 시 User 객체, 실패 시 None
    """
    logger.info(f"로그인 시도: {username}")
    
    # 사용자 검색 (username으로 변경)
    user = db.query(User).filter(User.username == username).first()
    
    if not user:
        logger.warning(f"사용자를 찾을 수 없음: {username}")
        return None
        
    logger.info(f"사용자 찾음: {user.username}, 역할: {user.role}, 테넌트: {user.tenant_id}")
    
    # 비밀번호 검증
    if not verify_password(password, user.password_hash):
        logger.warning(f"비밀번호 불일치: {username}")
        return None
        
    logger.info(f"인증 성공: {username}")
    return user

@router.post("/login", response_model=Token)
async def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    """
    사용자 로그인을 처리하고 액세스 토큰을 발급합니다.
    
    Args:
        form_data: 로그인 폼 데이터
        db: 데이터베이스 세션
        
    Returns:
        액세스 토큰
        
    Raises:
        HTTPException: 인증 실패 시
    """
    logger.debug(f"로그인 요청: {form_data.username}")
    
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        logger.warning(f"로그인 실패: {form_data.username}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="사용자 이름 또는 비밀번호가 올바르지 않습니다",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username},
        expires_delta=access_token_expires
    )
    
    logger.info(f"로그인 성공 및 토큰 발급: {user.username}")
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "role": user.role,
        "tenant_id": user.tenant_id
    }

@router.get("/me", response_model=UserResponse)
async def read_users_me(current_user: User = Depends(get_current_user)):
    """
    현재 로그인한 사용자의 정보를 조회합니다.
    
    Args:
        current_user: 현재 로그인한 사용자
        
    Returns:
        사용자 정보
    """
    logger.info(f"사용자 정보 조회: {current_user.username}")
    return current_user 