import './service.css';
import image1 from './img/produtos2.png';
import image2 from './img/clientes2.png';
import image3 from './img/projeto3.jpeg';
import image4 from './img/projeto4.jpg';


export function Service() {
    return (
        <section className="projects" id="projects">
            <div className="project imagem1">
                <a href="">
                    <img src={image1} alt="imagem de produtos"></img>
                    <p>produtos</p>
                </a>
            </div>
            <div className="project imagem2">
                <a href="">
                    <img src={image2} alt="imagem de produtos"></img>
                    <p>clientes</p>
                </a>
            </div>
            <div className="project imagem3">
                <a href="">
                    <img src={image3} alt="imagem de produtos"></img>
                    <p>Pedidos</p>
                </a>
            </div>
            <div className="project imagem4">
                <a href="">
                    <img src={image4} alt="imagem de produtos"></img>
                    <p>painel</p>
                </a>
            </div>
        </section>
    )
}

export default Service;