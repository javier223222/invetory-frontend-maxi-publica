'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { autosApi } from '@/lib/api/autos';
import { Auto } from '@/types/auto';
import Image from 'next/image';

export default function ViewAutoPage() {
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

  const handleEdit = () => {
    router.push(`/autos/${autoId}/editar`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] p-6">
        <div className="max-w-5xl mx-auto">
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
        <div className="max-w-5xl mx-auto">
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
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#212529]">
              {auto.marca} {auto.modelo} {auto.año}
            </h1>
            <p className="mt-1 text-sm text-[#6C757D]">
              Detalles del vehículo
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#495057] bg-white border border-[#CED4DA] rounded-lg hover:bg-[#F8F9FA] transition duration-150"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver
            </button>
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#faaf26] rounded-lg hover:bg-[#BC831D] transition duration-150"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Editar
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Imagen */}
            <div className="space-y-4">
              <div className="relative w-full aspect-[4/3] bg-[#F8F9FA] rounded-lg overflow-hidden">
                {auto.fotografia ? (
                  <Image
                    src={auto.fotografia}
                    alt={`${auto.marca} ${auto.modelo}`}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <svg className="w-24 h-24 text-[#ADB5BD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            {/* Detalles */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-[#212529] mb-4">Información del vehículo</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <span className="text-sm font-medium text-[#6C757D] w-32">Marca:</span>
                    <span className="text-sm text-[#212529] font-semibold">{auto.marca}</span>
                  </div>
                  
                  <div className="flex items-start">
                    <span className="text-sm font-medium text-[#6C757D] w-32">Modelo:</span>
                    <span className="text-sm text-[#212529] font-semibold">{auto.modelo}</span>
                  </div>
                  
                  <div className="flex items-start">
                    <span className="text-sm font-medium text-[#6C757D] w-32">Año:</span>
                    <span className="text-sm text-[#212529]">{auto.año}</span>
                  </div>
                  
                  <div className="flex items-start">
                    <span className="text-sm font-medium text-[#6C757D] w-32">Precio:</span>
                    <span className="text-lg font-bold text-[#faaf26]">
                      ${auto.precio.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  
                  <div className="flex items-start">
                    <span className="text-sm font-medium text-[#6C757D] w-32">Kilometraje:</span>
                    <span className="text-sm text-[#212529]">
                      {auto.kilometraje.toLocaleString('es-MX')} km
                    </span>
                  </div>
                  
                  {auto.color && (
                    <div className="flex items-start">
                      <span className="text-sm font-medium text-[#6C757D] w-32">Color:</span>
                      <span className="text-sm text-[#212529]">{auto.color}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t border-[#DEE2E6] pt-6">
                <h3 className="text-lg font-semibold text-[#212529] mb-4">Información de contacto</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-[#6C757D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a href={`mailto:${auto.email}`} className="text-sm text-[#faaf26] hover:text-[#BC831D] transition">
                      {auto.email}
                    </a>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-[#6C757D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <a href={`tel:${auto.telefono}`} className="text-sm text-[#faaf26] hover:text-[#BC831D] transition">
                      {auto.telefono}
                    </a>
                  </div>
                </div>
              </div>

              <div className="border-t border-[#DEE2E6] pt-6">
                <h3 className="text-lg font-semibold text-[#212529] mb-4">Información adicional</h3>
                
                <div className="space-y-2 text-xs text-[#6C757D]">
                  <p>Fecha de alta: {new Date(auto.fechaDeAlta).toLocaleDateString('es-MX')}</p>
                  <p>Última modificación: {new Date(auto.fechaDeModificacion).toLocaleDateString('es-MX')}</p>
                  {auto.fechaDeEliminacion && (
                    <p className="text-red-600">Fecha de eliminación: {new Date(auto.fechaDeEliminacion).toLocaleDateString('es-MX')}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
