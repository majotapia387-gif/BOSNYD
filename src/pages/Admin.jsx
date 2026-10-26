
import { useEffect } from "react";
import products from "../data/products";

const formatPrice = (price) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(price);

function Admin({ onLogout }) {
  useEffect(() => {
    document.title = "Administración | BOSNYD";

    return () => {
      document.title = "BOSNYD";
    };
  }, []);

  const totalVariants = products.reduce(
    (total, product) => total + product.colors.length,
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
          Consulta los productos de la colección ORIGEN.
        </p>

        <section className="admin-stats">
          <article className="admin-stat">
            <p>Productos</p>
            <strong>{products.length}</strong>
          </article>

          <article className="admin-stat">
            <p>Colección</p>
            <strong>ORIGEN</strong>
          </article>

          <article className="admin-stat">
            <p>Variantes de color</p>
            <strong>{totalVariants}</strong>
          </article>
        </section>

        <h2 className="admin-section-heading">
          Catálogo de productos
        </h2>

        <section className="admin-product-grid">
          {products.map((product) => (
            <article className="admin-product" key={product.id}>
              <img
                src={product.colors[0].image}
                alt={`${product.name} en color ${product.colors[0].name}`}
              />

              <div className="admin-product-info">
                <p>{product.collection}</p>
                <h3>{product.name}</h3>
                <strong>{formatPrice(product.price)}</strong>

                <p className="admin-product-description">
                  {product.description}
                </p>

                <p>
                  Colores:{" "}
                  {product.colors.map((color) => color.name).join(" y ")}
                </p>
              </div>
            </article>
          ))}
        </section>

        <p className="admin-footnote">
          Panel de demostración académica. Actualmente permite
          consultar el catálogo; todavía no modifica una base de datos.
        </p>
      </main>
    </div>
  );
}

export default Admin;
