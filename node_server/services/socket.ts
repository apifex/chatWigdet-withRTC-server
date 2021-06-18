import { config } from 'dotenv';
import { Server, Socket } from "socket.io";
import { TelegramBots } from "./telegramBots";
import HistoryModel from "../models/history-model"
config()


export class socketServer {
    io: Server
    bots: TelegramBots
    activeConnections = new Map<string, {
        botID: number, 
        history: {
            isUser: boolean, 
            msg: string,
            timestamp: string}[]
        }>()
    waitingConnections: string[] = []

    constructor (httpServer: Express.Application, tokens: string[]) {
        this.bots = new TelegramBots(tokens)
        this.io = new Server(httpServer, {cors: {origin: "*:*"}})
        this.listen()
    }

    listen() {
        this.io.on("connection", (socket: Socket) => {
            socket.on("message", async (msg: string) => {
                if (this.activeConnections.has(socket.id)) {
                    const bot = this.activeConnections.get(socket.id)
                    if (bot?.botID) {
                        this.bots.sendMsg(bot.botID, msg)
                        bot.history.push({
                            isUser: false,
                            msg: msg,
                            timestamp: new Date().toLocaleString()
                        })
                    }
                } else {
                    const botID = await this.bots.assignBot(socket.id) 
                    if (botID) {
                        this.activeConnections.set(socket.id, {
                            botID: botID,
                            history: [{
                                isUser: false,
                                msg: msg,
                                timestamp: new Date().toLocaleString()
                            }]
                        })

                        this.bots.listen(botID, (msg) => {
                            this.io.to(socket.id).emit('response', msg)
                        })
                        this.bots.sendMsg(botID, "New conversation")
                        this.bots.sendMsg(botID, msg)
                    } else {
                        this.waitingConnections.push(socket.id)
                    }
                }
                })
                
            socket.on("disconnect", async () => {
                const bot = this.activeConnections.get(socket.id)
                if (!bot) throw new Error('no bot')
                const history = await HistoryModel
                .build({
                    date: new Date().toLocaleString(),
                    conversations: bot.history,
                })
                //TODO: add user integration
                history.addOwner("admin")
                await history.save()
                this.bots.disconectBot(bot.botID)
                this.activeConnections.delete(socket.id)
                    console.log("socket disconnect ")
                });
        }) 
    } 
}
