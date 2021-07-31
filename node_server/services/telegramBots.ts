import { config } from 'dotenv';
import TelegramBot from 'node-telegram-bot-api'
import Logger from './logger';

config()

export class TelegramBots {
    TELEGRAM_ID: string
    activeBots = new Map<number, [string, TelegramBot]>()
    bots = new Array<TelegramBot>()
    
    constructor(telegramID: string, tokens: string[]) {
        this.TELEGRAM_ID = telegramID
        this.initializeBots(tokens)
    }

    async initializeBots (tokens: string[]) {
        Logger.debug('initializing bots ...')
        for (const token of tokens) {
            const bot = new TelegramBot(token, {polling: true,})
            this.bots.push(bot)
        }
    }

    async sendMsg (botId: number, msg: string) {
        if (this.activeBots.has(botId)) {
            const bot = this.activeBots.get(botId)
            if (bot) bot[1].sendMessage(this.TELEGRAM_ID, msg)}
    }

    async assignBot (socketId: string) {
        if (this.bots.length == 0) return false
        const bot = this.bots.shift()
        if (bot) {
            const botID = (await bot.getMe()).id
            this.activeBots.set(botID, [socketId, bot])
            return botID
        }
    }
    
    listen(botID: number, callback: (msg: string) => void) {
        if (this.activeBots.has(botID)) {
            const bot = this.activeBots.get(botID)
            if (bot) bot[1].on("message", ({text})=> {if (text) callback(text)})
        }
    }

    disconnectBot (botID: number) {
        const bot = this.activeBots.get(botID)?.[1]
        if (bot) this.bots.push(bot)
    }
}
