"use client";

import { useState } from "react";

export default function VolunteerForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, asunto: "Quiero colaborar" }),
    });

    setStatus(res.ok ? "success" : "error");

    if (res.ok) setFormData({ name: "", email: "", message: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">¿Quieres colaborar como voluntario/a?</h2>

      <input
        type="text"
        name="name"
        placeholder="Tu nombre"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full p-3 border rounded-lg focus:ring focus:border-blue-500"
      />
      <input
        type="email"
        name="email"
        placeholder="Tu correo"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full p-3 border rounded-lg focus:ring focus:border-blue-500"
      />
      <textarea
        name="message"
        placeholder="Cuéntame cómo te gustaría ayudar"
        value={formData.message}
        onChange={handleChange}
        required
        className="w-full p-3 border rounded-lg focus:ring focus:border-blue-500"
        rows={4}
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Enviando..." : "Enviar"}
      </button>

      {status === "success" && <p className="text-green-600">¡Gracias por tu interés! Te responderé pronto.</p>}
      {status === "error" && <p className="text-red-600">Algo falló. Intenta de nuevo más tarde.</p>}
    </form>
  );
}
