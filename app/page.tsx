"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Trash2 } from "lucide-react";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

import { PERSONAS } from "@/lib/prompts";

type Msg = {
  role: "user" | "assistant";
  content: string;
};

const PersonaOption = Object.keys(PERSONAS) as (keyof typeof PERSONAS)[];

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [persona, setPersona] =
    useState<(typeof PersonaOption)[number]>("matematica");
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
      <Card className="w-full h-[85vh] grid grid-rows-[min-content_1fr_min-content]">
        <CardHeader>
          <CardTitle>Chat AI</CardTitle>
          <CardDescription>Assistente Educacional</CardDescription>
          <CardAction>
            <div className="">
              <Combobox
                items={PersonaOption}
                value={persona}
                onValueChange={(value) =>
                  setPersona(value as (typeof PersonaOption)[number])
                }
              >
                <ComboboxInput placeholder="Escolhe a disciplina" />
                <ComboboxContent>
                  <ComboboxEmpty>Nenhuma opção encontrada.</ComboboxEmpty>
                  <ComboboxList>
                    {(item) => (
                      <ComboboxItem key={item} value={item}>
                        {item}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            </div>
          </CardAction>
        </CardHeader>

        <CardContent className="space-y-4 overflow-y-auto p-4">
          {messages.length === 0 && (
            <div className="text-center text-slate-400 mt-10">
              <p>Em que posso ajudar-te hoje?</p>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className="flex gap-3 text-slate-600 text-sm">
              <Avatar>
                <AvatarImage
                  src={
                    msg.role === "user"
                      ? "https://github.com/tomas4030.png"
                      : "https://i.pinimg.com/736x/af/cb/dc/afcbdccb8720fadc583aa5d99b1df134.jpg"
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
