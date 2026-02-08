# Chatbot Next.js com Groq, Ollama e Shadcn

Projeto desenvolvido com [Next.js](https://nextjs.org/), utilizando componentes UI do [Shadcn](https://ui.shadcn.com/), integração com a API do Groq e modelos Ollama, hospedado na [Vercel](https://vercel.com/).

## 📖 Descrição do Projeto

Este projeto é um chatbot moderno, rápido e personalizável, que utiliza modelos de linguagem avançados (LLMs) via API do Groq, com interface construída em Next.js e componentes Shadcn. O objetivo é proporcionar uma experiência de conversação natural, responsiva e facilmente extensível.

A aplicação está disponível em produção: [https://miguellchatbot.vercel.app/](https://miguellchatbot.vercel.app/)

## ✨ Funcionalidades Principais

- Interface de chat responsiva e moderna
- Integração com a API do Groq usando modelos Ollama (llama-3.1-8b-instant e llama-3.3-70b-versatile)
- Componentes UI reutilizáveis com Shadcn
- Deploy automático e escalável na Vercel
- Estrutura modular para fácil manutenção e expansão

## 🛠️ Tecnologias Usadas

- **Next.js**: Framework React para aplicações web modernas
- **TypeScript**: Tipagem estática para maior robustez
- **Shadcn UI**: Biblioteca de componentes UI acessíveis e personalizáveis
- **Groq API**: Integração com modelos LLM de alta performance
- **Ollama**: Modelos de linguagem open-source (llama-3.1-8b-instant, llama-3.3-70b-versatile)
- **Vercel**: Plataforma de deployment e hosting

## 🧩 O que é o Shadcn?

O [Shadcn UI](https://ui.shadcn.com/) é uma coleção de componentes React acessíveis, personalizáveis e prontos para produção. Ao contrário de outras bibliotecas, o Shadcn fornece o código-fonte dos componentes para que possas adaptá-los conforme as necessidades do teu projeto, promovendo flexibilidade e controlo total sobre o design e comportamento.

**Como funciona?**

- Instalas apenas os componentes que precisas
- Podes modificar o código dos componentes diretamente
- Mantém a consistência visual e acessibilidade


## 📁 Estrutura do Projeto

```
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── api/
│       └── chat/
│           └── route.tsx
├── components/
│   └── ui/
│       ├── avatar.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── combobox.tsx
│       ├── ElasticText.tsx
│       ├── input-group.tsx
│       ├── input.tsx
│       └── textarea.tsx
├── data/
│   └── docs/
├── lib/
│   ├── prompts.tsx
│   └── utils.ts
├── public/
├── components.json
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── README.md
├── tsconfig.json
└── Netx.txt
```

## 🚀 Instalação e Execução Local

1. **Clona o repositório:**
   ```bash
   git clone <url-do-repo>
   cd chatbot
   ```
2. **Instala as dependências:**
   ```bash
   npm install
   ```
3. **Configura variáveis de ambiente:**
   - Cria um ficheiro `.env.local` coloca a tu API keys.
    ```
      GROQ_API_KEY="" 
   ```

4. **Executa o projeto localmente:**
   ```bash
   npm run dev
   ```
5. Acede a [http://localhost:3000](http://localhost:3000)

## ☁️ Deployment na Vercel

O projeto está preparado para deployment contínuo na Vercel. Basta ligar o repositório à Vercel e cada push na branch principal será automaticamente publicado.

- [Documentação Vercel](https://vercel.com/docs)
- [Projeto em produção](https://miguellchatbot.vercel.app/)

## 💡 Exemplos de Uso

- Envia uma mensagem no chat e recebe respostas contextuais dos modelos Ollama.
- Personaliza os componentes UI conforme a tua identidade visual.

## 📚 Documentação dos Componentes e Módulos Importantes

### Componentes UI (pasta `components/ui/`)

- **avatar.tsx**: Componente de avatar para utilizadores/bots
- **button.tsx**: Botão reutilizável com variantes
- **card.tsx**: Cartão para agrupar conteúdos
- **combobox.tsx**: Caixa de seleção com pesquisa
- **ElasticText.tsx**: Textarea que ajusta o tamanho automaticamente
- **input-group.tsx**: Agrupamento de inputs
- **input.tsx**: Campo de input de texto
- **textarea.tsx**: Campo de texto multilinha

### API

- **app/api/chat/route.tsx**: Endpoint para processar mensagens do chat e interagir com a API do Groq/Ollama

### Lógica de Negócio

- **lib/prompts.tsx**: Prompts e templates para interações com o modelo
- **lib/utils.ts**: Funções utilitárias usadas em várias partes do projeto

## 📝 Contribuição

Sinta-se à vontade para abrir issues ou pull requests para sugerir melhorias ou reportar bugs.

---

© 2026 Miguel | Projeto open-source
