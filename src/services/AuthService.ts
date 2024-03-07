import { User } from '../models/User';
import { doc, setDoc, getDoc } from "firebase/firestore";
import db from '../firebase/db';
import bcryptjs from 'bcryptjs';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { v4 as uuidv4 } from "uuid";

class AuthService {
    async login(email: string, password: string): Promise<User> {
        const userRef = doc(db, "users", email);
        const userDoc = await getDoc(userRef);
        if (!userDoc.exists()) {
            throw new Error("User not found");
        }
        const user = userDoc.data() as User;
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Password is not valid");
        }
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET as string);
        user.token = token;
        await setDoc(userRef, user, { merge: true });
        return user;
    }

    async me(token: string | null): Promise<User | null> {
        if (!token) {
            return null;
        }
        const payload = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        const userRef = doc(db, "users", payload.email);
        const userDoc = await getDoc(userRef);
        if (!userDoc.exists()) {
            throw new Error("User not found");
        }
        const user = userDoc.data() as User;
        return user;
    }

    async logout(token: string | null): Promise<void> {
        if (!token) {
            throw new Error("Token not provided");
        }
        jwt.verify(token, process.env.JWT_SECRET as string);
        const userRef = doc(db, "users", token);
        await setDoc(userRef, { token: null }, { merge: true });
    }

    async register(email: string, password: string, name: string): Promise<User> {
        const userRef = doc(db, "users", email);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
            throw new Error("User already exists");
        }
        const hashedPassword = await bcryptjs.hash(password, 12);
        const token = jwt.sign({ email }, process.env.JWT_SECRET as string);
        const user: User = {
            uid: uuidv4(),
            email,
            password: hashedPassword,
            name,
            token: token
        };
        await setDoc(userRef, user);
        return user;
    }


}

export default new AuthService();