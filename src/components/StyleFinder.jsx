
import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { imageUrl } from "../lib/imageUrl";
import "../styles/StyleFinder.css";

const preferences = {
  minimalista: {
    "La Firma": 5,
    Distinto: 2,
    Historia: 1,
    Impronta: 1,
  },
  artistico: {
    Historia: 5,
    Impronta: 5,
    Distinto: 2,
    "La Firma": 1,
  },
  grafico: {
    Distinto: 5,
    Historia: 4,
    Impronta: 3,
    "La Firma": 2,
  },
};

const styleLabels = {
  minimalista: "Minimalista",
  artistico: "Artístico",
  grafico: "Gráfico",
};

const currency = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

function StyleFinder({ navigate }) {
  const [style, setStyle] = useState("minimalista");
  const [color, setColor] = useState("Marfil");
  const [budget, setBudget] = useState("80000");
  const [showResult, setShowResult] = useState(false);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      const { data, error } = await supabase
        .from("products")
        .select("id, name, price, collection, description, colors")
        .order("id", { ascending: true });

      if (error) {
        console.error("Error al cargar productos:", error);
        setLoadError(
          "No pudimos cargar las recomendaciones. Inténtalo más tarde."
        );
      } else {
        setProducts(data || []);
      }

      setLoading(false);
    }

    loadProducts();
  }, []);

  const recommendation = useMemo(() => {
    const availableProducts = products
      .filter((product) => Number(product.price) <= Number(budget))
      .map((product) => {
        const selectedColor = product.colors?.find(
          (item) => item.name === color && item.available === true
        );

        return selectedColor
          ? { ...product, selectedColor }
          : null;
      })
      .filter(Boolean);

    if (availableProducts.length === 0) {
      return null;
    }

    const rankedProducts = [...availableProducts].sort((a, b) => {
      return (
        (preferences[style][b.name] || 0) -
        (preferences[style][a.name] || 0)
      );
    });

    const product = rankedProducts[0];

    return {
      product,
      selectedColor: product.selectedColor,
    };
  }, [products, style, color, budget]);

  function handlePreferenceChange(setter, value) {
    setter(value);
    setShowResult(false);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!loading && !loadError) {
      setShowResult(true);
    }
  }

  const progress = showResult ? 100 : 75;

  return (
    <section className="style-finder" id="style-finder">
      <div className="style-finder__container">
        <header className="style-finder__header">
          <p className="style-finder__eyebrow">
            ENCUENTRA TU ESTILO / BOSNYD
          </p>

          <h2>
            Tu estilo.
            <br />
            <span>Tu elección.</span>
          </h2>

          <p className="style-finder__intro">
            Tres pequeñas elecciones para descubrir la camiseta
            que mejor conecta con tu estilo.
          </p>
        </header>

        <div className="style-finder__card">
          <div className="style-finder__top">
            <div>
              <p className="style-finder__top-label">
                PERSONALIZA TU EXPERIENCIA
              </p>
              <p className="style-finder__top-description">
                Cuéntanos qué estás buscando.
              </p>
            </div>

            <span className="style-finder__step">
              03 PREGUNTAS
            </span>
          </div>

          <div
            className="style-finder__progress"
            role="progressbar"
            aria-label="Progreso del recomendador"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow={progress}
          >
            <span style={{ width: `${progress}%` }} />
          </div>

          <form className="style-finder__form" onSubmit={handleSubmit}>
            <fieldset className="style-finder__question">
              <legend>
                <span className="style-finder__number">01</span>
                ¿Qué estilo te representa?
              </legend>

              <div className="style-finder__options">
                <label className={style === "minimalista" ? "is-selected" : ""}>
                  <input
                    type="radio"
                    name="style"
                    value="minimalista"
                    checked={style === "minimalista"}
                    onChange={() =>
                      handlePreferenceChange(setStyle, "minimalista")
                    }
                  />

                  <span className="style-finder__option-check">✓</span>
                  <span className="style-finder__option-title">Minimalista</span>
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
                    onChange={() =>
                      handlePreferenceChange(setStyle, "artistico")
                    }
                  />

                  <span className="style-finder__option-check">✓</span>
                  <span className="style-finder__option-title">Artístico</span>
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
                    onChange={() =>
                      handlePreferenceChange(setStyle, "grafico")
                    }
                  />

                  <span className="style-finder__option-check">✓</span>
                  <span className="style-finder__option-title">Gráfico</span>
                  <span className="style-finder__option-description">
                    Diseños con carácter
                  </span>
                </label>
              </div>
            </fieldset>

            <fieldset className="style-finder__question">
              <legend>
                <span className="style-finder__number">02</span>
                ¿Qué color prefieres?
              </legend>

              <div className="style-finder__colors">
                <label className={color === "Marfil" ? "is-selected" : ""}>
                  <input
                    type="radio"
                    name="color"
                    value="Marfil"
                    checked={color === "Marfil"}
                    onChange={() =>
                      handlePreferenceChange(setColor, "Marfil")
                    }
                  />

                  <span className="style-finder__swatch style-finder__swatch--ivory" />
                  <span>Marfil</span>
                  <span className="style-finder__option-check">✓</span>
                </label>

                <label className={color === "Negro" ? "is-selected" : ""}>
                  <input
                    type="radio"
                    name="color"
                    value="Negro"
                    checked={color === "Negro"}
                    onChange={() =>
                      handlePreferenceChange(setColor, "Negro")
                    }
                  />

                  <span className="style-finder__swatch style-finder__swatch--black" />
                  <span>Negro</span>
                  <span className="style-finder__option-check">✓</span>
                </label>
              </div>
            </fieldset>

            <fieldset className="style-finder__question">
              <legend>
                <span className="style-finder__number">03</span>
                ¿Cuál es tu presupuesto?
              </legend>

              <div className="style-finder__select-wrap">
                <select
                  value={budget}
                  onChange={(event) =>
                    handlePreferenceChange(setBudget, event.target.value)
                  }
                  aria-label="Selecciona tu presupuesto"
                >
                  <option value="65000">Hasta $65.000 COP</option>
                  <option value="70000">Hasta $70.000 COP</option>
                  <option value="80000">Hasta $80.000 COP</option>
                </select>
                <span className="style-finder__select-icon">⌄</span>
              </div>
            </fieldset>

            <div className="style-finder__summary">
              <p className="style-finder__summary-label">TU SELECCIÓN</p>

              <div className="style-finder__summary-details">
                <span>{styleLabels[style]}</span>
                <span>{color}</span>
                <span>Hasta {currency.format(Number(budget))}</span>
              </div>
            </div>

            <button
              className="style-finder__submit"
              type="submit"
              disabled={loading || Boolean(loadError)}
            >
              {loading
                ? "CARGANDO PRODUCTOS..."
                : "ENCONTRAR MI CAMISETA"}
              <span>↗</span>
            </button>

            {loadError && (
              <p className="style-finder__feedback" role="alert">
                {loadError}
              </p>
            )}
          </form>
        </div>

        {showResult && !loading && !loadError && recommendation && (
          <div className="style-finder__result" aria-live="polite">
            <div className="style-finder__result-image">
              <img
                src={imageUrl(
                  recommendation.selectedColor.catalog_image ||
                  recommendation.selectedColor.image
                )}
                alt={`${recommendation.product.name} en color ${recommendation.selectedColor.name}`}
              />
              <span className="style-finder__result-tag">
                TU RECOMENDACIÓN
              </span>
            </div>

            <div className="style-finder__result-content">
              <p className="style-finder__eyebrow">
                COLECCIÓN ORIGEN / BOSNYD
              </p>

              <h3>{recommendation.product.name}</h3>

              <p className="style-finder__result-description">
                {recommendation.product.description}
              </p>

              <p className="style-finder__result-price">
                {currency.format(recommendation.product.price)}
              </p>

              <p className="style-finder__result-color">
                Color seleccionado: {recommendation.selectedColor.name}
              </p>

              <button
                type="button"
                className="style-finder__result-link"
                onClick={() =>
                  navigate(`/producto/${recommendation.product.id}`)
                }
              >
                VER PRODUCTO <span>↗</span>
              </button>
            </div>
          </div>
        )}

        {showResult && !loading && !loadError && !recommendation && (
          <div className="style-finder__empty" role="status">
            <p className="style-finder__eyebrow">
              SIGAMOS BUSCANDO
            </p>
            <h3>No encontramos una coincidencia.</h3>
            <p>
              No hay productos de ese color disponibles dentro
              de tu presupuesto. Prueba con otra combinación.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default StyleFinder;
