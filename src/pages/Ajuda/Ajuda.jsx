import Accordion from 'react-bootstrap/Accordion';
import Carousel from 'react-bootstrap/Carousel';
import slideshow from "../../assets/images/slideshow1.png";
import slideshow2 from "../../assets/images/slideshow2.png";
import slideshow3 from "../../assets/images/slideshow3.png";
import './Ajuda.css'
import { useState } from 'react';


export function Ajuda() {

    const itemsAccordion = [{
        título: "Como faço para criar uma conta na plataforma?", textoAccordion: `Para criar uma conta em nossa plataforma, 
        clique no botão "Registrar-se" na página inicial e preencha o formulário de inscrição com suas informações pessoais. 
        Em seguida, clique em "Registrar-se" para criar sua conta.`
    }, {
        título: "Como faço para redefinir minha senha?", textoAccordion: `Para redefinir sua senha, clique em "Esqueci minha senha" 
        na página de login e siga as instruções na tela para redefinir sua senha.`},
        
        { título: "Como posso entrar em contato com o suporte ao cliente?", textoAccordion: `Você pode entrar em contato com o suporte 
        ao cliente por meio do nosso formulário de contato, que pode ser acessado por meio do link "Contato" na parte inferior da página. 
        Você também pode enviar um e-mail diretamente para o nosso endereço de suporte.`},
    {
        título: "Como faço para cancelar minha assinatura?", textoAccordion: `Para cancelar sua assinatura, acesse a página "Minha conta"
         e clique no botão "Cancelar assinatura". Em seguida, siga as instruções na tela para concluir o cancelamento.`},
    {
        título: "Como faço para atualizar minhas informações de pagamento?", textoAccordion: `Para atualizar suas informações de pagamento,
         acesse a página "Minha conta" e clique no botão "Informações de pagamento". Em seguida, atualize suas informações de pagamento e 
         clique em "Salvar" para concluir a atualização. Se você tiver problemas com a atualização, entre em contato com o suporte ao 
         cliente para obter ajuda adicional.`}]

    const [pesquisa, setPesquisa] = useState("")
    function getBusca(event) {
        setPesquisa(event.target.value)
    }
    const accordionFiltrado = itemsAccordion.filter(
        (a) => (a.textoAccordion.toLowerCase().indexOf(pesquisa.toLowerCase()) !== -1
            || (a.título.toLowerCase().indexOf(pesquisa.toLowerCase()) !== -1)
        ))

    return (

        <div className="container">
            <h1>Ajuda </h1>
            <div className="row d-flex">
                <div className="input-group d-flex justify-content-center mb-3 mt-3">
                    <span className="input-group-text bi bi-search" id="basic-addon1"></span>
                    <input className="rounded-end" type="text" placeholder='Digite o termo procurado' onChange={getBusca} />
                </div>

            </div>
            <div className="row">

                <div className="col">
                    <div className="d-flex flex-column">
                        {accordionFiltrado.map((accordion) => {
                            return (

                                <Accordion defaultActiveKey="1" className="w-100 p-0">
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header className="acordeonItem w-100 p-0 ">{accordion.título}</Accordion.Header>
                                        <Accordion.Body className="acordeonItem w-100 p-0">
                                            {accordion.textoAccordion}
                                        </Accordion.Body >
                                    </Accordion.Item>
                                </Accordion>

                            )
                        })}
                    </div>
                </div>
            </div>
            <div clasName="row d-flex">
                <div className="d-flex justify-content-center">
                    <Carousel className="carrossel">
                        <Carousel.Item>
                            <img id="imagem1"
                                className="d-block w-100"
                                src={slideshow}
                                alt="Apresentação"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img id="imagem2"
                                className="d-block w-100"
                                src={slideshow2}
                                alt="Info"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img id="imagem3"
                                className="d-block w-100"
                                src={slideshow3}
                                alt="Contato"
                            />
                        </Carousel.Item>
                    </Carousel>
                </div>
            </div>
        </div>
    );
}

