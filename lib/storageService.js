// lib/storageServices.js
import { db } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function saveRecommendation(data) {
  try {
    const docRef = await addDoc(collection(db, "recommendations"), {
      ...data,
      timestamp: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error saving recommendation:", error);
    return null;
  }
}
