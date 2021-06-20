import {config} from 'dotenv'
config()
import express from 'express'
import cors from 'cors'
import {createServer} from 'http'
import adminPageRouter from './routes/adminRouter'
import widgetRouter from './routes/widgetRouter'
import { socketServer } from './services/socket'
import { connectToDb } from './services/dbConnection'
import UserModel from './models/user-model'
import passport from 'passport'
import { userErrorsHandler } from './services/errorHandler'

const PORT = process.env.PORT || 5000

const server = express()
    server.use(cors())
    server.use(express.json())
    server.use(express.urlencoded({extended:true}))
    server.use(passport.initialize())
    server.use('/adminpage', adminPageRouter)
    server.use('/widget', widgetRouter)
    server.use(userErrorsHandler)
//test
    server.get('/test', (req, res) => {
        console.log('server works - console')
        res.send('server works')})


const httpServer = createServer(server)

// connect to db
let reconnect:number = 0
async function start () {
    try {
        const connection = await connectToDb()
        if (connection) {
            const settings = await UserModel.findOne({email: process.env.USER}).exec()
            const telegramId = settings?.settings?.telegramID
            const tokens = settings?.settings?.telegramToken
            if (!tokens || !telegramId) throw Error('no tokens found in settings')
            new socketServer(httpServer, telegramId, tokens)
            httpServer.listen(PORT, ()=> console.log(`Socket listening on ${PORT}`))
        } else {
            if (reconnect<3) {start(); reconnect++} 
            else console.log('Not possible to connect to database. Server stoped')
        }
    } catch(error) {
        console.log(error)
        throw Error()
    }
    
}

start()
    
    
