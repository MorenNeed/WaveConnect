import React, { createContext, useContext, useEffect, useState } from "react";
import { Conversation } from "../types/Conversation";
import { createConversationByUsersIdCall, getConversationsByUserIdCall, addMessageToConversationCall } from '../api/conversations';
import { useAuth } from "./AuthProvider";
import { Message } from "../types/Message";

interface ConversationContextValue {
    userConversations: Conversation[];
    selectedConversation: Conversation | null;
    error: string | null;
    loading: boolean;
    createConversation: (userId: string, recipientId: string) => void;
    getConversations: (userId: string) => void;
    addMessage: (conversationId: string, message: Message) => void;
    selectConversation: (conversation: Conversation) => void;
    unselectConversation: () => void;
}

const ConversationContext = createContext<ConversationContextValue | undefined>(undefined);

export const useConversation = () => {
    const context = useContext(ConversationContext);
    if (!context) {
        throw new Error("useConversation must be used within a ConversationProvider");
    }
    return context;
}

const ConversationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userConversations, setUserConversations] = useState<Conversation[]>([]);
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        setLoading(true);

        if (user) {
            getConversations(user.uid);
        }

        setLoading(false);
    }, [user]);

    const createConversation = (userId: string, recipientId: string) => {
        createConversationByUsersIdCall(userId, recipientId)
            .then((conversation) => {
                setUserConversations([...userConversations, conversation]);
                selectConversation(conversation);
            })
            .catch((error) => setError(error.message));
    }

    const getConversations = (userId: string) => {
        getConversationsByUserIdCall(userId)
            .then((conversations) => setUserConversations(conversations))
            .catch((error) => setError(error.message));
    }

    const selectConversation = (conversation: Conversation) => {
        setSelectedConversation(conversation);
    }

    const unselectConversation = () => {
        setSelectedConversation(null);
    }

    const addMessage = (conversationId: string, message: Message) => {
        addMessageToConversationCall(conversationId, message)
            .then((conversation) => {
                const updatedConversations = userConversations.map((conv) => {
                    if (conv._id === conversation._id) {
                        return conversation;
                    }
                    return conv;
                });
                setUserConversations(updatedConversations);
                setSelectedConversation(conversation);
            })
            .catch((error) => setError(error.message));
    }

    return (
        <ConversationContext.Provider value={{ userConversations, selectedConversation, error, loading, createConversation, getConversations, selectConversation, addMessage, unselectConversation }}>
            {children}
        </ConversationContext.Provider>
    );
}

export default ConversationProvider;