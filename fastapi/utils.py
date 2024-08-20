import secrets
import hashlib


def hash(collection_name: str):
    h = hashlib.sha3_512()
    h.update(bytes(collection_name, encoding="utf8"))
    return h.hexdigest()


def generate_unique_numbers(start, end):
    return secrets.randbelow(end - start + 1) + start
