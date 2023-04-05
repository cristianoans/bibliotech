import { Button } from "react-bootstrap";
import { emailVerif, logout } from "../../firebase/auth";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import img from "../../assets/images/login.png"
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";



export function VerificarEmail() {

    const usuarioLogado = useContext(AuthContext);
    const navigate = useNavigate();
    

    function verifEmail() {
        emailVerif(usuarioLogado)
            .then(() => {
                toast.success(`Email de confirmação enviado com sucesso!`, {
                    duration: 4000,
                    position: "top-center",
                  });
                
                logout()
                navigate("/cadastro");
            })
            
            .catch((error) => {
                console.log("Email não enviado", error);
                alert("Não foi possível enviar o email de confirmação. Tente novamente mais tarde.");
            });
    }

    return (
        <div className='vh-100  d-flex flex-column align-items-center justify-content-center text-align-center' >
            <div className="card w-25 h-50 d-flex align-items-center justify-content-center text-align-center ">
    <img src={img} style={{width: '250px'}} alt="" />
    <h1 className="mb-4 fs-5" > Seu e-mail não foi verificado. Clique no botão abaixo e verifique sua conta para ter acesso à nossa biblioteca.</h1>
    <Button onClick={verifEmail}>Clique aqui e receba o email de confirmação!</Button> 
    </div>
    </div>
    )
}
