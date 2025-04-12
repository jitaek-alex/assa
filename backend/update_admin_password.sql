-- admin 사용자의 비밀번호 해시 업데이트 (비밀번호: admin123)
UPDATE users 
SET password_hash = '$2b$12$EoVC/DxobpEHQqPRI25LL.M63Z9DFS5pH6n6nfCBHMS.C/v6gIyyK'
WHERE username = 'admin'; 