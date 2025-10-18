import { apiClient } from './client';
import { Auto, AutoFilters, CreateAutoRequest, UpdateAutoRequest } from '@/types/auto';
import { PaginatedResponse } from '@/types/api';

export const autosApi = {
  getAll: async (filters?: AutoFilters) => {
    const params = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, String(value));
        }
      });
    }

    const query = params.toString();
    const endpoint = query ? `/autos?${query}` : '/autos';
    
    return apiClient.get<PaginatedResponse<Auto>>(endpoint);
  },

  getById: async (id: string) => {
    return apiClient.get<Auto>(`/autos/${id}`);
  },

  create: async (data: CreateAutoRequest) => {
    const formData = new FormData();
    
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (key === 'fotografia' && value instanceof File) {
          formData.append('fotografia', value);
        } else {
          formData.append(key, String(value));
        }
      }
    });

    return apiClient.postFormData<Auto>('/autos', formData);
  },

  update: async (id: string, data: UpdateAutoRequest) => {
    return apiClient.put<Auto>(`/autos/${id}`, data);
  },

  delete: async (id: string) => {
    return apiClient.delete<null>(`/autos/${id}`);
  },

  updatePhoto: async (id: string, photo: File) => {
    const formData = new FormData();
    formData.append('fotografia', photo);
    
    return apiClient.postFormData<Auto>(`/autos/${id}/fotografia`, formData);
  }
};