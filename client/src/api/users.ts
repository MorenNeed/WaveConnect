import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

export const searchUsersByEmailQuery = async (emailQuery: string) => {
    const response = await axios.get(`${baseURL}/users/search?emailQuery=${emailQuery}`);
    return response.data;
};