import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

/**
 * 
 * @param {string} id 
 * @returns {{id: string, email: string}}
 */
export async function getUserProfileById(id) {
    const snapshot = await getDoc(doc(db, `/users/${id}`));
    return {
        id,
        email: snapshot.data().email,
    }
}

/**
 * Create user Profile
 * 
 * @param {string} id 
 * @param {{}} data 
 * @returns {Promise}
 */
export async function createUserProfile(id, data) {
   
    const userRef = doc(db, `/users/${id}`);
    return setDoc(userRef, data);
}