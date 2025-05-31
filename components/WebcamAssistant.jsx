import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export default function WebcamAssistant() {
  const [userInput, setUserInput] = useState("");
  const [mood, setMood] = useState("playful");
  const [intensity, setIntensity] = useState("medium");
  const [language, setLanguage] = useState("en");
  const [moderation, setModeration] = useState(false);
  const [response, setResponse] = useState("");

  const generateResponse = async () => {
    const prompt = \`User message: "\${userInput}"
Mood: \${mood}
Intensity: \${intensity}
Respond in: \${language}
Moderation mode: \${moderation ? "ON" : "OFF"}

Generate a flirty, creative response for a webcam model in this style. If the user is being inappropriate or offensive and moderation is ON, respond smartly to de-escalate or redirect.\`;

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    setResponse(data.output);
  };

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">Webcam Assistant</h1>

      <Textarea
        placeholder="Pega aquí lo que escribió el cliente..."
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />

      <div className="grid grid-cols-3 gap-2">
        <Select value={mood} onValueChange={setMood}>
          <SelectTrigger><SelectValue placeholder="Mood" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="sweet">Dulce 🍬</SelectItem>
            <SelectItem value="playful">Juguetona 😛</SelectItem>
            <SelectItem value="naughty">Traviesa 😈</SelectItem>
            <SelectItem value="dominant">Dominante 💋</SelectItem>
            <SelectItem value="submissive">Sumisa 🙈</SelectItem>
            <SelectItem value="mysterious">Misteriosa 🌙</SelectItem>
          </SelectContent>
        </Select>

        <Select value={intensity} onValueChange={setIntensity}>
          <SelectTrigger><SelectValue placeholder="Intensidad" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="low">🔹 Suave</SelectItem>
            <SelectItem value="medium">🔸 Media</SelectItem>
            <SelectItem value="high">🔥 Alta</SelectItem>
          </SelectContent>
        </Select>

        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger><SelectValue placeholder="Idioma" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="es">Español 🇪🇸</SelectItem>
            <SelectItem value="en">Inglés 🇬🇧</SelectItem>
            <SelectItem value="both">Ambos 🌐</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2">
        <Switch checked={moderation} onCheckedChange={setModeration} />
        <span className="text-sm">Modo moderación activado</span>
      </div>

      <Button onClick={generateResponse}>Generar respuesta</Button>

      {response && (
        <div className="p-4 bg-gray-100 rounded-xl mt-4">
          <p className="whitespace-pre-wrap">{response}</p>
          <Button
            className="mt-2"
            onClick={() => navigator.clipboard.writeText(response)}
          >
            Copiar respuesta 📋
          </Button>
        </div>
      )}
    </div>
  );
}
