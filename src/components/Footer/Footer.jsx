import "./Footer.css";
import { Chat } from "../Chat/Chat";
import { Modal } from "react-bootstrap";
import { useState } from "react";

export function Footer() {
    const [show, setShow] = useState(false);
    function handleShow(livro) {
        setShow(true);
    }
    function handleClose() {
        setShow(false);
    }

    return (
        <footer className="mt-auto footer justify-content-between p-2 text-light bg-black d-flex ">
            {/* estilo com bootstrap */}
            <div className="copy_right fw-bold ">
                <span>SoulCode Squad#1</span> &copy; 2023</div>
            <div>
                <ul className="social_list dropdown-item ">
                    <i className="social_listCursor bi bi-facebook me-5">
                        -Facebook
                    </i>
                    <i className="social_listCursor bi bi-instagram me-5">
                        -Instagram
                    </i>
                    <i className="social_listCursor bi bi-linkedin me-5">
                        -Linkedin
                    </i>
                    <i className="bi bi-chat-text fs-4 me-1" onClick={handleShow}> Chat</i>
                </ul>
            </div>
            <Modal show={show} onHide={handleClose} centered className="chat">
                <Modal.Body>
                   <Chat />
                </Modal.Body>
            </Modal>
        </footer>
    )
}