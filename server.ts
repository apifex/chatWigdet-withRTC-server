import 'dotenv/config'
import express from 'express'
import path from 'path'
import {createServer} from 'http'
import bodyParser from 'body-parser'
import {Server, Socket} from 'socket.io'
import {ChatModel, SettingsModel, updateSettings} from './database'
import {startBots, IBot} from './telegramBots'

// start server
const port = process.env.PORT || 4000
const server = express()
server.use(bodyParser.json())
server.use('/admin', express.static(path.join(__dirname, 'dist')))
const httpServer = createServer(server)
const io = new Server(httpServer, { cors: { origin: "*:*",
                                        methods: ["GET", "POST"]}
                                  })

//test TO DELETE!!
server.get('/test', (req:any, res:any) => {
    res.send('server works')
})

server.get('/whatsapp', async (req:any, res:any) => {
  const whatsapp = await SettingsModel.find().then((sets)=>
  {return sets[0].whatsapp1})
  res.send(JSON.stringify(whatsapp))  
  })


//endpoints
server.post('/settings', (req: any, res:any)=>{
  updateSettings(req.body).then(()=>res.send('dobrze'))
  // SettingsModel.build(req.body).save().then(res.send('ok'))
})

server.post('/getchats', (req:any, res: any)=>{
  ChatModel.find().then(chats=>{
    res.send(JSON.stringify(chats))})
})

//services
let TELEGRAM_ID = ''
let bots: IBot[] = new Array

startBots().then(bot => {
    TELEGRAM_ID = bot.TELEGRAM_ID
    bots = bot.bots
  }).then(() => {
    startBotsListen()
    startSocket()}
  )

const waitingConnections: IWaitingConnections[] = new Array

const startSocket = () => {
    io.on("connection", (socket: Socket) => {
    socket.on('message', (msg: string, id:string) => {
      let isFirstConnection = true
      for (let x in bots) {
        if (bots[x].clientId === id) {
          bots[x].bot.sendMessage(TELEGRAM_ID, msg)
          bots[x].conversation.push({isUser: true, msg: msg, timestamp: new Date().getTime().toString()})
          isFirstConnection = false
          break;
        }
      }
      
      if (isFirstConnection) {
        let isLinkedToBot = false;
        for(let x in bots) {
          if (!bots[x].isBusy) {
            bots[x].isBusy = true;
            bots[x].clientId = id;
            bots[x].chatStartTime = new Date().toUTCString(),
            bots[x].bot.sendMessage(TELEGRAM_ID, "### New conversation ### ")
            bots[x].bot.sendMessage(TELEGRAM_ID, msg)
            bots[x].conversation.push({isUser: true, msg: msg, timestamp: new Date().getTime().toString()})
            isLinkedToBot = true
            break;
          }
        }
        if (!isLinkedToBot) {
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
      for (let x in bots) {
        if (bots[x].clientId === socket.id) {
          ChatModel.build(
              {chatID: bots[x].chatStartTime,
               conversation: bots[x].conversation
              }).save();
          bots[x].conversation = [];
          bots[x].clientId = ''
          bots[x].bot.sendMessage(TELEGRAM_ID, "### User disconnected ###")
          if (waitingConnections.length>0) {
              let waitingClient = waitingConnections.shift() 
              if (!waitingClient) return
              bots[x].clientId = waitingClient.id
              bots[x].bot.sendMessage(TELEGRAM_ID, "### User connected ###")
              waitingClient.msgs.forEach(msg => bots[x].bot.sendMessage(TELEGRAM_ID, msg))
          } else {
            bots[x].isBusy = false;
          }
          break;
          }
        } 
      }) 
    });
}

const startBotsListen = () => {
    bots[0].bot.on('message', ({text}:any) => {
      if (!text) return
      bots[0].isBusy?
      (io.to(bots[0].clientId).emit('response', text),
      bots[0].conversation.push({isUser: false, msg: text, timestamp: new Date().getTime().toString()}))
      :null
    })

    bots[1].bot.on('message', ({text}:any) => {
      if (!text) return
      bots[1].isBusy?
      (io.to(bots[1].clientId).emit('response', text),
      bots[1].conversation.push({isUser: false, msg: text, timestamp: new Date().getTime().toString()}))
      :null
    })

    bots[2].bot.on('message', ({text}:any) => {
      if (!text) return
      bots[2].isBusy?
      (io.to(bots[2].clientId).emit('response', text),
      bots[2].conversation.push({isUser: false, msg: text, timestamp: new Date().getTime().toString()}))
      :null
    })

    bots[3].bot.on('message', ({text}:any) => {
      if (!text) return
      bots[3].isBusy?
      (io.to(bots[3].clientId).emit('response', text),
      bots[3].conversation.push({isUser: false, msg: text, timestamp: new Date().getTime().toString()}))
      :null
    })

    bots[4].bot.on('message', ({text}) => {
      if (!text) return
      bots[4].isBusy?
      (io.to(bots[4].clientId).emit('response', text),
      bots[4].conversation.push({isUser: false, msg: text, timestamp: new Date().getTime().toString()}))
      :null
    })
}
  
httpServer.listen(port, ()=>console.log(`listening on port${port}`));