const qrcode = require('qrcode-terminal');
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const michelly = './images/michelly.jpg';
const BOM_DIA = './videos/bomdia.mp4';
const BOA_NOITE = './videos/boanoite.mp4';
const AGORA = './videos/mas-eu-quero-agora.mp4';

const client = new Client({ // Criando o cliente e passando as credenciais
  authStrategy: new LocalAuth(),
  puppeteer: {
    executablePath: '/opt/google/chrome/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  }
});

client.on('qr', qr => { // Verifica se o QR Code foi gerado ou não
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => { // Quando a aplicação estiver pronta para ser usada imprime a mensagem
    console.log('Online e operando! ✨');
});

client.on('message', message => { // Pega as conversas em tempo real
    message.getContact().then(contact => {
        console.log(`${contact.name || contact.number}: ${message.body}`);
    });
});

client.on('message', async message => { // /michelly
    if (message.body === '/michelly') {
        const ziggs = MessageMedia.fromFilePath(michelly);
        client.sendMessage(message.from, `*MICHELLLLLLLLY ZIGGSSSSSSSSSSSSSSS*💣🌷`, { media: ziggs });
    }
});

client.on('message', message => { // /ping
	if(message.body === '/ping') {
		message.reply('pong');
	}
});

/* // Probido mensagem com emote foguetinho
client.on('message', message => {
	if(message.body.includes('🚀')) {
		message.reply('Cole mano para, cria vergonha na cara KKKKKKKKKKK');
	}
}); */

client.on('message', async message => { // /bomdia
	if(message.body === '/bomdia') {
        const bomdia_video = MessageMedia.fromFilePath(BOM_DIA);
        message.react('🌞');
        client.sendMessage(message.from, bomdia_video);
	};
});

client.on('message', async message => { // /boanoite
	if(message.body === '/boanoite') {
        const boanoite_video = MessageMedia.fromFilePath(BOA_NOITE);
        message.react('🌙');
        client.sendMessage(message.from, boanoite_video);
	};
});

client.on('message', async message => { // /mas eu quero agora
	if(message.body === '/mas eu quero agora') {
        const agora_video = MessageMedia.fromFilePath(AGORA);
        message.react('😡');
        client.sendMessage(message.from, agora_video);
	};
});

client.on('message', async message => { // /gatinho
    if(message.body === '/gatinho') {
        const fetchCat = await fetch('https://api.thecatapi.com/v1/images/search')
            .then(response => response.json())
            .then(data => data[0].url);
        const gatinho = await MessageMedia.fromUrl(fetchCat);
        message.react('😺');
        client.sendMessage(message.from, gatinho); 
    }
});

client.on('message', async message => { // /doguinho
    if(message.body === '/doguinho') {
        const fetchDog = await fetch('https://dog.ceo/api/breeds/image/random')
            .then(response => response.json())
            .then(data => data.message);
        const doguinho = await MessageMedia.fromUrl(fetchDog);
        message.react('🐶');
        client.sendMessage(message.from, doguinho); 
    }
});

client.on('group_join', notification => { // captura evento de entrada no grupo
    if (notification.chatId === '120363171480059289@g.us') { // se a notificação for do grupo dos Amomus: id do grupo
        client.sendMessage(notification.id.participant, 'Bem vindo ao grupo dos Amomus!'); // envia mensagem para quem entrou no grupo
    };
});

client.initialize();
