# Ejercicio 5: Servidor con Login

Este proyecto consiste en la creación de un servidor utilizando Node.js con la estructura generada por **express-generator**. El servidor implementa las siguientes funcionalidades:

- **Página Inicial**: Muestra una lista de elementos (en este caso, imágenes) y un botón para redirigir al login.
- **Página de Login**: Permite ingresar un nombre de usuario y contraseña (validados de forma local) para acceder al sistema.
- **Página Restringida**: Solo accesible si el usuario ha iniciado sesión correctamente.

Además, el proyecto utiliza **express-session** para gestionar las sesiones de los usuarios.

- **Fecha**: 12-11-2024
- **Tecnologías utilizadas**:
  - **Node.js** y **Express**
  - **express-session** para la gestión de sesiones
  - **EJS** como motor de plantillas
  - **HTML y CSS** para la parte visual
- **Archivos incluidos**:
  - `app.js` (configuración principal del servidor)
  - `routes/index.js` (rutas y lógica del servidor)
  - `views/index.ejs` (plantilla de la página inicial)
  - `views/login.ejs` (plantilla del formulario de login)
  - `.gitignore` (para excluir `node_modules` y otros archivos innecesarios)
  - `package.json` (gestión de dependencias)
