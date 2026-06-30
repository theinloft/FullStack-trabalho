import './service.css';
import porject1 from './img/compatibilizacao-projetos-a-arquiteta-1.jpg';
import porject2 from './img/projeto2.jpg';
import porject3 from './img/projeto3.jpeg';
import porject4 from './img/projeto4.jpg';

export function Service() {
    return (
        <section className="projects" id="projects">
            <div className="project">
                <a href="">
                    <img src={porject1} alt="" />
                </a>
            </div>
            <div className="project">
                <a href="">
                    <img src={porject2} alt="" />
                </a>
            </div>
            <div className="project">
                <a href="">
                    <img src={porject3} alt="" />
                </a>
            </div>
            <div className="project">
                <a href="">
                    <img src={porject4} alt="" />
                </a>
            </div>
        </section>
    )
}

export default Service;