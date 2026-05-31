from fastapi.testclient import TestClient
from OntrackAPI import OnTrackAI

client = TestClient (OnTrackAI)

def test_root():
    response = client.get("/")
    assert response.status_code == 200

def test_health():
    response = client.get("/health")
    assert response.status_code == 200