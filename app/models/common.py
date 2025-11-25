from enum import Enum

class Region(str, Enum):
    US = "US"
    EUROZONE = "Eurozone"
    G10 = "G10"
    GLOBAL = "Global"

class AssetClass(str, Enum):
    PRICES = "Prices"  # CPI, PCE
    POLICY = "Policy"  # Rates
    LOGISTICS = "Logistics"  # Freight, Supply Chain

class SourceAgency(str, Enum):
    BLS = "Bureau of Labor Statistics"
    BEA = "Bureau of Economic Analysis"
    FED = "Federal Reserve"
    FREIGHTOS = "Freightos"
    NY_FED = "Federal Reserve Bank of New York"
