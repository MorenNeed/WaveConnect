import { firebaseConfig } from "../config/firebaseConfig";
import { initializeApp } from "firebase/app";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;