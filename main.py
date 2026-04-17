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

app.mount("/", StaticFiles(directory="static", html=True), name="static"),