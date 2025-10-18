'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { AutoForm } from '@/components/autos/AutoForm';
import { autosApi } from '@/lib/api/autos';
import { Auto } from '@/types/auto';

export default function EditAutoPage() {
  const router = useRouter();
  const params = useParams();
  const autoId = params.id as string;
  
  const [auto, setAuto] = useState<Auto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAuto = async () => {
      try {
        setLoading(true);
        const response = await autosApi.getById(autoId);
        setAuto(response.data);
        setError(null);
      } catch (err: any) {
        setError(err.customMessage || err.message || 'Error al cargar el auto');
      } finally {
        setLoading(false);
      }
    };

    if (autoId) {
      fetchAuto();
    }
  }, [autoId]);

  const handleBack = () => {
    router.push('/autos');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-8">
            <div className="flex items-center justify-center">
              <svg className="animate-spin h-8 w-8 text-[#faaf26]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="ml-3 text-[#6C757D]">Cargando datos del auto...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !auto) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-8">
            <div className="text-center">
              <svg className="mx-auto h-12 w-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-[#212529]">Error al cargar</h3>
              <p className="mt-1 text-sm text-[#6C757D]">{error || 'Auto no encontrado'}</p>
              <button
                onClick={handleBack}
                className="mt-4 px-4 py-2 bg-[#faaf26] text-white rounded-lg hover:bg-[#BC831D] transition duration-150"
              >
                Volver al listado
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#212529]">Editar Auto</h1>
            <p className="mt-1 text-sm text-[#6C757D]">
              Modifica la información del vehículo
            </p>
          </div>
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#495057] bg-white border border-[#CED4DA] rounded-lg hover:bg-[#F8F9FA] transition duration-150"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver
          </button>
        </div>

        <AutoForm initialData={auto} mode="edit" />
      </div>
    </div>
  );
}
