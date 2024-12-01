//esto debería estar DENTRO de la carpeta modelos, y "por encima", tener un index que actúe como base de datos
//de lo que no he cogido, fijarme en lo que hizo él en su proyecto
const bcrypt = require('bcrypt');

//mapa donde se almacenan los usuarios
const userStorage = new Map();

// Función para generar el hash de la contraseña
async function generatedHash(password) {
    return await bcrypt.hash(password, 10);
}

//se encarga de "comparar" la contraseña, comparando el texto plano con el hash
async function comparePass(password, hash) {
    return await bcrypt.compare(password, hash);
}

//función principa, dnd registro el nuevo usuario
async function register(username, password) {
    if (userStorage.has(username)) {
        throw new Error(`Ya existe el usuario ${username}.`);
    }
    //si no existe, genero el hash para encriptar la contraseña del usuario
    const hash = await generatedHash(password);
    userStorage.set(username, { username, hash, messages: [] });
    console.log(`Usuario registrado: ${username}`);
}

//comprobar si el username y el password que ha introducido en el formulario es correcto
async function isLoginRight(username, password) {
    if (!userStorage.has(username)) {
        return false;
    }
    const user = userStorage.get(username);
    return await comparePass(password, user.hash);
}

//para enviar los mensajes
function sendMessage(username, message) {
    if (!userStorage.has(username)) {
        throw new Error(`Usuario no encontrado: ${username}`);
    }
    const user = userStorage.get(username);
    user.messages.push({ text: message, timestamp: new Date() });
    return user.messages;
}

//para recibir los mensajes
function getMessages(username) {
    if (!userStorage.has(username)) {
        throw new Error(`Usuario no encontrado: ${username}`);
    }
    return userStorage.get(username).messages;
}

module.exports = {register, isLoginRight, sendMessage, getMessages, userStorage};
