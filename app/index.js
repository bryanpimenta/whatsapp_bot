const fs = require('fs');
const client =  require('./client.js');
const qrcode = require('qrcode-terminal');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: ".env" });
const EVENT_DIR = __dirname + '/../events';

/** Gera um QRCode pra autenticar no WhatsApp web */
client.on('qr', qr => { 
    console.log('Generated QRCode.')
    qrcode.generate(qr, { small: true });
});

/** Quando a aplicação estiver pronta para ser usada, imprime essa mensagem. */
client.on('ready', async () => {
    const version = await client.getWWebVersion();
    console.log(`WWeb v${version}`);
    console.log('Online e operando! ✨');
});

/**Lê todos os arquivos da pasta eventos e registra cada um deles no client.
 * Todos os arquivos devem obrigatioriamente exportar uma chave "handler" e "type".
 */

fs.readdirSync(EVENT_DIR).forEach((file) => {
    const event = require(path.join(EVENT_DIR, file));

    if(!event.handler) throw new Error(`Handler not found in ${file}.`);
    if(!event.type) throw new Error(`Event type not found in ${file}.`);

    client.on(event.type, event.handler)
})

client.initialize();
