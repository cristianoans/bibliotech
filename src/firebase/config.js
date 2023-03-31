import { initializeApp } from "firebase/app";
import { getAuth, getUsers } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Chaves de acesso ao firebase
const firebaseConfig = {
  apiKey: "AIzaSyCg0VQ1mhI2zwJjiVe9ua73onCtkORMvKo",
  authDomain: "bibliotech-cgo.firebaseapp.com",
  projectId: "bibliotech-cgo",
  storageBucket: "bibliotech-cgo.appspot.com",
  messagingSenderId: "275945906759",
  appId: "1:275945906759:web:b11e159dffbe5834860762"
};

// Inicializa o app com base nas configurações acima
export const app = initializeApp(firebaseConfig);
// Configurando o Authentication e seus recursos login/cadastro
export const auth = getAuth(app);
// Configura o Firestore e seus recursos de banco de dados
export const db = getFirestore(app);
// Configura o Storage e seus recursos de Upload
export const storage = getStorage(app);

