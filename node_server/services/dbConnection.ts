import mongoose from 'mongoose'
import Logger from './logger'

const connectionString =  process.env.MONGOURL

export const connectToDb = async () => {
    try {
        Logger.debug('connecting to database ...')
        await mongoose.connect(connectionString, 
            {useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
            })
        return true
    } catch (error) {
        Logger.error('Error on conncetion to database')
        return false
    }
}

const db = mongoose.connection

export default db