const wppPackage = require('whatsapp-web.js');
const { Client, LocalAuth } = wppPackage;

/** Cria o cliente e passa as credenciais */
const client = new Client({
    authStrategy: new LocalAuth(),
    // webVersionCache: { type: 'remote', remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.3000.1014600264-alpha.html', },
    puppeteer: {
        headless: true,
        // executablePath: '/opt/google/chrome/google-chrome',
        executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    }
});

module.exports = client;
