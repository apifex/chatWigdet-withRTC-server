
interface IChat {
    chatID: String,
    conversation: {
            isUser: boolean,
            msg: String,
            timestamp: String
        }[],
}

interface ISettings {
    telegram_id: String,
    token_1: String,
    token_2: String,
    token_3: String,
    token_4: String,
    token_5: String,
    whatsapp1: String,
}

interface IWaitingConnections {
    id: string,
    msgs: string[],
}
