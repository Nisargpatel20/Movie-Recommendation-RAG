# Movie Recommendation RAG Chatbot

This project implements a **Movie Recommendation Chatbot** using a **Retrieval-Augmented Generation (RAG)** approach. The chatbot provides recommendations for movies based on user queries, leveraging OpenAI's API for intelligent responses and a retriever for contextual document search.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [License](#license)

---

## Features

- Conversational chatbot powered by OpenAI API and Retrieval-Augmented Generation (RAG).
- Movie recommendations based on retrieved context.
- Context-aware, maintaining a history of user interactions.
- Modular architecture for seamless integration.

---

## Tech Stack

### Backend
- **Language**: Python
- **Framework**: FastAPI/Flask
- **Libraries**: 
  - `langchain`
  - `openai`
  - `python-dotenv`
  - `transformers`
  - `uvicorn`
  - `faiss`

### Frontend
- **Language**: Typescript
- **Framework**: Next.js

---

## Setup Instructions

### 1. Backend Setup

#### Prerequisites
- Python 3.8 or later installed
- OpenAI API key
- (Optional) Virtual environment tool (`venv` or `conda`)

#### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/movie-recommendation-rag.git
   cd movie-recommendation-rag/backend

### Running the both frontend and backend
backend: uvicorn backend.main:app --reload  
frontend: (you may need to delete .next folder if its already there) then npm run build, npm run start
