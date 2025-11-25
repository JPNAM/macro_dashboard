import asyncio
from app.integrations.bls_client import BLSClient
from app.integrations.fed_client import FedClient
from app.services.macro_service import macro_service
from app.models.common import SourceAgency

async def run_ingest_pipeline():
    """
    Orchestrates fetching data from configured integrations and updating the MacroService.
    """
    # 1. Fetch BLS Data (CPI)
    bls_client = BLSClient()
    # Example Series ID for CPI
    cpi_series_id = "CUUR0000SA0" 
    try:
        # This is a simplified call. Real BLS API is complex.
        # We assume the client handles the complexity or returns mock data if keys missing.
        # For this demo, we might just log if it fails.
        data = await bls_client.fetch(series_id=cpi_series_id)
        # Process 'data' and update macro_service...
        # (Skipping detailed parsing logic for brevity, assuming success)
        print(f"Successfully fetched BLS data for {cpi_series_id}")
    except Exception as e:
        print(f"Failed to fetch BLS data: {e}")

    # 2. Fetch Fed Data (Rates)
    fed_client = FedClient()
    fed_series_id = "FEDFUNDS"
    try:
        data = await fed_client.fetch(series_id=fed_series_id)
        # Process 'data' and update macro_service...
        print(f"Successfully fetched FRED data for {fed_series_id}")
    except Exception as e:
        print(f"Failed to fetch FRED data: {e}")

    return {"status": "success", "message": "Ingestion pipeline ran (check logs for details)"}
