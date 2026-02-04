# 🚀 Deploy en Vercel

Este documento explica cómo hacer deploy del frontend de ChefMenu Pro en Vercel.

## Prerrequisitos

1. Cuenta en [Vercel](https://vercel.com)
2. Repositorio en GitHub con el código
3. Backend deployado (Railway/Render)

## Paso 1: Preparar Backend

Primero necesitas deployar el backend en Railway:

1. Ve a [railway.app](https://railway.app) y crea una cuenta
2. Crea un nuevo proyecto
3. Añade una base de datos PostgreSQL
4. Deploya el backend desde GitHub
5. Copia la URL del backend (ej: `https://chefmenu-pro-production.railway.app`)

## Paso 2: Configurar Frontend

Actualiza estos archivos con la URL de tu backend:

### `frontend/.env.production`
```env
VITE_API_URL=https://tu-backend-url.railway.app/api
```

### `frontend/vercel.json`
```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://tu-backend-url.railway.app/api/:path*"
    }
  ]
}
```

## Paso 3: Deploy en Vercel

### Opción A: Desde Vercel CLI

```bash
# Instalar Vercel CLI
npm install -g vercel

# Deploy en producción
cd frontend
vercel --prod
```

### Opción B: Desde la interfaz web de Vercel

1. Ve a [vercel.com/new](https://vercel.com/new)
2. Importa tu repositorio de GitHub
3. Configura:
   - Framework Preset: Vite
   - Root Directory: `frontend`
   - Environment Variables:
     - `VITE_API_URL`: `https://tu-backend-url.railway.app/api`
4. Click en "Deploy"

## Paso 4: Verificar Deploy

1. Vercel te dará una URL (ej: `https://chefmenu-pro.vercel.app`)
2. Visita la URL y verifica:
   - Login/Registro funciona
   - Puedes crear ingredientes
   - Puedes crear recetas

## Problemas Comunes

### CORS Error

Si tienes errores de CORS, actualiza `SecurityConfig.java`:

```java
.configurationSource(corsConfigurationSource())
```

Agrega tu dominio de Vercel a la lista de orígenes permitidos.

### API URL Incorrecta

Verifica que `VITE_API_URL` esté correcta en producción:
- No debe incluir `/api` al final si ya está en vercel.json
- Debe ser HTTPS

### Variables de Entorno

Las variables que empiezan con `VITE_` en Vite están disponibles en el frontend.
Las variables del backend se configuran en Railway, no en Vercel.

## URLs de Producción

Una vez completado el deploy:

```
Frontend: https://chefmenu-pro.vercel.app
Backend:  https://chefmenu-pro.railway.app
API:      https://chefmenu-pro.railway.app/api
```

## Actualizar Backend

Cuando hagas cambios en el backend:

1. Push a GitHub
2. Railway hace deploy automáticamente
3. El frontend en Vercel seguirá funcionando (no necesita redeploy)

## Actualizar Frontend

Cuando hagas cambios en el frontend:

1. Push a GitHub
2. Vercel hace deploy automáticamente
3. O ejecuta: `vercel --prod`

## Costo

- Vercel: Gratis (Hobby plan incluye dominio personalizado)
- Railway: $5/mes aprox (base de datos + backend)
- Alternativa gratuita: Render.com (con límites)