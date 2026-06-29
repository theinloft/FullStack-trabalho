import './about.css';
import image1 from './img/image1.svg'
import image1comprimida from './img/image1comprimida.svg'
import image1pequena from './img/image1pequena.svg'

export function About() {
    return (
        <section className="about">
            <div className="item">
                <h3>Tire proveito dos insights de vendas para impulsionar sua estratégia</h3>
                <p>Explore relatórios de vendas em tempo real e fique por dentro de tudo que acontece no seu funil de vendas com as sugestões da IA. As ferramentas de previsão, definição de metas, monitoramento de equipes e análise de métricas avançadas do Pipedrive ajudam a acelerar e a fundamentar sua tomada de decisão.</p>
                <a href="" className="btn-know-more">Saiba mais</a>
            </div>
            <div className="image right">
                <picture>
                    <source media="(min-width: 768px)" srcSet={image1} />
                    <source media="(min-width: 465px)" srcSet={image1comprimida} />
                    <img src={image1pequena} alt="imagem placeholder 300x300"></img>
                </picture>
            </div>
            <div className="image left">
                <picture>
                    <source media="(min-width: 768px)" srcSet="https://placehold.co/600x400" />
                    <source media="(min-width: 465px)" srcSet="https://placehold.co/400" />
                    <img src="https://placehold.co/300" alt="imagem placeholder 300x300"></img>
                </picture>
            </div>
            <div className="item">
                <h3>Título</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur aliquam voluptatibus ipsam minima commodi
                    cum aspernatur molestiae error, provident cupiditate voluptatum quis aperiam. Laboriosam, adipisci sed
                    suscipit ipsa rem animi.</p>
                <a href="" className="btn-know-more">Saiba mais</a>
            </div>
        </section>
    )
}

export default About;