import 'dotenv/config'
import express from 'express'
import {createServer} from 'http'
import bodyParser from 'body-parser'
import {Server, Socket} from 'socket.io'
import TelegramBot from 'node-telegram-bot-api'
import {SaveChat} from './database'

const port = process.env.PORT || 4000
const server = express()
server.use(bodyParser.json())
const httpServer = createServer(server)
const io = new Server(httpServer, {
    cors: {
      origin: "*:*",
      methods: ["GET", "POST"]
    }
  })

server.get('/test', (req:any, res:any) => {
    res.send('server works')
})

server.get('/admin', (req:any, res:any) => {
    res.sendFile(__dirname + '/admin_page/admin.html')
})

if (!process.env.TELEGRAM_TOKEN_1) throw Error
if (!process.env.TELEGRAM_TOKEN_2) throw Error
if (!process.env.TELEGRAM_TOKEN_3) throw Error
if (!process.env.TELEGRAM_TOKEN_4) throw Error
if (!process.env.TELEGRAM_TOKEN_5) throw Error

interface bot {
    bot: TelegramBot,
    active: boolean,
    clientId: string,
    conversation: {
        isUser: boolean,
        msg: string,
        timestamp: string,
        }[]
    }
  
const bots: bot[] = [
{bot: new TelegramBot(process.env.TELEGRAM_TOKEN_1, {polling: true}),
 active: false,
 clientId: '',
 conversation: []},
{bot: new TelegramBot(process.env.TELEGRAM_TOKEN_2, {polling: true}),
 active: false,
 clientId: '',
 conversation: []},
{bot: new TelegramBot(process.env.TELEGRAM_TOKEN_3, {polling: true}),
 active: false,
 clientId: '',
 conversation: []},
{bot: new TelegramBot(process.env.TELEGRAM_TOKEN_4, {polling: true}),
 active: false,
 clientId: '',
 conversation: []},
{bot: new TelegramBot(process.env.TELEGRAM_TOKEN_5, {polling: true}),
 active: false,
 clientId: '',
 conversation: []}
]

interface IWaitingConnections {
    id: string,
    msgs: string[],
}


const waitingConnections: IWaitingConnections[] = new Array

io.on("connection", (socket: Socket) => {
    console.log("New client connected: ", socket.id);

    socket.on('message', (msg: string, id:string) => {
      if (!process.env.TELEGRAM_ID) throw Error
      let isFirstConnection = true
      for (let x in bots) {
        if (bots[x].clientId === id) {
          bots[x].bot.sendMessage(process.env.TELEGRAM_ID, msg)
          bots[x].conversation.push({isUser: true, msg: msg, timestamp: new Date().getTime().toString()})
          isFirstConnection = false
          break;
        }
      }
      
      if (isFirstConnection) {
        let isBotLinked = false;
        for(let x in bots) {
          if (!bots[x].active) {
            bots[x].active = true;
            bots[x].clientId = id;
            bots[x].bot.sendMessage(process.env.TELEGRAM_ID, "### New conversation ### ")
            bots[x].bot.sendMessage(process.env.TELEGRAM_ID, msg)
            bots[x].conversation.push({isUser: true, msg: msg, timestamp: new Date().getTime().toString()})
            isBotLinked = true
            break;
          }
        }
        if (!isBotLinked) {
            let isWaiting = waitingConnections.find(el => el.id === id)
            if (isWaiting) {
                isWaiting.msgs.push(msg)
            } else {
                waitingConnections.push({id, msgs:[msg]})
                io.to(id).emit('response', "Niestety czas oczekiwania na rozmowę może się przedłużyć... możesz zaczekać, albo zostawić nam swojego maila na którego na pewno odpowiemy")
            }
            
            
            
        }
      }
    })
  
socket.on('disconnect', ()=>{
      if (!process.env.TELEGRAM_ID) throw Error
      console.log('User disconected: ', socket.id)
      for (let x in bots) {
        if (bots[x].clientId === socket.id) {
          SaveChat.build(
              {userName: "default user",
               conversation: bots[x].conversation
              }).save();
          bots[x].conversation = [];
          bots[x].clientId = ''
          bots[x].bot.sendMessage(process.env.TELEGRAM_ID, "### User disconnected ###")
          if (waitingConnections.length>0) {
              let waitingClient = waitingConnections.shift() 
              if (!waitingClient) return
              bots[x].clientId = waitingClient.id
              bots[x].bot.sendMessage(process.env.TELEGRAM_ID, "### User connected ###")
              //@ts-ignore // why process.env.TELEGR is no longer valid???
              waitingClient.msgs.forEach(msg => bots[x].bot.sendMessage(process.env.TELEGRAM_ID, msg))
            }
          bots[x].active = false;
          break;
          }
        } 
      }) 
    });



bots[0].bot.on('message', ({text}) => {
  if (!text) throw Error
  bots[0].active?
  (io.to(bots[0].clientId).emit('response', text),
  bots[0].conversation.push({isUser: false, msg: text, timestamp: new Date().getTime().toString()}))
  :null
})

bots[1].bot.on('message', ({text}) => {
  if (!text) throw Error
  bots[1].active?
  (io.to(bots[1].clientId).emit('response', text),
  bots[1].conversation.push({isUser: false, msg: text, timestamp: new Date().getTime().toString()}))
  :null
})

bots[2].bot.on('message', ({text}) => {
  if (!text) throw Error
  bots[2].active?
  (io.to(bots[2].clientId).emit('response', text),
  bots[2].conversation.push({isUser: false, msg: text, timestamp: new Date().getTime().toString()}))
  :null
})

bots[3].bot.on('message', ({text}) => {
  if (!text) throw Error
  bots[3].active?
  (io.to(bots[3].clientId).emit('response', text),
  bots[3].conversation.push({isUser: false, msg: text, timestamp: new Date().getTime().toString()}))
  :null
})

bots[4].bot.on('message', ({text}) => {
  if (!text) throw Error
  bots[4].active?
  (io.to(bots[4].clientId).emit('response', text),
  bots[4].conversation.push({isUser: false, msg: text, timestamp: new Date().getTime().toString()}))
  :null
})
  
httpServer.listen(port, () => console.log(`Listening on port ${port}`));