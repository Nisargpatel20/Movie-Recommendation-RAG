from fastapi import FastAPI
from backend.app.routes import router


# Include routes

from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

origins = ["http://localhost:3000", "http://localhost:8000", "http://localhost:8080"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Movie Recommendation Chatbot"}


app.include_router(router)