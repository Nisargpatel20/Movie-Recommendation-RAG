# from transformers import pipeline
from langchain.memory import ConversationBufferMemory
from langchain.vectorstores import FAISS
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain.chat_models import ChatOpenAI
from langchain.schema import Document
from datasets import load_dataset
import json
import traceback


# def initialize_memory():
#     memory = ConversationBufferMemory(memory_key="history", return_messages=True)
#     print("--Memory--", memory)
#     return memory 

# Load the dataset
def load_movie_dataset():
    dataset = load_dataset("MongoDB/embedded_movies", split="train")
    return [
        {"title": row["title"], "description": row["plot"]}
        for row in dataset
    ]


# Initialize FAISS index
def initialize_faiss_index(dataset):
    embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
    faiss_index = FAISS.from_texts(
        texts=[f"{movie['title']} - {movie['description']}" for movie in dataset],
        embedding=embeddings,
        metadatas=[
            {"title": movie["title"], "description": movie["description"]}
            for movie in dataset
        ],
    )
    print("--faiss_index--", faiss_index)
    return faiss_index


# Build RAG model using LLMChain
def build_rag_model(faiss_index, openai_api_key):
    retriever = faiss_index.as_retriever()

    prompt_template = PromptTemplate.from_template(
    "You are a helpful and knowledgeable assistant. If the query is related to movies, use the context below to generate "
    "a list of the best movie recommendations. Each recommendation should include the title, a brief description, and a "
    "reason why it's relevant to the query.\n\n"
    "If the query is unrelated to movies or context is not relevant, respond in a general conversational manner.\n\n"
    "Context:\n"
    "{context}\n\n"
    "Query: {query}\n\n"
    "History: {history}\n\n"
    "If history is available and related to query then add it to the context\n\n"
    "Your response:"
    )

    # initialize_memory()

    # Define the memory
    # memory = ConversationBufferMemory(memory_key="history", return_messages=True)
    llm = ChatOpenAI(model_name="gpt-3.5-turbo-16k", openai_api_key=openai_api_key)

    # Create the chain
    chain = LLMChain(
        prompt=prompt_template,
        llm=llm,  # Replace with your LLM instance
    )


    return retriever, chain


# Query function
def get_recommendations(query: str, history: str, retriever, llm_chain):
    """
    Generate movie recommendations based on a user query.

    Args:
        query (str): The user's query.
        retriever: FAISS retriever for fetching relevant documents.
        llm_chain: LLMChain for generating responses.

    Returns:
        str: Recommendations as a response string.
    """
    try:
        if not query.strip():
            raise ValueError("Query cannot be empty. Please provide a valid query.")

        # Retrieve relevant documents
        docs = retriever.get_relevant_documents(query)
        if not docs:
            return "No relevant context found for the query."
        
        if docs:
            data = [
                {
                    "title": doc.metadata.get("title", "N/A"),
                    "description": doc.metadata.get("description", "N/A"),
                    "poster_url": doc.metadata.get("poster_url", "N/A")
                }
                for doc in docs
            ]
            # Format the documents as context
            context = json.dumps(data)
        else:
            context = "No movie-related context found"

        # Prepare input for the LLM chain
        input_data = {"query": query, "context": context, "history": history}


        # Generate the response using the LLM chain
        response = llm_chain.invoke(input=input_data)
        return response

    except Exception as e:
        error_message = f"Error while getting recommendations: {str(e)}"
        traceback_str = traceback.format_exc()
        print(f"Error: {error_message}")
        print(f"Traceback: {traceback_str}")
        raise ValueError(error_message)
