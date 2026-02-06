import { NextResponse } from "next/server";
import { BASE_PROMPT, PERSONAS } from "@/lib/prompts";

export async function POST(req: Request) {
  try {
    const { message, persona } = (await req.json()) as {
      message: string;
      persona?: keyof typeof PERSONAS;
    };

    const style =
      persona && persona in PERSONAS ? PERSONAS[persona] : PERSONAS.calmo;

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content: `${BASE_PROMPT}\n\nCONTEXTO DE ESTILO: ${style}`,
            },
            {
              role: "user",
              content: message,
            },
          ],
          temperature: 0.4,
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "Erro na Groq");
    }

    return NextResponse.json({ response: data.choices[0].message.content });
  } catch (error) {
    return NextResponse.json(
      {
        response:
          "Tive um problema a processar essa explicação. Tenta de novo!",
      },
      { status: 500 },
    );
  }
}
