
import "../styles/Cart.css";

const WHATSAPP_NUMBER = "573002248841";

function formatPrice(price) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(price);
}

function Cart({ cartItems, onUpdateQuantity, onRemove, navigate }) {
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  function handleWhatsAppOrder() {
    const productDetails = cartItems
      .map(
        (item) =>
          `• ${item.name}\n` +
          `  Color: ${item.colorName}\n` +
          `  Cantidad: ${item.quantity}\n` +
          `  Precio: ${formatPrice(item.price)}\n` +
          `  Subtotal: ${formatPrice(item.price * item.quantity)}`
      )
      .join("\n\n");

    const message =
      `¡Hola, BOSNYD! Quiero realizar una solicitud de pedido:\n\n` +
      `${productDetails}\n\n` +
      `TOTAL: ${formatPrice(totalPrice)}\n\n` +
      `Quisiera confirmar la disponibilidad y los detalles de entrega. ¡Gracias!`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <main className="cart-page">
      <div className="cart-container">
        <p className="cart-eyebrow">BOSNYD / TU SELECCIÓN</p>
        <h1>Tu carrito</h1>
        <p className="cart-intro">
          Las prendas que elegiste para acompañarte todos los días.
        </p>

        {cartItems.length === 0 ? (
          <section className="cart-empty">
            <span className="cart-empty__symbol">B.</span>
            <h2>Tu carrito está vacío</h2>
            <p>
              Descubre la colección ORIGEN y encuentra tu próxima prenda favorita.
            </p>
            <button
              className="cart-button"
              type="button"
              onClick={() => navigate("/")}
            >
              Explorar colección
            </button>
          </section>
        ) : (
          <div className="cart-layout">
            <section className="cart-products" aria-label="Productos seleccionados">
              <p className="cart-products__count">
                {totalItems} {totalItems === 1 ? "producto" : "productos"}
              </p>

              {cartItems.map((item) => (
                <article
                  className="cart-item"
                  key={`${item.productId}-${item.colorName}`}
                >
                  <img
                    className="cart-item__image"
                    src={item.image}
                    alt={`${item.name} color ${item.colorName}`}
                  />

                  <div className="cart-item__info">
                    <p className="cart-item__collection">
                      Colección {item.collection}
                    </p>
                    <h2>{item.name}</h2>
                    <p className="cart-item__color">
                      Color: {item.colorName}
                    </p>
                    <p className="cart-item__price">
                      {formatPrice(item.price)}
                    </p>

                    <div className="cart-item__actions">
                      <div
                        className="cart-quantity"
                        aria-label={`Cantidad de ${item.name}`}
                      >
                        <button
                          type="button"
                          aria-label="Disminuir cantidad"
                          onClick={() =>
                            onUpdateQuantity(
                              item.productId,
                              item.colorName,
                              item.quantity - 1
                            )
                          }
                        >
                          −
                        </button>

                        <span>{item.quantity}</span>

                        <button
                          type="button"
                          aria-label="Aumentar cantidad"
                          onClick={() =>
                            onUpdateQuantity(
                              item.productId,
                              item.colorName,
                              item.quantity + 1
                            )
                          }
                        >
                          +
                        </button>
                      </div>

                      <button
                        className="cart-item__remove"
                        type="button"
                        onClick={() =>
                          onRemove(item.productId, item.colorName)
                        }
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>

                  <p className="cart-item__subtotal">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </article>
              ))}
            </section>

            <aside className="cart-summary">
              <p className="cart-summary__eyebrow">RESUMEN</p>
              <h2>Tu pedido</h2>

              <div className="cart-summary__line">
                <span>Productos</span>
                <span>{totalItems}</span>
              </div>

              <div className="cart-summary__line cart-summary__total">
                <span>Total</span>
                <strong>{formatPrice(totalPrice)}</strong>
              </div>

              <p className="cart-summary__note">
                El pedido se confirmará directamente con BOSNYD por WhatsApp.
                Los detalles de envío y pago se acordarán por ese medio.
              </p>

              <button
                className="cart-button cart-button--full"
                type="button"
                onClick={handleWhatsAppOrder}
              >
                Enviar solicitud por WhatsApp
              </button>

              <button
                className="cart-continue"
                type="button"
                onClick={() => navigate("/")}
              >
                ← Seguir explorando
              </button>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}

export default Cart;
