from utils import hash
from typing import List
from pydantic import BaseModel
from langchain_core.documents import Document
from fastapi import FastAPI, HTTPException, status
from service.Scrappingservice import scrappingservice
from service.Segmentservice import segmentService
from service.EmbeddingService import embeddingService
from service.VectorStoreService import vectorStoreService

app = FastAPI()


class Item(BaseModel):
    url: str


@app.post("/api/v1/scrape-and-vectorize", status_code=status.HTTP_201_CREATED)
def read_item(item: Item):

    try:

        if not item.url:
            raise HTTPException(status_code=400, detail="Invalid Url")

        print("Started scraping: " + item.url)
        scrappedDocument: List[Document] = scrappingservice.getWebPageContent(
            url=item.url
        )

        print("Scraping jon finished")

        segmentedDocuments = segmentService.splitText(
            texts=scrappedDocument[0].page_content,
            metadatas=scrappedDocument[0].metadata,
        )

        embeddedDocuments = embeddingService.embeddedDocument(segmentedDocuments)

        collection_name_hash: str = hash(item.url)

        collecionStoreStatus = vectorStoreService.create_collection(
            collection_name=collection_name_hash
        )
        if not collecionStoreStatus:
            raise Exception("Failed to create collection " + item.url)
        print("Collection with name: " + collection_name_hash + " created")

        res = vectorStoreService.upsert(
            collection_name=collection_name_hash, data=embeddedDocuments
        )

        if not res or res["upsert_count"] == 0:
            raise Exception(
                "Failed to upsert data "
                + len(segmentedDocuments)
                + " in collection: "
                + item.url
            )
        print("Upserted " + str(res["upsert_count"]) + " documents")

        return {
            "url": item.url,
            "message": "created",
            "collection_name": collection_name_hash,
        }
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=500, detail="Something went wrong, please try again later"
        )
