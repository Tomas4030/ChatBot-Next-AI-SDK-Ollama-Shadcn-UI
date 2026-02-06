export async function askOllama(prompt: string) {
  const res = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "Qwen3",
      prompt,
      temperature: 0.2,
      stream: false
    })
  })

  if (!res.ok) {
    const errorText = await res.text()
    throw new Error(`Ollama error ${res.status}: ${errorText}`)
  }

  const data = await res.json()
  if (!data?.response) {
    throw new Error("Ollama returned an empty response")
  }

  return data.response
}
