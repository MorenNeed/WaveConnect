import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "../types/User";
import { loginCall, meCall, registerCall, logoutCall } from "../api/auth";
import { useNavigate } from "react-router";

interface AuthContextValue {
    user: User | null;
    error: string | null;
    loading: boolean;
    login: (email: string, password: string) => void;
    register: (email: string, password: string, name: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextValue>({
    user: null,
    error: null,
    loading: true,
    login: () => { },
    register: () => { },
    logout: () => { },
});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await meCall();
                setUser(user);
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const login = (email: string, password: string) => {
        loginCall(email, password).then((user) => setUser(user)).catch((error) => setError(error.message));
    }

    const register = (email: string, password: string, name: string) => {
        registerCall(email, password, name).then((user) => setUser(user)).catch((error) => setError(error.message));
    }

    const logout = () => {
        logoutCall().then(() => setUser(null)).catch((error) => setError(error.message));
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, error, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;