import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { auth } from "./firebase"
import { createUserProfile } from "./user";

let userData = {
    id: null,
    email: null,
}
let observers = [];

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
    localStorage.setItem('userData', JSON.stringify(userData));
    notifyAll();
});

/**
 * Create user profile
 * 
 * @param {{email: string, password: string}} user
 * @returns {Promise}
 */
export async function register({email, password}) {
    try {
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);

      //save user in Firebase
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
 * Session Start
 * 
 * @param {{email: string, password: string}} user
 * @returns {Promise}
 */
export function login({email, password}) {

    return signInWithEmailAndPassword(auth, email, password)
        .then(() => {
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

    return signOut(auth);
}

/**
 * Suscription.
 * 
 * @param {({id: string, email: string}) => void} callback 
 * @returns {() => void} cancel suscription.
 */
export function subscribeToAuth(callback) {
   
    observers.push(callback);

    notify(callback);

   
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