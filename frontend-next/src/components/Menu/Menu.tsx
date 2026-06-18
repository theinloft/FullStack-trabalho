import Link from "next/link";
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
          <Link href="#" className="material-icons">
            dehaze{" "}
          </Link>
        </div>
        <Link href="#" className="material-icons">
          search
        </Link>
        <Link href="#" className="material-symbols-outlined">
          shopping_cart
        </Link>
        <Link href="/login" className="material-icons">
          account_circle
        </Link>
      </nav>
      <hr className="linha-divisor" />
    </>
  );
}

export default Menu;
