import { useState } from "react";

function ProductCard({ product }) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);

  const formattedPrice = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(product.price);

  return (
    <article className="product-card">
      <div className="product-card__image-container">
        <img
          className="product-card__image"
          src={selectedColor.image}
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
                onClick={() => setSelectedColor(color)}
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

        <a
          className="product-card__button"
          href={`#producto-${product.id}`}
        >
          Ver producto
        </a>
      </div>
    </article>
  );
}

export default ProductCard;