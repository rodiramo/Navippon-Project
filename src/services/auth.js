import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "./firebase"

let userData = {
    id: null,
    email: null,
}
let observers = [];

/**
 *
 * 
 * @param {{email: string, password: string}} user
 * @returns {Promise}
 */
export function login({email, password}) {


    return signInWithEmailAndPassword(auth, email, password)
        .then(userCredentials => {
            userData = {
                id: userCredentials.user.uid,
                email: userCredentials.user.email,
            }
           
            notifyAll();
           
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
 * @param {({}) => void} callback 
 */
export function subscribeToAuth(callback) {
    
    observers.push(callback);

   
    notify(callback);
}

function notify(callback) {
    callback({
        ...userData,
    });
}

function notifyAll() {
    observers.forEach(callback => notify(callback));
}