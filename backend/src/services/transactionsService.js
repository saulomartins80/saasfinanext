import { getFirestore, collection, addDoc } from "firebase/firestore";

const db = getFirestore();

export const addTransaction = async (transaction) => {
  try {
    const docRef = await addDoc(collection(db, "transactions"), transaction);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
