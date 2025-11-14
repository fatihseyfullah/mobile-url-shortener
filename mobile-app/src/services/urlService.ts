import api from './api';
import { Url, CreateUrlRequest } from '../types';

export const urlService = {
  async getUserUrls(): Promise<Url[]> {
    const response = await api.get('/url/me');
    return response.data.urls || [];
  },

  async createUrl(data: CreateUrlRequest): Promise<Url> {
    const response = await api.post('/url/shorten', { originalUrl: data.original_url });
    return response.data.url;
  },

  async deleteUrl(id: string): Promise<void> {
    await api.delete(`/url/${id}`);
  },

  async getUrlStats(id: string) {
    const response = await api.get(`/url/${id}/stats`);
    return response.data;
  },
};
