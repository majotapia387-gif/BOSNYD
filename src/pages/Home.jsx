
import "../styles/home.css";

function Home() {
  return (
    <div className="home">
      {/* PORTADA PRINCIPAL */}
      <section className="hero" id="inicio">
        <div className="hero__background" />

        <div className="hero__brand-name" aria-hidden="true">
          BOSNYD
        </div>

        <div className="hero__image">
          <img
            src="/images/modelo-bosnyd-marfil.jpeg.png"
            alt="Modelo vistiendo una camiseta BOSNYD de la colección ORIGEN"
          />
        </div>

        <div className="hero__top">
          <p className="hero__eyebrow">
            BOSNYD® — COLECCIÓN ORIGEN
          </p>
          <span className="hero__edition">EST. 2026</span>
        </div>

        <div className="hero__content">
          <p className="hero__tagline">
            Hecho para destacar en el día a día.
          </p>

          <p className="hero__description">
            Camisetas oversize premium.
            Diseñadas para expresar quién eres.
          </p>

          <a className="hero__button" href="#collection">
            DESCUBRIR COLECCIÓN
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className="hero__bottom">
          <span>ESTILO SIN EXPLICACIONES</span>
          <span>01 — COLECCIÓN ORIGEN</span>
        </div>
      </section>

      {/* INTRODUCCIÓN DE MARCA */}
      <section className="collection-intro" id="collection-intro">
        <div className="collection-intro__label">
          <span>01 / NUESTRA ESENCIA</span>
          <span>BOSNYD®</span>
        </div>

        <div className="collection-intro__content">
          <h2>
            Ropa que te acompaña.
            <br />
            <span>Identidad que permanece.</span>
          </h2>

          <div className="collection-intro__description">
            <p>
              Creemos que vestir va más allá de una tendencia.
              Es una forma de expresar quién eres, con comodidad,
              carácter y autenticidad.
            </p>

            <a href="#collection">
              EXPLORAR ORIGEN <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* HISTORIA DE BOSNYD */}
      <section className="about" id="about">
        <div className="about__visual">
          <div className="about__visual-caption">
            <span>BOSNYD</span>
            <span>HECHO PARA DESTACAR</span>
          </div>
        </div>

        <div className="about__content">
          <p className="about__eyebrow">
            02 / NUESTRA HISTORIA
          </p>

          <h2>
            Una idea.
            <br />
            Dos primas.
            <br />
            <span>Una marca con propósito.</span>
          </h2>

          <p className="about__description">
            BOSNYD nace de una idea compartida: crear prendas
            que combinen comodidad, identidad y estilo.
            Una marca para quienes encuentran en los pequeños
            detalles una forma de expresarse.
          </p>

          <p className="about__signature">
            Ropa que habla por ti.
          </p>
        </div>
      </section>

      {/* PRESENTACIÓN DE CONTACTO */}
      <section className="home-contact" id="contacto">
        <div className="home-contact__content">
          <p className="home-contact__eyebrow">
            ESTAMOS PARA ESCUCHARTE
          </p>

          <h2>
            Hablemos<span>.</span>
          </h2>

          <p>
            ¿Tienes preguntas sobre nuestras prendas?
            Nos encantará conocer lo que tienes en mente.
          </p>
        </div>

        <a className="home-contact__button" href="#contact-form">
          CONTÁCTANOS <span aria-hidden="true">↗</span>
        </a>
      </section>
    </div>
  );
}

export default Home;
