import React, { useState } from "react";

export default function WebcamAssistant() {
  const [userInput, setUserInput] = useState("");
  const [mood, setMood] = useState("playful");
  const [intensity, setIntensity] = useState("medium");
  const [language, setLanguage] = useState("en");
  const [moderation, setModeration] = useState(false);
  const [response, setResponse] = useState("");

  const generateResponse = async () => {
    const prompt = `User message: "${userInput}"
Mood: ${mood}
Intensity: ${intensity}
Respond in: ${language}
Moderation mode: ${moderation ? "ON" : "OFF"}

Generate a flirty, creative response for a webcam model in this style. If the user is being inappropriate or offensive and moderation is ON, respond smartly to de-escalate or redirect.`;

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    setResponse(data.output);
  };

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto", padding: 16, fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>Webcam Assistant</h1>

      <textarea
        placeholder="Pega aquí lo que escribió el cliente..."
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        rows={4}
        style={{ width: "100%", padding: 8, fontSize: 14, marginBottom: 16 }}
      />

      <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
        <select value={mood} onChange={(e) => setMood(e.target.value)} style={{ flex: 1, padding: 8, fontSize: 14 }}>
          <option value="sweet">Dulce 🍬</option>
          <option value="playful">Juguetona 😛</option>
          <option value="naughty">Traviesa 😈</option>
          <option value="dominant">Dominante 💋</option>
          <option value="submissive">Sumisa 🙈</option>
          <option value="mysterious">Misteriosa 🌙</option>
        </select>

        <select value={intensity} onChange={(e) => setIntensity(e.target.value)} style={{ flex: 1, padding: 8, fontSize: 14 }}>
          <option value="low">🔹 Suave</option>
          <option value="medium">🔸 Media</option>
          <option value="high">🔥 Alta</option>
        </select>

        <select value={language} onChange={(e) => setLanguage(e.target.value)} style={{ flex: 1, padding: 8, fontSize: 14 }}>
          <option value="es">Español 🇪🇸</option>
          <option value="en">Inglés 🇬🇧</option>
          <option value="both">Ambos 🌐</option>
        </select>
      </div>

      <label style={{ display: "flex", alignItems: "center", marginBottom: 16, fontSize: 14 }}>
        <input
          type="checkbox"
          checked={moderation}
          onChange={(e) => setModeration(e.target.checked)}
          style={{ marginRight: 8 }}
        />
        Modo moderación activado
      </label>

      <button
        onClick={generateResponse}
        style={{
          width: "100%",
          padding: 12,
          fontSize: 16,
          fontWeight: "bold",
          backgroundColor: "#0070f3",
          color: "white",
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
        }}
      >
        Generar respuesta
      </button>

      {response && (
        <div
          style={{
            marginTop: 24,
            padding: 16,
            backgroundColor: "#f0f0f0",
            borderRadius: 8,
            whiteSpace: "pre-wrap",
          }}
        >
          {response}
          <button
            onClick={() => navigator.clipboard.writeText(response)}
            style={{
              marginTop: 12,
              padding: 8,
              fontSize: 14,
              backgroundColor: "#555",
              color: "white",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
            }}
          >
            Copiar respuesta 📋
          </button>
        </div>
      )}
    </div>
  );
}
