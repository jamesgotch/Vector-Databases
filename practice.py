from chromadb.utils import embedding_functions

embedder = embedding_functions.DefaultEmbeddingFunction()

documents = ["Chad"]

print(embedder(documents)[0].tolist())