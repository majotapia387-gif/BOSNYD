
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

function Contact() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setFeedback("");

    const { error } = await supabase
      .from("contact_requests")
      .insert([formData]);

    if (error) {
      console.error("Error al enviar la solicitud:", error.message);
      setFeedback("No pudimos enviar tu solicitud. Inténtalo nuevamente.");
    } else {
      setFeedback("¡Tu solicitud fue enviada correctamente!");
      setFormData({
        full_name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    }

    setLoading(false);
  }

  return (
    <section className="contact" id="contact">
      <div className="contact__header">
        <p className="contact__eyebrow">ESTAMOS PARA TI</p>
        <h2>Hablemos.</h2>
        <p>
          ¿Tienes alguna pregunta sobre BOSNYD?
          Escríbenos y estaremos encantados de atenderte.
        </p>
      </div>

      <form className="contact__form" onSubmit={handleSubmit}>
        <label htmlFor="full_name">Nombre completo</label>
        <input
          id="full_name"
          name="full_name"
          type="text"
          value={formData.full_name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Correo electrónico</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="phone">Teléfono (opcional)</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
        />

        <label htmlFor="subject">Motivo de contacto</label>
        <select
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona una opción</option>
          <option value="Información sobre productos">Información sobre productos</option>
          <option value="Pedidos">Pedidos</option>
          <option value="Disponibilidad">Disponibilidad</option>
          <option value="Otro">Otro</option>
        </select>

        <label htmlFor="message">Mensaje</label>
        <textarea
          id="message"
          name="message"
          rows="5"
          value={formData.message}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Enviando..." : "Enviar solicitud"}
        </button>

        {feedback && <p role="status">{feedback}</p>}
      </form>
    </section>
  );
}

export default Contact;
