import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { db } from "./firebase";

/**
 * 
 * @param {string} id 
 * @returns {Promise<{ id: string, name: string, activities: Array, categories: Array, description: string, location: string, price: number, img: string, imgDescription: string } | null>} The package data or null if not found.
 */
export async function getPackages(id) {
  try {
    const snapshot = await getDoc(doc(db, `packages/${id}`));
    const data = snapshot.data();
    if (snapshot.exists() && data) {
      return {
        id,
        name: data.name || "",
        activities: data.activities || [],
        categories: data.categories || [],
        description: data.description || "",
        location: data.location || "",
        price: data.price || 0,
        img: data.img || "",
        imgDescription: data.imgDescription || "",
      };
    } else {
      // Package not found
      return null;
    }
  } catch (error) {
    console.error("Error fetching package:", error);
    return null;
  }
}

/**
 * Get all package IDs 
 * @returns {Promise<Array<string>>} 
 */
export async function getAllPackageIds() {
  const packageIds = [];
  try {
    const querySnapshot = await getDocs(collection(db, "packages"));
    querySnapshot.forEach((doc) => {
      packageIds.push(doc.id);
    });
    return packageIds;
  } catch (error) {
    console.error("Error fetching package IDs", error);
    return [];
  }
}
