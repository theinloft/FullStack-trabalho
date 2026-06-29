import './about.css';

export function About() {
    return (
        <section className="about">
            <div className="item">
                <h3>Título</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur aliquam voluptatibus ipsam minima commodi
                    cum aspernatur molestiae error, provident cupiditate voluptatum quis aperiam. Laboriosam, adipisci sed
                    suscipit ipsa rem animi.</p>
                <a href="" className="btn-know-more">Saiba mais</a>
            </div>
            <div className="image right">
                <picture>
                    <source media="(min-width: 768px)" srcSet="https://placehold.co/600x400" />
                    <source media="(min-width: 465px)" srcSet="https://placehold.co/400" />
                    <img src="https://placehold.co/300" alt="imagem placeholder 300x300"></img>
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