import { Content } from "../models/Content";
import { Message } from "../models/Message";
import db from "../firebase/db";
import { v4 as uuidv4 } from "uuid";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";


class MessagesService {
    async createMessage(sender: string, content: Content, conversationId: string): Promise<Message> {
        const messageId = uuidv4();
        let message: Message; // Declare message here

        console.log(conversationId);

        if (content.type === "file" && content.file) {
            const storage = getStorage();
            const fileRef = ref(storage, `messages/${messageId}`);
            const fileBlob = new Blob([content.file]); // Convert string to Blob
            await uploadBytesResumable(fileRef, fileBlob);

            message = {
                _id: messageId,
                sender: sender,
                conversationId: conversationId,
                content: {
                    type: "file",
                    file: fileRef.fullPath,
                    text: "File"
                },
                createdAt: Timestamp.now().toDate().toISOString(),
                updatedAt: Timestamp.now().toDate().toISOString()
            };
        } else {
            message = {
                _id: messageId,
                sender: sender,
                conversationId: conversationId,
                content: content,
                createdAt: Timestamp.now().toDate().toISOString(),
                updatedAt: Timestamp.now().toDate().toISOString()
            };
        }

        const messageRef = doc(db, "messages", messageId);
        await setDoc(messageRef, message);
        return message;
    }
}

export default new MessagesService();