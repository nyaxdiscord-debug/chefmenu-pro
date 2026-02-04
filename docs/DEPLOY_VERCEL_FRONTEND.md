# 🚀 Deploy del Frontend en Vercel - Instrucciones Paso a Paso

Como no podemos instalar Vercel CLI sin permisos de administrador, sigue estos pasos para hacer el deploy manualmente (toma 2 minutos):

---

## 📋 PASO 1: Ir a Vercel

Abre en tu navegador: **https://vercel.com/new**

---

## 📋 PASO 2: Conectar Repositorio de GitHub

1. Click en **"Import Git Repository"** o **"Continue with GitHub"**
2. Autentícate con GitHub si te lo pide
3. Busca y selecciona el repositorio: **`nyaxdiscord-debug/chefmenu-pro`**
4. Click en **"Import"**

---

## 📋 PASO 3: Configurar el Proyecto

En la pantalla de configuración del proyecto:

### Framework & Project Settings

- **Project Name**: `chefmenu-pro-frontend` (o el que prefieras)
- **Framework Preset**: `Vite`
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

### Environment Variables (Variables de Entorno)

Agrega esta variable:

| Key | Value | Environment |
|-----|-------|-------------|
| `VITE_API_URL` | `https://tu-backend-url.railway.app/api` | Production |

**Nota**: Por ahora puedes usar `https://your-backend-url.railway.app/api` como placeholder.

---

## 📋 PASO 4: Deploy

1. Click en el botón **"Deploy"**
2. Espera a que termine el build (toma ~30-60 segundos)
3. ¡Listo! Tu frontend estará en producción.

---

## 📋 PASO 5: Obtener la URL del Frontend

Al terminar el deploy, Vercel te dará una URL como:

```
https://chefmenu-pro-frontend.vercel.app
```

**COPIA ESTA URL** - La necesitarás para configurar el backend.

---

## 📋 PASO 6: Actualizar CORS en el Backend

Cuando tengas el backend deployado, actualiza el archivo `SecurityConfig.java`:

```java
configuration.setAllowedOrigins(List.of(
    "http://localhost:5173",
    "http://localhost:3000",
    "https://chefmenu-pro-frontend.vercel.app"  // Tu URL de Vercel
));
```

Luego haz commit y push a GitHub:

```bash
cd /home/usuario/chefmenu-pro
git add backend/src/main/java/com/chefmenu/config/SecurityConfig.java
git commit -m "Update CORS: add Vercel domain"
git push origin main
```

---

## 🔧 Actualizar Variables de Entorno en Vercel

Una vez que tengas el backend deployado en Railway o Render:

1. Ve a tu proyecto en Vercel
2. Click en **Settings** → **Environment Variables**
3. Busca la variable `VITE_API_URL`
4. Actualízala con la URL real de tu backend:
   ```
   https://tu-backend-en-render-o-railway.app/api
   ```
5. Click en **Save**
6. Vercel hará un redeploy automático

---

## 📊 Verificar el Deploy

1. Visita tu URL de Vercel
2. Intenta registrar un usuario nuevo
3. Verifica que puedes crear ingredientes y recetas
4. ¡Todo debería funcionar!

---

## 🎯 Características Incluidas en el Deploy

- ✅ Build automático desde GitHub
- ✅ HTTPS automático
- ✅ Edge CDN global
- ✅ Dominio personalizado disponible
- ✅ Preview deployments para cada branch
- ✅ Rollback instantáneo
- ✅ Analytics incluidos
- ✅ 100% gratuito

---

## 📝 Resumen de URLs

| Servicio | URL |
|----------|-----|
| GitHub | https://github.com/nyaxdiscord-debug/chefmenu-pro |
| Vercel (Frontend) | https://chefmenu-pro-frontend.vercel.app (ejemplo) |
| Render (Backend) | Pendiente de deploy |
| Supabase (Database) | Pendiente de configurar |

---

## 🚀 Siguiente Paso: Deploy del Backend

Ahora que el frontend está en Vercel, sigue las instrucciones para deployar el backend en **Render**:

- Ver `docs/DEPLOY_VERCEL.md` para instrucciones completas
- O sigue: https://render.com/new

---

## ⚡ Tips de Vercel

1. **Redeploy manual**: Click en "Deployments" → el botón "..."
2. **Logs**: Click en cualquier deployment para ver los logs
3. **Domain personalizado**: Settings → Domains → Add Domain
4. **Environment variables**: Settings → Environment Variables

---

**Costo total del frontend en Vercel: $0/month** 🆓