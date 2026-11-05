# MoviAlerta Quito

Sistema de administración y gestión de información para **MoviAlerta Quito**, desarrollado como proyecto académico para la asignatura de Ingeniería Web de la Universidad de Las Américas (UDLA).

El proyecto implementa una arquitectura MVC utilizando NestJS, TypeScript y PostgreSQL. Permite administrar recorridos, paradas e incidencias que alimentan la información del sistema principal.

## Objetivo

Desarrollar una administración que permita gestionar los datos del Core de MoviAlerta Quito, manteniendo relaciones válidas entre las entidades y protegiendo las operaciones mediante autenticación.

## Funcionalidades

### Autenticación
- Inicio de sesión mediante correo electrónico y contraseña.
- Validación de credenciales con bcrypt.
- Generación de tokens JWT.
- Protección de las operaciones administrativas mediante `JwtAuthGuard`.

### Gestión de recorridos
- Registrar recorridos.
- Consultar recorridos.
- Actualizar recorridos.
- Eliminar recorridos.
- Validar que no existan códigos de recorrido duplicados.

### Gestión de paradas
- Registrar paradas asociadas a un recorrido.
- Consultar, actualizar y eliminar paradas.
- Validar que el recorrido seleccionado exista.

### Gestión de incidencias
- Registrar incidencias de tipo retraso, aglomeración o autobús que no pasó.
- Consultar, actualizar y eliminar incidencias.
- Seleccionar el recorrido y su parada mediante listas desplegables dependientes.
- Validar en el backend que la parada seleccionada pertenezca al recorrido indicado antes de guardar la incidencia.

## Validaciones del backend

Las validaciones se realizan en el servidor, antes de almacenar los datos en PostgreSQL.

Entre ellas:

- Evitar códigos de recorrido duplicados.
- Comprobar que el recorrido seleccionado exista.
- Comprobar que la parada exista.
- Verificar que la parada pertenezca al recorrido seleccionado.
- Proteger las operaciones administrativas mediante JWT.

La interfaz facilita la selección de relaciones mediante dropdowns, pero la validación definitiva se realiza en el backend.

## Arquitectura

El proyecto utiliza la estructura modular de NestJS:

```text
src/
├── auth/
├── guards/
├── users/
├── routes/
│   └── entities/
├── stops/
│   └── entities/
├── incidences/
│   └── entities/
├── app.module.ts
└── main.ts

public/
├── admin.html
├── css/
│   └── admin.css
└── js/
    └── admin.js
```

### Responsabilidad de las capas

- **Controllers:** reciben las solicitudes HTTP y exponen los endpoints.
- **Services:** contienen la lógica de negocio y las validaciones.
- **Entities:** representan las tablas y relaciones de PostgreSQL.
- **Modules:** organizan e integran los componentes.
- **Guards:** protegen los endpoints que requieren autenticación.

## Base de datos

Motor: **PostgreSQL**

La aplicación utiliza TypeORM para gestionar las entidades y sus relaciones.

Tablas principales:

- `users`: usuarios del sistema.
- `routes`: recorridos.
- `stops`: paradas asociadas a recorridos.
- `incidences`: incidencias asociadas a recorridos y, cuando corresponde, a paradas.

## Tecnologías utilizadas

- NestJS
- TypeScript
- Node.js
- PostgreSQL
- TypeORM
- JWT
- bcrypt
- HTML5
- CSS3
- JavaScript
- Git y GitHub

## 💻 Requisitos

- Node.js
- npm
- PostgreSQL
- Git

## Instalación y ejecución local

### 1. Clonar el repositorio

```bash
git clone https://github.com/Alejomanzano/MoviAlerta-Quito.git
```

### 2. Entrar en la carpeta

```bash
cd MoviAlerta-Quito
```

### 3. Instalar dependencias

```bash
npm install
```

### 4. Configurar las variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=TU_CLAVE_DE_POSTGRESQL
DB_DATABASE=movi_alerta_quito
```

Reemplazar `TU_CLAVE_DE_POSTGRESQL` por la contraseña configurada en PostgreSQL.

**Importante:** no subir el archivo `.env` a GitHub ni publicar contraseñas o secretos.

### 5. Ejecutar el backend

```bash
npm run start:dev
```

El backend estará disponible localmente en:

```text
http://localhost:3000
```

### 6. Abrir la administración

En otra terminal, desde la raíz del proyecto:

```bash
npx serve public -l 5500
```

Abrir en el navegador la dirección que muestre la terminal. Si el puerto 5500 está ocupado, `serve` puede seleccionar otro puerto.

## Endpoints principales

Todas las operaciones de administración de usuarios, recorridos, paradas e incidencias requieren autenticación JWT, excepto el inicio de sesión.

### Autenticación

| Método | Endpoint | Descripción |
|---|---|---|
| POST | `/auth/login` | Iniciar sesión |

### Usuarios

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/users` | Consultar usuarios |
| POST | `/users` | Crear usuario |
| PUT | `/users/:id` | Actualizar usuario |
| DELETE | `/users/:id` | Eliminar usuario |

### Recorridos

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/routes` | Consultar recorridos |
| GET | `/routes/:id` | Consultar un recorrido |
| POST | `/routes` | Crear recorrido |
| PUT | `/routes/:id` | Actualizar recorrido |
| DELETE | `/routes/:id` | Eliminar recorrido |

### Paradas

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/stops` | Consultar paradas |
| GET | `/stops/:id` | Consultar una parada |
| POST | `/stops` | Crear parada |
| PUT | `/stops/:id` | Actualizar parada |
| DELETE | `/stops/:id` | Eliminar parada |

### Incidencias

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/incidences` | Consultar incidencias |
| GET | `/incidences/:id` | Consultar una incidencia |
| POST | `/incidences` | Registrar incidencia |
| PUT | `/incidences/:id` | Actualizar incidencia |
| DELETE | `/incidences/:id` | Eliminar incidencia |

## Pruebas realizadas

Se realizaron pruebas mediante Postman y la interfaz de administración.

- Inicio de sesión y generación de JWT.
- Bloqueo de endpoints protegidos sin token.
- Operaciones CRUD de recorridos.
- Rechazo de códigos de recorrido duplicados.
- Operaciones CRUD de paradas.
- Selección de recorrido y carga de paradas relacionadas mediante dropdown.
- Registro de incidencias desde la interfaz.
- Rechazo de incidencias cuya parada no pertenece al recorrido seleccionado.
- Verificación de los registros almacenados en PostgreSQL.

## Autor

**Alejandro Manzano**  
Estudiante de Ingeniería de Software  
Universidad de Las Américas (UDLA), Ecuador.

GitHub: https://github.com/Alejomanzano

## Propósito académico

Proyecto desarrollado para aplicar arquitectura MVC, operaciones CRUD, autenticación, relaciones entre entidades, validaciones en backend y administración de información mediante una interfaz web.