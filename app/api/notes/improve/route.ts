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
                "Mejora sustancialmente el contenido de la nota. Reorganiza las ideas para que tengan una estructura lógica y fácil de seguir. Amplía o desarrolla las ideas cuando sea necesario para hacerlas más útiles y completas, pero sin inventar información ni cambiar el significado original. Elimina redundancias, aclara conceptos ambiguos y mejora la redacción. Conserva toda la información relevante del contenido original. Puedes convertir texto en listas o secciones cuando ayude a organizarlo. Devuelve únicamente texto plano. No uses Markdown, no uses títulos con #, no uses asteriscos, guiones, backticks ni ningún otro símbolo de formato Markdown. ",
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
        { error: "No se pudo mejorar el contenido." },
        { status: 500 },
      );
    }

    const data = await response.json();

    const improvedContent = data.choices?.[0]?.message?.content?.trim() || null;

    return NextResponse.json({
      content: improvedContent,
    });
  } catch (error) {
    console.error("Error al mejorar contenido:", error);

    return NextResponse.json(
      { error: "Error al mejorar el contenido." },
      { status: 500 },
    );
  }
}
