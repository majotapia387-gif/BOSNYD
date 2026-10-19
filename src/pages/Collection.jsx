import products from "../data/products";
import ProductCard from "../components/ProductCard";

function Collection() {
  return (
    <section className="collection" id="collection">
      <div className="collection__header">
        <p className="collection__eyebrow">DESCUBRE NUESTRA ESENCIA</p>

        <h2>Colección ORIGEN</h2>

        <p className="collection__intro">
          Prendas creadas para expresar tu identidad.
          Diseños que te acompañan todos los días.
        </p>
      </div>

      <div className="collection__grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="collection__footer">
        <p>
          BOSNYD — Hecho para destacar en el día a día.
        </p>
      </div>
    </section>
  );
}

export default Collection;