-- 기존 테이블 삭제
DROP TABLE IF EXISTS sales;
DROP TABLE IF EXISTS vouchers;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS tenants;

-- Enum 타입 생성
DROP TYPE IF EXISTS payment_type_enum;
CREATE TYPE payment_type_enum AS ENUM ('선결', '부분선결', '작업완료후 결제');

DROP TYPE IF EXISTS payment_method_enum;
CREATE TYPE payment_method_enum AS ENUM ('카드', '현금', '카드+현금');

-- 지점(tenant) 테이블 생성
CREATE TABLE tenants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,
    address VARCHAR(200),
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 사용자(user) 테이블 생성
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL,
    tenant_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id)
);

-- 전표(voucher) 테이블 생성
CREATE TABLE vouchers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    description TEXT NOT NULL,
    amount FLOAT NOT NULL,
    date DATE NOT NULL,
    tenant_id INT,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id),
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- 매출(sales) 테이블 생성
CREATE TABLE sales (
    id INT AUTO_INCREMENT PRIMARY KEY,
    car_number VARCHAR(20) NOT NULL,
    work_date DATE NOT NULL,
    payment_type VARCHAR(20) NOT NULL,
    payment_method VARCHAR(20) NOT NULL,
    card_amount FLOAT DEFAULT 0,
    cash_amount FLOAT DEFAULT 0,
    total_amount FLOAT NOT NULL,
    input_date DATE NOT NULL,
    tenant_id INT,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id),
    FOREIGN KEY (created_by) REFERENCES users(id)
); 