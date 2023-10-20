import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

/**
 * 
 * @param {string} id 
 * @returns {{id: string, email: string, name: string, interests: string, role: string}}
 */
export async function getUserProfileById(id) {
    const snapshot = await getDoc(doc(db, `/users/${id}`));
    if (snapshot.exists()) {
        const data = snapshot.data();
        return {
            id: id,
            email: data.email,
            name: data.name,
            interests: data.interests,
        };
    } else {
        return null; 
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