-- 기본 지점(tenant) 데이터 삽입
INSERT INTO tenants (name, code, address, phone) VALUES
('본사', 'HQ001', '서울시 강남구 테헤란로 123', '02-123-4567'),
('부산지점', 'BS001', '부산시 해운대구 해운대해변로 456', '051-234-5678'),
('대구지점', 'DG001', '대구시 중구 국채보상로 789', '053-345-6789');

-- 관리자 계정 생성 (비밀번호: admin123)
INSERT INTO users (username, email, password_hash, role, tenant_id) VALUES
('admin', 'admin@example.com', '$2b$12$EoVC/DxobpEHQqPRI25LL.M63Z9DFS5pH6n6nfCBHMS.C/v6gIyyK', 'admin', 1);

-- 테스트용 사용자 계정 생성 (비밀번호: Test123!)
INSERT INTO users (username, email, password_hash, role, tenant_id) VALUES
('test_user1', 'test1@example.com', '$2b$12$LxWn74M7QDb2J7oyOwV7N.XqLQm4.AUjjDdGnC0MSRHgt7Tx8YuW.', 'staff', 2),
('test_user2', 'test2@example.com', '$2b$12$LxWn74M7QDb2J7oyOwV7N.XqLQm4.AUjjDdGnC0MSRHgt7Tx8YuW.', 'staff', 3);

-- 테스트용 전표 데이터 삽입
INSERT INTO vouchers (tenant_id, description, amount, date, created_by) VALUES
(1, '본사 운영비', 1000000.00, '2024-03-01', 1),
(2, '부산지점 운영비', 500000.00, '2024-03-01', 2),
(3, '대구지점 운영비', 500000.00, '2024-03-01', 3); 