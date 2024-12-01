# Ejercicio 5: Servidor con Login

Este proyecto consiste en la creación de un servidor utilizando Node.js con la estructura generada por **express-generator**. El servidor implementa las siguientes funcionalidades:

- **Página Inicial**: Muestra una lista de elementos (en este caso, imágenes) y un botón para redirigir al login.
- **Página de Login**: Permite ingresar un nombre de usuario y contraseña (validados de forma local) para acceder al sistema.
- **Página Restringida**: Solo accesible si el usuario ha iniciado sesión correctamente.

Además, el proyecto utiliza **express-session** para gestionar las sesiones de los usuarios.

- **Fecha**: 12-11-2024

# Ejercicio 6: Chat en tiempo real con Socket.IO y sistema de login en Express

Este ejercicio consiste en integrar un chat en tiempo real utilizando Socket.IO con un sistema de login basado en Express. Solo los usuarios autenticados podrán acceder al chat, y cada mensaje enviado al chat estará etiquetado con el nombre del usuario. Además, se mantiene un histórico de los mensajes enviados durante la sesión.

- **Página Inicial**: Muestra una lista de elementos (en este caso, imágenes) y un botón para redirigir al login.
- **Página de Login**: Permite ingresar un nombre de usuario y contraseña (validados de forma local) para acceder al sistema.
- **Chat en tiempo real**: Solo accesible si el usuario ha iniciado sesión correctamente. Aparece su nombre y el histórico de mensajes.

Se deben conectar dos chats a la vez para que haya un flujo continuo de mensajes.

- **Fecha**: 01-12-2024
