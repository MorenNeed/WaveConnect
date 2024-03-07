import React, { createContext, useContext, useEffect, useState } from "react";
import { createMessageCall, updateMessageCall, deleteMessageCall } from "../api/messages";
import { Content } from "../types/Content";
import { Message } from "../types/Message";

interface MessagesContextValue {
    error: string | null;
    loading: boolean;
    createMessage: (sender: string, content: Content, files: File[], conversationId: string) => Promise<Message>;
    updateMessage: (messageId: string, content: Content) => Promise<Message>;
    deleteMessage: (messageId: string) => Promise<void>;
}

const MessagesContext = createContext<MessagesContextValue | undefined>(undefined);

export const useMessages = () => {
    const context = useContext(MessagesContext);
    if (!context) {
        throw new Error("useMessages must be used within a MessagesProvider");
    }
    return context;
}

const MessagesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const createMessage = async (sender: string, content: Content, files: File[], conversationId: string): Promise<Message> => {
        setLoading(true);
        try {
            const message = await createMessageCall(sender, content, files, conversationId);
            setLoading(false);
            return message;
        } catch (error: any) {
            setError(error.message);
            setLoading(false);
            throw error;
        }
    }

    const updateMessage = async (messageId: string, content: Content): Promise<Message> => {
        setLoading(true);
        try {
            const message = await updateMessageCall(messageId, content);
            setLoading(false);
            return message;
        } catch (error: any) {
            setError(error.message);
            setLoading(false);
            throw error;
        }
    }

    const deleteMessage = async (messageId: string): Promise<void> => {
        setLoading(true);
        try {
            await deleteMessageCall(messageId);
            setLoading(false);
        } catch (error: any) {
            setError(error.message);
            setLoading(false);
            throw error;
        }
    }

    return (
        <MessagesContext.Provider value={{ error, loading, createMessage, updateMessage, deleteMessage }}>
            {children}
        </MessagesContext.Provider>
    );
}

export default MessagesProvider;