from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
import logging
from typing import List

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ---- DATABASE SETUP ----

DATABASE_URL = "postgresql://postgres:Nikhilesh123@localhost:5432/Valorant"  # Replace with your actual DB credentials

try:
    engine = create_engine(DATABASE_URL)
    # Test the connection
    with engine.connect() as connection:
        logger.info("Successfully connected to the database")
except Exception as e:
    logger.error(f"Failed to connect to the database: {str(e)}")
    raise HTTPException(status_code=500, detail=f"Database connection failed: {str(e)}")

SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)
Base = declarative_base()

# ---- SQLAlchemy Model (Table) ----

class CodeEntry(Base):
    __tablename__ = "codes"

    id = Column(Integer, primary_key=True, index=True)
    code = Column(String, nullable=False)
    rank = Column(String, nullable=False)
    click = Column(Integer, nullable=False)

# Create tables if they don't exist yet
Base.metadata.create_all(bind=engine)

# ---- FastAPI Setup ----

app = FastAPI()

# Allow CORS from React frontend
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---- Pydantic Schema ----

class CodeCreation(BaseModel):
    code: str
    rank: str
    click: int

class PlayerResponse(BaseModel):
    id: int
    code: str
    rank: str
    click: int

    class Config:
        orm_mode = True

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ---- Route ----

@app.post("/submit_code")
async def submit_code(player_data: CodeCreation, db: Session = Depends(get_db)):
    new_entry = CodeEntry(
        code=player_data.code,
        rank=player_data.rank,
        click=player_data.click
    )
    db.add(new_entry)
    db.commit()
    db.refresh(new_entry)

    return {
        "id": new_entry.id,
        "code": new_entry.code,
        "rank": new_entry.rank,
        "click": new_entry.click
    }
    
@app.get("/get_table", response_model=List[PlayerResponse])
async def get_all_players(db: Session = Depends(get_db)):
    players = db.query(CodeEntry).all()
    return players