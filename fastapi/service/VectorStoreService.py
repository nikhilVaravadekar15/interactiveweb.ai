import os
from typing import List
from dotenv import load_dotenv
from pymilvus import MilvusClient
from langchain_core.documents import Document
from langchain_core.documents import Document


load_dotenv("../.env")


class VectorStoreService(object):
    """docstring for VectorStoreService."""

    milvusClient: MilvusClient
    MILVUS_DATABASE_PATH: str

    def __init__(self):
        super(VectorStoreService, self).__init__()
        self.MILVUS_DATABASE_PATH = os.environ["MILVUS_DATABASE_PATH"]
        if not self.MILVUS_DATABASE_PATH:
            raise Exception("Milvus database credential missing in .env")

        self.milvusClient = MilvusClient(uri=self.MILVUS_DATABASE_PATH)

    def create_collection(self, collection_name: str):

        try:

            if self.milvusClient.has_collection(collection_name):
                return True

            self.milvusClient.create_collection(
                collection_name=collection_name, dimension=768
            )
            return True
        except Exception as e:
            print(e)
            return False

    def upsert(self, collection_name: str, data: List):
        res = self.milvusClient.upsert(collection_name=collection_name, data=data)
        return res


vectorStoreService = VectorStoreService()
