import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../contexts/AuthContext";
import { adicionarMensagem } from "../../firebase/msgchat";
import { msgChat } from "../../firebase/collections";
import { limitToLast, onSnapshot, orderBy, query } from "firebase/firestore";

export function Chat() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const usuarioLogado = useContext(AuthContext);
    const [novaMensagem, setNovaMensagem] = useState(0);
    const [mensagens, setMensagens] = useState('');


    function onSubmit(data) {
        const mensagem = data.mensagem;
        const dataEnvio = new Date();
        const nomeUsuario = usuarioLogado.displayName;
        const dados = { mensagem, dataEnvio, nomeUsuario }

        adicionarMensagem(dados).then(() => {
            setNovaMensagem(novaMensagem + 1);
            reset({ mensagem: '' });
        });
    }

    useEffect(() => {
        const unsubscribe = onSnapshot(query(msgChat, orderBy("dataEnvio"), limitToLast(4)), (querySnapshot) => {
            const mensagens = querySnapshot.docs.map((doc) => {
                const mensagem = doc.data();
                return `${mensagem.dataEnvio.toDate().toLocaleString("pt-br")} \n${mensagem.nomeUsuario}: ${mensagem.mensagem}`;
            }).join("\n\n");
            setMensagens(mensagens);
        });
        return () => unsubscribe();
    }, []);


    return (
        <div className="container mt-2">
            <div className="p-2">
                <form>
                    <div className="form-floating mb-2">
                        <textarea disabled className="form-control" id="mensagens" style={{ height: "300px" }} value={mensagens}></textarea>
                        <label htmlFor="mensagens">Mensagens</label>
                    </div>
                    <div className="input-group mb-2">
                        <span className="input-group-text" id="mensagem">
                            <button onClick={handleSubmit(onSubmit)} type="submit" className="btn bi bi-send fs-3"></button>
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Escreva sua mensagem aqui"
                            {...register("mensagem", { required: "informe a mensagem" })}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};
