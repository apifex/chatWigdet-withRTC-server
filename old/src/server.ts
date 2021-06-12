import 'dotenv/config'
import express, {NextFunction, Request, Response} from 'express'
import path from 'path'
import cors from 'cors'
import {createServer} from 'http'
import bodyParser from 'body-parser'
import router from './router'
import {startBots} from './telegramBots'
import {startSocket} from './socket'

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
  server.use(router)
  server.use('/admin', express.static(path.join(__dirname, 'dist')))

const httpServer = createServer(server)

//services

startBots().then(bot => {
    startSocket(bot.bots, httpServer, bot.TELEGRAM_ID)
  }).then(() => {
  }).catch(error=>console.log('error', error)) // TODO: zmienić sposób obsługi błędu
  
httpServer.listen(port);