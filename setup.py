from setuptools import setup, find_packages

setup(
    name="accounting-dashboard",
    version="0.1.0",
    packages=find_packages(),
    install_requires=[
        "fastapi",
        "uvicorn",
        "sqlalchemy",
        "pymysql",
        "python-jose[cryptography]",
        "passlib[bcrypt]",
        "python-multipart",
        "python-dotenv",
        "pydantic",
    ],
    python_requires=">=3.8",
) 