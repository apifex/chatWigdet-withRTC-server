import {config} from 'dotenv'
config()
import express from 'express'
import cors from 'cors'
import {createServer} from 'http'
import adminPageRouter from './routes/adminPageRouter'
import widgetRouter from './routes/widgetRouter'
import { socketServer } from './services/socket'
import { connectToDb } from './services/dbConnection'
import UserModel from './models/user-model'


const PORT = process.env.PORT || 5000

const server = express()
    server.use(cors())
    server.use(express.json())
    server.use(express.urlencoded({extended:true}))

    server.use('api/adminpage', adminPageRouter)
    server.use('api/widget', widgetRouter)

const httpServer = createServer(server)

// connect to db
let reconnect:number = 0
async function start () {
    try {
        const connection = await connectToDb()
        if (true) {
            // const settings = await UserModel.findById('tttttttttttt').exec()
            // const tokens = settings?.settings?.telegramToken
            const tokens = ['1509109378:AAE5h9aOcEIo0eWs1GURuexEZDzAZuHekZI', '1557883696:AAH1XOAar_gyAfPVHy03qMMPwH_Nv_6hr1Y', '1580846601:AAFXUAq7YTkW_Rl_I4pyNF99bERZCK2iomQ']
            if (!tokens) throw Error('no tokens found in settings')
            new socketServer(httpServer, tokens)
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

//test
    server.get('/test', (req, res) => {
        console.log('server works - console')
        res.send('server works')})
    
httpServer.listen(PORT, ()=> console.log(`Listening on ${PORT}`))