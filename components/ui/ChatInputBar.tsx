"use client"

import { useState } from "react"
import { Plus, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function ChatInputBar() {
  const [message, setMessage] = useState("")

  const handleSend = () => {
    if (!message.trim()) return
    console.log("Mensagem:", message)
    setMessage("")
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-2xl px-3 py-2 shadow-sm">
        
        {/* Botão + */}
        <Button
          variant="ghost"
          size="icon"
          className="rounded-xl text-zinc-400 hover:text-white"
        >
          <Plus size={18} />
        </Button>

        {/* Input */}
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask, Search or Chat..."
          className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-sm"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />

        {/* Indicadores à direita */}
        <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-400">
          <Badge variant="secondary" className="rounded-md px-2 py-0.5">
            Auto
          </Badge>
          <span>52% used</span>
        </div>

        {/* Botão enviar */}
        <Button
          onClick={handleSend}
          size="icon"
          className="rounded-xl bg-white text-black hover:bg-zinc-200"
        >
          <ArrowUp size={18} />
        </Button>
      </div>
    </div>
  )
}
