import httpx
from typing import Any, Dict, List
from app.config import settings
from app.integrations.base import ExternalDataClient

class BLSClient(ExternalDataClient):
    """
    Client for Bureau of Labor Statistics (BLS) Public Data API.
    """
    BASE_URL = "https://api.bls.gov/publicAPI/v2/timeseries/data/"

    def __init__(self):
        self.api_key = settings.BLS_API_KEY

    async def fetch(self, series_id: str, start_year: str = "2020", end_year: str = "2023") -> Dict[str, Any]:
        """
        Fetch data for a specific series.
        """
        url = self.BASE_URL
        headers = {"Content-Type": "application/json"}
        payload = {
            "seriesid": [series_id],
            "startyear": start_year,
            "endyear": end_year,
            "registrationkey": self.api_key
        }

        async with httpx.AsyncClient() as client:
            response = await client.post(url, json=payload, headers=headers)
            response.raise_for_status()
            return response.json()
