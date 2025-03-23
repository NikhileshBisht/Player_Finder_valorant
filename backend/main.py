from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Define the origins that should be permitted to make requests
origins = [
    "http://localhost:3000",  # React development server
    "http://127.0.0.1:3000"
]

# Add CORSMiddleware to allow cross-origin requests from your frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allow these origins
    allow_credentials=True,
    allow_methods=["*"],    # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],    # Allow all headers
)

class CodeCreation(BaseModel):
    code: str
    rank: str

@app.post('/submit_code')
async def submit_code(player_data: CodeCreation):
    return {
        "code": player_data.code,
        "rank": player_data.rank
    }
