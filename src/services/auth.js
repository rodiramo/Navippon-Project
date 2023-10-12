import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { auth } from "./firebase"
import { createUserProfile } from "./user";

let userData = {
    id: null,
    email: null,
}
let observers = [];

// Verificamos si hay datos en localStorage sobre el estado de autenticación.
if(localStorage.getItem('userData')) {
    userData = JSON.parse(localStorage.getItem('userData'));
}

onAuthStateChanged(auth, user => {
    if(user) {
        userData = {
            id: user.uid,
            email: user.email,
        }
    } else {
        userData = {
            id: null,
            email: null,
        }
    }
    // Actualizamos localStorage.
    localStorage.setItem('userData', JSON.stringify(userData));
    notifyAll();
});

/**
 * Crea una cuenta de usuario.
 * 
 * @param {{email: string, password: string}} user
 * @returns {Promise}
 */
export async function register({email, password}) {
    try {
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);

        // Creamos el perfil del usuario en Firestore.
        createUserProfile(userCredentials.user.uid, {
            email
        });

        return {...userData};
    } catch (error) {
        return {
            code: error.code,
            message: error.message
        }
    }
}

/**
 * Inicia sesión en el proyecto.
 * 
 * @param {{email: string, password: string}} user
 * @returns {Promise}
 */
export function login({email, password}) {
// export function login(user) {
//     const {email, password} = user;
    // const email = user.email;
    // const password = user.password;

    return signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            // userData = {
            //     id: userCredentials.user.uid,
            //     email: userCredentials.user.email,
            // }
            // Como modificamos el contenido de userData, pedimos notificar a todos los observers.
            // notifyAll();
            // console.log("[auth.js login] Autenticación exitosa: ", userData);
            return userData;
        })
        .catch(error => {
            const output = {
                message: error.message,
                code: error.code,
            }
            console.error("[auth.js login] Error al autenticar: ", output);
            return output;
        });
}

/**
 * 
 * @returns {Promise}
 */
export function logout() {
    // userData = {
    //     id: null,
    //     email: null,
    // }
    // notifyAll();
    return signOut(auth);
}

/**
 * Agrega el observer para ser notificado de los datos.
 * 
 * @param {({id: string, email: string}) => void} callback 
 * @returns {() => void} Función para cancelar la suscripción.
 */
export function subscribeToAuth(callback) {
    // Agregamos el nuevo observer/callback al stack de
    // observers.
    observers.push(callback);

    // Además, vamos a pasarle inmediatamente los datos
    // actuales del objeto.
    notify(callback);

    // Retornamos la función para cancelar la suscripción, que filtra el callback que acabamos de agregar del array.
    return () => {
        observers = observers.filter(obs => obs !== callback)
    };
}

function notify(callback) {
    callback({
        ...userData,
    });
}

function notifyAll() {
    observers.forEach(callback => notify(callback));
}