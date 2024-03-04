import React, { createContext, useContext, useEffect, useState } from "react";
import { createMessageCall } from "../api/messages";
import { Content } from "../types/Content";
import { Message } from "../types/Message";

interface MessagesContextValue {
    error: string | null;
    loading: boolean;
    createMessage: (sender: string, content: Content, conversationId: string) => Promise<Message>;
    // TODO: Implement the rest of the CRUD operations
    // updateMessage: (message: Message) => void;
    // deleteMessage: (messageId: string) => void;
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

    const createMessage = async (sender: string, content: Content, conversationId: string): Promise<Message> => {
        setLoading(true);
        try {
            const message = await createMessageCall(sender, content, conversationId);
            setLoading(false);
            return message;
        } catch (error) {
            setError(error.message);
            setLoading(false);
            throw error;
        }
    }

    return (
        <MessagesContext.Provider value={{ error, loading, createMessage }}>
            {children}
        </MessagesContext.Provider>
    );
}

export default MessagesProvider;