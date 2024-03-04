import { Content } from "./Content";

export declare interface Message {
    _id: string;
    conversationId: string;
    sender: string;
    content: Content;
    createdAt: string;
    updatedAt: string;
}