from fastapi.staticfiles import StaticFiles
from fastapi import FastAPI, Body
import numpy as np
from chromadb.utils import embedding_functions

app = FastAPI()

embedder = embedding_functions.DefaultEmbeddingFunction()

@app.post("/embed")
def embed_text(data: dict = Body(...)):
    text = data['text']
    vector = embedder([text])[0].tolist()
    return {"vector": vector}

@app.get('/similarity')
def get_similarity(text1: str, text2: str):
    vector1 = embedder([text1])[0]
    vector2 = embedder([text2])[0]
    similarity = (np.dot(vector1,vector2))/(np.linalg.norm(vector1)*np.linalg.norm(vector2))
    return float(similarity)

app.mount("/", StaticFiles(directory="static", html=True), name="static"),