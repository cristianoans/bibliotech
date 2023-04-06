import { addDoc } from "firebase/firestore";
import { msgChat } from "./collections";


export async function adicionarMensagem(dados) {
    await addDoc(msgChat, dados);
}