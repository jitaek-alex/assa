"""
Routers Package Initialization
이 모듈은 API 엔드포인트를 정의합니다.
주요 라우터:
- auth_router: 인증 관련 엔드포인트
- user_router: 사용자 관리 엔드포인트
- tenant_router: 테넌트 관리 엔드포인트
- voucher_router: 전표 관리 엔드포인트
- sale_router: 판매 관리 엔드포인트
- daily_sale_router: 일일 판매 관리 엔드포인트
- chart_router: 차트 데이터 엔드포인트
"""

from .auth_router import router as auth_router
from .user_router import router as user_router
from .tenant_router import router as tenant_router
from .voucher_router import router as voucher_router
from .sale_router import router as sale_router
from .daily_sale_router import router as daily_sale_router
from .chart_router import router as chart_router

__all__ = [
    "auth_router",
    "user_router",
    "tenant_router",
    "voucher_router",
    "sale_router",
    "daily_sale_router",
    "chart_router"
] 