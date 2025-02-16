import admin from "firebase-admin";
import { ServiceAccount } from "firebase-admin"; // Importa o tipo correto
import serviceAccount from "../config/firebaseServiceAccount.json"; 

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount), // Faz o cast corretamente
  });
}

export const auth = admin.auth();
export const db = admin.firestore();
