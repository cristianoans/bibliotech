import Accordion from 'react-bootstrap/Accordion';
import Carousel from 'react-bootstrap/Carousel';
import slideshow from "../../assets/images/slideshow1.png";
import slideshow2 from "../../assets/images/slideshow2.png";
import slideshow3 from "../../assets/images/slideshow3.png";
import './Ajuda.css'
import { useState } from 'react';


export function Ajuda() {

    const itemsAccordion = [{
        título: "accordion1", textoAccordion: `Texto de teste.`
    }, {
        título: "accordion2", textoAccordion: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
minim veniam, quis nostrud exercitation ullamco laboris nisi ut
aliquip ex ea commodo consequat. Duis aute irure dolor in
reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
culpa qui officia deserunt mollit anim id est laborum.`}, {
        título: "accordion3", textoAccordion: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
minim veniam, quis nostrud exercitation ullamco laboris nisi ut
aliquip ex ea commodo consequat. Duis aute irure dolor in
reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
culpa qui officia deserunt mollit anim id est laborum.`},
    {
        título: "accordion4", textoAccordion: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
minim veniam, quis nostrud exercitation ullamco laboris nisi ut
aliquip ex ea commodo consequat. Duis aute irure dolor in
reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
culpa qui officia deserunt mollit anim id est laborum.`},
    {
        título: "accordion5", textoAccordion: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
minim veniam, quis nostrud exercitation ullamco laboris nisi ut
aliquip ex ea commodo consequat. Duis aute irure dolor in
reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
culpa qui officia deserunt mollit anim id est laborum.`}]

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
            <h1>Página de Ajuda! </h1>
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

