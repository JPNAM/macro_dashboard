import axios from 'axios';
import type { Indicator, Series, Contract, AnalyticsFan } from '../types';

// In development, Vite proxies /api to localhost:8000
const API_BASE_URL = '/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const macroApi = {
    getIndicators: async (): Promise<Indicator[]> => {
        const response = await api.get<Indicator[]>('/macro/indicators');
        return response.data;
    },
    getSeries: async (seriesId: string): Promise<Series> => {
        const response = await api.get<Series>(`/macro/series/${seriesId}`);
        return response.data;
    },
};

export const marketApi = {
    getContracts: async (): Promise<Contract[]> => {
        const response = await api.get<Contract[]>('/market/contracts');
        return response.data;
    },
    getContract: async (contractId: string): Promise<Contract> => {
        const response = await api.get<Contract>(`/market/contracts/${contractId}`);
        return response.data;
    },
};

export const analyticsApi = {
    getProbabilityFan: async (seriesId: string): Promise<AnalyticsFan> => {
        const response = await api.get<AnalyticsFan>(`/analytics/probability-fan/${seriesId}`);
        return response.data;
    },
};
