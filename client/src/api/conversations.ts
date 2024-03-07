import axios from "axios";
import { Message } from "../types/Message";

const baseURL = process.env.REACT_APP_API_URL;

export const createConversationByUsersIdCall = async (userId: string, recipientId: string) => {
    const response = await axios.post(`${baseURL}/conversations`, { userId, recipientId });
    return response.data;
}

export const getConversationsByUserIdCall = async (userId: string) => {
    const response = await axios.get(`${baseURL}/conversations/user/${userId}`);
    return response.data;
}

export const addMessageToConversationCall = async (conversationId: string, message: Message) => {
    const response = await axios.post(`${baseURL}/conversations/${conversationId}/messages`, message);
    return response.data;
}

export const updateMessageInConversationCall = async (conversationId: string, message: Message) => {
    const response = await axios.put(`${baseURL}/conversations/${conversationId}/messages/${message._id}`, message);
    return response.data;
}

export const deleteMessageFromConversationCall = async (conversationId: string, messageId: string) => {
    const response = await axios.delete(`${baseURL}/conversations/${conversationId}/messages/${messageId}`);
}