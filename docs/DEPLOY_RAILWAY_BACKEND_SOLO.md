# 🚀 ChefMenu Pro Backend - Deploy en Railway

## 📋 PASO 1: Crear Cuenta en Railway

1. Ve a: **https://railway.app**
2. Click en **"Login"**
3. Conecta con **GitHub** (recomendado)

---

## 📋 PASO 2: Crear Proyecto (Solo Backend)

1. Click en **"New Project"** (esquina **+**)
2. Click en **"Import from Git repo"**
3. Selecciona tu repo: **`nyaxdiscord-debug/chefmenu-pro`**
4. Click en **"Import"**

---

## 📋 PASO 3: Configurar el Servicio

**Nombre**: `chefmenu-pro-backend`

**Origen**: Selecciona **"Deploy from GitHub"** (importará desde tu repo)

**Root Directory**: `backend`

**Variables de Entorno** (Agrega estas variables):

| Key | Value | Notas |
|-----|-------|------|
| `SPRING_DATASOURCE_URL` | `jdbc:h2:mem:chefmenu_db;DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=FALSE` | H2 en memoria para desarrollo |
| `JWT_SECRET` | `cambia-esto-por-un-secreto-de-256-bits` | Genera con: `openssl rand -base64 32` |
| `SERVER_PORT` | `8080` | Puerto estándar |

**Configuración Adicional** (si quieres):
- **Plan**: **Free** (default) o **Eco**
- **Region**: Selecciona la más cercana (ej: Frankfurt, Oregon)

---

## 📋 PASO 4: Deploy

1. Click en **"Deploy Service"**
2. Espera ~2-3 minutos

---

## 🎉 ¡Felicidades!

Tu backend estará en una URL como:
```
https://chefmenu-pro-backend-production.up.railway.app/api
```

---

## 🔧 Configuración CORS en Producción

En **SecurityConfig.java**, actualiza la línea de orígenes:
```java
configuration.setAllowedOrigins(List.of(
    "http://localhost:5173",
    "http://localhost:3000",
    "https://*.vercel.app",
    "https://*.up.railway.app"
));
```

Luego haz commit y push:
```bash
git add backend/src/main/java/com/chefmenu/config/SecurityConfig.java
git commit -m "Update CORS for Railway production domains"
git push origin main
```

---

## 💰 Notas Importantes

- **Base de datos**: Se usa **H2 en memoria** para desarrollo local
- **Producción**: Railway crea H2 automático
- **Datos**: No persisten entre reinicios del servicio en plan gratuito
- **Actualiza**: Para persistencia real, necesitas conectar PostgreSQL externo

---

## 🔗 Pruebas

Una vez deployado, prueba:
```bash
# Health check
curl https://chefmenu-pro-backend-production.up.railway.app/actuator/health

# Login
curl -X POST https://chefmenu-pro-backend-production.up.railway.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'
```

---

## 💰 Plan Gratuito vs Pago

| Feature | Free | Pago |
|---------|------|------|
| RAM | 512 MB | 1GB+ |
| CPU | 0.1 vCPU | 0.5+ vCPU |
| Sleep Mode | 15 min | No |
| Base de Datos | H2 ephemeral | PostgreSQL |
| Dominio | up.railway.app | Custom |
| **Costo** | **$0** | **$5/mes** |

---

## 📚 Documentación Oficial
- Railway Docs: https://docs.railway.app
- Spring Boot en Railway: https://docs.railway.app/deploy

---

**Costo total del backend: $0/month** 🆓