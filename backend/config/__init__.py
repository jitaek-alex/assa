"""
Configuration Package Initialization
이 모듈은 애플리케이션의 설정을 관리합니다.
주요 기능:
- database: 데이터베이스 연결 및 세션 관리
- 환경 변수: .env 파일에서 환경 변수 로드
"""

from . import database

__all__ = ["database"]

