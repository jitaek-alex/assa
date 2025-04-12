from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging
import os
from dotenv import load_dotenv

# 환경 변수 로드
load_dotenv()

# 라우터 임포트
from backend.routers.auth_router import router as auth_router
from backend.routers.user_router import router as user_router
from backend.routers.sale_router import router as sale_router
from backend.routers.voucher_router import router as voucher_router
from backend.routers.chart_router import router as chart_router

# 로깅 설정
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# FastAPI 앱 생성
app = FastAPI(
    title="회계 대시보드 API",
    description="회계 관리를 위한 RESTful API",
    version="1.0.0"
)

# CORS 미들웨어 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 라우터 등록
app.include_router(auth_router)
app.include_router(user_router)
app.include_router(sale_router)
app.include_router(voucher_router)
app.include_router(chart_router)

# 데이터베이스 연결 정보 로깅
DB_URL = os.getenv("DATABASE_URL", "sqlite:///./accounting.db")
logger.info(f"DB 연결 경로: {DB_URL}")

@app.get("/")
async def root():
    """
    루트 엔드포인트
    """
    return {
        "message": "회계 대시보드 API에 오신 것을 환영합니다",
        "docs_url": "/docs",
        "redoc_url": "/redoc"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 