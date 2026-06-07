import "./Menu.css";

function Menu() {
  return (
    <>
      <nav className="menu">
        <div className="logo">SHRED_LAB</div>
        <ul className="nav-links">
          <li>SKATE</li>
          <li>SURF</li>
          <li>COLEÇÕES</li>
        </ul>
        <span className="material-icons">search</span>
        <span className="material-symbols-outlined">shopping_cart</span>
        <span className="material-icons">account_circle</span>
      </nav>
      <hr className="linha-divisor" />
    </>
  );
}

export default Menu;
