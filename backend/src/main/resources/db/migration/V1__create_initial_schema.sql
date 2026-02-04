-- Tabla de usuarios
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100),
    plan_tipo VARCHAR(20) DEFAULT 'FREE',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    activo BOOLEAN DEFAULT TRUE
);

-- Tabla de ingredientes
CREATE TABLE ingredientes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    precio_unit DECIMAL(8,2) NOT NULL,
    unidad VARCHAR(20) NOT NULL,
    stock_actual DECIMAL(8,2) DEFAULT 0,
    alerta_stock DECIMAL(8,2),
    proveedor VARCHAR(100),
    usuario_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
    UNIQUE(nombre, usuario_id)
);

-- Tabla de recetas
CREATE TABLE recetas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    foto_url TEXT,
    descripcion TEXT,
    porciones_base INTEGER DEFAULT 4,
    tiempo_preparacion INTEGER,
    dificultad VARCHAR(20),
    usuario_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
    version INTEGER DEFAULT 1,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    activa BOOLEAN DEFAULT TRUE
);

-- Tabla de ingredientes por receta
CREATE TABLE receta_ingredientes (
    id SERIAL PRIMARY KEY,
    receta_id INTEGER REFERENCES recetas(id) ON DELETE CASCADE,
    ingrediente_id INTEGER REFERENCES ingredientes(id),
    cantidad DECIMAL(8,2) NOT NULL,
    unidad VARCHAR(20) NOT NULL
);

-- Tabla de pasos de receta
CREATE TABLE pasos_receta (
    id SERIAL PRIMARY KEY,
    receta_id INTEGER REFERENCES recetas(id) ON DELETE CASCADE,
    paso_numero INTEGER NOT NULL,
    descripcion TEXT NOT NULL
);

-- Tabla de menús
CREATE TABLE menus (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    usuario_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de recetas en menú
CREATE TABLE menu_recetas (
    id SERIAL PRIMARY KEY,
    menu_id INTEGER REFERENCES menus(id) ON DELETE CASCADE,
    receta_id INTEGER REFERENCES recetas(id),
    dia VARCHAR(20) NOT NULL,
    hora_servicio VARCHAR(20) NOT NULL,
    porciones INTEGER NOT NULL
);

-- Tabla de historial de stock
CREATE TABLE historial_stock (
    id SERIAL PRIMARY KEY,
    ingrediente_id INTEGER REFERENCES ingredientes(id),
    cantidad_anterior DECIMAL(8,2),
    cantidad_nueva DECIMAL(8,2),
    tipo_cambio VARCHAR(20) NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    referencia_id INTEGER
);

-- Tabla de pedidos a proveedores
CREATE TABLE pedidos_proveedor (
    id SERIAL PRIMARY KEY,
    proveedor VARCHAR(100) NOT NULL,
    estado VARCHAR(20) DEFAULT 'PENDIENTE',
    fecha_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10,2),
    usuario_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabla de detalles de pedido
CREATE TABLE pedido_detalle (
    id SERIAL PRIMARY KEY,
    pedido_id INTEGER REFERENCES pedidos_proveedor(id) ON DELETE CASCADE,
    ingrediente_id INTEGER REFERENCES ingredientes(id),
    cantidad_solicitada DECIMAL(8,2) NOT NULL,
    precio_estimado DECIMAL(8,2)
);

-- Tabla de suscripciones
CREATE TABLE suscripciones (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
    stripe_customer_id VARCHAR(255),
    stripe_subscription_id VARCHAR(255),
    plan_tipo VARCHAR(20) NOT NULL,
    fecha_inicio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_fin TIMESTAMP,
    estado VARCHAR(20) DEFAULT 'ACTIVA'
);

-- Índices para optimización
CREATE INDEX idx_ingredientes_usuario ON ingredientes(usuario_id);
CREATE INDEX idx_recetas_usuario ON recetas(usuario_id);
CREATE INDEX idx_menus_usuario ON menus(usuario_id);
CREATE INDEX idx_receta_ingredientes_receta ON receta_ingredientes(receta_id);
CREATE INDEX idx_menu_recetas_menu ON menu_recetas(menu_id);
CREATE INDEX idx_historial_stock_ingrediente ON historial_stock(ingrediente_id);

-- Insertar datos de ejemplo para testing
INSERT INTO usuarios (email, password, nombre, apellido, plan_tipo) 
VALUES ('chef@ejemplo.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iAt6Z5EH', 'Chef', 'Ejemplo', 'FREE');