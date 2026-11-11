
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { imageUrl } from "../lib/imageUrl";

const availableSizes = ["S", "M", "L", "XL", "XXL", "3XL"];

function Product({ productId, navigate, onAddToCart, cartCount = 0 }) {
  const [product, setProduct] = useState(null);
  const [selectedColorName, setSelectedColorName] = useState("");
  const [selectedSize, setSelectedSize] = useState("M");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProduct() {
      setLoading(true);
      setError("");

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", productId)
        .single();

      if (error) {
        console.error("Error al cargar el producto:", error.message);
        setError("No pudimos encontrar este producto.");
      } else {
        setProduct(data);
        setSelectedColorName(data.colors?.[0]?.name || "");
        setSelectedSize("M");
      }

      setLoading(false);
    }

    loadProduct();
  }, [productId]);

  if (loading) {
    return (
      <main className="product-detail">
        <p>Cargando producto...</p>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="product-detail">
        <p>{error || "Producto no encontrado."}</p>

        <button type="button" onClick={() => navigate("/")}>
          Volver al inicio
        </button>
      </main>
    );
  }

  const selectedColor = product.colors?.find(
    (color) => color.name === selectedColorName
  ) || product.colors?.[0];

  if (!selectedColor) {
    return (
      <main className="product-detail">
        <p>Este producto todavía no tiene variantes registradas.</p>
      </main>
    );
  }

  const isAvailable = selectedColor.available === true;

  const formattedPrice = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(product.price);

  function handleAddToCart() {
    if (!selectedSize) {
      alert("Selecciona una talla antes de continuar.");
      return;
    }

    onAddToCart(product, selectedColor, selectedSize);
  }

  return (
    <main className="product-detail">
      <div className="product-detail__container">
        <button
          className="product-detail__back"
          type="button"
          onClick={() => navigate("/")}
        >
          ← Volver a la colección
        </button>

        <div className="product-detail__layout">
          <div className="product-detail__gallery">
            <img
              className="product-detail__image"
              src={imageUrl(
                selectedColor.catalog_image || selectedColor.image
              )}
              alt={`Camiseta ${product.name} color ${selectedColor.name}`}
            />
          </div>

          <section className="product-detail__info">
            <p className="product-detail__eyebrow">
              COLECCIÓN {product.collection}
            </p>

            <h1>{product.name}</h1>

            <p className="product-detail__price">
              {formattedPrice}
            </p>

            <p className="product-detail__description">
              {product.description}
            </p>

            <div className="product-detail__colors">
              <p>
                Color: <strong>{selectedColor.name}</strong>
              </p>

              <div className="product-detail__color-options">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    type="button"
                    className={`product-card__color-button ${
                      selectedColor.name === color.name
                        ? "is-selected"
                        : ""
                    }`}
                    onClick={() => setSelectedColorName(color.name)}
                    aria-pressed={selectedColor.name === color.name}
                  >
                    <span
                      className={`product-card__color-swatch product-card__color-swatch--${color.name.toLowerCase()}`}
                    />

                    {color.name}
                    {color.available !== true && " · Agotado"}
                  </button>
                ))}
              </div>
            </div>

            <div className="product-detail__sizes">
              <p>
                Talla: <strong>{selectedSize}</strong>
              </p>

              <div className="product-detail__size-options">
                {availableSizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    className={`product-detail__size-button ${
                      selectedSize === size ? "is-selected" : ""
                    }`}
                    onClick={() => setSelectedSize(size)}
                    aria-pressed={selectedSize === size}
                  >
                    {size}
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

            <button
              className="product-card__button"
              type="button"
              disabled={!isAvailable}
              onClick={handleAddToCart}
            >
              {isAvailable ? "Agregar al carrito" : "Producto agotado"}
            </button>

            <button
              className="product-detail__back"
              type="button"
              onClick={() => navigate("/carrito")}
            >
              Ver carrito ({cartCount})
            </button>

            <p className="product-detail__note">
              Ropa que te acompaña todos los días.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

export default Product;
