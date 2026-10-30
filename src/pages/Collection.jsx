import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { supabase } from "../lib/supabaseClient";

function Collection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        console.error("Error al cargar los productos:", error.message);
        setError("No pudimos cargar la colección. Inténtalo nuevamente.");
      } else {
        console.log("Productos recibidos desde Supabase:", data);
        setProducts(data);
      }

      setLoading(false);
    }

    loadProducts();
  }, []);

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

      {loading && <p>Cargando nuestra colección...</p>}

      {error && <p role="alert">{error}</p>}

      {!loading && !error && products.length === 0 && (
        <p>Pronto encontrarás nuestra colección aquí.</p>
      )}

      {!loading && !error && products.length > 0 && (
        <div className="collection__grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <div className="collection__footer">
        <p>BOSNYD — Hecho para destacar en el día a día.</p>
      </div>
    </section>
  );
}

export default Collection;