import axios from "axios";
import { Content } from "../types/Content";

const baseURL = process.env.REACT_APP_API_URL;

export const createMessageCall = async (sender: string, content: Content, files: File[], conversationId: string) => {
    const formData = new FormData();
    formData.append('sender', sender);
    formData.append('conversationId', conversationId);
    formData.append('text', content.text);

    for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
    }

    const response = await axios.post(`${baseURL}/messages/create`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
}

// TODO: Implement the rest of the CRUD operations
// export const updateMessage = async (message: Message) => {
//     const response = await axios.put(`${baseURL}/messages/${message._id}`, message);
//     return response.data;
// }

// export const deleteMessage = async (messageId: string) => {
//     const response = await axios.delete(`${baseURL}/messages/${messageId}`);
//     return response.data;
// }