function Navbar() {
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
          <a href="#contact">Contacto</a>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;