'use client';

import { useState } from 'react';
import { AutoFilters } from '@/types/auto';
import { useMarcas, useModelos } from '@/lib/hooks/useCatalogos';
import { SelectField } from '@/components/ui/SelectField';
import { InputField } from '@/components/ui/InputField';

interface AutoFiltersComponentProps {
  onApplyFilters: (filters: AutoFilters) => void;
  totalItems: number;
}

export function AutoFiltersComponent({ onApplyFilters, totalItems }: AutoFiltersComponentProps) {
  const { marcas, loading: loadingMarcas } = useMarcas();
  
  const [showFilters, setShowFilters] = useState(false);
  const [selectedMarcaId, setSelectedMarcaId] = useState<string | null>(null);
  const { modelos, loading: loadingModelos } = useModelos(selectedMarcaId);
  
  const [filters, setFilters] = useState<AutoFilters>({
    marca: '',
    modelo: '',
    anio: undefined,
    color: '',
    precioMin: undefined,
    precioMax: undefined,
  });

  const handleMarcaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const marcaNombre = e.target.value;
    const marca = marcas.find(m => m.nombre === marcaNombre);
    
    setFilters(prev => ({
      ...prev,
      marca: marcaNombre,
      modelo: '',
    }));
    
    setSelectedMarcaId(marca?.id || null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value || undefined,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const processedFilters: AutoFilters = {
      marca: filters.marca || undefined,
      modelo: filters.modelo || undefined,
      anio: filters.anio ? parseInt(filters.anio.toString()) : undefined,
      color: filters.color || undefined,
      precioMin: filters.precioMin ? parseFloat(filters.precioMin.toString()) : undefined,
      precioMax: filters.precioMax ? parseFloat(filters.precioMax.toString()) : undefined,
    };
    
    onApplyFilters(processedFilters);
  };

  const handleClear = () => {
    setFilters({
      marca: '',
      modelo: '',
      anio: undefined,
      color: '',
      precioMin: undefined,
      precioMax: undefined,
    });
    setSelectedMarcaId(null);
    onApplyFilters({});
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  return (
    <div className="bg-white rounded-xl shadow-md mb-6">
      {/* Header con botón de toggle */}
      <div className="p-4 border-b border-[#DEE2E6]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-[#212529]">Filtros de búsqueda</h2>
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-[#faaf26] text-[#212529]">
              {totalItems} {totalItems === 1 ? 'auto' : 'autos'}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#495057] bg-[#F8F9FA] rounded-lg hover:bg-[#E9ECEF] transition duration-150"
          >
            <svg
              className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            {showFilters ? 'Ocultar filtros' : 'Mostrar filtros'}
          </button>
        </div>
      </div>

      {/* Formulario de filtros */}
      {showFilters && (
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <SelectField
              label="Marca"
              id="marca"
              name="marca"
              value={filters.marca || ''}
              onChange={handleMarcaChange}
              options={marcas.map(m => ({ value: m.nombre, label: m.nombre }))}
              disabled={loadingMarcas}
              placeholder={loadingMarcas ? 'Cargando marcas...' : 'Todas las marcas'}
            />

            <SelectField
              label="Modelo"
              id="modelo"
              name="modelo"
              value={filters.modelo || ''}
              onChange={handleChange}
              options={modelos.map(m => ({ value: m.nombre, label: m.nombre }))}
              disabled={!selectedMarcaId || loadingModelos}
              placeholder={
                !selectedMarcaId 
                  ? 'Primero seleccione una marca' 
                  : loadingModelos 
                  ? 'Cargando modelos...' 
                  : 'Todos los modelos'
              }
            />

            <SelectField
              label="Año"
              id="anio"
              name="anio"
              value={filters.anio?.toString() || ''}
              onChange={handleChange}
              options={years.map(y => ({ value: y.toString(), label: y.toString() }))}
              placeholder="Todos los años"
            />

            <InputField
              label="Precio mínimo"
              id="precioMin"
              name="precioMin"
              type="number"
              value={filters.precioMin?.toString() || ''}
              onChange={handleChange}
              placeholder="0"
              min={0}
              step="0.01"
            />

            <InputField
              label="Precio máximo"
              id="precioMax"
              name="precioMax"
              type="number"
              value={filters.precioMax?.toString() || ''}
              onChange={handleChange}
              placeholder="999999"
              min={0}
              step="0.01"
            />

            <InputField
              label="Color"
              id="color"
              name="color"
              type="text"
              value={filters.color || ''}
              onChange={handleChange}
              placeholder="Cualquier color"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 md:flex-initial px-6 py-2 bg-[#faaf26] text-[#212529] rounded-lg hover:bg-[#BC831D] transition duration-150 font-medium text-sm"
            >
              Aplicar filtros
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="px-6 py-2 border border-[#CED4DA] text-[#495057] rounded-lg hover:bg-[#F8F9FA] transition duration-150 font-medium text-sm"
            >
              Limpiar
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
