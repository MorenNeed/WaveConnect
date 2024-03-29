import { Conversation } from "../models/Conversation";
import db from "../firebase/db";
import { collection, doc, getDocs, getDoc, deleteDoc, setDoc, Timestamp } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { Message } from "../models/Message";
import UsersService from "./UsersService";

class ConversationsService {
    async createConversationByUsersId(userId: string, recipientId: string): Promise<Conversation> {
        const conversationId = uuidv4();
        const conversationRef = doc(db, "conversations", conversationId);
        const { name, avatar } = await UsersService.generateConversationNameAndAvatar(userId, recipientId);

        // Check if conversation already exists with such participants
        const existingConversations = await this.getConversationsByUserId(userId);
        const conversationExists = existingConversations.some(conversation => conversation.participants.includes(recipientId));
        if (conversationExists) {
            throw new Error("Conversation already exists with these participants");
        }

        const conversation: Conversation = {
            _id: conversationId,
            name: name,
            avatar: avatar,
            participants: [userId, recipientId],
            messages: [],
            lastMessage: null,
            createdAt: Timestamp.now().toDate().toISOString(),
            updatedAt: Timestamp.now().toDate().toISOString()
        };
        await setDoc(conversationRef, conversation);
        return conversation;
    }

    async getConversationsByUserId(userId: string): Promise<Conversation[]> {
        const conversations: Conversation[] = [];
        const querySnapshot = await getDocs(collection(db, "conversations"));
        querySnapshot.forEach((doc) => {
            const conversation = doc.data() as Conversation;
            if (conversation.participants.includes(userId)) {
                conversations.push(conversation);
            }
        });
        return conversations;
    }

    async addMessageToConversation(conversationId: string, message: Message): Promise<Conversation> {
        const conversationRef = doc(db, "conversations", conversationId);
        const conversationDoc = await getDoc(conversationRef);
        if (!conversationDoc.exists()) {
            throw new Error("Conversation not found");
        }
        const conversation = conversationDoc.data() as Conversation;
        conversation.messages.push(message);
        conversation.lastMessage = message;
        conversation.updatedAt = Timestamp.now().toDate().toISOString();
        await setDoc(conversationRef, conversation);
        return conversation;
    }

    async updateMessageInConversation(conversationId: string, messageId: string, message: Message): Promise<Conversation> {
        const conversationRef = doc(db, "conversations", conversationId);
        const conversationDoc = await getDoc(conversationRef);
        if (!conversationDoc.exists()) {
            throw new Error("Conversation not found");
        }
        const conversation = conversationDoc.data() as Conversation;
        const messageIndex = conversation.messages.findIndex((msg) => msg._id === messageId);
        if (messageIndex === -1) {
            throw new Error("Message not found");
        }
        if (message._id === conversation.lastMessage?._id) {
            conversation.lastMessage = message;
        }
        conversation.messages[messageIndex] = message;
        conversation.updatedAt = Timestamp.now().toDate().toISOString();
        await setDoc(conversationRef, conversation);
        return conversation;
    }

    async deleteMessageFromConversation(conversationId: string, messageId: string): Promise<void> {
        const conversationRef = doc(db, "conversations", conversationId);
        const conversationDoc = await getDoc(conversationRef);
        if (!conversationDoc.exists()) {
            throw new Error("Conversation not found");
        }
        const conversation = conversationDoc.data() as Conversation;
        const messageIndex = conversation.messages.findIndex((msg) => msg._id === messageId);
        if (messageIndex === -1) {
            throw new Error("Message not found");
        }
        conversation.messages = conversation.messages.filter((msg) => msg._id !== messageId);
        if (conversation.lastMessage?._id === messageId) {
            conversation.lastMessage = conversation.messages[conversation.messages.length - 1] || null;
        }
        conversation.updatedAt = Timestamp.now().toDate().toISOString();
        await setDoc(conversationRef, conversation);
    }
}

export default new ConversationsService();