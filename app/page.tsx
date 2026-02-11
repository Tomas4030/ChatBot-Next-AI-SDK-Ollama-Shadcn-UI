"use client";
import { useEffect, useRef, useState } from "react";
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
import ElasticText from "@/components/ui/ElasticText";
import { ModeToggle } from "@/components/ui/toggleDarkMode";

type Msg = { role: "user" | "assistant"; content: string };
type PersonaKey = keyof typeof PERSONAS;
const PersonaOption = Object.keys(PERSONAS) as PersonaKey[];

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Olá! Como posso ajudar?" },
  ]);
  const [persona, setPersona] = useState<PersonaKey>("Matematica");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg: Msg = { role: "user", content: input };

    const MAX_HISTORY = 12; // Limite de memória (12 )
    const updatedMessages = [...messages, userMsg].slice(-MAX_HISTORY);
    console.log("Enviando mensagens para a API:", updatedMessages);

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages,
          persona,
        }),
      });

      const data = await res.json();

      const botMsg: Msg = {
        role: "assistant",
        content: res.ok ? data.response : "Erro ao gerar resposta.",
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Erro ao contactar o servidor." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 items-center justify-center p-4">
      <Card className="w-full h-[85vh] grid grid-rows-[min-content_1fr_min-content]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex">
            <ElasticText text="DaVinci AI" />
          </CardTitle>
          <CardDescription className="text-1xl ">
            Assistente Educacional
          </CardDescription>
          <CardAction>
            <div className="flex items-center gap-2">
              <Combobox
                items={PersonaOption}
                value={persona}
                onValueChange={(v) => {
                  setPersona(v as PersonaKey);
                  setMessages([
                    { role: "assistant", content: "Nova conversa iniciada!" },
                  ]);
                }}
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
                <ModeToggle />
              </Combobox>
            </div>
          </CardAction>
        </CardHeader>

        <CardContent className="space-y-4 overflow-y-auto p-4">
          {messages.map((msg, i) => (
            <div key={i} className="flex gap-3 text-sm animate-slide-down">
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
              <div className="w-full">
                <span className="font-bold block mb-1">
                  {msg.role === "user" ? "Tu:" : "DaVinci AI:"}
                </span>
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
            </div>
          ))}
          {loading && (
            <p className="text-sm animate-pulse pl-12">A escrever...</p>
          )}
          <div ref={messagesEndRef} />
        </CardContent>

        <CardFooter className="p-4 border-t">
          <div className="flex w-full gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                setMessages([
                  { role: "assistant", content: "Nova conversa iniciada!" },
                ])
              }
            >
              <Trash2 className="h-4 w-4" />
            </Button>

            <Input
              placeholder="Escreve a tua mensagem..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <Button onClick={sendMessage}>Enviar</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
