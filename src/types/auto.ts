export interface Auto {
  id: string;
  marca: string;
  modelo: string;
  año: number;
  precio: number;
  kilometraje: number;
  color: string | null;
  email: string;
  telefono: string;
  fotografia: string | null;
  fechaDeAlta: string;
  fechaDeModificacion: string;
  fechaDeEliminacion: string | null;
}

export interface CreateAutoRequest {
  marca: string;
  modelo: string;
  anio: number;
  precio: number;
  kilometraje: number;
  email: string;
  telefono: string;
  color?: string;
  fotografia?: File;
}

export interface UpdateAutoRequest {
  marca?: string;
  modelo?: string;
  anio?: number;
  precio?: number;
  kilometraje?: number;
  email?: string;
  telefono?: string;
  color?: string;
}

export interface AutoFilters {
  page?: number;
  limit?: number;
  marca?: string;
  modelo?: string;
  anio?: number;
  color?: string;
  precioMin?: number;
  precioMax?: number;
}

export interface Marca {
  id: string;
  nombre: string;
}

export interface Modelo {
  id: string;
  nombre: string;
  marcaId: string;
}

export interface YearsResponse {
  minYear: number;
  maxYear: number;
  years: number[];
}