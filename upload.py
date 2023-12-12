"""Load html from files, clean up, split, ingest into Weaviate."""
import logging
import os
import re
import pdb
import PyPDF2
from bs4 import BeautifulSoup, SoupStrainer, Tag
import weaviate
from langchain.document_loaders.recursive_url_loader import RecursiveUrlLoader
from langchain.schema import Document
from langchain.embeddings import OpenAIEmbeddings
from langchain.indexes import SQLRecordManager, index
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.utils.html import PREFIXES_TO_IGNORE_REGEX, SUFFIXES_TO_IGNORE_REGEX
from langchain.vectorstores import Weaviate
from dotenv import load_dotenv

load_dotenv()

from constants import (
    WEAVIATE_DOCS_INDEX_NAME,
)

logger = logging.getLogger(__name__)

WEAVIATE_URL = os.environ["WEAVIATE_URL"]
WEAVIATE_API_KEY = os.environ["WEAVIATE_API_KEY"]
RECORD_MANAGER_DB_URL = os.environ["RECORD_MANAGER_DB_URL"]


def _pdf_extractor(file_stream):
    text = ""
    reader = PyPDF2.PdfReader(file_stream)
    for page in reader.pages:
        text += page.extract_text() or ''
    return text.strip()


def ingest_docs(file_stream, filename):
    # Process the uploaded PDF file
    pdf_text = _pdf_extractor(file_stream)
    pdf_document = Document(
        page_content=pdf_text,
        metadata={
            'source': filename,
            'title': os.path.splitext(filename)[0]
        }
    )

    # Combine URL and PDF documents
    documents = [pdf_document]

    text_splitter = RecursiveCharacterTextSplitter(chunk_size=4000, chunk_overlap=200)
    docs_transformed = text_splitter.split_documents(documents)
    # We try to return 'source' and 'title' metadata when querying vector store and
    # Weaviate will error at query time if one of the attributes is missing from a
    # retrieved document.
    for doc in docs_transformed:
        if "source" not in doc.metadata:
            doc.metadata["source"] = ""
        if "title" not in doc.metadata:
            doc.metadata["title"] = ""
    

    client = weaviate.Client(
        url=WEAVIATE_URL,
        auth_client_secret=weaviate.AuthApiKey(api_key=WEAVIATE_API_KEY),
    )

    embedding = OpenAIEmbeddings(chunk_size=200)  # rate limit
    vectorstore = Weaviate(
        client,
        WEAVIATE_DOCS_INDEX_NAME,
        "text",
        embedding=embedding,
        by_text=False,
        attributes=["source", "title"],
    )
    record_manager = SQLRecordManager(
        f"weaviate/{WEAVIATE_DOCS_INDEX_NAME}", db_url=RECORD_MANAGER_DB_URL
    )

    record_manager.create_schema()
    pdb.set_trace()
    index(
        docs_transformed,
        record_manager,
        vectorstore,
        cleanup="full",
        source_id_key="source",
    )

    logger.info(
        "LangChain now has this many vectors: ",
        client.query.aggregate(WEAVIATE_DOCS_INDEX_NAME).with_meta_count().do(),
    )
