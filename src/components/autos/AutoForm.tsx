'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { autosApi } from '@/lib/api/autos';
import { useMarcas, useModelos, useYears } from '@/lib/hooks/useCatalogos';
import { SelectField } from '@/components/ui/SelectField';
import { InputField } from '@/components/ui/InputField';
import { FileUpload } from '@/components/ui/FileUpload';
import { Auto } from '@/types/auto';

interface AutoFormData {
  marca: string;
  modelo: string;
  anio: string;
  precio: string;
  kilometraje: string;
  color: string;
  email: string;
  telefono: string;
  fotografia: File | null;
}

interface AutoFormProps {
  initialData?: Auto;
  mode?: 'create' | 'edit';
}

export function AutoForm({ initialData, mode = 'create' }: AutoFormProps) {
  const router = useRouter();
  const { marcas, loading: loadingMarcas } = useMarcas();
  const { years, loading: loadingYears } = useYears();
  
  const [formData, setFormData] = useState<AutoFormData>({
    marca: '',
    modelo: '',
    anio: '',
    precio: '',
    kilometraje: '',
    color: '',
    email: '',
    telefono: '',
    fotografia: null,
  });

  const [selectedMarcaId, setSelectedMarcaId] = useState<string | null>(null);
  const { modelos, loading: loadingModelos } = useModelos(selectedMarcaId);
  const [existingPhotoUrl, setExistingPhotoUrl] = useState<string | null>(null);

  // Cargar datos iniciales en modo edición
  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setFormData({
        marca: initialData.marca || '',
        modelo: initialData.modelo || '',
        anio: initialData.año?.toString() || '',
        precio: initialData.precio?.toString() || '',
        kilometraje: initialData.kilometraje?.toString() || '',
        color: initialData.color || '',
        email: initialData.email || '',
        telefono: initialData.telefono || '',
        fotografia: null,
      });

      if (initialData.fotografia) {
        setExistingPhotoUrl(initialData.fotografia);
      }

      // Buscar el ID de la marca para cargar los modelos
      const marca = marcas.find(m => m.nombre === initialData.marca);
      if (marca) {
        setSelectedMarcaId(marca.id);
      }
    }
  }, [mode, initialData, marcas]);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleMarcaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const marcaNombre = e.target.value;
    const marca = marcas.find(m => m.nombre === marcaNombre);
    
    setFormData(prev => ({
      ...prev,
      marca: marcaNombre,
      modelo: '',
    }));
    
    setSelectedMarcaId(marca?.id || null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (file: File | null) => {
    setFormData(prev => ({
      ...prev,
      fotografia: file,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!formData.marca || !formData.modelo) {
      setError('Marca y modelo son requeridos');
      return;
    }

    if (parseInt(formData.precio) < 0) {
      setError('El precio debe ser mayor a 0');
      return;
    }

    if (parseInt(formData.kilometraje) < 100) {
      setError('El kilometraje debe ser mayor a 100');
      return;
    }

    try {
      setLoading(true);

      if (mode === 'edit' && initialData?.id) {
        // Actualizar auto existente
        await autosApi.update(initialData.id, {
          marca: formData.marca,
          modelo: formData.modelo,
          anio: parseInt(formData.anio),
          precio: parseFloat(formData.precio),
          kilometraje: parseInt(formData.kilometraje),
          color: formData.color,
          email: formData.email,
          telefono: formData.telefono,
        });

        // Si hay una nueva fotografía, actualizarla
        if (formData.fotografia) {
          await autosApi.updatePhoto(initialData.id, formData.fotografia);
        }

        setSuccess(true);
        
        setTimeout(() => {
          router.push('/autos');
        }, 1500);
      } else {
        // Crear nuevo auto
        await autosApi.create({
          marca: formData.marca,
          modelo: formData.modelo,
          anio: parseInt(formData.anio),
          precio: parseFloat(formData.precio),
          kilometraje: parseInt(formData.kilometraje),
          color: formData.color,
          email: formData.email,
          telefono: formData.telefono,
          fotografia: formData.fotografia || undefined,
        });

        setSuccess(true);
        
        setTimeout(() => {
          router.push('/autos');
        }, 1500);
      }

    } catch (err: any) {
      setError(err.customMessage || err.message || `Error al ${mode === 'edit' ? 'actualizar' : 'crear'} el auto`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg bg-red-50 p-4 border border-red-200">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-red-800">{error}</p>
            </div>
          </div>
        </div>
      )}

      {success && (
        <div className="rounded-lg bg-green-50 p-4 border border-green-200">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">
                ¡Auto {mode === 'edit' ? 'actualizado' : 'creado'} exitosamente!
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectField
          label="Marca"
          id="marca"
          name="marca"
          value={formData.marca}
          onChange={handleMarcaChange}
          options={marcas.map(m => ({ value: m.nombre, label: m.nombre }))}
          required
          disabled={loadingMarcas}
          placeholder={loadingMarcas ? 'Cargando marcas...' : 'Seleccione una marca'}
        />

        <SelectField
          label="Modelo"
          id="modelo"
          name="modelo"
          value={formData.modelo}
          onChange={handleChange}
          options={modelos.map(m => ({ value: m.nombre, label: m.nombre }))}
          required
          disabled={!selectedMarcaId || loadingModelos}
          placeholder={
            !selectedMarcaId 
              ? 'Primero seleccione una marca' 
              : loadingModelos 
              ? 'Cargando modelos...' 
              : 'Seleccione un modelo'
          }
        />

        <SelectField
          label="Año"
          id="anio"
          name="anio"
          value={formData.anio}
          onChange={handleChange}
          options={years.map(y => ({ value: y, label: y.toString() }))}
          required
          disabled={loadingYears}
          placeholder={loadingYears ? 'Cargando años...' : 'Seleccione un año'}
        />

        <InputField
          label="Precio"
          id="precio"
          name="precio"
          type="number"
          value={formData.precio}
          onChange={handleChange}
          placeholder="25000"
          required
          min={0}
          step="0.01"
        />

        <InputField
          label="Kilometraje"
          id="kilometraje"
          name="kilometraje"
          type="number"
          value={formData.kilometraje}
          onChange={handleChange}
          placeholder="15000"
          required
          min={100}
        />

        <InputField
          label="Color"
          id="color"
          name="color"
          type="text"
          value={formData.color}
          onChange={handleChange}
          placeholder="Rojo"
        />

        <InputField
          label="Email"
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="contacto@example.com"
          required
        />

        <InputField
          label="Teléfono"
          id="telefono"
          name="telefono"
          type="tel"
          value={formData.telefono}
          onChange={handleChange}
          placeholder="9611879041"
          required
        />
      </div>

      <FileUpload
        label="Fotografía del Auto"
        id="fotografia"
        name="fotografia"
        onChange={handleFileChange}
        helperText={
          mode === 'edit' && existingPhotoUrl
            ? 'Sube una nueva foto solo si deseas reemplazar la actual'
            : undefined
        }
      />

      {mode === 'edit' && existingPhotoUrl && (
        <div className="mt-2">
          <p className="text-sm text-[#6C757D] mb-2">Fotografía actual:</p>
          <img
            src={existingPhotoUrl}
            alt="Foto actual del auto"
            className="w-48 h-48 object-cover rounded-lg border border-[#CED4DA]"
          />
        </div>
      )}

      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 py-3 px-4 border border-[#faaf26] text-base font-semibold rounded-lg text-[#212529] bg-[#faaf26] hover:bg-[#BC831D] hover:border-[#BC831D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#faaf26] disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 shadow-md hover:shadow-lg"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#212529]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {mode === 'edit' ? 'Actualizando...' : 'Guardando...'}
            </span>
          ) : (
            mode === 'edit' ? 'Actualizar Auto' : 'Guardar Auto'
          )}
        </button>

        <button
          type="button"
          onClick={() => router.push('/autos')}
          className="px-6 py-3 border border-[#CED4DA] text-base font-medium rounded-lg text-[#495057] bg-white hover:bg-[#F8F9FA] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ADB5BD] transition duration-150"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
