function Navbar({ cartCount = 0, navigate }) {
  function handleCartClick(event) {
    event.preventDefault();
    navigate("/carrito");
  }

  return (
    <header className="navbar">
      <div className="navbar__container">
        <a href="#inicio" className="navbar__logo">
          BOSNYD
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
        >
          Carrito ({cartCount})
        </a>
      </div>
    </header>
  );
}

export default Navbar;