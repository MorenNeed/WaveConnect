import { User } from '../models/User';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, UserCredential } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import db from '../firebase/db';

class AuthService {
    async login(email: string, password: string): Promise<User> {
        try {
            const auth = getAuth();
            const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
            const userRef = doc(db, "users", userCredential.user.uid);
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
                const user = userDoc.data() as User;
                user.token = await userCredential.user.getIdToken();
                await setDoc(userRef, user);
                return user;
            } else {
                throw new Error("User not found");
            }
        } catch (error: any) {
            console.log(error);
            if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
                throw new Error("Invalid email or password");
            } else {
                throw new Error("Unknown error");
            }
        }
    }

    async me(): Promise<User | null> {
        const auth = getAuth();
        return new Promise((resolve, reject) => {
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                if (user) {
                    const userRef = doc(db, "users", user.uid);
                    getDoc(userRef).then((userDoc) => {
                        if (userDoc.exists()) {
                            resolve(userDoc.data() as User);
                        } else {
                            resolve(null);
                        }
                    }).catch((error) => {
                        reject(error);
                    });
                } else {
                    resolve(null);
                }
                unsubscribe();
            });
        });
    }

    async logout(): Promise<void> {
        const auth = getAuth();
        await signOut(auth);
    }

    async register(email: string, password: string, name: string): Promise<User> {
        try {
            const auth = getAuth();
            const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user: User = {
                uid: userCredential.user.uid,
                email: email,
                name: name,
                password: password,
                token: ""
            };
            const userRef = doc(db, "users", user.uid);
            await setDoc(userRef, user);
            return user;
        } catch (error: any) {
            console.log(error);
            if (error.code === "auth/email-already-in-use") {
                throw new Error("Email already in use");
            } else {
                throw new Error("Unknown error");
            }
        }
    }


}

export default new AuthService();