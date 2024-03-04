import { getFirestore } from "firebase/firestore";
import app from "./app";

// Intialize Firebase Firestore DB
const db = getFirestore(app);

export default db;
