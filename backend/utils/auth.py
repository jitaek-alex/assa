"""
인증 유틸리티 모듈
이 모듈은 사용자 인증과 관련된 유틸리티 함수를 제공합니다.
주요 기능:
- 비밀번호 해싱 및 검증
- JWT 토큰 생성 및 검증
- 현재 사용자 조회
"""

from passlib.context import CryptContext
from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
import logging
from ..config.database import get_db
from ..models.user_model import User

# 로깅 설정
logger = logging.getLogger("auth")

# 비밀번호 해싱 설정
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# JWT 설정
SECRET_KEY = "your-secret-key"  # 실제 운영 환경에서는 환경 변수에서 로드해야 합니다
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    비밀번호를 검증합니다.
    
    Args:
        plain_password: 평문 비밀번호
        hashed_password: 해시된 비밀번호
        
    Returns:
        비밀번호 일치 여부
    """
    logger.debug(f"비밀번호 검증 시작")
    logger.debug(f"해시된 비밀번호: {hashed_password}")
    logger.debug(f"평문 비밀번호: {plain_password}")
    logger.debug(f"평문 비밀번호 길이: {len(plain_password)}")
    logger.debug(f"평문 비밀번호 바이트 길이: {len(plain_password.encode())}")
    logger.debug(f"해시된 비밀번호 바이트 길이: {len(hashed_password.encode())}")
    
    try:
        # 비밀번호 검증 전에 공백 제거
        plain_password = plain_password.strip()
        hashed_password = hashed_password.strip()
        
        # 비밀번호 해시 생성
        new_hash = pwd_context.hash(plain_password)
        logger.debug(f"새로 생성된 해시: {new_hash}")
        
        # 해시 비교
        result = pwd_context.verify(plain_password, hashed_password)
        logger.debug(f"비밀번호 검증 결과: {result}")
        if not result:
            logger.warning(f"비밀번호 불일치: {plain_password}")
        return result
    except Exception as e:
        logger.error(f"비밀번호 검증 중 오류 발생: {str(e)}")
        return False

def get_password_hash(password: str) -> str:
    """
    비밀번호를 해시합니다.
    
    Args:
        password: 평문 비밀번호
        
    Returns:
        해시된 비밀번호
    """
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """
    JWT 액세스 토큰을 생성합니다.
    
    Args:
        data: 토큰에 포함할 데이터
        expires_delta: 만료 시간
        
    Returns:
        JWT 토큰
    """
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
) -> User:
    """
    현재 로그인한 사용자를 조회합니다.
    
    Args:
        token: JWT 토큰
        db: 데이터베이스 세션
        
    Returns:
        현재 사용자 객체
        
    Raises:
        HTTPException: 토큰이 유효하지 않거나 사용자를 찾을 수 없는 경우
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="인증에 실패했습니다",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            logger.warning("토큰에 사용자 이름이 없습니다")
            raise credentials_exception
    except JWTError as e:
        logger.error(f"토큰 검증 실패: {str(e)}")
        raise credentials_exception
        
    user = db.query(User).filter(User.username == username).first()
    if user is None:
        logger.warning(f"사용자를 찾을 수 없습니다: {username}")
        raise credentials_exception
        
    logger.info(f"현재 사용자 조회 성공: {username}")
    return user 