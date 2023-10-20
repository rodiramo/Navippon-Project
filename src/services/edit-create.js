import { doc, setDoc, getDoc, updateDoc, deleteField } from "firebase/firestore";
import { db } from "./firebase";
/**
 * Generate a unique ID.
 * @returns {string} A unique identifier.
 */
function generateUniqueId() {
    const timestamp = Date.now().toString(36);
    const randomNumber = Math.random().toString(36).substr(2, 5);
    return `${timestamp}-${randomNumber}`;
  }
/**
 * Create a package
 * 
 * @param {{name: string, price: number, description: string, activities: string[], categories: string[]}} packageData
 * @returns {Promise}
 */
export async function createPackage({ name, price, description, activities, categories }) {
    try {

        const id = generateUniqueId();

        // Create the package in Firebase 
        const packageRef = doc(db, "packages", id);
        const packageData = {
            name,
            price,
            description,
            activities,
            categories,
        };

        await setDoc(packageRef, packageData);

        return packageData;
    } catch (error) {
        console.error("Error during creation of Package:", error);
        return {
            code: error.code,
            message: error.message,
        };
    }
}


/**
 * Edit a package
 * 
 * @param {string} packageId - The ID of the package to edit.
 * @param {{name: string, price: number, description: string, activities: string[], categories: string[]}} updatedData
 * @returns {Promise}
 */
export async function editPackage(packageId, updatedData) {
    try {

        const packageRef = doc(db, "packages", packageId);
        const packageDoc = await getDoc(packageRef);

        if (!packageDoc.exists()) {
            throw new Error("Package not found");
        }

        const updateData = {
            ...updatedData,
        };

      
        await updateDoc(packageRef, updateData);

        return updateData;
    } catch (error) {
        console.error("Error during package update:", error);
        return {
            code: error.code,
            message: error.message,
        };
    }
}