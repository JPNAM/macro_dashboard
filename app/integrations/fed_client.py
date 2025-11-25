import httpx
from typing import Any, Dict
from app.config import settings
from app.integrations.base import ExternalDataClient

class FedClient(ExternalDataClient):
    """
    Client for Federal Reserve Economic Data (FRED) API.
    """
    BASE_URL = "https://api.stlouisfed.org/fred/series/observations"

    def __init__(self):
        self.api_key = settings.FRED_API_KEY

    async def fetch(self, series_id: str, observation_start: str = None) -> Dict[str, Any]:
        """
        Fetch observations for a FRED series.
        """
        params = {
            "series_id": series_id,
            "api_key": self.api_key,
            "file_type": "json"
        }
        if observation_start:
            params["observation_start"] = observation_start

        async with httpx.AsyncClient() as client:
            response = await client.get(self.BASE_URL, params=params)
            response.raise_for_status()
            return response.json()
