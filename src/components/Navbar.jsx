
import { useEffect, useState } from "react";

function Navbar({ cartCount = 0, navigate }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 40);
    }

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function handleCartClick(event) {
    event.preventDefault();
    navigate("/carrito");
  }

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__container">
        <a href="#inicio" className="navbar__logo">
          BOSNYD<span>®</span>
        </a>

        <nav className="navbar__links" aria-label="Navegación principal">
          <a href="#inicio">Inicio</a>
          <a href="#collection">Colección</a>
          <a href="#about">Nosotras</a>
          <a href="#contact-form">Contacto</a>
        </nav>

        <a
          href="/carrito"
          className="navbar__cart"
          onClick={handleCartClick}
          aria-label={`Ver carrito, ${cartCount} productos`}
        >
          <span>Carrito</span>
          <span className="navbar__cart-count">{cartCount}</span>
        </a>
      </div>
    </header>
  );
}

export default Navbar;
