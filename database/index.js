/*const database = {};
database.user = require('./model/user.model');*/
const { register, isLoginRight, sendMessage, getMessages, userStorage } = require('./model/user.model')

async function initializeUsers(){
    const NAMES = ["carlos", "paloma", "alvaro", "javi"];
    /*NAMES.forEach((username) => {
       register(username, "1234"); //si se quiere registrar de otra forma no podria
    });*///solo puedousar forEach si la función no es asincrona
    for (const username of NAMES) {
        await register(username, "1234"); // Espera a que cada usuario sea registrado
    }
    console.log("Usuarios inicializados")
    console.log([...userStorage.entries()]);

    //mensajes de prueba
    sendMessage("carlos", "¡Hola, este es mi primer mensaje!");
    sendMessage("paloma", "¡Qué tal!");
    sendMessage("carlos", "¿Cómo están todos?");
    console.log("Mensajes iniciales guardados:");
    console.log(getMessages("carlos"));
}

async function initializeDB() {
    await initializeUsers();
    console.log("Base de datos inicializada");
}

initializeDB().catch(err => console.error("Error inicializando la base de datos:", err));