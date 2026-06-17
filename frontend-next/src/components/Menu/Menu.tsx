import "./Menu.css";

function Menu() {
  return (
    <>
      <nav className="menu">
        <div className="logo">SHRED_LAB</div>
        <div className="lista">
          <ul className="nav-links">
            <li>SKATE</li>
            <li>SURF</li>
            <li>COLEÇÕES</li>
          </ul>

        </div>

        <div className="lista-responsive">
        <a className="material-icons">dehaze </a>
      </div>
        <a className="material-icons">search</a>
        <a className="material-symbols-outlined">shopping_cart</a>
        <a className="material-icons">account_circle</a>
      </nav>
      <hr className="linha-divisor" />
      

    </>
  );
}

export default Menu;
