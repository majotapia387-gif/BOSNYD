function Home() {
  return (
    <main>
      {/* Portada principal */}
      <section className="hero" id="inicio">
        <div className="hero__content">
          <p className="hero__eyebrow">
            COLECCIÓN ORIGEN
          </p>

          <h1>BOSNYD</h1>

          <p className="hero__tagline">
            Hecho para destacar en el día a día.
          </p>

          <p className="hero__description">
            Camisetas oversize premium creadas para expresar
            identidad, comodidad y estilo.
          </p>

          <a className="hero__button" href="#collection">
            Descubrir colección
          </a>
        </div>
      </section>

      {/* Introducción a la colección */}
      <section className="collection-intro" id="collection">
        <p className="collection-intro__eyebrow">
          NUESTRA ESENCIA
        </p>

        <h2>Ropa que te acompaña todos los días.</h2>

        <p>
          Descubre nuestra primera colección y encuentra
          una pieza que represente tu propia identidad.
        </p>
      </section>

      {/* Sección de marca que completaremos más adelante */}
      <section className="about" id="about">
        <p className="about__eyebrow">NUESTRA HISTORIA</p>

        <h2>Una idea. Dos primas. Una marca con propósito.</h2>

        <p>
          BOSNYD nace para acompañarte con prendas que combinan
          comodidad, identidad y estilo.
        </p>
      </section>

      {/* Contacto que ampliaremos posteriormente */}
      <section className="contact" id="contact">
        <h2>Hablemos</h2>

        <p>
          ¿Tienes preguntas sobre nuestras prendas?
          Pronto podrás contactarnos desde esta sección.
        </p>
      </section>
    </main>
  );
}

export default Home;