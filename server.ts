import 'dotenv/config'
import express, {NextFunction, Request, Response} from 'express'
import path from 'path'
import cors from 'cors'
import {createServer} from 'http'
import bodyParser from 'body-parser'
import {Server, Socket} from 'socket.io'
import {ChatModel, SettingsModel, updateSettings} from './database'
import {startBots, IBot} from './telegramBots'

//TODO :
// - obługa błędów... zwłaszcza w telegramBots.ts i database.ts
// - system do zapisu/wyświetlania logów
// - potwierdzenie dostarczenia wiadomości
// - 'pamietanie' logowania strony admin (cookies? czy localstorage?)
// - usuwanie historii czatów z bazy danych ze strony admina
// - szyfrowanie wiadomości (o ile ma sens)??

// start server
const port = process.env.PORT || 4000
const server = express()
  server.use(cors())
  server.use(bodyParser.json())
  server.use('/admin', express.static(path.join(__dirname, 'dist')))

const httpServer = createServer(server)
const io = new Server(httpServer, { cors: { origin: "*:*",
                                        methods: ["GET", "POST"]}
                                  })


//endpoints
const endpointsErrorHandlar = (req: Request, res: Response, next: NextFunction) => {
  try{
    return next ()
  } catch ({message}) {
    res.status(500).send({error: true, message})
  }
}
server.get('/status', endpointsErrorHandlar, (req:any, res:any) => {
  res.send('server works')
})

server.post('/settings', endpointsErrorHandlar, async (req: Request, res: Response)=>{
  const settings = await SettingsModel.findOne()
  if (settings !== null) {
    updateSettings(req.body).then(()=> res.send('settings updated'), 
    ()=> {throw new Error('could not update settings in database')})
  } else {
    SettingsModel.build(req.body).save().then(()=> res.send('settings saved'),
    ()=> {throw new Error('could not save settings in database')})
  }
})


server.post('/getchats', endpointsErrorHandlar, (req: Request, res: Response)=> {
  ChatModel.find().then(
    chats=>{res.send(JSON.stringify(chats))}, 
    () => {throw new Error('could not find chats in database')})
})

server.get('/gettelegramusername', endpointsErrorHandlar , async (req: Request, res: Response) => {
  const telegramUsername = await SettingsModel.find().then(
    (sets)=>sets[0].telegramUsername, 
    ()=> {throw new Error('could not get telegramUserName from database')})
  res.send(JSON.stringify(telegramUsername))  
  })

server.get('/getwhatsappnumber', endpointsErrorHandlar ,async (req: Request, res: Response) => {
  const whatsapp = await SettingsModel.find().then(
    (sets)=>sets[0].whatsapp1, 
    ()=> {throw new Error('could not get whatsappNumber from database')})
  res.send(JSON.stringify(whatsapp))  
  })
  
//services
let TELEGRAM_ID = ''
let bots: IBot[] = new Array

startBots().then(bot => {
    TELEGRAM_ID = bot.TELEGRAM_ID
    bots = bot.bots
  }).then(() => {
    startSocket()
    startBotsListen()
  }).catch(error=>console.log('error', error)) // TODO: zmienić sposób obsługi błędu

const startSocket = () => {
    io.on("connection", (socket: Socket) => {
    const waitingConnections: IWaitingConnections[] = new Array
    socket.on('message', (msg: string, id:string) => {
      let isFirstConnection = true
      for (let x in bots) {
        if (bots[x].clientId === id) {
          bots[x].bot.sendMessage(TELEGRAM_ID, msg)
          bots[x].conversation.push({isUser: true, msg: msg, timestamp: new Date().toLocaleString()})
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
            bots[x].conversation.push({isUser: true, msg: msg, timestamp: new Date().toLocaleString()})
            isLinkedToBot = true
            break;
        }}

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
              bots[x].bot.sendMessage(TELEGRAM_ID, "### New conversation ###")
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
  for(let x in bots) {
    bots[x].bot.on('message', ({text}:any) => {
      if (!text) return
      bots[x].isBusy?
      (io.to(bots[x].clientId).emit('response', text),
      bots[x].conversation.push({isUser: false, msg: text, timestamp: new Date().toLocaleString()}))
      :null
    })
  }
}
  
httpServer.listen(port);