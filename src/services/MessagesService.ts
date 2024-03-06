import { Content } from "../models/Content";
import { Message } from "../models/Message";
import db from "../firebase/db";
import { v4 as uuidv4 } from "uuid";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Attachement } from "../models/Attachement";
import fs from "fs";

class MessagesService {
    async createMessage(sender: string, content: Content, files: any, conversationId: string): Promise<Message> {
        const storage = getStorage();
        const newAttachments: Attachement[] = [];

        const readFileAsync = (file: any) => {
            return new Promise((resolve, reject) => {
                fs.readFile(file.path, (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                });
            });
        };

        if (Array.isArray(files)) {
            if (files.length > 0) {
                for (let i = 0; i < files.length; i++) {
                    const file = files[i];
                    const fileRef = ref(storage, `conversations/${conversationId}/attachements/${uuidv4()}`);

                    try {
                        const buffer: any = await readFileAsync(file);
                        const fileBlob = new Blob([buffer], { type: file.type });
                        await uploadBytes(fileRef, fileBlob);
                        const url = await getDownloadURL(fileRef);
                        const attachement: Attachement = {
                            url,
                            type: file.type,
                            name: file.name,
                            size: file.size,
                        };
                        newAttachments.push(attachement);
                    } catch (error) {
                        console.error("Error reading file:", error);
                    }
                }
            }
        } else {
            const file = files;
            const fileRef = ref(storage, `conversations/${conversationId}/attachements/${uuidv4()}`);

            try {
                const buffer: any = await readFileAsync(file);
                const fileBlob = new Blob([buffer], { type: file.type });
                await uploadBytes(fileRef, fileBlob);
                const url = await getDownloadURL(fileRef);
                const attachement: Attachement = {
                    url,
                    type: file.type,
                    name: file.name,
                    size: file.size,
                };
                newAttachments.push(attachement);
            } catch (error) {
                console.error("Error reading file:", error);
            }
        }

        const message: Message = {
            _id: uuidv4(),
            conversationId,
            sender,
            content: { text: content.text, attachements: newAttachments },
            createdAt: Timestamp.now().toDate().toISOString(),
            updatedAt: Timestamp.now().toDate().toISOString(),
        };

        const messageRef = doc(db, "messages", message._id);
        await setDoc(messageRef, message);

        return message;
    }
}

export default new MessagesService();
