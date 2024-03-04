import axios from "axios";
import { Content } from "../types/Content";

const baseURL = process.env.REACT_APP_API_URL;

export const createMessageCall = async (sender: string, content: Content, conversationId: string) => {
    const response = await axios.post(`${baseURL}/messages/create`, { sender, content, conversationId });
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