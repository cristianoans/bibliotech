import {
  addDoc,
  doc,
  endBefore,
  getDoc,
  getDocs,
  limit,
  limitToLast,
  orderBy,
  query,
  startAfter,
  updateDoc,
  where,
} from "firebase/firestore";
import { emprestimosCollection } from "./collections";

export async function adicionarEmprestimo(data) {
  await addDoc(emprestimosCollection, data);
}

export async function getEmprestimos() {
  const snapshot = await getDocs(emprestimosCollection);
  let emprestimos = [];
  snapshot.forEach((doc) => {
    emprestimos.push({ ...doc.data(), id: doc.id });
  });
  return emprestimos;
}

export async function getEmprestimo(id) {
  const document = await getDoc(doc(emprestimosCollection, id));
  return { ...document.data(), id: document.id };
}

export async function updateEmprestimo(id, data) {
  await updateDoc(doc(emprestimosCollection, id), data);
}

export async function getEmprestimosDoUsuario(user) {
  const querySnapshot = await getDocs(
    query(emprestimosCollection, where("userId", "==", user))
  );
  let emprestimos = [];
  querySnapshot.forEach((doc) => {
    emprestimos.push({ ...doc.data(), id: doc.id });
  });
  return emprestimos;
}

/* PAGINAÇÃO */
export async function paginaInicial() {
  const primeiraPagina = query(
    emprestimosCollection,
    orderBy("dataEmprestimo"),
    limit(3)
  );
  const emprestimosSnapshot = await getDocs(primeiraPagina);
  const emprestimos = [];

  emprestimosSnapshot.forEach((doc) => {
  emprestimos.push({ ...doc.data(), id: doc.id });
  });

  return emprestimos;
}

export async function avancarPagina(lastObject) {
  const proxima = query(
    emprestimosCollection,
    orderBy("dataEmprestimo"),
    startAfter(lastObject.dataEmprestimo),
    limit(3)
  );

  const emprestimosSnapshot = await getDocs(proxima);
  const emprestimos = [];
  emprestimosSnapshot.forEach((doc) => {
  emprestimos.push({ ...doc.data(), id: doc.id });
  });

  return emprestimos;
}

export async function voltarPagina(firstObject) {
  const voltar = query(
    emprestimosCollection,
    orderBy("dataEmprestimo"),
    endBefore(firstObject.dataEmprestimo),
    limitToLast(3)
  );
  const emprestimosSnapshot = await getDocs(voltar);
  const emprestimos = [];
  emprestimosSnapshot.forEach((doc) => {
  emprestimos.push({ ...doc.data(), id: doc.id });
  });
  return emprestimos;
}
