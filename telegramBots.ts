import TelegramBot from 'node-telegram-bot-api'
import {getSettings} from './database'

export interface IBot {
    bot: TelegramBot,
    isBusy: boolean,
    clientId: string,
    chatStartTime: string,
    conversation: {
        isUser: boolean,
        msg: string,
        timestamp: string,
        }[]
    }

export const startBots = async () => {
    let TELEGRAM_ID = ''
    const bots: IBot[] = new Array
    await getSettings.then((sets)=>{
            TELEGRAM_ID = sets[0].telegram_id
            bots.push({bot: new TelegramBot(sets[0].token_1, {polling: true}),
             isBusy: false,
             clientId: '',
             chatStartTime: '',
             conversation: []})
            bots.push({bot: new TelegramBot(sets[0].token_2, {polling: true}),
             isBusy: false,
             clientId: '',
             chatStartTime: '',
             conversation: []})
            bots.push({bot: new TelegramBot(sets[0].token_3, {polling: true}),
             isBusy: false,
             clientId: '',
             chatStartTime: '',
             conversation: []})
            bots.push({bot: new TelegramBot(sets[0].token_4, {polling: true}),
             isBusy: false,
             clientId: '',
             chatStartTime: '',
             conversation: []})
            bots.push({bot: new TelegramBot(sets[0].token_5, {polling: true}),
             isBusy: false,
             clientId: '',
             chatStartTime: '',
             conversation: []})
    })
    return {bots, TELEGRAM_ID}
}
  