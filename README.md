# whatsapp_bot
Está é uma configuração rápida e direta para o uso da aplicação `whatsapp-web` com sua documentação disponivel em: https://wwebjs.dev/guide/#installation

# Instalação
Certifique-se de que o Node.js esteja instalado em seu sistema antes de prosseguir.

## Passo 1: Clone o repositório
git clone https://github.com/bryanpimenta/whatsapp_bot.git

## Passo 2: Instale as dependencias
npm install

## Passo 3: Rode a aplicação
npm run dev

## Passo 4: Logue com seu WhatsApp

Sera gerado um QR CODE de autenticação no terminal

## Se tudo tiver ocorrido bem, aparecera a mensagem: 'Online e operando! ✨'

# Cuidado
Tenha muita atenção ao desenvolver funções para envio de mensagens, principalmente as que envolvem loops ou envio em massa (para todos contatos).

# Uso
Você pode dar uma olhadinha na documentação https://wwebjs.dev/guide/#installation e explorar todas as funções disponiveis.

Neste projeto fiz algumas para que possa interagir de imediato

Exemplos de comando pronto
!michelly
!ping

### Irei fazer mais funções em breve

# Extra: Exemplos

Tipos de mensagems

// Evento de mensagem
`
client.on('message', message => {
    // condição da mensagem
	if(message.body === '!entrou') { 
        // formata imagem para envio
        const michelly_media = MessageMedia.fromFilePath(michelly);
        // (pra quem?, qual mensagem?, qual arquivo?) -> envia o texto + arquivo mídia
        client.sendMessage(message.from, "Michelly Ziggs", { media: michelly_media }); 
	};
});
`

// Evento de entrada no grupo
client.on('group_join', notification => { // captura evento de entrada no grupo
    if (notification.chatId === '120363171480059289@g.us') { // se a notificação for do grupo dos Amomus
        client.sendMessage(notification.id.participant, 'Bem vindo ao grupo dos Amomus!'); // envia mensagem para quem entrou no grupo
    };
});


// Pega todas informações de chat, recomendo explorar bem essa pois traz todas informações que da pra reutilizar como:

// Para obter informações de todos os chats, você pode usar o seguinte código.
// Ele é valioso, pois traz informações que podem ser reutilizadas.

client.getChats().then(chats => {
  chats.map(chat => {
    if (chat.isGroup) {
      // Informações de um chat de grupo
      console.log("Informação de um chat de grupo");
      console.log("Nome do grupo:", chat.name);
      console.log("ID do grupo:", chat.id._serialized);
      console.log("Membros do grupo:", chat.groupMetadata.participants.length);
      console.log("Arquivado:", chat.archived);
      console.log("Fixado:", chat.pinned);
    } else {
      // Informação de um chat privado
      console.log("Informação de um chat privado");
      console.log("Número do contato:", chat.number);
      console.log("Nome do contato:", chat.name);
      console.log("Nome alternativo:", chat.pushname);
      console.log("Arquivado:", chat.archived);
      console.log("Fixado:", chat.pinned);
    }
    console.log("\n"); // Separador entre os chats
  });
});

