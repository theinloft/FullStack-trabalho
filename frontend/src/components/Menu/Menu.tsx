import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Menu.css";
function Menu() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [perfilAberto, setPerfilAberto] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    function handleStorage() {
      setToken(localStorage.getItem("token"));
    }
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

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
            <li><Link to={'/fale-conosco'}>FALE CONOSCO</Link></li>
          </ul>
        </div>

        <a className="material-icons">search</a>

        {token ? (
          <div className="perfil-wrapper">
            <span
              className="material-icons perfil-icon"
              onClick={() => setPerfilAberto((prev) => !prev)}
            >
              account_circle
            </span>
            {perfilAberto && (
              <div className="perfil-dropdown">
                <button
                  className="perfil-sair"
                  onClick={() => {
                    localStorage.removeItem("token");
                    setToken(null);
                    setPerfilAberto(false);
                    window.location.href = "/login";
                  }}
                >
                  SAIR
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="material-icons">
            account_circle
          </Link>
        )}
      </nav>

      {menuAberto && (
        <div className="menu-mobile">
          <ul>
            <li>TUTORIAIS</li>
            <li>CASE DE CLIENTES</li>
            <li>FALE CONOSCO</li>
          </ul>
        </div>
      )}

      <hr className="linha-divisor" />
    </>
  );
}

export default Menu;
