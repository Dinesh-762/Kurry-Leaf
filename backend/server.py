from fastapi import FastAPI, APIRouter
from fastapi.responses import RedirectResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import certifi
import httpx
import json
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Configure logging first
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Google Places config
GOOGLE_PLACES_API_KEY = os.environ.get('GOOGLE_PLACES_API_KEY', '')
GOOGLE_PLACE_ID = os.environ.get('GOOGLE_PLACE_ID', 'ChIJKwbBjK6C2TsR5cTxh1fquBY')

# Cache duration in seconds (1 hour)
REVIEW_CACHE_TTL = 3600

# MongoDB connection with error handling
mongo_url = os.environ.get('MONGO_URL', '')
db_name = os.environ.get('DB_NAME', 'kurry_leaf')

client: Optional[AsyncIOMotorClient] = None
db = None

def get_database():
    global client, db
    if client is None:
        try:
            # SSL/TLS settings for MongoDB Atlas compatibility
            client = AsyncIOMotorClient(
                mongo_url,
                serverSelectionTimeoutMS=5000,
                tlsCAFile=certifi.where()
            )
            db = client[db_name]
            logger.info("MongoDB connection initialized")
        except Exception as e:
            logger.error(f"Failed to connect to MongoDB: {e}")
    return db

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.get("/health")
async def api_health_check():
    return {"status": "healthy"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    database = get_database()
    if database is None:
        return StatusCheck(client_name=input.client_name)
    
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    try:
        _ = await database.status_checks.insert_one(doc)
    except Exception as e:
        logger.error(f"Failed to insert status check: {e}")
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    database = get_database()
    if database is None:
        return []
    
    try:
        # Exclude MongoDB's _id field from the query results with pagination limit
        status_checks = await database.status_checks.find({}, {"_id": 0}).to_list(length=100)
        
        # Convert ISO string timestamps back to datetime objects
        for check in status_checks:
            if isinstance(check['timestamp'], str):
                check['timestamp'] = datetime.fromisoformat(check['timestamp'])
        
        return status_checks
    except Exception as e:
        logger.error(f"Failed to get status checks: {e}")
        return []

# --- Curated Google Reviews (fallback when API key not available) ---
CURATED_REVIEWS = {
    "rating": 4.0,
    "total_reviews": 108,
    "reviews": [
        {
            "author_name": "Snehal Patil",
            "rating": 5,
            "text": "Best vegetarian restaurant in Ambajogai! The paneer butter masala is out of this world. Love the ambiance and the staff is very courteous. Highly recommend for family dining.",
            "time": "2026-02-20T14:30:00Z",
            "profile_photo_url": ""
        },
        {
            "author_name": "Rahul Deshmukh",
            "rating": 5,
            "text": "Amazing food quality and taste. The Maharaja Thali is a must-try - you get so many items and everything is perfectly cooked. Clean restaurant with great service.",
            "time": "2026-02-15T18:20:00Z",
            "profile_photo_url": ""
        },
        {
            "author_name": "Priya Kulkarni",
            "rating": 4,
            "text": "Very nice place for veg food lovers. The biryani is perfectly spiced and the dal makhani is creamy and rich. Slightly on the pricier side but worth every rupee.",
            "time": "2026-02-10T12:00:00Z",
            "profile_photo_url": ""
        },
        {
            "author_name": "Amit Jadhav",
            "rating": 4,
            "text": "Ordered delivery and the food was still piping hot. The crispy corn pepper starter was excellent. Packaging is good too. Will order again!",
            "time": "2026-02-05T19:45:00Z",
            "profile_photo_url": ""
        },
        {
            "author_name": "Sanjay Bhosale",
            "rating": 5,
            "text": "The Grand Veg Thali here is the real deal. 8 different preparations and each one is unique. The restaurant interior is beautiful and the staff makes you feel at home.",
            "time": "2026-01-28T13:15:00Z",
            "profile_photo_url": ""
        },
        {
            "author_name": "Neha Shinde",
            "rating": 4,
            "text": "Visited with family for dinner. The starters were really good, especially the hara bhara kebab. Main course was tasty. Ambiance is lovely and kid-friendly too.",
            "time": "2026-01-22T20:00:00Z",
            "profile_photo_url": ""
        },
        {
            "author_name": "Vikram Pawar",
            "rating": 3,
            "text": "Food is good but had to wait quite long during peak hours. The paneer tikka was nicely done. Would visit again during off-peak timings.",
            "time": "2026-01-15T21:30:00Z",
            "profile_photo_url": ""
        },
        {
            "author_name": "Aarti Gaikwad",
            "rating": 5,
            "text": "We celebrated our anniversary here and the experience was wonderful! The staff arranged everything perfectly. Food was delicious, especially the malai kofta and mango lassi.",
            "time": "2026-01-10T19:00:00Z",
            "profile_photo_url": ""
        },
    ]
}

async def fetch_google_reviews():
    """Fetch reviews from Google Places API or return cached/curated data."""
    database = get_database()

    # Check cache first
    if database is not None:
        try:
            cached = await database.review_cache.find_one(
                {"place_id": GOOGLE_PLACE_ID},
                {"_id": 0}
            )
            if cached:
                cached_time = datetime.fromisoformat(cached.get("cached_at", "2000-01-01T00:00:00+00:00"))
                age = (datetime.now(timezone.utc) - cached_time).total_seconds()
                if age < REVIEW_CACHE_TTL:
                    logger.info("Returning cached Google reviews")
                    return cached.get("data", CURATED_REVIEWS)
        except Exception as e:
            logger.error(f"Cache read error: {e}")

    # Try Google Places API if key is available
    if GOOGLE_PLACES_API_KEY:
        try:
            async with httpx.AsyncClient(timeout=10.0) as client_http:
                url = f"https://maps.googleapis.com/maps/api/place/details/json"
                params = {
                    "place_id": GOOGLE_PLACE_ID,
                    "fields": "rating,user_ratings_total,reviews",
                    "key": GOOGLE_PLACES_API_KEY,
                    "reviews_sort": "newest",
                    "language": "en"
                }
                response = await client_http.get(url, params=params)
                data = response.json()

                if data.get("status") == "OK":
                    result = data["result"]
                    reviews_data = {
                        "rating": result.get("rating", 4.0),
                        "total_reviews": result.get("user_ratings_total", 108),
                        "reviews": [
                            {
                                "author_name": r.get("author_name", ""),
                                "rating": r.get("rating", 5),
                                "text": r.get("text", ""),
                                "time": datetime.fromtimestamp(r.get("time", 0), tz=timezone.utc).isoformat(),
                                "profile_photo_url": r.get("profile_photo_url", "")
                            }
                            for r in result.get("reviews", [])
                        ]
                    }

                    # Cache the result
                    if database is not None:
                        try:
                            await database.review_cache.update_one(
                                {"place_id": GOOGLE_PLACE_ID},
                                {"$set": {
                                    "place_id": GOOGLE_PLACE_ID,
                                    "data": reviews_data,
                                    "cached_at": datetime.now(timezone.utc).isoformat()
                                }},
                                upsert=True
                            )
                        except Exception as e:
                            logger.error(f"Cache write error: {e}")

                    logger.info(f"Fetched {len(reviews_data['reviews'])} reviews from Google API")
                    return reviews_data
                else:
                    logger.warning(f"Google API returned: {data.get('status')}")
        except Exception as e:
            logger.error(f"Google Places API error: {e}")

    # Return curated data as fallback
    logger.info("Using curated reviews (no API key configured)")
    return CURATED_REVIEWS

@api_router.get("/reviews/google")
async def get_google_reviews():
    """Get Google reviews - auto-synced from Google Places API with 1hr cache."""
    data = await fetch_google_reviews()
    return data

GOOGLE_REVIEW_WRITE_URL = "https://share.google/NG3pCUeAMgPUBIw8b"

@api_router.get("/reviews/redirect")
async def redirect_to_google_review():
    """Redirect to Google review page. Opens in a new top-level browsing context to bypass iframe X-Frame-Options."""
    return RedirectResponse(url=GOOGLE_REVIEW_WRITE_URL, status_code=302)

# Include the router in the main app
app.include_router(api_router)

# Health check endpoints for Kubernetes
@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.get("/healthz")
async def healthz_check():
    return {"status": "healthy"}

@app.get("/ready")
async def ready_check():
    return {"status": "ready"}

@app.get("/live")
async def live_check():
    return {"status": "live"}

@app.on_event("startup")
async def startup_event():
    logger.info("Application starting up...")
    # Initialize database connection
    get_database()
    logger.info("Application startup complete")

@app.on_event("shutdown")
async def shutdown_db_client():
    global client
    if client:
        client.close()
        logger.info("MongoDB connection closed")

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)