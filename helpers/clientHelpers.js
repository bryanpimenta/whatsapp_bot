const wppPackage = require('whatsapp-web.js');
const { MessageMedia } = wppPackage;
const client = require('../app/client')

async function sendMessage({
    media,
    react = null,
    target,
    message,
}) {

    if(react != null) {
        const _message = react.message;
        _message.react(react.reaction);
    }

    /** Teoricamente isso permite que seja enviado um caminho para um arquivo local
     * mas é bem provável que isso quebre de alguma forma. */
    const _media = typeof media == 'string'
        ? MessageMedia.fromFilePath(media)
        : media;

    client.sendMessage(target, message, { media: _media });
}

module.exports = {
    sendMessage,
}