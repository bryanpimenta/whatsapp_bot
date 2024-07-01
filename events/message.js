// const generateGeminiReply = require("../lib/gemini");
const clientHelpers = require("../helpers/clientHelpers");
const client = require("../app/client");
const { sendMessage } = clientHelpers;
const { MessageMedia } = require('whatsapp-web.js');


/** Isso daqui ta praticamente igual @function handleGroupMessage */
/* async function handlePrivateMessage(message){
    try {
        const parsedMessage =  message.body.replace(/@\d+/g, '');
        const aiReply = await generateGeminiReply(parsedMessage);
        await sendMessage({
            message: aiReply,
            target: message.from
        })
    } catch (error) {
        console.log("Error while generating private AI response: ", error);
        throw error;          
    }
}

async function handleGroupMessage(message){
    const mentionsMe = message.mentionedIds.includes(process.env.CLIENT_WID);

    if(mentionsMe) {
        try {
            const parsedMessage =  message.body.replace(/@\d+/g, '');
            const aiReply = await generateGeminiReply(parsedMessage);
            await sendMessage({
                message: aiReply,
                target: message.from
            })
            return;
        } catch (error) {
            console.log("Error while generating AI response: ", error);
            throw error;
        }
    }
} */

const commands = [
    {
        message: '/bomdia',
        handler: async function (message) {
            await sendMessage({
                media: './assets/videos/bomdia.mp4',
                target: message.from,
                react: {
                    message,
                    reaction: '🌞',
                }
            })
        }
    },
    {
        message: '/boanoite',
        handler: async function (message) {
            await sendMessage({
                media: './assets/videos/boanoite.mp4',
                target: message.from,
                react: {
                    message,
                    reaction: '🌙',
                }
            })
        },
    },
    {
        message: '/mas eu quero agora',
        handler: async function (message) {
            await sendMessage({
                media: './assets/videos/mas-eu-quero-agora.mp4',
                target: message.from,
                react: {
                    message,
                    reaction: '😡',
                }
            })
        },
    },
    {
        message: '/michelly',
        handler: async function (message) {
            await sendMessage({
                message: "*MICHELLLLLLLLY ZIGGSSSSSSSSSSSSSSS*💣🌷",
                media: './assets/images/michelly.jpg',
                target: message.from
            })
        }
    },
    {
        message: '/ping',
        handler: async function (message) {
            await sendMessage({
                message: 'pong',
                target: message.from
            })
        },
    },
    {
        message: '/joker',
        handler: async function (message) {

            await sendMessage({
                media: './assets/gifs/gif-do-joker.gif',
                target: message.from,
                react: {
                    message,
                    reaction: '🤡',
                }
            })
        }
    },
    {
        message: '/gatinho',
        handler: async function (message) {
            const imageURL = await fetch('https://api.thecatapi.com/v1/images/search')
                .then(response => response.json())
                .then(data => data[0].url);


            const imageMedia = await MessageMedia.fromUrl(imageURL);

            await sendMessage({
                media: imageMedia,
                target: message.from,
                react: {
                    message,
                    reaction: '😺',
                }
            })
        }
    },
    {
        message: '/doguinho',
        handler: async function (message) {
            const imageURL = await fetch('https://dog.ceo/api/breeds/image/random')
                .then(response => response.json())
                .then(data => data.message);


            const imageMedia = await MessageMedia.fromUrl(imageURL);

            await sendMessage({
                media: imageMedia,
                target: message.from,
                react: {
                    message,
                    reaction: '🐶',
                }
            })
        }
    }
]

module.exports = {
    type: 'message',
    handler: async function (message) {
        // salvar mensagem
        const contact = await message.getContact();
        const chat = await message.getChat();
        /** Log */
        console.log(`${contact.name || contact.number}: ${message.body}`);

        /** Confere se a mensagem recebida é referente à algum comando pré definido.**/
        const command = commands.find((command) => command.message == message.body)
        if (command) {
            await command.handler(message)
            return;
        }

        /** Lida com mensagens em grupos */
        /*         if (chat.isGroup) {
                    handleGroupMessage(message);
                    return
                } */

        /** Lida com mensagens no privado */
        if (!chat.isGroup) {
            handlePrivateMessage(message);
            return;
        }
    }
}