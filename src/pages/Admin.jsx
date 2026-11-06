
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const formatPrice = (price) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(price);

function Admin({ onLogout }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    document.title = "Administración | BOSNYD";

    async function loadProducts() {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        console.error("Error al cargar productos:", error.message);
        setError("No pudimos cargar los productos.");
      } else {
        const normalizedProducts = (data || []).map((product) => ({
          ...product,
          colors: (product.colors || []).map((color) => ({
            ...color,
            available: color.available === true,
          })),
        }));

        setProducts(normalizedProducts);
      }

      setLoading(false);
    }

    loadProducts();

    return () => {
      document.title = "BOSNYD";
    };
  }, []);

  async function toggleAvailability(product, colorIndex) {
    const updatedColors = product.colors.map((color, index) => ({
      ...color,
      available:
        index === colorIndex
          ? color.available !== true
          : color.available === true,
    }));

    setUpdating(`${product.id}-${colorIndex}`);
    setError("");

    const { data, error } = await supabase
      .from("products")
      .update({ colors: updatedColors })
      .eq("id", product.id)
      .select("id, colors")
      .single();

    if (error) {
      console.error(
        "Error al actualizar disponibilidad:",
        error.message
      );
      setError("No se pudo actualizar la disponibilidad.");
    } else {
      console.log("Disponibilidad guardada en Supabase:", data);

      const savedColors = (data.colors || []).map((color) => ({
        ...color,
        available: color.available === true,
      }));

      setProducts((previousProducts) =>
        previousProducts.map((item) =>
          item.id === product.id
            ? { ...item, colors: savedColors }
            : item
        )
      );
    }

    setUpdating(null);
  }

  const totalVariants = products.reduce(
    (total, product) => total + (product.colors?.length || 0),
    0
  );

  const availableVariants = products.reduce(
    (total, product) =>
      total +
      (product.colors || []).filter(
        (color) => color.available === true
      ).length,
    0
  );

  return (
    <div className="admin-page">
      <header className="admin-header">
        <a className="admin-brand" href="/">
          BOSNYD®
        </a>

        <button
          className="admin-logout"
          type="button"
          onClick={onLogout}
        >
          Cerrar sesión ↗
        </button>
      </header>

      <main className="admin-content">
        <p className="admin-eyebrow">ÁREA PRIVADA / BOSNYD</p>

        <h1>Panel de administración</h1>

        <p className="admin-description">
          Gestiona los productos y la disponibilidad de la colección ORIGEN.
        </p>

        <section className="admin-stats">
          <article className="admin-stat">
            <p>Productos</p>
            <strong>{products.length}</strong>
          </article>

          <article className="admin-stat">
            <p>Variantes</p>
            <strong>{totalVariants}</strong>
          </article>

          <article className="admin-stat">
            <p>Disponibles</p>
            <strong>{availableVariants}</strong>
          </article>
        </section>

        <h2 className="admin-section-heading">
          Catálogo de productos
        </h2>

        {loading && <p>Cargando productos...</p>}

        {error && <p role="alert">{error}</p>}

        {!loading && !error && products.length === 0 && (
          <p>No hay productos registrados.</p>
        )}

        <section className="admin-product-grid">
          {products.map((product) => (
            <article className="admin-product" key={product.id}>
              <img
                src={product.colors?.[0]?.image}
                alt={product.name}
              />

              <div className="admin-product-info">
                <p>{product.collection}</p>
                <h3>{product.name}</h3>
                <strong>{formatPrice(product.price)}</strong>

                <p className="admin-product-description">
                  {product.description}
                </p>

                <div className="admin-variants">
                  {product.colors?.map((color, index) => {
                    const isAvailable = color.available === true;

                    const isUpdating =
                      updating === `${product.id}-${index}`;

                    return (
                      <div className="admin-variant" key={index}>
                        <div className="admin-variant-info">
                          <strong>{color.name}</strong>

                          <span
                            className={`admin-status ${
                              isAvailable
                                ? "is-available"
                                : "is-sold-out"
                            }`}
                          >
                            <span className="admin-status-dot"></span>
                            {isAvailable ? "Disponible" : "Agotado"}
                          </span>
                        </div>

                        <button
                          className={`admin-availability-button ${
                            isAvailable
                              ? "button-sold-out"
                              : "button-available"
                          }`}
                          type="button"
                          disabled={updating !== null}
                          onClick={() =>
                            toggleAvailability(product, index)
                          }
                        >
                          {isUpdating
                            ? "Guardando..."
                            : isAvailable
                              ? "Marcar agotado"
                              : "Marcar disponible"}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}

export default Admin;
