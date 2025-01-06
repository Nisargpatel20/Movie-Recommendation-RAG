from fastapi import FastAPI, Request, APIRouter, HTTPException
from pydantic import BaseModel
from .rag import load_movie_dataset, initialize_faiss_index, build_rag_model, get_recommendations # Import your router

from fastapi.responses import JSONResponse
from fastapi import Request
import traceback
from langchain.memory import ConversationBufferMemory
import json
import uuid


from fastapi.middleware.cors import CORSMiddleware
origins = ["http://localhost:3000", "http://localhost:8000", "http://localhost:8080"]

openai_api_key = <API_KEY>
app = FastAPI()
router = APIRouter()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class QueryRequest(BaseModel):
    query: str


# Load dataset and initialize RAG components
dataset = load_movie_dataset()
faiss_index = initialize_faiss_index(dataset)
retriver, qa_chain = build_rag_model(faiss_index, openai_api_key)
# memory = ConversationBufferMemory(memory_key="history", return_messages=True)
convHistory = {}

@router.post("/{uuid_value}")
async def query_rag(request: QueryRequest, uuid_value: str):
    
    try:
        print("'---request---'", request.query) 
        history = ""
        user_query = request.query
        recommendationsHistory = convHistory.get(uuid_value, [])
        print("--recommendationsHistory--", recommendationsHistory)
        if recommendationsHistory:
            history = recommendationsHistory[-1]
        if (user_query == ""):
            return  {"response": recommendationsHistory} 
        # query = request.query_params.get('query', '')
        
        recommendations = get_recommendations(user_query, str(history), retriver, qa_chain)
        # json_data = json.loads(recommendations)
        # print("'---json_data---'", json_data)
        conversation = {"input": user_query, "output": recommendations["text"]}
        recommendationsHistory.append(conversation)
        convHistory[uuid_value] = recommendationsHistory
        # print("'query recived---'", {request.args.get('query', '')})
        return {"response": recommendations}
    except Exception as e:
        # Log the error for debugging
        error_message = str(e)
        traceback_str = traceback.format_exc()
        print(f"Error occurred: {error_message}")
        print(f"Traceback: {traceback_str}")
        
        raise HTTPException(status_code=500, detail="Internal Server Error. Check logs for more details.")
    
# @router.get("/*")
# async def generate_uuid():
#     """
#     Generate a unique UUID and return it in JSON format.
#     """
#     try:
#         # unique_id = str(uuid.uuid4())
#         return ""
#     except Exception as e:
#         print(f"Error generating UUID: {str(e)}")
#         raise HTTPException(status_code=500, detail="Failed to generate UUID.")

# @router.get("/{uuid_value}")
# async def get_uuid(uuid_value: str):
#     """
#     Return the provided UUID in JSON format.
#     """
#     try:
#         return JSONResponse(content={"uuid": uuid_value})
#     except Exception as e:
#         print(f"Error returning UUID: {str(e)}")
#         raise HTTPException(status_code=500, detail="Failed to return UUID.")
    
app.include_router(router)


