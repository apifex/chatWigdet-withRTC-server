import LogModel, { ILog } from '../models/log-model'
import UserModel from '../models/user-model'
import fs from 'fs'

export const saveLog = async (log: ILog, Telegram_ID: string) => {
    try {
        const logToDb = LogModel.build(log)
        const owner = await UserModel.findOne({ 'settings.telegramID': Telegram_ID }).exec()
        if (!owner) throw new Error("no user found")
        logToDb.addOwner(owner._id)
        await logToDb.save()
        return true
    } catch(error) {
        //TODO
        console.log('save log error', error)
        return false
    }
}
//TODO
export const getLog = async () => {
    try {
        const log = await LogModel.find().exec()
        return log
    } catch(error) {
        console.log(error)
        return false
    }
}

export const getLogfromFile = async () => {
    try {
        fs.readFile('/usr/src/app/logs/all.log', {encoding: 'utf-8'}, (error, data) => {
            if (error) throw error
            return data
        })
        
    } catch (error) {
        console.log('get log error', error)
    }
}




