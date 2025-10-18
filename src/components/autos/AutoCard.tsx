import { Auto } from '@/types/auto';
import Image from 'next/image';

interface AutoCardProps {
  auto: Auto;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onView?: (id: string) => void;
}

export function AutoCard({ auto, onEdit, onDelete, onView }: AutoCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(price);
  };

  const formatKm = (km: number) => {
    return new Intl.NumberFormat('es-MX').format(km);
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-[#DEE2E6]">
      <div className="relative h-48 bg-[#E9ECEF]">
        {auto.fotografia ? (
          <Image
            src={auto.fotografia}
            alt={`${auto.marca} ${auto.modelo}`}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <svg className="w-16 h-16 text-[#ADB5BD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="mb-3">
          <h3 className="text-xl font-bold text-[#212529] mb-1">
            {auto.marca} {auto.modelo}
          </h3>
          <p className="text-sm text-[#6C757D]">
            Año {auto.año}
          </p>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-[#BC831D]">
              {formatPrice(auto.precio)}
            </span>
            {auto.color && (
              <span className="px-2 py-1 text-xs font-medium bg-[#F8F9FA] text-[#495057] rounded">
                {auto.color}
              </span>
            )}
          </div>

          <div className="flex items-center text-sm text-[#6C757D]">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            {formatKm(auto.kilometraje)} km
          </div>

          <div className="flex items-center text-sm text-[#6C757D]">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {auto.email}
          </div>

          <div className="flex items-center text-sm text-[#6C757D]">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {auto.telefono}
          </div>
        </div>

        <div className="flex gap-2 pt-3 border-t border-[#DEE2E6]">
          {onView && (
            <button
              onClick={() => onView(auto.id)}
              className="flex-1 px-3 py-2 text-sm font-medium text-[#495057] bg-[#F8F9FA] hover:bg-[#E9ECEF] rounded-lg transition duration-150"
            >
              Ver
            </button>
          )}
          {onEdit && (
            <button
              onClick={() => onEdit(auto.id)}
              className="flex-1 px-3 py-2 text-sm font-medium text-[#212529] bg-[#faaf26] hover:bg-[#BC831D] rounded-lg transition duration-150"
            >
              Editar
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(auto.id)}
              className="px-3 py-2 text-sm font-medium text-white bg-[#dc3545] hover:bg-[#c82333] rounded-lg transition duration-150"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
