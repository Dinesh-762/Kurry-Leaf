"""
Backend Tests for Kurry Leaf Google Reviews API
Tests the /api/reviews/google endpoint that fetches reviews from Google Places API 
with 1hr caching, falling back to curated review data.
"""

import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestHealthEndpoints:
    """Basic health check endpoints for the API"""
    
    def test_api_health(self):
        """Test /api/health endpoint returns healthy status"""
        response = requests.get(f"{BASE_URL}/api/health")
        assert response.status_code == 200
        data = response.json()
        assert "status" in data
        assert data["status"] == "healthy"
        print(f"PASS: /api/health returns {data}")

    def test_root_health(self):
        """Test /health endpoint returns healthy status"""
        response = requests.get(f"{BASE_URL}/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
        print(f"PASS: /health returns {data}")


class TestGoogleReviewsAPI:
    """Tests for GET /api/reviews/google endpoint"""
    
    def test_reviews_endpoint_returns_200(self):
        """Test that /api/reviews/google returns 200 OK"""
        response = requests.get(f"{BASE_URL}/api/reviews/google")
        assert response.status_code == 200
        print(f"PASS: /api/reviews/google returns status code 200")
    
    def test_reviews_returns_rating(self):
        """Test that response contains rating field with value 4.0"""
        response = requests.get(f"{BASE_URL}/api/reviews/google")
        data = response.json()
        
        assert "rating" in data, "Response should contain 'rating' field"
        assert data["rating"] == 4.0, f"Expected rating 4.0, got {data['rating']}"
        print(f"PASS: rating field present with value {data['rating']}")
    
    def test_reviews_returns_total_reviews(self):
        """Test that response contains total_reviews field with value 108"""
        response = requests.get(f"{BASE_URL}/api/reviews/google")
        data = response.json()
        
        assert "total_reviews" in data, "Response should contain 'total_reviews' field"
        assert data["total_reviews"] == 108, f"Expected 108 reviews, got {data['total_reviews']}"
        print(f"PASS: total_reviews field present with value {data['total_reviews']}")
    
    def test_reviews_returns_reviews_array(self):
        """Test that response contains reviews array with 8 reviews"""
        response = requests.get(f"{BASE_URL}/api/reviews/google")
        data = response.json()
        
        assert "reviews" in data, "Response should contain 'reviews' array"
        assert isinstance(data["reviews"], list), "reviews should be an array"
        assert len(data["reviews"]) == 8, f"Expected 8 reviews, got {len(data['reviews'])}"
        print(f"PASS: reviews array contains {len(data['reviews'])} reviews")
    
    def test_review_has_required_fields(self):
        """Test that each review has author_name, rating, text, time, profile_photo_url fields"""
        response = requests.get(f"{BASE_URL}/api/reviews/google")
        data = response.json()
        
        required_fields = ["author_name", "rating", "text", "time", "profile_photo_url"]
        
        for i, review in enumerate(data["reviews"]):
            for field in required_fields:
                assert field in review, f"Review {i} missing field '{field}'"
            print(f"Review {i} ({review['author_name']}): All required fields present")
        
        print(f"PASS: All {len(data['reviews'])} reviews have required fields")
    
    def test_review_rating_values_valid(self):
        """Test that review ratings are between 1 and 5"""
        response = requests.get(f"{BASE_URL}/api/reviews/google")
        data = response.json()
        
        for i, review in enumerate(data["reviews"]):
            rating = review["rating"]
            assert isinstance(rating, int), f"Review {i} rating should be integer, got {type(rating)}"
            assert 1 <= rating <= 5, f"Review {i} rating {rating} not in range 1-5"
        
        print(f"PASS: All review ratings are valid integers 1-5")
    
    def test_review_author_names_present(self):
        """Test that all reviews have non-empty author names"""
        response = requests.get(f"{BASE_URL}/api/reviews/google")
        data = response.json()
        
        expected_authors = [
            "Snehal Patil", "Rahul Deshmukh", "Priya Kulkarni", "Amit Jadhav",
            "Sanjay Bhosale", "Neha Shinde", "Vikram Pawar", "Aarti Gaikwad"
        ]
        
        actual_authors = [r["author_name"] for r in data["reviews"]]
        
        for author in expected_authors:
            assert author in actual_authors, f"Expected author '{author}' not found"
        
        print(f"PASS: All expected authors present in reviews")
    
    def test_review_text_not_empty(self):
        """Test that all reviews have non-empty text content"""
        response = requests.get(f"{BASE_URL}/api/reviews/google")
        data = response.json()
        
        for i, review in enumerate(data["reviews"]):
            text = review["text"]
            assert isinstance(text, str), f"Review {i} text should be string"
            assert len(text) > 10, f"Review {i} text too short: '{text[:20]}...'"
        
        print(f"PASS: All reviews have substantial text content")
    
    def test_review_times_valid_format(self):
        """Test that review times are valid ISO format timestamps"""
        response = requests.get(f"{BASE_URL}/api/reviews/google")
        data = response.json()
        
        for i, review in enumerate(data["reviews"]):
            time_str = review["time"]
            assert isinstance(time_str, str), f"Review {i} time should be string"
            assert "T" in time_str, f"Review {i} time '{time_str}' not in ISO format"
            assert "2026" in time_str or "2025" in time_str, f"Review {i} time '{time_str}' has unexpected year"
        
        print(f"PASS: All review times are valid ISO format timestamps")


class TestAPIRootEndpoint:
    """Test the root API endpoint"""
    
    def test_api_root(self):
        """Test /api/ returns Hello World"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        assert data["message"] == "Hello World"
        print(f"PASS: /api/ returns {data}")


class TestReviewsRedirectEndpoint:
    """Tests for GET /api/reviews/redirect endpoint - redirects to Google review page"""
    
    def test_redirect_returns_302(self):
        """Test that /api/reviews/redirect returns 302 redirect"""
        response = requests.get(f"{BASE_URL}/api/reviews/redirect", allow_redirects=False)
        assert response.status_code == 302, f"Expected 302, got {response.status_code}"
        print(f"PASS: /api/reviews/redirect returns status code 302")
    
    def test_redirect_location_header(self):
        """Test that redirect Location header points to Google review URL"""
        response = requests.get(f"{BASE_URL}/api/reviews/redirect", allow_redirects=False)
        assert response.status_code == 302
        
        location = response.headers.get("Location", "")
        assert "search.google.com/local/writereview" in location, f"Expected Google review URL, got: {location}"
        assert "placeid=" in location, f"Expected placeid in URL, got: {location}"
        print(f"PASS: Redirect Location header points to Google review page: {location}")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
