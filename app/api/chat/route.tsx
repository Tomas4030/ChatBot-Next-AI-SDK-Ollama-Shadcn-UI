import { NextResponse } from "next/server";
import { BASE_PROMPT, PERSONAS, PERSONA_FALLBACK_RULE } from "@/lib/prompts";

type PersonaKey = keyof typeof PERSONAS;

export async function POST(req: Request) {
  try {
    const { messages, persona } = (await req.json()) as {
      messages: { role: "user" | "assistant"; content: string }[];
      persona?: PersonaKey;
    };

    const style: string =
      persona && persona in PERSONAS ? PERSONAS[persona] : PERSONAS.Matematica;

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          // model: "llama-3.3-70b-versatile",  Modelo Groq good
          model: "llama-3.1-8b-instant", //modelo Groq mais leve, para testes
          messages: [
            {
              role: "system",
              content: `
              ${BASE_PROMPT}

              PERSONA ATIVA:
              ${style}

              REGRA DE ESPECIALIDADE:
              ${PERSONA_FALLBACK_RULE}
              `,
            },

            ...messages,
          ],
          temperature: 0.4,
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "Erro na Groq");
    }

    return NextResponse.json({
      response: data.choices[0].message.content,
    });
  } catch (error) {
    return NextResponse.json(
      { response: "Tive um problema a processar a mensagem. Tenta outra vez!" },
      { status: 500 },
    );
  }
}
