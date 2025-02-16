import { db } from "../firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";

// Adicionar nova transação
export const addTransaction = async (transaction) => {
  await addDoc(collection(db, "transactions"), transaction);
};

// Buscar transações do usuário
export const getTransactions = async () => {
  const querySnapshot = await getDocs(collection(db, "transactions"));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
