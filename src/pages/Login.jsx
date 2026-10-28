
import { useState } from "react";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Completa el correo y la contraseña.");
      return;
    }

    onLogin(email.trim(), password);
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <a className="login-brand" href="/">
          BOSNYD<span>®</span>
        </a>

        <p className="login-eyebrow">ÁREA PRIVADA</p>
        <h1>Bienvenido.</h1>
        <p className="login-description">
          Inicia sesión para acceder al panel de administración.
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="login-email">Correo electrónico</label>
          <input
            id="login-email"
            type="email"
            placeholder="admin@bosnyd.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="username"
            required
          />

          <label htmlFor="login-password">Contraseña</label>
          <input
            id="login-password"
            type="password"
            placeholder="Escribe tu contraseña"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
          />

          {error && <p className="login-error" role="alert">{error}</p>}

          <button className="login-submit" type="submit">
            INICIAR SESIÓN ↗
          </button>
        </form>

        <a className="login-back" href="/">
          ← Volver a la tienda
        </a>

        <p className="login-note">
          Acceso de demostración académica.
        </p>
      </section>
    </main>
  );
}

export default Login;
