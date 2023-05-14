import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import "firebase/compat/firestore";
import firebaseConfig from "./firebaseConfig";

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp); // For Using Database

export { db };