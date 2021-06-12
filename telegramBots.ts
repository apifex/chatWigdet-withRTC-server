import TelegramBot from 'node-telegram-bot-api'
import {SettingsModel} from './database'
import {IBot} from './interfaces'

export const startBots = async () => {
    const bots: IBot[] = new Array
    let TELEGRAM_ID = ''
    console.log('dd')
    await SettingsModel.findOne({isActive: true}).then((sets)=>{
            TELEGRAM_ID = sets.telegram_id
            bots.push({bot: new TelegramBot(sets.token_1, {polling: true}),
             isBusy: false,
             clientId: '',
             chatStartTime: '',
             conversation: []})
            bots.push({bot: new TelegramBot(sets.token_2, {polling: true}),
             isBusy: false,
             clientId: '',
             chatStartTime: '',
             conversation: []})
            bots.push({bot: new TelegramBot(sets.token_3, {polling: true}),
             isBusy: false,
             clientId: '',
             chatStartTime: '',
             conversation: []})
            bots.push({bot: new TelegramBot(sets.token_4, {polling: true}),
             isBusy: false,
             clientId: '',
             chatStartTime: '',
             conversation: []})
            bots.push({bot: new TelegramBot(sets.token_5, {polling: true}),
             isBusy: false,
             clientId: '',
             chatStartTime: '',
             conversation: []})
        })
    return {bots, TELEGRAM_ID}
}
