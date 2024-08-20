import os
from typing import List
from ollama import Client
from dotenv import load_dotenv
from utils import generate_unique_numbers
from langchain_core.documents import Document
from langchain_ollama import OllamaEmbeddings

load_dotenv("../.env")


class EmbeddingService(object):
    """docstring for EmbeddingService."""

    ollamaClient: Client
    OLLAMA_EMBEDDING_MODEL: str
    OLLAMA_EMBEDDING_MODEL_PATH: str

    def __init__(self):
        super(EmbeddingService, self).__init__()

        self.OLLAMA_EMBEDDING_MODEL = os.environ["OLLAMA_EMBEDDING_MODEL"]
        self.OLLAMA_EMBEDDING_MODEL_PATH = os.environ["OLLAMA_EMBEDDING_MODEL_PATH"]
        if not self.OLLAMA_EMBEDDING_MODEL or not self.OLLAMA_EMBEDDING_MODEL_PATH:
            raise Exception("Ollama credential missing in .env")

        self.ollamaClient = Client(host=self.OLLAMA_EMBEDDING_MODEL_PATH)

    def __createEmbeddings(self, text: str):
        res = self.ollamaClient.embeddings(
            model=self.OLLAMA_EMBEDDING_MODEL, prompt=text
        )

        return res["embedding"]

    def embeddedDocument(self, documents: List[Document]):

        embeddedDocuments: list = []

        for i in range(len(documents)):
            embeddedDocuments.append(
                {
                    "id": generate_unique_numbers(11231231231, 1001231231231312) + i,
                    "vector": self.__createEmbeddings(documents[i].page_content),
                    "metadatas": documents[i].metadata,
                    "document": documents[i].page_content,
                }
            )
        return embeddedDocuments


embeddingService = EmbeddingService()
