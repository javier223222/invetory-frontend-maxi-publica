'use client';

import { useState, useEffect, useCallback } from 'react';
import { autosApi } from '@/lib/api/autos';
import { Auto, AutoFilters } from '@/types/auto';

interface UseAutosResult {
  autos: Auto[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  totalItems: number;
  currentPage: number;
  loadMore: () => void;
  refresh: () => void;
  applyFilters: (filters: AutoFilters) => void;
}

export function useAutos(initialLimit: number = 10): UseAutosResult {
  const [autos, setAutos] = useState<Auto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [filters, setFilters] = useState<AutoFilters>({ limit: initialLimit });

  const fetchAutos = useCallback(async (page: number, currentFilters: AutoFilters, append: boolean = false) => {
    try {
      setLoading(true);
      setError(null);

      const response = await autosApi.getAll({
        ...currentFilters,
        page,
        limit: initialLimit,
      });

      const newAutos = response.data.items;
      
      setAutos(prev => append ? [...prev, ...newAutos] : newAutos);
      setHasMore(response.data.hasNext);
      setTotalItems(response.data.total);
      setCurrentPage(page);
    } catch (err: any) {
      setError(err.customMessage || err.message || 'Error al cargar los autos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [initialLimit]);

  useEffect(() => {
    fetchAutos(1, filters, false);
  }, [filters, fetchAutos]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      fetchAutos(currentPage + 1, filters, true);
    }
  }, [loading, hasMore, currentPage, filters, fetchAutos]);

  const refresh = useCallback(() => {
    setCurrentPage(1);
    setAutos([]);
    fetchAutos(1, filters, false);
  }, [filters, fetchAutos]);

  const applyFilters = useCallback((newFilters: AutoFilters) => {
    setCurrentPage(1);
    setAutos([]);
    setFilters({ ...newFilters, limit: initialLimit });
  }, [initialLimit]);

  return {
    autos,
    loading,
    error,
    hasMore,
    totalItems,
    currentPage,
    loadMore,
    refresh,
    applyFilters,
  };
}
