import { Spinner } from 'react-bootstrap';
import imgSplash from '../../assets/images/login.png'

export function Splash() {

    return (
        <div className='vh-100 d-flex flex-column align-items-center justify-content-center text-align-center' >
            <img src={imgSplash} alt="imagem de loading" style={{width: '250px'}} />
            <Spinner animation="border" role="status" variant="success">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    );
};