import { BASE_PROMPT, PERSONAS } from "@/lib/llm/prompts";
import { askOllama } from "@/lib/llm/ollama";

export async function POST(req: Request) {
  try {
    const { message, persona } = (await req.json()) as {
      message: string;
      persona?: keyof typeof PERSONAS;
    };

    const style =
      persona && persona in PERSONAS ? PERSONAS[persona] : PERSONAS.exigente;

    const fullPrompt = `
${BASE_PROMPT}

PERSONA:
${style}

PERGUNTA DO ALUNO:
${message}

RESPOSTA:
`;

    const response = await askOllama(fullPrompt);

    return Response.json({ response });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    return Response.json(
      { response: "Falha ao gerar resposta.", error: message },
      { status: 500 },
    );
  }
}
