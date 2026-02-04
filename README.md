# ChefMenu Pro - MVP

Gestor de recetas y menús SaaS para chefs y restaurantes pequeños (1-10 empleados).

## 🚀 Stack Tecnológico

**Backend:**
- Java 17
- Spring Boot 3.2.0
- Spring Security + JWT
- PostgreSQL
- Flyway (migraciones DB)
- Maven

**Frontend:**
- React 18
- Vite
- TailwindCSS
- React Router
- Axios
- Lucide Icons

**Despliegue en Producción:**
- Backend: Railway
- Frontend: Vercel
- Database: Railway PostgreSQL

## 📋 Funcionalidades MVP

- ✅ Autenticación (registro/login con JWT)
- ✅ Gestión de ingredientes (CRUD completo)
- ✅ Gestión de recetas con escalado automático
- ✅ Dashboard con métricas y alertas de stock
- ✅ Menús semanales (drag-and-drop - en desarrollo)
- ✅ Reportes (en desarrollo)
- ✅ Plan Freemium (50 recetas gratis, PRO ilimitado)

## 🔧 Instalación

### Prerrequisitos

- Java 17+
- Node.js 18+
- PostgreSQL 15+
- Maven 3.8+

### Backend

```bash
cd chefmenu-pro/backend

# Configurar base de datos en src/main/resources/application.properties
# Crear database: createdb chefmenu_db

# Ejecutar migraciones y arrancar
mvn spring-boot:run
```

El backend estará disponible en `http://localhost:8080`

API Documentation: `http://localhost:8080/swagger-ui.html` (próximamente)

### Frontend

```bash
cd chefmenu-pro/frontend

# Instalar dependencias
npm install

# Arrancar servidor de desarrollo
npm run dev
```

El frontend estará disponible en `http://localhost:5173`

## 🗄️ Base de Datos

Las migraciones se ejecutan automáticamente con Flyway al iniciar el backend.

Schema inicial (V1__create_initial_schema.sql):
- usuarios
- ingredientes
- recetas
- receta_ingredientes
- pasos_receta
- menus
- menu_recetas
- historial_stock
- pedidos_proveedor
- pedido_detalle
- suscripciones

## 📁 Estructura del Proyecto

```
chefmenu-pro/
├── backend/
│   ├── src/main/java/com/chefmenu/
│   │   ├── config/          # Configuración (Security, JWT, etc)
│   │   ├── controller/      # REST API endpoints
│   │   ├── dto/             # Data Transfer Objects
│   │   ├── model/           # Entities JPA
│   │   ├── repository/      # JPA Repositories
│   │   ├── security/        # JWT, UserDetails
│   │   └── service/         # Business Logic
│   ├── src/main/resources/
│   │   ├── application.properties
│   │   └── db/migration/    # Flyway migrations
│   └── pom.xml
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── context/         # AuthContext
│   │   ├── pages/           # Route pages
│   │   └── services/        # API calls
│   └── package.json
└── README.md
```

## 🔑 API Endpoints

### Auth
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/register` - Registro

### Ingredientes
- `GET /api/ingredientes` - Listar todos
- `GET /api/ingredientes/:id` - Obtener por ID
- `POST /api/ingredientes` - Crear
- `PUT /api/ingredientes/:id` - Actualizar
- `DELETE /api/ingredientes/:id` - Eliminar
- `GET /api/ingredientes/stock-bajo` - Alertas stock bajo

### Recetas
- `GET /api/recetas` - Listar todas
- `GET /api/recetas/:id` - Obtener por ID
- `GET /api/recetas/:id/escalar?porciones=N` - Escalar receta
- `POST /api/recetas` - Crear
- `PUT /api/recetas/:id` - Actualizar
- `DELETE /api/recetas/:id` - Eliminar (soft delete)

## 🚀 Deploy en Producción

### Backend en Railway

1. **Crear cuenta en Railway**: [railway.app](https://railway.app)
2. **Crear nuevo proyecto**
3. **Añadir PostgreSQL database**
4. **Deploy desde GitHub**:
   - Conectar tu repositorio de GitHub
   - Railway detectará automáticamente el proyecto Spring Boot
   - Configurar variables de entorno:
     ```
     SPRING_DATASOURCE_URL=jdbc:postgresql://host:port/database
     SPRING_DATASOURCE_USERNAME=postgres
     SPRING_DATASOURCE_PASSWORD=your_password
     JWT_SECRET=your-super-secret-jwt-key-min-256-bits
     ```
5. **Obtener la URL del backend**: `https://your-project.railway.app`

### Frontend en Vercel

1. **Crear cuenta en Vercel**: [vercel.com](https://vercel.com)
2. **Instalar Vercel CLI**:
   ```bash
   npm i -g vercel
   ```
3. **Deploy desde terminal**:
   ```bash
   cd chefmenu-pro/frontend
   vercel
   ```
4. **Configurar variables de entorno**:
   ```
   VITE_API_URL=https://your-project.railway.app/api
   ```
5. **Actualizar `vercel.json`** con la URL del backend

### Deploy con Docker (Opcional)

Para desarrollo local con docker-compose:
```bash
docker-compose up --build
```

## 🎯 Próximos Pasos

1. Completar generador de menús con drag-and-drop
2. Implementar reportes con gráficos (Recharts)
3. Integrar Stripe para pagos
4. Exportar menús a PDF
5. Integración WhatsApp para pedidos
6. Modo offline-first con PWA
7. Sugerencias con IA

## 📝 Notas de Desarrollo

- El JWT secret debe cambiarse en producción
- Las contraseñas se encriptan con BCrypt
- CORS habilitado para localhost:5173 y localhost:3000
- Las validaciones usan Jakarta Validation API

## 🤝 Contribución

Este es un MVP en desarrollo. Para contribuir:

1. Fork del repositorio
2. Crear rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

Proprietary - ChefMenu Pro

---

**Desarrollado para chefs y restaurantes en España y Latinoamérica** 🇪🇸 🌎