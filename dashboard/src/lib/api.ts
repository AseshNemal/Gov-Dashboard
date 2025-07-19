import axios from 'axios';
import type { ExpenseData } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Response Error:', error);
    return Promise.reject(error);
  }
);

export const dashboardApi = {
  // Health check
  getHealth: async (): Promise<{ status: string }> => {
    const response = await api.get('/health');
    return response.data;
  },

  // Get latest expense data
  getLatestData: async (): Promise<ExpenseData> => {
    const response = await api.get<ExpenseData>('/api/latest');
    return response.data;
  },

  // Get expense summary
  getSummary: async () => {
    const response = await api.get('/api/summary');
    return response.data;
  },

  // Get districts data
  getDistricts: async () => {
    const response = await api.get('/api/districts');
    return response.data;
  },

  // Get sectors data
  getSectors: async () => {
    const response = await api.get('/api/sectors');
    return response.data;
  },

  // Get historical data
  getHistorical: async (days = 30): Promise<ExpenseData[]> => {
    const response = await api.get(`/api/historical/${days}`);
    return response.data;
  },

  // Get data by date range
  getDataByDateRange: async (startDate: string, endDate: string): Promise<ExpenseData[]> => {
    const response = await api.get(`/api/data/range?start_date=${startDate}&end_date=${endDate}`);
    return response.data;
  },

  // Generate new data
  generateData: async (): Promise<{ message: string }> => {
    const response = await api.post('/api/generate');
    return response.data;
  },
};

export default api;
