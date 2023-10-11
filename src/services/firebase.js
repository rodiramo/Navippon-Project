
 import { initializeApp } from "firebase/app";
 import { getFirestore } from "firebase/firestore"
 import { getAuth } from "firebase/auth";
    // TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
    apiKey: "AIzaSyC3ysG3l6QY91hij8FpHE-jZ0QpYGev6bI",
  authDomain: "cwm-2023-2-t-5a6a3.firebaseapp.com",
  projectId: "cwm-2023-2-t-5a6a3",
  storageBucket: "cwm-2023-2-t-5a6a3.appspot.com",
  messagingSenderId: "1015293892450",
  appId: "1:1015293892450:web:43d77d55a68c3c931e7e3b"
};
  
// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Inicializamos Firestore.
export const db = getFirestore(app);

// Inicializamos Auth.
export const auth = getAuth(app);