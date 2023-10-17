
import { db } from "./firebase";
import { addDoc, 
         collection, 
         orderBy,
         onSnapshot, 
         query, 
         serverTimestamp } from "firebase/firestore";


const refChat = collection(db, 'packages');

export function chatSaveMessage(data) {
   
    return addDoc(refChat, {
        ...data, 
        created_at: serverTimestamp(),
    });
}

export function chatSubscribeToMessages(callback) {
    
   const q = query(refChat, orderBy('created_at'));
    onSnapshot(q, snapshot => {
        
        const messages = snapshot.docs.map(doc => {
            return {
                user: doc.data().user,
                message: doc.data().message,
                created_at: doc.data().created_at?.toDate(),
            }
        });
        
        callback(messages);

    });
}