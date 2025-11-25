from fastapi.testclient import TestClient
from app.main import app
from app.models.common import Region, AssetClass

client = TestClient(app)

def test_health():
    response = client.get("/api/health")
    assert response.status_code == 200
    print("Health check passed")

def test_macro_indicators():
    response = client.get("/api/macro/indicators")
    assert response.status_code == 200
    data = response.json()
    assert len(data) > 0
    print(f"Found {len(data)} indicators")
    
    # Check for specific fields
    first = data[0]
    assert "id" in first
    assert "region" in first
    print("Indicators check passed")

def test_market_contracts():
    response = client.get("/api/market/contracts")
    assert response.status_code == 200
    data = response.json()
    assert len(data) > 0
    print(f"Found {len(data)} contracts")
    print("Contracts check passed")

def test_analytics():
    # Get a series ID first
    indicators = client.get("/api/macro/indicators").json()
    series_id = indicators[0]["series_ids"][0]
    
    response = client.get(f"/api/analytics/probability-fan/{series_id}")
    assert response.status_code == 200
    data = response.json()
    assert "fan_bands" in data
    print("Analytics Fan check passed")

def run_verification():
    print("Starting verification...")
    try:
        test_health()
        test_macro_indicators()
        test_market_contracts()
        test_analytics()
        print("\nALL CHECKS PASSED!")
    except Exception as e:
        print(f"\nVERIFICATION FAILED: {e}")
        exit(1)

if __name__ == "__main__":
    run_verification()
