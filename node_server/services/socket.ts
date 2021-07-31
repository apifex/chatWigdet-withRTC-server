import { config } from 'dotenv';
import { Server, Socket } from "socket.io";
import { TelegramBots } from "./telegramBots";
import HistoryActions from "../controlers/history-controler"
import Logger from '../services/logger'
config()


export class socketServer {
    io: Server
    bots: TelegramBots
    activeConnections = new Map<string, {
        botID: number,
        history: {
            isUser: boolean,
            msg: string,
            timestamp: Date
        }[]
    }>()
    waitingConnections: { socketId: string, msg: string }[] = []

    constructor(httpServer: Express.Application, telegramID: string, tokens: string[]) {
        this.bots = new TelegramBots(telegramID, tokens)
        this.io = new Server(httpServer, { cors: { origin: "*:*" } })
        this.listen()
    }

    listen() {
        this.io.on("connection", (socket: Socket) => {
            Logger.debug('socket connected')
            socket.on("message", async (msg: string) => {
                if (this.activeConnections.has(socket.id)) {
                    const bot = this.activeConnections.get(socket.id)
                    if (bot?.botID) {
                        this.bots.sendMsg(bot.botID, msg)
                        bot.history.push({
                            isUser: false,
                            msg: msg,
                            timestamp: new Date()
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
                                timestamp: new Date()
                            }]
                        })

                        this.bots.listen(botID, (msg) => {
                            this.io.to(socket.id).emit('response', msg)
                            this.activeConnections.get(socket.id)?.history.push(
                                {
                                    isUser: true,
                                    msg: msg,
                                    timestamp: new Date()
                                }
                            )
                        })
                        this.bots.sendMsg(botID, "New conversation")
                        this.bots.sendMsg(botID, msg)
                    } else {
                        this.waitingConnections.push({ socketId: socket.id, msg: msg })
                        Logger.info({message: 'waiting connection', telegramId: this.bots.TELEGRAM_ID})
                        this.io.to(socket.id).emit('response', 'We are sorry, but there is too many connections at the time. Please wait, or send us your phone number, we will contact you.')
                    }
                }
            })

            socket.on("disconnect", async () => {
                const bot = this.activeConnections.get(socket.id)
                Logger.debug("socket disconnect ")
                if (!bot) return
                HistoryActions.saveConversation(bot.history, this.bots.TELEGRAM_ID)
                this.bots.disconnectBot(bot.botID)
                this.activeConnections.delete(socket.id)
                Logger.info({ message: "conversation saved", telegramId: this.bots.TELEGRAM_ID })
                const waitingConn = this.waitingConnections.shift()
                if (waitingConn) {
                    const { socketId, msg } = waitingConn
                    const botID = await this.bots.assignBot(socketId)
                    if (botID) {
                        this.activeConnections.set(socketId, {
                            botID: botID,
                            history: [{
                                isUser: false,
                                msg: msg,
                                timestamp: new Date()
                            }]
                        })

                        this.bots.listen(botID, (msg) => {
                            this.io.to(socket.id).emit('response', msg)
                            this.activeConnections.get(socket.id)?.history.push(
                                {
                                    isUser: true,
                                    msg: msg,
                                    timestamp: new Date()
                                }
                            )
                        })
                        this.bots.sendMsg(botID, "New conversation")
                        this.bots.sendMsg(botID, msg)
                    }
                }
            });
        })
    }
}
