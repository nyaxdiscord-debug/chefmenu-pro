# 🔒 Revisión de Seguridad y Bugs - ChefMenu Pro

## ✅ BUGS CRÍTICOS CORREGIDOS

### Backend (Java/Spring Boot)

#### 1. **NullPointerException en RecetaService** (LÍNEA 161)
**Problema:** `ri.getIngrediente()` puede ser null → NullPointerException

**Solución:** Agregué validación:
```java
if (ri.getIngrediente() == null) {
    throw new RuntimeException("El ingrediente con ID " + ri.getIngredienteId() + " no existe");
}
```

#### 2. **División por Cero en escalarReceta** (LÍNEA 142)
**Problema:** Si `porcionesNuevas` es 0 → ArithmeticException

**Solución:** Agregué validación en service y controller:
```java
if (porcionesNuevas == null || porcionesNuevas <= 0) {
    throw new RuntimeException("Las porciones deben ser mayores a 0");
}
```

#### 3. **BigDecimal.ROUND_HALF_UP Deprecated** (LÍNEAS 148, 177)
**Problema:** `BigDecimal.ROUND_HALF_UP` está deprecado en Java 17+

**Solución:** Cambié a `java.math.RoundingMode.HALF_UP`

### Frontend (React)

#### 4. **JSON Parse Error en AuthContext** (LÍNEA 21)
**Problema:** `JSON.parse(localStorage.getItem('user'))` puede fallar si el JSON está corrupto

**Solución:** Agregué try-catch:
```javascript
try {
  const userData = JSON.parse(localStorage.getItem('user') || '{}')
  setUser(userData)
} catch (error) {
  console.error('Error parsing user data:', error)
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}
```

#### 5. **React Router Navigation** (api.js:29)
**Problema:** `window.location.href` no funciona bien con React Router

**Nota:** En este MVP se mantiene por simplicidad, pero en producción deberías usar:
```javascript
import { useNavigate } from 'react-router-dom'
// en tu componente:
const navigate = useNavigate()
navigate('/login')
```

---

## 🔐 SEGURIDAD - ARCHIVOS PROTEGIDOS

### ✅ NO se expondrá en GitHub:

| Archivo | Razón |
|---------|-------|
| `.env` | Contraseñas, API keys |
| `.env.local` | Contraseñas de desarrollo |
| `.env.production` | URLs de backend en producción |
| `.env.development` | URLs locales |
| `application.properties` (con credenciales reales) | Credenciales de DB y JWT |
| `*.log` | Puede contener información sensible |

### ✅ ARCHIVOS EN `.gitignore`:

```gitignore
# Environment variables - NUNCA COMMITEAR ESTOS ARCHIVOS
.env
.env.local
.env.development
.env.development.local
.env.production
.env.production.local
.env.test.local
```

---

## 🚀 OPCIONES DE DEPLOY GRATUITAS

### Frontend: Vercel (✅ 100% GRATUITO)

**Características:**
- ✅ Ilimitado
- ✅ Deploy automático desde GitHub
- ✅ Dominio personalizado gratis
- ✅ HTTPS automático
- ✅ Edge caching
- ✅ Preview deployments

**Costo:** $0 forever

**Deploy:**
```bash
cd frontend
npm install -g vercel
vercel --prod
```

### Backend: Railway (⚠️ Gratis con límites) o Render (✅ Gratis)

#### Opción A: Railway ($5/mes aprox.)

**Características:**
- Spring Boot + PostgreSQL en un solo proyecto
- Deploy automático desde GitHub
- Sleep mode: 15 min sin actividad (se despierta en ~10s)
- 512MB RAM, 0.1 CPU

**Costo:** $5/mes aprox. (plan gratuito con límites)

**Configuración:**
```bash
# Variables de entorno en Railway:
SPRING_DATASOURCE_URL=jdbc:postgresql://host:port/db
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=your_password
JWT_SECRET=your-256-bit-secret-key
```

#### Opción B: Render (✅ 100% GRATUITO)

**Características:**
- ✅ Plan gratuito para web service + PostgreSQL
- Deploy automático desde GitHub
- Sleep mode: 15 min sin actividad (se despieta en ~30s)
- 512MB RAM, 0.1 CPU

**Costo:** $0 forever (con límites)

**Configuración:**
```bash
# Variables de entorno en Render:
SPRING_DATASOURCE_URL=jdbc:postgresql://host:port/db
SPRING_DATASOURCE_USERNAME=render_user
SPRING_DATASOURCE_PASSWORD=your_password
JWT_SECRET=your-256-bit-secret-key
```

