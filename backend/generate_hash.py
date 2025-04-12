import bcrypt

# 새로운 비밀번호 설정
password = "admin123"

# 비밀번호를 바이트로 인코딩
password_bytes = password.encode('utf-8')

# bcrypt 해시 생성 (salt는 자동으로 생성됨)
hashed = bcrypt.hashpw(password_bytes, bcrypt.gensalt())

# 해시를 문자열로 디코딩
hashed_str = hashed.decode('utf-8')

print(f"Password: {password}")
print(f"Hash: {hashed_str}") 