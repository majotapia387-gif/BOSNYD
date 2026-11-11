
import { useEffect, useState } from "react";

import { supabase } from "./lib/supabaseClient";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Product from "./pages/Product";
import StyleFinder from "./components/StyleFinder";
import Cart from "./pages/cart";

import "./styles/Admi.css";

function App() {
  // Ruta base: "/" en local y "/BOSNYD/" en GitHub Pages.
  const BASE_PATH = import.meta.env.BASE_URL.replace(/\/$/, "");

  // Obtiene la ruta sin el prefijo del repositorio.
  function getCurrentPath() {
    const currentPath = window.location.pathname;

    return currentPath.startsWith(BASE_PATH)
      ? currentPath.slice(BASE_PATH.length) || "/"
      : currentPath;
  }

  const [path, setPath] = useState(getCurrentPath());
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("bosnyd-cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Comprueba la sesión de Supabase.
  useEffect(() => {
    let mounted = true;

    async function loadSession() {
      const { data, error } = await supabase.auth.getSession();

      if (!mounted) return;

      if (error) {
        console.error("Error al comprobar la sesión:", error.message);
      }

      setSession(data?.session ?? null);
      setAuthLoading(false);
    }

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setAuthLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // Actualiza la ruta al usar los botones atrás y adelante del navegador.
  useEffect(() => {
    function handlePopState() {
      setPath(getCurrentPath());
    }

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  // Guarda el carrito en el almacenamiento local.
  useEffect(() => {
    localStorage.setItem("bosnyd-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Navegación compatible con GitHub Pages.
  function navigate(nextPath) {
    const destination = `${BASE_PATH}${nextPath}`;

    window.history.pushState({}, "", destination);
    setPath(nextPath);
    window.scrollTo(0, 0);
  }

  function handleLogin() {
    navigate("/admin");
  }

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error al cerrar sesión:", error.message);
      alert("No se pudo cerrar la sesión. Inténtalo nuevamente.");
      return;
    }

    navigate("/login");
  }

  // Agrega productos al carrito.
  function addToCart(product, color, size) {
    if (!color || color.available !== true) {
      alert("Esta variante está agotada.");
      return;
    }

    if (!size) {
      alert("Selecciona una talla antes de continuar.");
      return;
    }

    setCartItems((previousItems) => {
      const existingItem = previousItems.find(
        (item) =>
          item.productId === product.id &&
          item.colorName === color.name &&
          (item.size || "M") === size
      );

      if (existingItem) {
        return previousItems.map((item) =>
          item.productId === product.id &&
          item.colorName === color.name &&
          (item.size || "M") === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...previousItems,
        {
          productId: product.id,
          name: product.name,
          price: Number(product.price),
          collection: product.collection,
          colorName: color.name,
          image: color.catalog_image || color.image,
          size,
          quantity: 1,
        },
      ];
    });

    alert(`${product.name} talla ${size} se agregó al carrito.`);
  }

  // Actualiza la cantidad de un producto.
  function updateCartQuantity(productId, colorName, size, quantity) {
    if (quantity < 1) {
      removeFromCart(productId, colorName, size);
      return;
    }

    setCartItems((previousItems) =>
      previousItems.map((item) =>
        item.productId === productId &&
        item.colorName === colorName &&
        (item.size || "M") === size
          ? { ...item, quantity }
          : item
      )
    );
  }

  // Elimina un producto del carrito.
  function removeFromCart(productId, colorName, size) {
    setCartItems((previousItems) =>
      previousItems.filter(
        (item) =>
          item.productId !== productId ||
          item.colorName !== colorName ||
          (item.size || "M") !== size
      )
    );
  }

  // Página de inicio de sesión.
  if (path === "/login") {
    if (authLoading) {
      return <main className="login-page">Comprobando sesión...</main>;
    }

    if (session) {
      return <Admin onLogout={handleLogout} />;
    }

    return <Login onLogin={handleLogin} />;
  }

  // Panel de administración protegido por sesión.
  if (path === "/admin") {
    if (authLoading) {
      return <main className="login-page">Comprobando sesión...</main>;
    }

    if (!session) {
      return <Login onLogin={handleLogin} />;
    }

    return <Admin onLogout={handleLogout} />;
  }

  // Página del carrito.
  if (path === "/carrito") {
    return (
      <>
        <Navbar cartCount={cartCount} navigate={navigate} />

        <Cart
          cartItems={cartItems}
          onUpdateQuantity={updateCartQuantity}
          onRemove={removeFromCart}
          navigate={navigate}
        />

        <Footer />
      </>
    );
  }

  // Página de detalle de producto.
  const productMatch = path.match(/^\/producto\/(\d+)$/);

  if (productMatch) {
    return (
      <>
        <Navbar cartCount={cartCount} navigate={navigate} />

        <Product
          productId={productMatch[1]}
          navigate={navigate}
          onAddToCart={addToCart}
          cartCount={cartCount}
        />

        <Footer />
      </>
    );
  }

  // Página principal de BOSNYD.
  return (
    <>
      <Navbar cartCount={cartCount} navigate={navigate} />

      <main>
        <Home />
        <StyleFinder />
        <Collection />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

export default App;
