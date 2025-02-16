import { db } from "../firebaseConfig";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

// Adicionar um novo orçamento
export const addBudget = async (budget) => {
  await addDoc(collection(db, "budgets"), budget);
};

// Buscar orçamentos do usuário
export const getBudgets = async (userId) => {
  const q = query(collection(db, "budgets"), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
