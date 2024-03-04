import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "../types/User";
import { searchUsersByEmailQuery } from "../api/users";

interface UsersContextValue {
    searchedUsers: User[];
    searchUsers: (email: string) => void;
}

const UsersContext = createContext<UsersContextValue>({
    searchedUsers: [],
    searchUsers: () => {},
});

export const useUsers = () => {
    return useContext(UsersContext);
};

const UsersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [searchedUsers, setSearchedUsers] = useState<User[]>([]);

    const searchUsers = async (emailQuery: string) => {
        const users = await searchUsersByEmailQuery(emailQuery);
        setSearchedUsers(users);
    };

    const value: UsersContextValue = {
        searchedUsers,
        searchUsers,
    };

    return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>;
};

export default UsersProvider;