import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";


/**
 * 
 * @param {string} id 
 * @returns {{id: string, name: string}}
 */
export async function getPackages(id) {
 try {  
    const snapshot = await getDoc(doc(db, `/packages/${id}`));
    return {
        id,
        name: snapshot.data().name,
        activities: snapshot.data().activities,
        categories: snapshot.data().categories,
        description: snapshot.data().description,
        location: snapshot.data().location,
        price: snapshot.data().price,
        img: snapshot.data().img,
        imgDescription: snapshot.data().imgDescription,

    };
 } catch (error) {
        console.error("Error fetching package:", error);
     
    }
}

