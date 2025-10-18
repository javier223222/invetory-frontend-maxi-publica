import { apiClient } from './client';
import { Marca, Modelo, YearsResponse } from '@/types/auto';

export const catalogosApi = {
  getMarcas: async () => {
    return apiClient.get<Marca[]>('/marcas');
  },

  getModelos: async () => {
    return apiClient.get<Modelo[]>('/modelos');
  },

  getModelosByMarca: async (marcaId: string) => {
    return apiClient.get<Modelo[]>(`/modelos/marca/${marcaId}`);
  },

  getYears: async () => {
    return apiClient.get<YearsResponse>('/years');
  }
};