
import { useMemo, useState } from "react";
import products from "../data/products";
import "../styles/StyleFinder.css";

const preferences = {
  minimalista: {
    "la-firma": 5,
    distinto: 2,
    historia: 1,
    impronta: 1,
  },
  artistico: {
    historia: 5,
    impronta: 5,
    distinto: 2,
    "la-firma": 1,
  },
  grafico: {
    distinto: 5,
    historia: 4,
    impronta: 3,
    "la-firma": 2,
  },
};

const currency = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

function StyleFinder() {
  const [style, setStyle] = useState("minimalista");
  const [color, setColor] = useState("Marfil");
  const [budget, setBudget] = useState("80000");
  const [showResult, setShowResult] = useState(false);

  const recommendation = useMemo(() => {
    const availableProducts = products.filter(
      (product) => product.price <= Number(budget)
    );

    if (availableProducts.length === 0) {
      return null;
    }

    const rankedProducts = [...availableProducts].sort((a, b) => {
      return (
        (preferences[style][b.id] || 0) -
        (preferences[style][a.id] || 0)
      );
    });

    const product = rankedProducts[0];
    const selectedColor = product.colors.find(
      (item) => item.name === color
    ) || product.colors[0];

    return { product, selectedColor };
  }, [style, color, budget]);

  function handleSubmit(event) {
    event.preventDefault();
    setShowResult(true);
  }

  return (
    <section className="style-finder" id="style-finder">
      <div className="style-finder__header">
        <p className="style-finder__eyebrow">
          ENCUENTRA TU ESTILO / BOSNYD
        </p>

        <h2>
          Tu estilo.
          <br />
          <span>Tu elección.</span>
        </h2>

        <p className="style-finder__intro">
          Cuéntanos qué te gusta y te ayudaremos a encontrar
          una camiseta de la colección ORIGEN que encaje contigo.
        </p>
      </div>

      <form className="style-finder__form" onSubmit={handleSubmit}>
        <fieldset className="style-finder__question">
          <legend>
            <span>01</span> ¿Qué estilo te representa?
          </legend>

          <div className="style-finder__options">
            <label className={style === "minimalista" ? "is-selected" : ""}>
              <input
                type="radio"
                name="style"
                value="minimalista"
                checked={style === "minimalista"}
                onChange={(event) => {
                  setStyle(event.target.value);
                  setShowResult(false);
                }}
              />
              <span className="style-finder__option-title">
                Minimalista
              </span>
              <span className="style-finder__option-description">
                Simple y esencial
              </span>
            </label>

            <label className={style === "artistico" ? "is-selected" : ""}>
              <input
                type="radio"
                name="style"
                value="artistico"
                checked={style === "artistico"}
                onChange={(event) => {
                  setStyle(event.target.value);
                  setShowResult(false);
                }}
              />
              <span className="style-finder__option-title">
                Artístico
              </span>
              <span className="style-finder__option-description">
                Arte y expresión
              </span>
            </label>

            <label className={style === "grafico" ? "is-selected" : ""}>
              <input
                type="radio"
                name="style"
                value="grafico"
                checked={style === "grafico"}
                onChange={(event) => {
                  setStyle(event.target.value);
                  setShowResult(false);
                }}
              />
              <span className="style-finder__option-title">
                Gráfico
              </span>
              <span className="style-finder__option-description">
                Diseños con carácter
              </span>
            </label>
          </div>
        </fieldset>

        <fieldset className="style-finder__question">
          <legend>
            <span>02</span> ¿Qué color prefieres?
          </legend>

          <div className="style-finder__colors">
            <label className={color === "Marfil" ? "is-selected" : ""}>
              <input
                type="radio"
                name="color"
                value="Marfil"
                checked={color === "Marfil"}
                onChange={() => {
                  setColor("Marfil");
                  setShowResult(false);
                }}
              />
              <span className="style-finder__swatch style-finder__swatch--ivory" />
              Marfil
            </label>

            <label className={color === "Negro" ? "is-selected" : ""}>
              <input
                type="radio"
                name="color"
                value="Negro"
                checked={color === "Negro"}
                onChange={() => {
                  setColor("Negro");
                  setShowResult(false);
                }}
              />
              <span className="style-finder__swatch style-finder__swatch--black" />
              Negro
            </label>
          </div>
        </fieldset>

        <fieldset className="style-finder__question">
          <legend>
            <span>03</span> ¿Cuál es tu presupuesto?
          </legend>

          <select
            value={budget}
            onChange={(event) => {
              setBudget(event.target.value);
              setShowResult(false);
            }}
          >
            <option value="65000">Hasta $65.000 COP</option>
            <option value="70000">Hasta $70.000 COP</option>
            <option value="80000">Hasta $80.000 COP</option>
          </select>
        </fieldset>

        <button className="style-finder__submit" type="submit">
          ENCONTRAR MI CAMISETA ↗
        </button>
      </form>

      {showResult && recommendation && (
        <div className="style-finder__result" aria-live="polite">
          <div className="style-finder__result-image">
            <img
              src={recommendation.selectedColor.image}
              alt={`${recommendation.product.name} en color ${recommendation.selectedColor.name}`}
            />
          </div>

          <div className="style-finder__result-content">
            <p className="style-finder__eyebrow">
              TU RECOMENDACIÓN / COLECCIÓN ORIGEN
            </p>

            <h3>{recommendation.product.name}</h3>

            <p>{recommendation.product.description}</p>

            <p className="style-finder__result-price">
              {currency.format(recommendation.product.price)}
            </p>

            <p className="style-finder__result-color">
              Color elegido: {recommendation.selectedColor.name}
            </p>

            <a href="#collection" className="style-finder__result-link">
              EXPLORAR EN EL CATÁLOGO ↗
            </a>
          </div>
        </div>
      )}

      {showResult && !recommendation && (
        <p className="style-finder__empty" role="status">
          No encontramos productos dentro de ese presupuesto.
          Prueba con otro rango para descubrir la colección ORIGEN.
        </p>
      )}
    </section>
  );
}

export default StyleFinder;
