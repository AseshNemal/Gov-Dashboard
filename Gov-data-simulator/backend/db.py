from pymongo import MongoClient
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# MongoDB connection
client = MongoClient(os.getenv("MONGODB_URI"))
db = client["reviveNation"]
collection = db["expenses"]

def get_collection():
    """Returns the expenses collection"""
    return collection

def test_connection():
    """Test MongoDB connection"""
    try:
        client.admin.command('ismaster')
        print("✅ MongoDB connection successful!")
        return True
    except Exception as e:
        print(f"❌ MongoDB connection failed: {e}")
        return False
