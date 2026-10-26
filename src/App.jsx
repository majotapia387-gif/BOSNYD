
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import "./styles/Admi.css";

function App() {
  // PRUEBA TEMPORAL: muestra la ruta que está leyendo React.
  console.log("Ruta actual:", window.location.pathname);

  const [path, setPath] = useState(window.location.pathname);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    function handlePopState() {
      setPath(window.location.pathname);
    }

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  function navigate(nextPath) {
    window.history.pushState({}, "", nextPath);
    setPath(nextPath);
    window.scrollTo(0, 0);
  }

  function handleLogin(email, password) {
    if (
      email === "admin@bosnyd.com" &&
      password === "Bosnyd2026!"
    ) {
      setIsAuthenticated(true);
      navigate("/admin");
    } else {
      alert(
        "Correo o contraseña incorrectos. Revisa los datos de prueba."
      );
    }
  }

  function handleLogout() {
    setIsAuthenticated(false);
    navigate("/login");
  }

  // PÁGINA DE INICIO DE SESIÓN
  if (path === "/login") {
    return <Login onLogin={handleLogin} />;
  }

  // PANEL DE ADMINISTRACIÓN
  if (path === "/admin") {
    if (!isAuthenticated) {
      return <Login onLogin={handleLogin} />;
    }

    return <Admin onLogout={handleLogout} />;
  }

  // PÁGINA PRINCIPAL DE BOSNYD
  return (
    <>
      <Navbar />

      <main>
        <Home />
        <Collection />
      </main>

      <Footer />
    </>
  );
}

export default App;
