'use client';

import { useAuth } from '@/contexts/auth-context';
import { Logo } from '@/componets/ui/logo';
import { AutoForm } from '@/components/autos/AutoForm';

export default function NuevoAutoPage() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <header className="bg-white shadow-sm border-b border-[#DEE2E6]">
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

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#212529]">
            Registrar Nuevo Auto
          </h1>
          <p className="mt-2 text-[#6C757D]">
            Complete todos los campos para agregar un auto al inventario
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
          <AutoForm />
        </div>
      </main>
    </div>
  );
}
