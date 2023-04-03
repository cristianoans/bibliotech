import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  FacebookAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { auth } from "./config";
import { usersCollection } from "./collections";
import { doc, getDoc, setDoc } from "firebase/firestore";

async function espelhamentoUsuarios(resultado) {
  // Verificar se o usuário já existe na base de dados
  const userDoc = await getDoc(doc(usersCollection, resultado.user.uid));

  // Se o usuário não existir, é a primeira vez que ele está fazendo login
  if (!userDoc.exists()) {
    const newUserRef = doc(usersCollection, resultado.user.uid);
    await setDoc(newUserRef, {
      nome: resultado.user.displayName,
      email: resultado.user.email,
      dataCadastro: new Date()
    });
  }
}

export async function cadastrarEmailSenha(email, senha) {
  const resultado = await createUserWithEmailAndPassword(auth, email, senha);
  espelhamentoUsuarios(resultado);
  return resultado.user;
}

export async function loginGoogle() {
  const provider = new GoogleAuthProvider();
  const resultado = await signInWithPopup(auth, provider);
  espelhamentoUsuarios(resultado);

  return resultado.user;
}

export async function loginFacebook(){
  const provider = new FacebookAuthProvider();
  const resultado = await signInWithPopup(auth, provider)
  espelhamentoUsuarios(resultado);
  return resultado.user
}

export async function loginGitHub(){
  const provider = new GithubAuthProvider();
  const resultado = await signInWithPopup(auth, provider)
  espelhamentoUsuarios(resultado);
  return resultado.user
}


export async function loginEmailSenha(email, senha) {
  const resultado = await signInWithEmailAndPassword(auth, email, senha);
  return resultado.user;
}

export async function logout() {
  await signOut(auth);
}