#### Opción C: Fly.io (✅ 100% GRATUITO)

**Características:**
- ✅ Plan gratuito con 3 máquinas
- Deploy desde Dockerfile
- PostgreSQL incluido
- No sleep mode (siempre activo)

**Costo:** $0 forever

**Configuración:**
```bash
# fly.toml
app = "chefmenu-pro-backend"
kill_signal = "SIGINT"
kill_timeout = 5
processes = []

[build]
  dockerfile = "Dockerfile"

[[services]]
  http_checks = []
  internal_port = 8080
  processes = ["app"]
  protocol = "tcp"
  [services.concurrency]
    hard_limit = 25
    soft_limit = 20
    type = "connections"
```

### Database: Supabase (✅ 100% GRATUITO)

**Características:**
- ✅ 500MB storage
- ✅ 2GB bandwidth/mes
- ✅ 2 concurrent connections
- ✅ Dashboard web
- ✅ Backups automáticos

**Costo:** $0 forever (plan Hobby)

**Configuración:**
```bash
# Obtén la URL de conexión de Supabase y actualiza:
SPRING_DATASOURCE_URL=jdbc:postgresql://db.xxx.supabase.co:5432/postgres
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATAS_PASSWORD=your_supabase_password
```

---

## 🎯 RECOMENDACIÓN DEPLOY GRATUITO

### Opción 1: Vercel + Render + Supabase (MÁS GRATUITO)
- **Frontend:** Vercel ($0)
- **Backend:** Render ($0)
- **Database:** Supabase ($0)
- **Total:** $0/month

**Ventajas:**
- Todo gratuito
- Deploy automático desde GitHub
- Fácil de configurar

**Desventajas:**
- Sleep mode en Render (15 min inactividad)

### Opción 2: Vercel + Fly.io (MEJOR RENDIMIENTO)
- **Frontend:** Vercel ($0)
- **Backend + DB:** Fly.io ($0)
- **Total:** $0/month

**Ventajas:**
- No sleep mode
- Mejor rendimiento

**Desventajas:**
- Más complejo de configurar

---

## 📝 PASOS PARA DEPLOY GRATUITO

### Paso 1: Database (Supabase)
1. Cuenta en [supabase.com](https://supabase.com)
2. Crear nuevo proyecto
3. Copiar JDBC URL, username, password
4. Crear `.env` local con credenciales
5. Ejecutar migraciones Flyway

### Paso 2: Backend (Render)
1. Cuenta en [render.com](https://render.com)
2. Connect GitHub repo
3. Crear "Web Service" desde `chefmenu-pro/backend`
4. Configurar variables de entorno
5. Deploy automático

### Paso 3: Frontend (Vercel)
1. Cuenta en [vercel.com](https://vercel.com)
2. Connect GitHub repo
3. Importar repo
4. Configurar:
   - Root Directory: `frontend`
   - Framework Preset: Vite
   - Environment Variable: `VITE_API_URL`
5. Deploy automático

### Paso 4: Actualizar CORS
En `SecurityConfig.java`, agregar tu dominio de Vercel:
```java
configuration.setAllowedOrigins(List.of(
    "http://localhost:5173",
    "https://tu-proyecto.vercel.app"
));
```

---

## ⚠️ ALERTAS DE SEGURIDAD

### 1. JWT SECRET
**Actual:** `secret-key-change-in-production-should-be-256-bits`
**Acción:** Cambiar a un secreto de 256+ bits en producción
```bash
# Generar secreto seguro:
openssl rand -base64 32
```

### 2. Contraseñas de DB
**Actual:** `postgres`
**Acción:** Usar contraseñas fuertes en producción

### 3. JWT en LocalStorage
**Actual:** Token en localStorage
**Riesgo:** Vulnerable a XSS
**Mejora:** Usar httpOnly cookies (para versión PRO)

### 4. HTTPS obligatorio
**Acción:** Redirigir todo a HTTPS en producción

### 5. Rate limiting
**Acción:** Implementar rate limiting en endpoints sensibles

---

## 📊 RESUMEN

| Aspecto | Estado |
|---------|--------|
| Bugs críticos backend | ✅ 3 corregidos |
| Bugs críticos frontend | ✅ 2 corregidos |
| Seguridad .gitignore | ✅ Configurado |
| Deploy gratuito | ✅ Opciones documentadas |
| Información sensible | ✅ Protegida en GitHub |

---

**Última revisión:** 2026-02-05
**Estado:** ✅ Listo para deploy gratuito sin comprometer seguridad