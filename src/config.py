import os

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DATABASE_URL",
        "postgresql://flaskuser:flaskpass@localhost:5432/flaskdb"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = True
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "super-secret-key")