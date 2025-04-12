import pymysql
from dotenv import load_dotenv
import os

# .env.production 파일 로드
load_dotenv('.env.production')

# 데이터베이스 연결 정보
db_config = {
    'host': os.getenv('DB_HOST'),
    'user': os.getenv('DB_USER'),
    'password': os.getenv('DB_PASSWORD'),
    'db': os.getenv('DB_NAME'),
    'port': int(os.getenv('DB_PORT', 3306))
}

def execute_sql_file(filename):
    try:
        # 데이터베이스 연결
        print("데이터베이스 연결 시도 중...")
        connection = pymysql.connect(**db_config)
        print("데이터베이스 연결 성공!")

        # SQL 파일 읽기
        with open(filename, 'r', encoding='utf-8') as file:
            sql_commands = file.read()

        # 커서 생성 및 SQL 실행
        with connection.cursor() as cursor:
            # 각 명령어를 개별적으로 실행
            for command in sql_commands.split(';'):
                if command.strip():
                    print(f"실행 중: {command[:100]}...")
                    cursor.execute(command)
            
            # 변경사항 저장
            connection.commit()
            print("비밀번호 업데이트 완료!")

    except Exception as e:
        print(f"오류 발생: {str(e)}")

    finally:
        if 'connection' in locals():
            connection.close()
            print("데이터베이스 연결 종료")

if __name__ == "__main__":
    execute_sql_file('update_admin_password.sql') 