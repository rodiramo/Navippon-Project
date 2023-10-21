import { createUserWithEmailAndPassword, 
         onAuthStateChanged, 
         signInWithEmailAndPassword, 
         signOut, updateProfile } from "firebase/auth"
import { auth } from "./firebase"
import { createUserProfile, editUserProfile } from "./user";

let userData = {
    id: null,
    email: null,
    name: null,
    interests:null,
    role: null,
}
let observers = [];

if(localStorage.getItem('userData')) {
    userData = JSON.parse(localStorage.getItem('userData'));
}

onAuthStateChanged(auth, (user) => {
    if (user) {
      userData = {
        id: user.uid,
        email: user.email,
        role: checkAdminCriteria(user.email),
      };
    } else {
      userData = {
        id: null,
        email: null,
        role: null, 
      };
    }
    localStorage.setItem("userData", JSON.stringify(userData));
    notifyAll();
  });


function checkAdminCriteria(email) {
    const isAdmin = email.endsWith('@admin.com'); 
    return isAdmin;
}

/**
 * Create user profile
 * 
 * @param {{email: string, name: string, interests: string, password: string}} user
 * @returns {Promise}
 */
export async function register({ email, password, name, interests }) {
    try {
        const isAdmin = checkAdminCriteria(email);

        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);

        const userRole = isAdmin ? "admin" : "user";

        // Save user in Firebase 
        await createUserProfile(userCredentials.user.uid, {
            name,
            interests,
            email,
            role: userRole,
        });

        const updatedUserData = {
            id: userCredentials.user.uid,
            email,
            name,
            interests,
            role: userRole, 
        };

        userData = updatedUserData;

        localStorage.setItem('userData', JSON.stringify(userData));

        return updatedUserData;
    } catch (error) {
        console.error("Error during user registration:", error);
        return {
            code: error.code,
            message: error.message,
        };
    }
}


/**
 * Fetch user data from the server
 * @returns {Promise}
 */
export async function fetchUserData() {
    return userData;
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
            console.error("[auth.js login] Error to authenticate: ", output);
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
 * @param {{name: string|null}} data
 * @return {Promise}
 */

export async function editUser({name}) {
    try {
        const promiseAuth = updateProfile(auth.currentUser, {
            name
        });

        const promiseProfile = editUserProfile(userData.id, {
            name
        });

        userData = {
            ...userData,
            name,
        }
        localStorage.setItem('user', JSON.stringify(userData));
        notifyAll();

        return Promise.all([promiseAuth, promiseProfile]);
    } catch (error) {
        throw error;
    }
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