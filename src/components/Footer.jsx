
function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__brand">
          <a href="#inicio" className="footer__logo">
            BOSNYD
          </a>

          <p>Ropa que te acompaña todos los días.</p>
          <p>Hecho para destacar en el día a día.</p>
        </div>

        <div className="footer__section">
          <h3>Explora</h3>
          <a href="#inicio">Inicio</a>
          <a href="#collection">Colección ORIGEN</a>
          <a href="#about">Nuestra historia</a>
          <a href="#contact">Contacto</a>
        </div>

        <div className="footer__section">
          <h3>Nuestra esencia</h3>
          <p>Calidad</p>
          <p>Identidad</p>
          <p>Propósito</p>
        </div>
      </div>

      <div className="footer__bottom">
        <p>
          © {new Date().getFullYear()} BOSNYD. Todos los derechos reservados.
        </p>

        <p>Barranquilla, Colombia.</p>
      </div>

      <div className="footer__admin">
        <a href="/login">Acceso administrador</a>
      </div>
    </footer>
  );
}

export default Footer;
