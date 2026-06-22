import { useState } from "react";
import { Link } from "react-router-dom";
import "./Menu.css";
function Menu() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <>
      <nav className="menu">
        <div className="lista-responsive">
          <button
            type="button"
            className="menu-button"
            onClick={() => setMenuAberto(!menuAberto)}
          >
            <span className="material-icons">dehaze</span>
          </button>
        </div>

        <div className="logo">SHRED_LAB</div>

        <div className="lista">
          <ul className="nav-links">
            <li>TUTORIAIS</li>
            <li>CASE DE CLIENTES</li>
            <li>BLOG</li>
          </ul>
        </div>

        <a className="material-icons">search</a>

        <Link to="/login" className="material-icons">
          account_circle
        </Link>
      </nav>

      {menuAberto && (
        <div className="menu-mobile">
          <ul>
            <li>TUTORIAIS</li>
            <li>CASE DE CLIENTES</li>
            <li>BLOG</li>
          </ul>
        </div>
      )}

      <hr className="linha-divisor" />
    </>
  );
}

export default Menu;
