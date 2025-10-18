'use client';

import { AutoCard } from './AutoCard';
import { useAutos } from '@/lib/hooks/useAutos';
import { useInfiniteScroll } from '@/lib/hooks/useInfiniteScroll';
import { AutoFilters as AutoFiltersType } from '@/types/auto';
import { AutoFiltersComponent } from './AutoFilters';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { autosApi } from '@/lib/api/autos';
import { Toast } from '@/components/ui/Toast';

export function AutoList() {
  const router = useRouter();
  const { autos, loading, error, hasMore, totalItems, loadMore, applyFilters, refresh } = useAutos(10);
  const { observerTarget } = useInfiniteScroll({
    loading,
    hasMore,
    onLoadMore: loadMore,
  });

  const [deleteModal, setDeleteModal] = useState<{ 
    show: boolean; 
    autoId: string | null;
    loading: boolean;
    error: string | null;
  }>({
    show: false,
    autoId: null,
    loading: false,
    error: null,
  });

  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error' | 'info';
  }>({
    show: false,
    message: '',
    type: 'success',
  });

  const handleEdit = (id: string) => {
    router.push(`/autos/${id}/editar`);
  };

  const handleView = (id: string) => {
    router.push(`/autos/${id}`);
  };

  const handleDelete = (id: string) => {
    setDeleteModal({ show: true, autoId: id, loading: false, error: null });
  };

  const confirmDelete = async () => {
    if (!deleteModal.autoId) return;

    try {
      setDeleteModal(prev => ({ ...prev, loading: true, error: null }));
      
      await autosApi.delete(deleteModal.autoId);
      
      setDeleteModal({ show: false, autoId: null, loading: false, error: null });
      
      setToast({
        show: true,
        message: 'Auto eliminado exitosamente',
        type: 'success',
      });
      
      refresh();
      
    } catch (err: any) {
      setDeleteModal(prev => ({ 
        ...prev, 
        loading: false, 
        error: err.customMessage || err.message || 'Error al eliminar el auto'
      }));
    }
  };

  const handleFiltersChange = (filters: AutoFiltersType) => {
    applyFilters(filters);
  };

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-md p-8">
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-[#212529]">Error al cargar</h3>
          <p className="mt-1 text-sm text-[#6C757D]">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ show: false, message: '', type: 'success' })}
        />
      )}

      <AutoFiltersComponent onApplyFilters={handleFiltersChange} totalItems={totalItems} />

      {autos.length === 0 && !loading ? (
        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-[#ADB5BD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-[#212529]">No se encontraron autos</h3>
            <p className="mt-1 text-sm text-[#6C757D]">
              Intenta ajustar los filtros o agrega un nuevo auto
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {autos.map((auto) => (
              <AutoCard
                key={auto.id}
                auto={auto}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onView={handleView}
              />
            ))}
          </div>

          <div ref={observerTarget} className="mt-8">
            {loading && (
              <div className="flex justify-center">
                <div className="flex items-center gap-2 text-[#6C757D]">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Cargando más autos...
                </div>
              </div>
            )}
            {!hasMore && autos.length > 0 && (
              <div className="text-center text-sm text-[#6C757D]">
                No hay más autos para mostrar
              </div>
            )}
          </div>
        </>
      )}

      {deleteModal.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-[#212529]">Confirmar eliminación</h3>
            </div>

            <p className="text-sm text-[#6C757D] mb-6">
              ¿Estás seguro de que deseas eliminar este auto? Esta acción registrará la fecha de eliminación y no se podrá deshacer.
            </p>

            {deleteModal.error && (
              <div className="mb-4 rounded-lg bg-red-50 p-3 border border-red-200">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-red-800">{deleteModal.error}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setDeleteModal({ show: false, autoId: null, loading: false, error: null })}
                disabled={deleteModal.loading}
                className="flex-1 px-4 py-2 border border-[#CED4DA] text-sm font-medium rounded-lg text-[#495057] bg-white hover:bg-[#F8F9FA] transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleteModal.loading}
                className="flex-1 px-4 py-2 text-sm font-medium rounded-lg text-white bg-[#dc3545] hover:bg-[#c82333] transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {deleteModal.loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Eliminando...
                  </>
                ) : (
                  'Eliminar'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
