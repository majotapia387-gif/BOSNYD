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

import "./styles/admi.css";

function App() {
  const [path, setPath] = useState(window.location.pathname);
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

  useEffect(() => {
    function handlePopState() {
      setPath(window.location.pathname);
    }

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("bosnyd-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  function navigate(nextPath) {
    window.history.pushState({}, "", nextPath);
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

  function addToCart(product, color) {
    if (!color || color.available !== true) {
      alert("Esta variante está agotada.");
      return;
    }

    setCartItems((previousItems) => {
      const existingItem = previousItems.find(
        (item) =>
          item.productId === product.id &&
          item.colorName === color.name
      );

      if (existingItem) {
        return previousItems.map((item) =>
          item.productId === product.id &&
          item.colorName === color.name
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
          image: color.image,
          quantity: 1,
        },
      ];
    });

    alert(`${product.name} se agregó al carrito.`);
  }

  function updateCartQuantity(productId, colorName, quantity) {
    if (quantity < 1) {
      removeFromCart(productId, colorName);
      return;
    }

    setCartItems((previousItems) =>
      previousItems.map((item) =>
        item.productId === productId &&
        item.colorName === colorName
          ? { ...item, quantity }
          : item
      )
    );
  }

  function removeFromCart(productId, colorName) {
    setCartItems((previousItems) =>
      previousItems.filter(
        (item) =>
          item.productId !== productId ||
          item.colorName !== colorName
      )
    );
  }

  if (path === "/login") {
    if (authLoading) {
      return <main className="login-page">Comprobando sesión...</main>;
    }

    if (session) {
      return <Admin onLogout={handleLogout} />;
    }

    return <Login onLogin={handleLogin} />;
  }

  if (path === "/admin") {
    if (authLoading) {
      return <main className="login-page">Comprobando sesión...</main>;
    }

    if (!session) {
      return <Login onLogin={handleLogin} />;
    }

    return <Admin onLogout={handleLogout} />;
  }

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