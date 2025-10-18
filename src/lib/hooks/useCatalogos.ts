'use client';

import { useState, useEffect } from 'react';
import { catalogosApi } from '@/lib/api/catalogos';
import { Marca, Modelo } from '@/types/auto';

export function useMarcas() {
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMarcas = async () => {
      try {
        setLoading(true);
        const response = await catalogosApi.getMarcas();
        setMarcas(response.data);
      } catch (err) {
        setError('Error al cargar las marcas');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMarcas();
  }, []);

  return { marcas, loading, error };
}

export function useModelos(marcaId: string | null) {
  const [modelos, setModelos] = useState<Modelo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!marcaId) {
      setModelos([]);
      return;
    }

    const fetchModelos = async () => {
      try {
        setLoading(true);
        const response = await catalogosApi.getModelosByMarca(marcaId);
        setModelos(response.data);
      } catch (err) {
        setError('Error al cargar los modelos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchModelos();
  }, [marcaId]);

  return { modelos, loading, error };
}

export function useYears() {
  const [years, setYears] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchYears = async () => {
      try {
        setLoading(true);
        const response = await catalogosApi.getYears();
        setYears(response.data.years);
      } catch (err) {
        setError('Error al cargar los años');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchYears();
  }, []);

  return { years, loading, error };
}
