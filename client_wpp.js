const qrcode = require('qrcode-terminal');
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const michelly = './images/michelly.jpg';
const BOM_DIA = './videos/bomdia.mp4';

const client = new Client({ // Criando o cliente e passando as credenciais
  authStrategy: new LocalAuth(),
});

client.on('qr', qr => { // Verifica se o QR Code foi gerado ou não
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => { // Quando a aplicação estiver pronta para ser usada imprime a mensagem
    console.log('Online e operando! ✨');
    client.getChats().then(chats => {
        chats.map(chat => {
        console.log(chat);
        });
    });
});

client.on('message', message => { // Pega as conversas em tempo real
    message.getContact().then(contact => {
        console.log(`${contact.name || contact.number}: ${message.body}`);
    });
});

client.on('message', async message => { // Se receber mensagem: !michelly
    if (message.body === '!michelly') {
        const ziggs = MessageMedia.fromFilePath(michelly);
        client.sendMessage(message.from, `✨💣*MICHELLLLLLLLY ZIGGSSSSSSSSSSSSSSS*💣✨`);
        client.sendMessage(message.from, ziggs);
    }
});

client.on('message', message => { // mande !ping e retorna pong
	if(message.body === '!ping') {
		message.reply('pong');
	}
});

/* // Probido mensagem com emote foguetinho
client.on('message', message => {
	if(message.body.includes('🚀')) {
		message.reply('Cole mano para, cria vergonha na cara KKKKKKKKKKK');
	}
}); */

client.on('message', message => { // Se receber mensagem: !entrou
	if(message.body === '!entrou') {
        const michelly_media = MessageMedia.fromFilePath(michelly);
        client.sendMessage(message.from, "Michelly Ziggs", { media: michelly_media });
	};
});

client.on('group_join', notification => { // captura evento de entrada no grupo
    if (notification.chatId === '120363171480059289@g.us') { // se a notificação for do grupo dos Amomus
        client.sendMessage(notification.id.participant, 'Bem vindo ao grupo dos Amomus!'); // envia mensagem para quem entrou no grupo
    };
});

client.initialize();