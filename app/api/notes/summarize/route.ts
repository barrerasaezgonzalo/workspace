import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { title, content } = await request.json();

    if (!content?.trim()) {
      return NextResponse.json(
        { error: "El contenido es obligatorio." },
        { status: 400 },
      );
    }

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "GROQ_API_KEY no configurada." },
        { status: 500 },
      );
    }

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-120b",
          messages: [
            {
              role: "system",
              content:
                "Genera un resumen breve y claro de la nota. No incluyas información sensible como tokens, claves, contraseñas o credenciales, aunque aparezcan en el contenido original. Resume únicamente la información relevante y omite cualquier dato sensible. Devuelve únicamente el resumen, sin títulos, explicaciones ni formato adicional.",
            },
            {
              role: "user",
              content: `Título: ${title || "Sin título"}\n\nContenido:\n${content}`,
            },
          ],
          temperature: 0.3,
        }),
      },
    );

    if (!response.ok) {
      const error = await response.text();
      console.error("Error de Groq:", error);

      return NextResponse.json(
        { error: "No se pudo generar el resumen." },
        { status: 500 },
      );
    }

    const data = await response.json();

    const summary = data.choices?.[0]?.message?.content?.trim() || null;

    return NextResponse.json({ summary });
  } catch (error) {
    console.error("Error al generar resumen:", error);

    return NextResponse.json(
      { error: "Error al generar el resumen." },
      { status: 500 },
    );
  }
}
