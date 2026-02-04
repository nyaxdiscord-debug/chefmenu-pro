# 🚀 Deploy del Backend en Render - Instrucciones Paso a Paso

Render es 100% gratuito y muy fácil de usar.

---

## 📋 PASO 1: Ir a Render

Abre en tu navegador: **https://render.com**

---

## 📋 PASO 2: Crear cuenta

1. Click en **"Sign Up"**
2. **"Continue with GitHub"** (recomendado)
3. Autoriza a Render para acceder a tus repositorios

---

## 📋 PASO 3: Selecciona el repositorio

1. Click en **"New +"** → **"Web Service"**
2. Busca y selecciona: **`nyaxdiscord-debug/chefmenu-pro`**
3. Click en **"Connect"**

---

## 📋 PASO 4: Configurar el Web Service

### Configuración básica

```
Name: chefmenu-pro-backend
Environment: Docker
```

### Build & Deploy

```
Docker Context: / (root)
Dockerfile Path: Dockerfile
```

**O alternativamente, si prefieres Maven:**

```
Environment: Node
Build Command: cd backend && mvn clean package -DskipTests
Start Command: cd backend && java -jar target/*.jar
```

**Recomendación**: Usa Docker (es más simple y robusto).

---

## 📋 PASO 5: Configurar Base de Datos

### Opción A: Usar PostgreSQL de Render (Recomendado)

1. En la página de configuración del Web Service, busca **"Databases"**
2. Click en **"New Database"**
3. Configura:
   ```
   Name: chefmenu-pro-db
   Database: PostgreSQL
   Type: Free
   ```
4. Click en **"Create Database"**
5. Render te mostrará las credenciales de la DB

### Obtener las credenciales de la BD

1. Ve a tu base de datos en Render
2. Click en **"Connect"**
3. Copia la **Internal Database URL** (algo como):
   ```
   postgresql://render_user:password@dpg-xxxxx.oregon-postgres.render.com/chefmenu_pro_db
   ```

---

## 📋 PASO 6: Variables de Entorno (Environment Variables)

En la sección **"Environment Variables"** del Web Service, agrega:

| Key | Value |
|-----|-------|
| `SPRING_DATASOURCE_URL` | `jdbc:postgresql://dpg-xxxxx.oregon-postgres.render.com:5432/chefmenu_pro_db` (tu URL de BD sin `jdbc:`) |
| `SPRING_DATASOURCE_USERNAME` | `render_user` (tu usuario de BD) |
| `SPRING_DATASOURCE_PASSWORD` | `tu_password_de_bd` |
| `JWT_SECRET` | `genera-un-secreto-de-256-bits-aleatorio` |
| `SPRING_JPA_HIBERNATE_DDL_AUTO` | `update` (para que Flyway no falle) |

**NOTA IMPORTANTE**:
- La URL de PostgreSQL en Render termina con `/nombre_db`
- Agrega `?sslmode=require` al final si hay problemas de conexión

**URL completa ejemplo**:
```
jdbc:postgresql://dpg-abc123.oregon-postgres.render.com:5436/chefmenu_pro_db?sslmode=require
```

---

## 📋 PASO 7: Deploy

1. Click en **"Create Web Service"**
2. Render clonará tu repositorio y hará build
3. Espera ~3-5 minutos
4. ¡Listo! Tu backend estará en producción

---

## 📋 PASO 8: Obtener la URL del Backend

Al terminar el deploy, Render te dará una URL como:

```
https://chefmenu-pro-backend.onrender.com
```

**COPIA ESTA URL** - La necesitarás para:
1. Configurar Vercel (frontend)
2. Configurar CORS en el backend

---

## 📋 PASO 9: Actualizar CORS en el Backend

Ahora que tienes la URL del backend y del frontend (Vercel), actualiza:

**Archivo**: `backend/src/main/java/com/chefmenu/config/SecurityConfig.java`

```java
configuration.setAllowedOrigins(List.of(
    "http://localhost:5173",
    "http://localhost:3000",
    "https://tu-frontend-en-vercel.vercel.app"  // Tu URL de Vercel
));
```

Luego haz commit y push:

```bash
cd /home/usuario/chefmenu-pro
git add backend/src/main/java/com/chefmenu/config/SecurityConfig.java
git commit -m "Update CORS: add production domains"
git push origin main
```

Render hará redeploy automático.

---

## 📋 PASO 10: Actualizar Vercel con la URL del Backend

1. Ve a tu proyecto en Vercel
2. Click en **Settings** → **Environment Variables**
3. Busca la variable `VITE_API_URL`
4. Actualízala con la URL real de tu backend:
   ```
   https://chefmenu-pro-backend.onrender.com/api
   ```
5. Click en **Save**
6. Vercel hará redeploy automático

---

## 🔧 Solución de Problemas

### Problema: Error de conexión a la BD

**Solución**: Agrega `?sslmode=require` al final de la URL de PostgreSQL:
```
jdbc:postgresql://host:port/db?sslmode=require
```

### Problema: Sleep mode (15 min inactividad)

**Solución**: Es normal en el plan gratuito. Para evitar esto:
1. Usa un servicio de keep-alive gratuito (ej: UptimeRobot)
2. O actualiza a un plan de pago (~$7/mes)

### Problema: Build falla con Maven

**Solución**: Usa Docker en su lugar:
```
Environment: Docker
Dockerfile: /backend/Dockerfile
```

### Problema: Error "Too Many Connections"

**Solución**: Render PostgreSQL gratuito tiene límite de 20 conexiones. Si lo necesitas más, usa un plan de pago.

---

## 📊 Verificar el Deploy

1. Visita tu URL de Render
2. Intenta hacer una petición GET:
   ```
   https://chefmenu-pro-backend.onrender.com/api/ingredientes
   ```
3. Debería devolver 401 Unauthorized (necesitas autenticación) o 200 OK si tienes token

---

## 🎯 Características de Render (Plan Gratuito)

| Característica | Plan Gratuito |
|---------------|---------------|
| ✅ Tiempo de ejecución | Ilimitado (con sleep mode) |
| ✅ RAM | 512 MB |
| ✅ CPU | 0.1 vCPU |
| ✅ Bandwidth | 100 GB/mes |
| ✅ Build minutes | 750 min/mes |
| ✅ SSL automático | ✅ |
| ✅ Custom domains | ✅ |
| ✅ PostgreSQL | ✅ (hasta 90 días de retención de backups) |
| ⏱️ Sleep mode | 15 min sin actividad |

---

## 📝 Resumen de URLs

| Servicio | URL |
|----------|-----|
| GitHub | https://github.com/nyaxdiscord-debug/chefmenu-pro |
| Vercel (Frontend) | https://chefmenu-pro-frontend.vercel.app |
| Render (Backend) | https://chefmenu-pro-backend.onrender.com |
| Render (Database) | pgsql://... (solo accesible desde Render) |

---

## 🚀 Siguiente Paso: ¡Prueba tu App!

1. Visita tu frontend en Vercel
2. Regístrate un nuevo usuario
3. Crea ingredientes
4. Crea recetas
5. ¡Todo debería funcionar!

---

**Costo total del backend en Render: $0/month** 🆓