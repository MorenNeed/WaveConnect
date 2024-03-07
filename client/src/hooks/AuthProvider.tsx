import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "../types/User";
import { loginCall, meCall, registerCall, logoutCall } from "../api/auth";

interface AuthContextValue {
    user: User | null;
    token: string | null;
    error: string | null;
    loading: boolean;
    login: (email: string, password: string) => void;
    register: (email: string, password: string, name: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextValue>({
    user: null,
    token: null,
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
    const [token, setToken] = useState<string | null>(() => localStorage.getItem("token")); // Initialize token from localStorage

    useEffect(() => {
        setLoading(true);
        if (token) {
            meCall(token)
                .then((user) => {
                    setUser(user);
                    setLoading(false);
                })
                .catch((error) => {
                    setError(error.message);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [token]);

    const login = (email: string, password: string) => {
        setLoading(true);
        loginCall(email, password)
            .then((user) => {
                setUser(user);
                setToken(user.token);
                setLoading(false);
                if (user.token) localStorage.setItem("token", user.token);
                console.log(user.token);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }

    const register = (email: string, password: string, name: string) => {
        setLoading(true);
        registerCall(email, password, name)
            .then((user) => {
                setUser(user);
                setToken(user.token);
                setLoading(false);
                if (user.token) localStorage.setItem("token", user.token);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }

    const logout = () => {
        setLoading(true);
        if (token) {
            logoutCall(token)
                .then(() => {
                    setUser(null);
                    setToken(null);
                    setLoading(false);
                    localStorage.removeItem("token");
                })
                .catch((error) => {
                    setError(error.message);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }

    return (
        <AuthContext.Provider value={{ token, user, login, register, logout, error, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;