import {
    addDoc,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    updateDoc
} from "firebase/firestore";

import { reporteErros } from "./collections";
import { storage } from "./config"

export async function addReporteErro(data) {
    await addDoc(reporteErros, data);
}

export async function getReporteErros() {
    const snapshot = await getDocs(reporteErros);
    let listadeReportes = [];
    snapshot.forEach(doc => {
        listadeReportes.push({...doc.data(), id: doc.id});
    })
    return listadeReportes;
}

export async function getReporteErro(id) {
    const document = await getDoc(doc(reporteErros, id));
    return {...document.data(), id: document.id};
}

export async function updateReporteErro(id, data) {
    await updateDoc(doc(reporteErros, id), data);
}

export async function deleteReporteErro(id) {
    await deleteDoc(doc(reporteErros, id));
}
