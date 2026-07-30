# 🍽️ Xiri Frontend

> Explorá la gastronomía de Nicaragua desde tu dispositivo móvil.

**Xiri** es una aplicación móvil de exploración gastronómica que permite a los usuarios descubrir comidas típicas, rutas gastronómicas, negocios locales y coleccionar sus experiencias culinarias. Construida con React Native + Expo.


## 🏗️ Arquitectura

El proyecto sigue una arquitectura por capas inspirada en Clean Architecture:

```
xiri-frontend/
├── app/                          # Screens (routing con Expo Router)
│   ├── (auth)/                   # Login, Register
│   ├── (tabs)/                   # Home, Rutas, Colección, Admin, Perfil
│   ├── food/[id].tsx             # Detalle de comida
│   ├── department/[id].tsx       # Comidas por departamento
│   ├── route/[id].tsx            # Negocios de una ruta
│   ├── business/[id].tsx         # Detalle de negocio
│   ├── qualify/[id].tsx          # Calificar negocio
│   ├── verification/             # Solicitud de verificación
│   └── admin/                    # Panel de administración
│
├── core/                         # Lógica de conexión
│   ├── api/                      # Instancia de axios + interceptores
│   └── actions/                  # Funciones async que llaman al API
│       ├── auth/
│       ├── gastronomy/
│       ├── collection/
│       ├── routes/
│       ├── menu/
│       ├── qualification/
│       ├── verification/
│       └── admin/
│
├── infrastructure/               # Capa de datos
│   ├── interfaces/               # Tipos TypeScript (limpios + response)
│   └── mappers/                  # Transformadores API response → tipos limpios
│
├── presentation/                 # Capa de UI
│   ├── hooks/                    # Custom hooks (React Query)
│   └── components/               # Componentes puros (solo props)
│       ├── auth/
│       ├── gastronomy/
│       ├── collection/
│       ├── routes/
│       ├── business/
│       ├── qualification/
│       ├── verification/
│       ├── profile/
│       ├── home/
│       ├── admin/
│       └── shared/
│
└── config/
    └── helpers/                  # Utilidades (SecureStorage, JwtDecode)
```

### Flujo de datos

```
Screen → Hook → Action → API → Mapper → Interface → Component (props)
```

- **Screens** (`app/`): orquestan hooks, manejan state, pasan props a componentes
- **Hooks** (`presentation/hooks/`): encapsulan React Query (useQuery/useMutation)
- **Actions** (`core/actions/`): funciones async que llaman a la API y mapean
- **Mappers** (`infrastructure/mappers/`): transforman snake_case del API a camelCase
- **Interfaces** (`infrastructure/interfaces/`): tipado estricto
- **Components** (`presentation/components/`): UI pura, solo reciben props

---

## 🛠️ Tecnologías

| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| React Native | 0.81 | Framework de UI móvil |
| Expo | ~54 | Plataforma de desarrollo |
| Expo Router | ~6 | Navegación file-based |
| TypeScript | ~5.9 | Tipado estático |
| NativeWind | ^4.2 | Tailwind CSS para React Native |
| React Query | ^5.101 | Estado del servidor, cache, mutations |
| Axios | ^1.18 | Cliente HTTP |
| Expo Secure Store | ~15 | Almacenamiento seguro de tokens |
| Expo Image Picker | ~17 | Selección de imágenes |

---

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js 24
- npm
- Expo Go en tu dispositivo (Android/iOS)
- Backend Django corriendo ([xiri-backend](../xiri-backend))

### 1. Clonar el repositorio

```bash
# HTTPS
git clone https://github.com/josueespinoza2004/xiri-frontend.git

# SSH
git clone git@github.com:josueespinoza2004/xiri-frontend.git
```

```bash
cd xiri-frontend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Creá un archivo `.env` en la raíz del proyecto:

```env
EXPO_PUBLIC_API_URL=http://TU_IP_LOCAL:8000/api
```

> Reemplazá `TU_IP_LOCAL` con la IP de tu máquina en la red local (ej: `192.168.1.69`).

### 4. Iniciar la app

```bash
npx expo start
```

Escaneá el QR con Expo Go o presioná `a` para Android.

---

## 🔗 Conexión con el Backend

La app se conecta al backend Django REST Framework a través de la variable `EXPO_PUBLIC_API_URL`.

### Clonar e instalar el Backend

```bash
# HTTPS
git clone https://github.com/xKendoVul/xiri-backend.git

# SSH
git clone git@github.com:xKendoVul/xiri-backend.git
```

```bash
cd xiri-backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Configuración del Backend

El backend debe tener:

1. **CORS habilitado** (`CORS_ALLOW_ALL_ORIGINS = True` en development)
2. **JWT Authentication** configurado en `REST_FRAMEWORK`
3. **Servidor corriendo en `0.0.0.0:8000`** para que sea accesible desde el dispositivo:

```bash
python manage.py runserver 0.0.0.0:8000
```

### Autenticación

- Los tokens JWT (access + refresh) se guardan en **Expo Secure Store** (encriptados en el dispositivo)
- Un interceptor de Axios adjunta automáticamente el token `Authorization: Bearer <token>` en cada petición
- Si el token expira (401), la app limpia la sesión y redirige al login

---

## 👤 Roles de Usuario

| Rol | Funcionalidades |
|-----|-----------------|
| **user** (Explorador) | Ver comidas, departamentos, rutas, negocios. Coleccionar comidas. Calificar negocios. Solicitar ser comerciante. |
| **owner** (Comerciante) | Todo lo del user + gestionar sus negocios y platillos. |
| **admin** (Administrador) | Todo + CRUD de departamentos, comidas, rutas, menús. Aprobar/rechazar solicitudes de verificación. |

---

## 📱 Flujo de la App

```
┌─────────────┐
│   Login     │──── Register
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────────────┐
│              Tabs                        │
├─────────┬────────┬───────────┬──────────┤
│  Home   │ Rutas  │ Colección │  Perfil  │
├─────────┴────────┴───────────┴──────────┤
│              + Admin (si rol admin)      │
└─────────────────────────────────────────┘
       │
       ▼
┌─────────────────────────┐
│   Pantallas de detalle  │
├─────────────────────────┤
│ • Comida (imagen+desc)  │
│ • Departamento (filtro) │
│ • Ruta (negocios)       │
│ • Negocio (menú+reseñas)│
│ • Calificar             │
│ • Verificación          │
└─────────────────────────┘
```

## 🧑‍💻 Desarrollo

### Agregar una nueva feature (patrón)

1. Crear interface en `infrastructure/interfaces/`
2. Crear response interface (si es diferente al tipo limpio)
3. Crear mapper en `infrastructure/mappers/`
4. Crear action en `core/actions/`
5. Crear hook en `presentation/hooks/`
6. Crear componente(s) en `presentation/components/`
7. Crear screen en `app/`

### Convenciones

- Components son **UI pura** — solo reciben props, no llaman hooks
- Screens **orquestan** — llaman hooks, manejan state, pasan props
- Actions son **funciones async** — llaman API, mapean, retornan
- Mappers son **clases estáticas** — métodos puros de transformación
- Nombres de archivos: `kebab-case` para actions, `PascalCase` para components

