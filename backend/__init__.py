"""
Backend Package Initialization
이 모듈은 회계 대시보드의 백엔드 패키지를 초기화합니다.
주요 컴포넌트:
- config: 데이터베이스 및 기타 설정
- models: 데이터베이스 모델
- routers: API 엔드포인트
- schemas: Pydantic 모델
- utils: 유틸리티 함수
"""

__version__ = "0.1.0"

# 하위 모듈들을 import
from . import routers
from . import models
from . import schemas
from . import config
from . import utils

# 외부에서 접근 가능한 모듈들을 정의
__all__ = [
    "routers",
    "models",
    "schemas",
    "config",
    "utils"
]

