
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
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingRequests, setLoadingRequests] = useState(true);
  const [error, setError] = useState("");
  const [requestError, setRequestError] = useState("");
  const [updating, setUpdating] = useState(null);
  const [updatingRequest, setUpdatingRequest] = useState(null);

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

    async function loadRequests() {
      const { data, error } = await supabase
        .from("contact_requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error al cargar solicitudes:", error.message);
        setRequestError("No pudimos cargar las solicitudes de contacto.");
      } else {
        setRequests(data || []);
      }

      setLoadingRequests(false);
    }

    loadProducts();
    loadRequests();

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
      console.error("Error al actualizar disponibilidad:", error.message);
      setError("No se pudo actualizar la disponibilidad.");
    } else {
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

  async function markRequestAsAttended(request) {
    setUpdatingRequest(request.id);
    setRequestError("");

    const { error } = await supabase
      .from("contact_requests")
      .update({ status: "Atendida" })
      .eq("id", request.id);

    if (error) {
      console.error("Error al actualizar solicitud:", error.message);
      setRequestError("No se pudo actualizar el estado de la solicitud.");
    } else {
      setRequests((previousRequests) =>
        previousRequests.map((item) =>
          item.id === request.id
            ? { ...item, status: "Atendida" }
            : item
        )
      );
    }

    setUpdatingRequest(null);
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

  const pendingRequests = requests.filter(
    (request) => request.status === "Pendiente"
  ).length;

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
          Gestiona los productos, la disponibilidad y las solicitudes
          de contacto de BOSNYD.
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

          <article className="admin-stat">
            <p>Solicitudes pendientes</p>
            <strong>{pendingRequests}</strong>
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

        <section className="admin-requests">
          <div className="admin-requests-heading">
            <div>
              <p className="admin-eyebrow">MENSAJES DE CLIENTES</p>
              <h2 className="admin-section-heading">
                Solicitudes de contacto
              </h2>
            </div>

            <span className="admin-request-count">
              {requests.length} recibidas
            </span>
          </div>

          {loadingRequests && <p>Cargando solicitudes...</p>}

          {requestError && (
            <p className="admin-request-error" role="alert">
              {requestError}
            </p>
          )}

          {!loadingRequests &&
            !requestError &&
            requests.length === 0 && (
              <p className="admin-empty-requests">
                Todavía no hay solicitudes de contacto.
              </p>
            )}

          <div className="admin-request-list">
            {requests.map((request) => (
              <article className="admin-request" key={request.id}>
                <div className="admin-request-top">
                  <div>
                    <span
                      className={`admin-status ${
                        request.status === "Atendida"
                          ? "is-available"
                          : "is-pending"
                      }`}
                    >
                      <span className="admin-status-dot"></span>
                      {request.status || "Pendiente"}
                    </span>

                    <h3>{request.full_name}</h3>
                    <p className="admin-request-subject">
                      {request.subject}
                    </p>
                  </div>

                  <span className="admin-request-date">
                    {new Date(request.created_at).toLocaleDateString(
                      "es-CO"
                    )}
                  </span>
                </div>

                <div className="admin-request-contact">
                  <p>
                    <strong>Correo:</strong> {request.email}
                  </p>

                  {request.phone && (
                    <p>
                      <strong>Teléfono:</strong> {request.phone}
                    </p>
                  )}
                </div>

                <p className="admin-request-message">
                  {request.message}
                </p>

                {request.status !== "Atendida" && (
                  <button
                    className="admin-request-button"
                    type="button"
                    disabled={updatingRequest === request.id}
                    onClick={() => markRequestAsAttended(request)}
                  >
                    {updatingRequest === request.id
                      ? "Guardando..."
                      : "Marcar como atendida"}
                  </button>
                )}
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Admin;
