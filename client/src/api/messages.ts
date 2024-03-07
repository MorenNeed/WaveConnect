import axios from "axios";
import { Content } from "../types/Content";

const baseURL = process.env.REACT_APP_API_URL;

export const createMessageCall = async (sender: string, content: Content, files: File[], conversationId: string) => {
    const formData = new FormData();
    formData.append('sender', sender);
    formData.append('conversationId', conversationId);
    formData.append('text', content.text);

    if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
        }
    }

    const response = await axios.post(`${baseURL}/messages`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
}

export const updateMessageCall = async (messageId: string, content: Content) => {
    const response = await axios.put(`${baseURL}/messages/${messageId}`, content);
    return response.data;
}

export const deleteMessageCall = async (messageId: string) => {
    const response = await axios.delete(`${baseURL}/messages/${messageId}`);
    return response.data;
}