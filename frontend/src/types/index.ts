export const Region = {
    US: "US",
    EUROZONE: "Eurozone",
    G10: "G10",
    GLOBAL: "Global"
} as const;
export type Region = typeof Region[keyof typeof Region];

export const AssetClass = {
    PRICES: "Prices",
    POLICY: "Policy",
    LOGISTICS: "Logistics"
} as const;
export type AssetClass = typeof AssetClass[keyof typeof AssetClass];

export const SourceAgency = {
    BLS: "Bureau of Labor Statistics",
    BEA: "Bureau of Economic Analysis",
    FED: "Federal Reserve",
    FREIGHTOS: "Freightos",
    NY_FED: "Federal Reserve Bank of New York"
} as const;
export type SourceAgency = typeof SourceAgency[keyof typeof SourceAgency];

export interface Release {
    id: string;
    date: string;
    time: string;
    period_covered: string;
    actual_value?: number;
    consensus_forecast?: number;
    previous_value?: number;
}

export interface Series {
    id: string;
    name: string;
    ticker: string;
    source_agency: SourceAgency;
    description: string;
    frequency: string;
    units: string;
    history_dates: string[];
    history_values: number[];
}

export interface Indicator {
    id: string;
    name: string;
    region: Region;
    asset_class: AssetClass;
    description: string;
    series_ids: string[];
    volatility_3y?: number;
}

export const ContractType = {
    BINARY: "Binary",
    RANGE: "Range"
} as const;
export type ContractType = typeof ContractType[keyof typeof ContractType];

export interface Contract {
    id: string;
    ticker: string;
    series_id: string;
    release_id: string;
    type: ContractType;
    strike_condition: string;
    strike_value: number;
    strike_value_upper?: number;
    expiration: string;
    last_price?: number;
    bid?: number;
    ask?: number;
    volume: number;
    open_interest: number;
    implied_probability: number;
}

export interface AnalyticsFan {
    series_id: string;
    fan_bands: {
        [key: string]: { upper: number; lower: number };
    };
    implied_mean: number;
    generated_at: string;
}
