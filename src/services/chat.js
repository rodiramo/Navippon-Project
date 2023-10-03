
import { db } from "./firebase";
import { addDoc, collection, onSnapshot } from "firebase/firestore";

const refChat = collection(db, 'chat');

export function chatSaveMessage(data) {
    return addDoc(refChat, data);
}

export function chatSubscribeToMessages(callback) {
   
    onSnapshot(refChat, snapshot => {
        const messages = snapshot.docs.map(doc => {
            return {
                user: doc.data().user,
                message: doc.data().message,
            }
        });
        callback(messages);
    });
}