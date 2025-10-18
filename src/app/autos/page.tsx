'use client';

import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { Logo } from '@/componets/ui/logo';
import { AutoList } from '@/components/autos/AutoList';

export default function AutosPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <header className="bg-white shadow-sm border-b border-[#DEE2E6] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Logo width={180} height={60} />
            <div className="flex items-center gap-4">
              <span className="text-sm text-[#6C757D]">
                {user?.email}
              </span>
              <button
                onClick={logout}
                className="px-4 py-2 text-sm font-medium text-white bg-[#3d3d3d] hover:bg-[#212529] rounded-lg transition duration-150"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-[#212529]">
              Inventario de Autos
            </h1>
            <p className="mt-2 text-[#6C757D]">
              Administra y gestiona todos los autos del inventario
            </p>
          </div>
          <button
            onClick={() => router.push('/autos/nuevo')}
            className="px-6 py-3 border border-[#faaf26] text-base font-semibold rounded-lg text-[#212529] bg-[#faaf26] hover:bg-[#BC831D] hover:border-[#BC831D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#faaf26] transition duration-150 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nuevo Auto
          </button>
        </div>

        <AutoList />
      </main>
    </div>
  );
}
