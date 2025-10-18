# Inventory Frontend - Maxi Pública

Sistema de gestión de inventario de autos construido con Next.js 15, TypeScript y Tailwind CSS.

##  Características

-  Autenticación JWT (Login/Register)
-  CRUD completo de autos
-  Listado con paginación infinita
-  Filtros avanzados (marca, modelo, año, precio, color)
-  Carga de imágenes
-  Responsive design
-  Dockerizado y listo para producción

##  Prerequisitos

- Node.js 20+ 
- npm o yarn
- Backend API corriendo en `http://localhost:3001/api`

##  Instalación

### Desarrollo Local

```bash
# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.example .env.local

# Ejecutar en modo desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

##  Docker (Recomendado)

```bash
# Construir y ejecutar
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener
docker-compose down
```

La aplicación estará disponible en `http://localhost:3000`

**Nota:** Asegúrate de que tu backend esté corriendo en `http://localhost:3001/api`

##  Estructura del Proyecto

```
src/
├── app/                    # Rutas de Next.js App Router
│   ├── (auth)/            # Rutas de autenticación
│   ├── autos/             # Gestión de autos
│   └── globals.css        # Estilos globales
├── components/            # Componentes React
│   ├── auth/              # Componentes de autenticación
│   ├── autos/             # Componentes de autos
│   └── ui/                # Componentes reutilizables
├── contexts/              # Context API de React
├── lib/                   # Utilidades y lógica
│   ├── api/               # Cliente API y endpoints
│   ├── hooks/             # Custom hooks
│   └── utils/             # Funciones auxiliares
├── types/                 # Definiciones TypeScript
└── middleware.ts          # Middleware de Next.js
```

##  Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Servidor de desarrollo con Turbopack

# Producción
npm run build            # Build de producción
npm start                # Ejecutar build de producción

# Linting
npm run lint             # Ejecutar ESLint
```

##  Variables de Entorno

Crea un archivo `.env.local` basado en `.env.example`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

##  Características Técnicas

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS v4
- **Build Tool**: Turbopack (dev), Webpack (prod)
- **Optimización**: Image optimization, Code splitting

### Autenticación
- JWT tokens almacenados en localStorage y cookies
- Middleware para protección de rutas
- Auto-logout al expirar el token

### API Client
- Cliente HTTP personalizado con interceptores
- Manejo centralizado de errores
- Inyección automática de tokens

### Optimizaciones
- Server-Side Rendering (SSR)
- Static Generation donde es posible
- Infinite scroll con Intersection Observer
- Lazy loading de imágenes
- Output standalone para Docker

##  Páginas Principales

- `/login` - Iniciar sesión
- `/register` - Registro de usuarios
- `/autos` - Listado de autos
- `/autos/nuevo` - Crear nuevo auto
- `/autos/[id]` - Ver detalles del auto
- `/autos/[id]/editar` - Editar auto

##  Paleta de Colores (Maxi Pública)

```css
--primary: #faaf26      /* Amarillo principal */
--primary-dark: #BC831D /* Amarillo oscuro */
--dark: #212529         /* Texto principal */
--gray: #6C757D         /* Texto secundario */
--light-gray: #F8F9FA   /* Fondos */
```





