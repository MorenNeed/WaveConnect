import { User } from "../models/User";
import { collection, query, where, getDocs, DocumentSnapshot } from "firebase/firestore";
import db from "../firebase/db";

class UsersService {
    async searchUsersByEmailQuery(emailQuery: string): Promise<User[]> {
        const usersRef = collection(db, "users");
        const usersQuery = query(usersRef, where("email", ">=", emailQuery), where("email", "<=", emailQuery + "\uf8ff"));
        const usersSnapshot = await getDocs(usersQuery);
        const users: User[] = [];
        usersSnapshot.forEach((userDoc: DocumentSnapshot) => {
            users.push(userDoc.data() as User);
        });

        return users;
    }

    async generateConversationNameAndAvatar(userId: string, recipientId: string): Promise<{ name: string, avatar: string }> {
        const usersRef = collection(db, "users");
        const userDoc = await getDocs(usersRef);
        const users: User[] = [];
        userDoc.forEach((user) => {
            users.push(user.data() as User);
        });
        const user = users.find((user) => user.uid === userId);
        const recipient = users.find((user) => user.uid === recipientId);
        const name = `${user?.name} and ${recipient?.name}`;
        const avatar = "https://via.placeholder.com/150";

        return { name, avatar };
    }
}

export default new UsersService();
