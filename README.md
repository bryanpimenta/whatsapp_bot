# whatsapp_bot
Está é uma configuração rápida e direta para o uso da aplicação `whatsapp-web` com sua guia disponivel <a href='https://wwebjs.dev/guide/#installation'>aqui</a>

# Instalação
Certifique-se de que o Node.js esteja instalado em seu sistema antes de prosseguir.

## Passo 1: Clone o repositório
```bash
git clone https://github.com/bryanpimenta/whatsapp_bot.git
```

## Passo 2: Instale as dependencias
```bash
npm install
```

## Passo 3: Rode a aplicação
```bash
npm run dev
```

## Passo 4: Logue com seu WhatsApp

Sera gerado um QR CODE de autenticação no terminal

## Se tudo tiver ocorrido bem, aparecera a mensagem: 'Online e operando! ✨'

# Cuidado
Tenha muita atenção ao desenvolver funções para envio de mensagens, principalmente as que envolvem loops ou envio em massa (para todos contatos).

# Uso
Para interagir, outra pessoa precisa te mandar os comandos! 
Você pode dar uma olhadinha na <a href="https://docs.wwebjs.dev">Documentação</a> do Projeto e explorar todas as funções disponiveis.

Neste projeto fiz algumas para que possa interagir de imediato

Exemplos de comandos prontos que reagem:
`/michelly`
`/ping`
`/gatinho`
`/doguinho`
`/bomdia`
`/boanoite`
`/mas eu quero agora`

Esse comandos foram feitos para um grupo no whatsapp com meus amigos, sintasse a vontade para usar, modificar ou adicionar.

# Gemini e ChatGPT
Está aplicação possui integração com IAs da Gemini e ChatGPT. Existe modulos de ambos instalados no projeto. Além do código que precisa ser descomentados em `messages.js` para poder interagir com as IAs. Basta fazer o que disse antes e criar um arquivo `.env` com sua `APIKEY` seja de qual vá usar.

Em `config/prompt.json` você delimita a personalidade da sua assistente.

# 

Agredecimentos em especial ao <a href="https://github.com/marcosebsilva">Marquinhos 😎</a> pela refatoração atômica.
