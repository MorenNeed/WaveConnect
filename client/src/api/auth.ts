import axios from "axios";
import { User } from "../types/User";

const baseURL = process.env.REACT_APP_API_URL;

export const loginCall = async (email: string, password: string): Promise<User> => {
    try {
        const response = await axios.post(`${baseURL}/auth/login`, { email, password });
        return response.data;
    } catch (error: any) {
        if (error.response.status === 401) {
            throw new Error("Invalid credentials");
        } else {
            throw new Error("Unknown error");
        }
    }
}

export const meCall = async (token: string | null): Promise<User | null> => {
    try {
        const response = await axios.get(`${baseURL}/auth/me`, {
            headers: {
                Authorization: token
            }
        });
        return response.data;
    } catch (error) {
        throw new Error("Unknown error");
    }
}

export const registerCall = async (email: string, password: string, name: string): Promise<User> => {
    try {
        const response = await axios.post(`${baseURL}/auth/register`, { email, password, name });
        return response.data;
    } catch (error: any) {
        if (error.response.status === 409) {
            throw new Error("User already exists");
        } else {
            throw new Error("Unknown error");
        }
    }
}

export const logoutCall = async (token: string | null): Promise<void> => {
    try {
        await axios.post(`${baseURL}/auth/logout`, {}, {
            headers: {
                Authorization: token
            }
        });
    } catch (error) {
        throw new Error("Unknown error");
    }
}