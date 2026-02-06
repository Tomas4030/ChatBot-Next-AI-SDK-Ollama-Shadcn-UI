"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Trash2 } from "lucide-react";

type Msg = {
  role: "user" | "assistant";
  content: string;
};

type PersonaOption = "calmo" | "exigente" | "infantil";

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [persona, setPersona] = useState<PersonaOption>("calmo");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg: Msg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, persona: persona }),
      });

      const data = await res.json();
      const content =
        res.ok && data?.response
          ? data.response
          : "Não consegui gerar uma resposta agora.";

      const botMsg: Msg = { role: "assistant", content };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      const botMsg: Msg = {
        role: "assistant",
        content: "Erro ao contactar o servidor de respostas.",
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 items-center justify-center p-4">
      <Card className="w-full max-w-md h-[80vh] grid grid-rows-[min-content_1fr_min-content]">
        <CardHeader>
          <CardTitle>Chat AI</CardTitle>
          <CardDescription>Assistente Educacional ({persona})</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 overflow-y-auto p-4">
          {messages.length === 0 && (
            <div className="text-center text-slate-400 mt-10">
              <p>Olá! Escolhe uma personalidade abaixo e faz uma pergunta.</p>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className="flex gap-3 text-slate-600 text-sm">
              <Avatar>
                <AvatarImage
                  src={
                    msg.role === "user"
                      ? "https://github.com/tomas4030.png"
                      : "https://cdn-icons-png.flaticon.com/512/4712/4712109.png"
                  }
                />
                <AvatarFallback>
                  {msg.role === "user" ? "U" : "AI"}
                </AvatarFallback>
              </Avatar>

              <div className="leading-relaxed w-full">
                <span className="block font-bold text-slate-800 mb-1">
                  {msg.role === "user" ? "Tu:" : "Chatbot:"}
                </span>

                <ReactMarkdown
                  components={{
                    strong: ({ node, ...props }) => (
                      <span className="font-bold text-black" {...props} />
                    ),
                    ul: ({ node, ...props }) => (
                      <ul className="list-disc pl-4" {...props} />
                    ),
                    ol: ({ node, ...props }) => (
                      <ol className="list-decimal pl-4" {...props} />
                    ),
                  }}
                >
                  {msg.content}
                </ReactMarkdown>
              </div>
            </div>
          ))}

          {loading && (
            <p className="text-sm text-slate-400 animate-pulse pl-12">
              A escrever...
            </p>
          )}
        </CardContent>

        <CardFooter className="flex flex-col gap-3 bg-slate-50/50 p-4 border-t">
          {/* Seletor de Personalidade */}
          <div className="flex w-full gap-2 justify-center">
            <Button
              size="sm"
              variant={persona === "calmo" ? "default" : "outline"}
              onClick={() => setPersona("calmo")}
              className="flex-1"
            >
              Calmo
            </Button>
            <Button
              size="sm"
              variant={persona === "exigente" ? "default" : "outline"}
              onClick={() => setPersona("exigente")}
              className="flex-1"
            >
              Exigente
            </Button>
            <Button
              size="sm"
              variant={persona === "infantil" ? "default" : "outline"}
              onClick={() => setPersona("infantil")}
              className="flex-1"
            >
              Infantil
            </Button>
          </div>

          {/* Input e Enviar */}
          <div className="flex w-full gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMessages([])}
              title="Limpar conversa"
            >
              <Trash2 className="h-4 w-4 text-slate-500" />
            </Button>

            <Input
              placeholder="Escreve a tua mensagem..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="bg-white"
            />
            <Button onClick={sendMessage}>Enviar</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
