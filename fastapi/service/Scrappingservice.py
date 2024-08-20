from typing import List
from langchain_core.documents import Document
from langchain_community.document_loaders import WebBaseLoader


class Scrappingservice(object):
    """docstring for Scrappingservice."""

    def __init__(self):
        super(Scrappingservice, self).__init__()

    def getWebPageContent(self, url: str) -> List[Document]:
        loader = WebBaseLoader(url)
        data = loader.load()
        return data


scrappingservice = Scrappingservice()
