const errors = {
    "auth/wrong-password": "Senha incorreta",
    "auth/user-not-found": "Usuário inexistente",
    "auth/weak-password": "Senha fraca",
    "auth/too-many-requests": "Muitas requisições realizadas",
    "auth/email-already-in-use": "Conta já registrada com este email",
    "auth/account-exists-with-different-credential": "Conta já registrada com credencial diferente",
    "auth/internal-error": "O servidor do Authentication encontrou um erro inesperado ao tentar processar a solicitação.",

};
  
  export const firebaseError = (code) => errors[code] ?? "Um erro ocorreu";
  // Uso 
  const mensagem = firebaseError("auth/wrong-password"); // "Senha incorreta"
  const mensagem2 = firebaseError("codigo invalido"); // "Um erro ocorreu"