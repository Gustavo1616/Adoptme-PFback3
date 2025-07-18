# Plantilla de API para Adopción de Mascotas
API RESTful para gestionar usuarios, mascotas y adopciones. Incluye autenticación, documentación interactiva y tests.

# 🚀 Inicio Rápido

## Prerrequisitos
* Node.js (v18+)

* npm

* MongoDB

### Instalación

Clona el repositorio e instala dependencias:

* npm install


### Ejecución
Desarrollo: npm run dev (con nodemon)

Producción: npm start

La API estará disponible en http://localhost:3000.

### 🧪 Pruebas
Ejecuta los tests de unidad e integración:

npm test

Los tests se conectan a la base de datos adoptme y limpian datos de prueba (specie: "test").

## 📚 Documentación de API (Swagger)
Explora los endpoints interactivos en:

http://localhost:3000/api/docs

### 📦 Dependencias Clave

#### Producción
* Express, mongoose: Core de la API y ORM para MongoDB.

* Bcrypt, jsonwebtoken, cookie-parser: Autenticación y gestión de sesiones.

* Multer: Subida de archivos (imágenes).

* Swagger-jsdoc, swagger-ui-express: Documentación de API interactiva.

* Dotenv, winston, @faker-js/faker: Configuración, logging y datos mock.

### Testing
* Chai, mocha, supertest: Frameworks para testing HTTP y de unidad.

## 🐳 Docker Hub
[[Enlace a imagen Docker en Docker Hub](https://hub.docker.com/r/gustavopi/server01/tags)]