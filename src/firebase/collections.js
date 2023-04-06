import { db } from "./config";
import { collection } from "firebase/firestore";

export const livrosCollection = collection(db, "livros");
export const emprestimosCollection = collection(db, "emprestimos");
export const usersCollection = collection(db, "users");
export const reporteErros = collection (db, "erros");
export const msgChat = collection (db, "msgchat");