import { Message } from "./Message";

export interface Conversation {
    _id: string;
    name: string;
    avatar: string;
    participants: string[];
    messages: Message[];
    lastMessage: Message | null;
    createdAt: string;
    updatedAt: string;
}