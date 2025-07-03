import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# ✅ Load variables from .env
load_dotenv()

# ✅ Make sure it's defined after loading
DATABASE_URL = os.getenv("DATABASE_URL")
print("DATABASE_URL =", DATABASE_URL)  # Debug: check if it's being loaded

# ✅ Raise clear error if not found
if DATABASE_URL is None:
    raise ValueError("DATABASE_URL is not set. Did you create a .env file?")

# ✅ SQLAlchemy engine setup
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
