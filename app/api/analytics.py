from fastapi import APIRouter
from typing import Dict, List
from app.services.market_service import market_service

router = APIRouter(tags=["Analytics"])

@router.get("/analytics/probability-fan/{series_id}")
def get_probability_fan(series_id: str):
    """
    Get the 'Kalshi Fan' probability distribution for a series.
    This is a derived view based on active contracts.
    """
    # In a real implementation, this would aggregate probabilities from multiple contracts
    # to build a distribution over time.
    # For this demo, we return a mock structure.
    return {
        "series_id": series_id,
        "fan_bands": {
            "50%": {"upper": 3.5, "lower": 2.8},
            "90%": {"upper": 4.2, "lower": 2.1}
        },
        "implied_mean": 3.1,
        "generated_at": "2023-11-24T12:00:00Z"
    }

@router.get("/analytics/tail-risk/{series_id}")
def get_tail_risk(series_id: str):
    """
    Get tail risk metrics for a series.
    """
    return {
        "series_id": series_id,
        "metrics": [
            {"label": "Prob(CPI >= 4%)", "value": 0.15},
            {"label": "Prob(CPI < 2%)", "value": 0.05}
        ]
    }
