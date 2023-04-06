import React from "react";
import { Modal } from "react-bootstrap";

export function DetalhesLivroModal({ livro, show, handleClose }) {
    // Formata a data de publicação para o padrão pt-br
    const data = new Date(livro?.datapublicacao + "T00:00:00-03:00").toLocaleDateString("pt-br")

    return (
        <Modal size="lg" className="" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title bsPrefix="modal-title">
                    {livro?.titulo}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex flex-column align-items-center">
                    <div className="row w-100">
                        <div className="col">
                            <div className="card h-100 d-flex justify-content-center align-items-center">
                                <span>Números de páginas</span>
                                <i className="bi bi-file-earmark-text fs-1"></i>
                                <span className="fw-semibold">{livro?.npaginas} páginas.</span>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex justify-content-center align-items-center">
                                <span>Editora</span>
                                <i className="bi bi-book  fs-1"></i>
                                <span className="fw-semibold">{livro?.editora}</span>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex justify-content-center align-items-center">
                                <span>Idioma</span>
                                <i className="bi bi-globe-americas  fs-1"></i>
                                <span className="fw-semibold">{livro?.idioma}</span>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 d-flex justify-content-center align-items-center">
                                <span>Data de Publicação</span>
                                <i className="bi bi-calendar-event  fs-1"></i>
                                <span className="fw-semibold">{data}</span>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3 lh-sm">
                        <div className="col">
                            <p className="text-justify">Resumo: {livro?.resumo}</p>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}
