from fastapi import FastAPI 
from pydantic import BaseModel


app = FastAPI()


class CodeCreation(BaseModel):
    code: str
    rank : str



@app.post('/submit_code')
async def submit_code(player_data : CodeCreation):
    return {
        "code":player_data.code ,
        "rank":player_data.rank
    }

