from typing import List, Optional
from langchain_core.documents import Document
from langchain_text_splitters import CharacterTextSplitter


class SegmentService(object):
    """docstring for SegmentService."""

    text_splitter: CharacterTextSplitter = None

    def __init__(self):
        super(SegmentService, self).__init__()
        self.text_splitter = CharacterTextSplitter(
            separator="\n\n",
            chunk_size=768,
            chunk_overlap=256,
            length_function=len,
            is_separator_regex=False,
        )

    def splitText(
        self, texts: List[str], metadatas: Optional[List[dict]]
    ) -> List[Document]:
        texts = self.text_splitter.create_documents([texts], [metadatas])
        return texts


segmentService = SegmentService()
