from pydantic import BaseModel

class QueryRequest(BaseModel):
    query: str

class MovieResponse(BaseModel):
    title: str
    description: str
    # poster_url: str
