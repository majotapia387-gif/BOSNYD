
import { useState } from "react";
import { imageUrl } from "../lib/imageUrl";
function ProductCard({ product }) {
  const [selectedColorName, setSelectedColorName] = useState(
    product.colors?.[0]?.name
  );

  const selectedColor = product.colors?.find(
    (color) => color.name === selectedColorName
  ) || product.colors?.[0];

  const formattedPrice = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(product.price);

  const isAvailable = selectedColor?.available === true;

  if (!selectedColor) {
    return null;
  }

  function handleViewProduct(event) {
    event.preventDefault();

    const nextPath = `/producto/${product.id}`;

    window.history.pushState({}, "", nextPath);
    window.dispatchEvent(new PopStateEvent("popstate"));
    window.scrollTo(0, 0);
  }

  return (
    <article className="product-card">
      <div className="product-card__image-container">
        <img
          className="product-card__image"
          src={imageUrl(selectedColor.image)}
          alt={`Camiseta ${product.name} color ${selectedColor.name}`}
        />

        <span className="product-card__label">
          Colección {product.collection}
        </span>
      </div>

      <div className="product-card__content">
        <div className="product-card__heading">
          <h3>{product.name}</h3>
          <p className="product-card__price">{formattedPrice}</p>
        </div>

        <p className="product-card__description">
          {product.description}
        </p>

        <div className="product-card__colors">
          <p>
            Color: <strong>{selectedColor.name}</strong>
          </p>

          <div className="product-card__color-options">
            {product.colors.map((color) => (
              <button
                key={color.name}
                type="button"
                className={`product-card__color-button ${
                  selectedColor.name === color.name ? "is-selected" : ""
                }`}
                onClick={() => setSelectedColorName(color.name)}
                aria-label={`Seleccionar color ${color.name}`}
                aria-pressed={selectedColor.name === color.name}
              >
                <span
                  className={`product-card__color-swatch product-card__color-swatch--${color.name.toLowerCase()}`}
                />
                {color.name}
              </button>
            ))}
          </div>
        </div>

        <div
          className={`product-card__availability ${
            isAvailable ? "is-available" : "is-sold-out"
          }`}
          role="status"
        >
          <span className="product-card__availability-dot" />
          {isAvailable ? "Disponible" : "Agotado"}
        </div>

        <a
          className="product-card__button"
          href={`/producto/${product.id}`}
          onClick={handleViewProduct}
        >
          Ver producto
        </a>
      </div>
    </article>
  );
}

export default ProductCard;
