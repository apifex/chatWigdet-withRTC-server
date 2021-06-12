import {Server, Socket} from 'socket.io'
import {ChatModel} from './database'
import {IBot, IWaitingConnections} from './interfaces'


export const startSocket = (bots:IBot[], httpServer: Express.Application, TELEGRAM_ID: string) => {
    const io = new Server(httpServer, { cors: { origin: "*:*",
    methods: ["GET", "POST"]}
    })
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
              .then(()=>{bots[x].bot.sendMessage(TELEGRAM_ID, msg)})
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
      
      for(let x in bots) {
        bots[x].bot.on('message', ({text}:any) => {
          if (!text) return
          bots[x].isBusy?
          (io.to(bots[x].clientId).emit('response', text),
          bots[x].conversation.push({isUser: false, msg: text, timestamp: new Date().toLocaleString()}))
          :null
        })
      }

    });
}