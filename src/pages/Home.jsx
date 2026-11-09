import { useState } from "react";
import "../styles/home.css";

const historyImages = [
  {
    src: "/images/Historia/historia-bosnyd-01.jpg.jpeg",
    alt: "Campaña editorial BOSNYD, fotografía 1",
  },
  {
    src: "/images/Historia/historia-bosnyd-02.jpg.jpeg",
    alt: "Campaña editorial BOSNYD, fotografía 2",
  },
  {
    src: "/images/Historia/historia-bosnyd-03.jpg.jpeg",
    alt: "Campaña editorial BOSNYD, fotografía 3",
  },
 
  {
    src: "/images/Historia/historia-bosnyd-05.jpg.jpeg",
    alt: "Campaña editorial BOSNYD, fotografía 5",
  },
];
const essenceItems = [
  {
    number: "01",
    title: "Calidad",
    description:
      "Cada detalle importa. Buscamos crear prendas que combinen comodidad, diseño y cuidado en su elaboración.",
  },
  {
    number: "02",
    title: "Identidad",
    description:
      "Creemos en vestir de manera auténtica. Diseños con carácter para expresar quién eres sin necesidad de explicaciones.",
  },
  {
    number: "03",
    title: "Propósito",
    description:
      "BOSNYD nace de una idea compartida: crear una marca que acompañe tu día a día y represente algo más.",
  },
];
function Home() {
  const [activeImage, setActiveImage] = useState(0);
const [activeEssence, setActiveEssence] = useState(1);
  function previousImage() {
    setActiveImage((current) =>
      current === 0 ? historyImages.length - 1 : current - 1
    );
  }

  function nextImage() {
    setActiveImage((current) =>
      current === historyImages.length - 1 ? 0 : current + 1
    );
  }

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
          <p className="hero__eyebrow">BOSNYD® — COLECCIÓN ORIGEN</p>
          <span className="hero__edition">EST. 2026</span>
        </div>

        <div className="hero__content">
          <p className="hero__tagline">
            Hecho para destacar en el día a día.
          </p>

          <p className="hero__description">
            Camisetas oversize premium. Diseñadas para expresar quién eres.
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

      {/* NUESTRA ESENCIA */}
<section className="collection-intro" id="collection-intro">
  <div className="collection-intro__label">
    <span>01 / NUESTRA ESENCIA</span>
    <span>BOSNYD® — EST. 2026</span>
  </div>

  <div className="collection-intro__main">
    <div className="collection-intro__image">
      <img
        src="/images/Historia/mi-nueva-foto.jpg.jpeg"
        alt="Campaña editorial de la marca BOSNYD"
      />

      <span className="collection-intro__image-label">
        COLECCIÓN ORIGEN — BOSNYD
      </span>

      <span className="collection-intro__image-number">
        01 — 03
      </span>
    </div>

    <div className="collection-intro__text">
      <p className="collection-intro__eyebrow">
        NUESTRA FILOSOFÍA
      </p>

      <h2>
        No es solo lo que vistes.
        <br />
        <span>Es lo que representas.</span>
      </h2>

      <p className="collection-intro__description">
        Creemos en prendas que hablan por sí mismas.
        Diseños que reflejan identidad, comodidad y carácter.
      </p>

      <div className="collection-intro__values">
        {essenceItems.map((item, index) => (
          <button
            key={item.number}
            type="button"
            className={`collection-intro__value ${
              activeEssence === index ? "is-active" : ""
            }`}
            onClick={() => setActiveEssence(index)}
            aria-pressed={activeEssence === index}
          >
            <span>{item.number}</span>
            <span>{item.title}</span>
            <span aria-hidden="true">
              {activeEssence === index ? "−" : "+"}
            </span>
          </button>
        ))}
      </div>

      <div
        className="collection-intro__detail"
        aria-live="polite"
        key={activeEssence}
      >
        <span>{essenceItems[activeEssence].number}</span>
        <p>{essenceItems[activeEssence].description}</p>
      </div>

      <a href="#collection">
        EXPLORAR ORIGEN <span aria-hidden="true">↗</span>
      </a>
    </div>
  </div>
</section>

      {/* HISTORIA DE BOSNYD */}
      <section className="about" id="about">
        <div className="about__visual">
          <div className="about__carousel">
            <img
              key={activeImage}
              className="about__carousel-image"
              src={historyImages[activeImage].src}
              alt={historyImages[activeImage].alt}
            />

            <div className="about__visual-caption">
              <span>BOSNYD</span>
              <span>HECHO PARA DESTACAR</span>
            </div>

            <button
              className="about__carousel-arrow about__carousel-arrow--prev"
              type="button"
              onClick={previousImage}
              aria-label="Ver fotografía anterior"
            >
              ‹
            </button>

            <button
              className="about__carousel-arrow about__carousel-arrow--next"
              type="button"
              onClick={nextImage}
              aria-label="Ver fotografía siguiente"
            >
              ›
            </button>

            <div className="about__carousel-indicators">
              {historyImages.map((image, index) => (
                <button
                  key={image.src}
                  type="button"
                  className={`about__carousel-dot ${
                    activeImage === index ? "is-active" : ""
                  }`}
                  onClick={() => setActiveImage(index)}
                  aria-label={`Ver fotografía ${index + 1}`}
                  aria-current={activeImage === index ? "true" : undefined}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="about__content">
          <p className="about__eyebrow">02 / NUESTRA HISTORIA</p>

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