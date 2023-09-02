// Para obter informações de todos os chats que você tem, use o método getChats().
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
