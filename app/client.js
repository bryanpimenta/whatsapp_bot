const wppPackage = require('whatsapp-web.js')
const { Client, LocalAuth } = wppPackage;

/** Cria o cliente e passa as credenciais */
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        // executablePath: '/opt/google/chrome/google-chrome',
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    }
});

module.exports = client
