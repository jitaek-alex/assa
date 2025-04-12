# 회계 대시보드 프로젝트 문서

## 프로젝트 구조
```
accounting-dashboard-router/
├── backend/
│   ├── config/
│   │   └── database.py      # 데이터베이스 설정
│   ├── models/
│   │   └── user_model.py    # 사용자 모델
│   ├── routers/
│   │   ├── auth_router.py   # 인증 관련 라우터
│   │   ├── user_router.py   # 사용자 관련 라우터
│   │   ├── sale_router.py   # 판매 관련 라우터
│   │   ├── voucher_router.py # 전표 관련 라우터
│   │   └── chart_router.py  # 차트 관련 라우터
│   ├── schemas/
│   │   └── user_schema.py   # 사용자 스키마
│   ├── utils/
│   │   └── auth.py         # 인증 유틸리티
│   └── main.py             # FastAPI 메인 애플리케이션
├── frontend/
│   ├── src/
│   │   ├── components/     # React 컴포넌트
│   │   ├── pages/         # 페이지 컴포넌트
│   │   └── App.jsx        # React 메인 애플리케이션
│   └── package.json       # 프론트엔드 의존성
└── requirements.txt       # 백엔드 의존성
```

## 현재까지의 작업 내용

### 1. 백엔드 설정 (FastAPI)
- FastAPI 애플리케이션 기본 구조 설정
- 라우터 모듈 구성 (auth, user, sale, voucher, chart)
- 데이터베이스 연결 설정 (SQLite)
- CORS 미들웨어 설정
- 사용자 인증 시스템 구현
  - 비밀번호 해싱 및 검증
  - JWT 토큰 생성 및 검증
  - 로그인 엔드포인트 구현

### 2. 프론트엔드 설정 (React)
- React Router v7 설정
- 로그인 페이지 구현
- 사용자 인증 상태 관리
- API 연동 설정

### 3. 현재 해결 중인 문제
1. 모듈 임포트 오류
   - `main.py`에서 라우터 임포트 경로 수정 필요
   - 절대 경로로 변경하여 해결 시도 중

2. 비밀번호 검증 실패
   - 로그인 시 비밀번호 검증이 실패하는 문제
   - 해시 생성 및 비교 로직 점검 필요

3. React 컴포넌트 렌더링 오류
   - 객체를 직접 렌더링하려는 시도로 인한 오류
   - 오류 메시지 처리 로직 개선 필요

## 다음 작업 예정
1. 데이터베이스 마이그레이션 설정
2. 사용자 관리 기능 구현
3. 대시보드 UI 구현
4. API 엔드포인트 테스트
5. 보안 기능 강화

## 기술 스택
- 백엔드: FastAPI, SQLAlchemy, JWT
- 프론트엔드: React, React Router v7
- 데이터베이스: SQLite
- 인증: JWT, bcrypt

## 환경 설정
- Python 3.8+
- Node.js 14+
- SQLite 3

## 주의사항
1. 라우터 임포트는 절대 경로 사용
2. 비밀번호 검증 시 공백 처리 필요
3. React 컴포넌트에서 객체 직접 렌더링 금지

## 마지막 업데이트
- 날짜: 2024-03-19
- 작업 내용: 라우터 임포트 경로 수정, 비밀번호 검증 로직 개선 