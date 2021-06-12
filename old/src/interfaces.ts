import TelegramBot from 'node-telegram-bot-api'

interface IChat {
    chatID: String,
    conversation: {
            isUser: boolean,
            msg: String,
            timestamp: String
        }[],
}

interface ISettings {
    active: Boolean,
    telegram_id: String,
    token_1: String,
    token_2: String,
    token_3: String,
    token_4: String,
    token_5: String,
    whatsappNumber: String,
    telegramUsername: String
}

interface IWaitingConnections {
    id: string,
    msgs: string[],
}

interface IBotWithToken extends TelegramBot {
    token?: string
}

interface IBot {
    bot: IBotWithToken,
    isBusy: boolean,
    clientId: string,
    chatStartTime: string,
    conversation: {
        isUser: boolean,
        msg: string,
        timestamp: string,
        }[]
    }

export {
    IBot,
    IChat,
    ISettings,
    IWaitingConnections
}