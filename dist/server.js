"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const body_parser_1 = __importDefault(require("body-parser"));
const socket_io_1 = __importDefault(require("socket.io"));
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const database_1 = require("./database");
const port = process.env.PORT || 4000;
const server = express_1.default();
server.use(body_parser_1.default.json());
const httpServer = http_1.default.createServer(server);
const io = new socket_io_1.default.Server(httpServer, {
    cors: {
        origin: "*:*",
        methods: ["GET", "POST"]
    }
});
database_1.hello();
const save = () => __awaiter(void 0, void 0, void 0, function* () {
    const chatshistory = database_1.SaveChat.build({
        userName: "mietek",
        conversation: [
            {
                me: true,
                msg: "no to jedziem",
                timestamp: '8:45'
            },
            {
                me: false,
                msg: " jedziem",
                timestamp: '8:41'
            },
            {
                me: false,
                msg: "edziem",
                timestamp: '8:46'
            },
            {
                me: true,
                msg: "noem",
                timestamp: '8:47'
            }
        ]
    });
    yield chatshistory.save();
    return console.log(chatshistory);
});
save();
if (!process.env.TELEGRAM_TOKEN_1)
    throw Error;
if (!process.env.TELEGRAM_TOKEN_2)
    throw Error;
if (!process.env.TELEGRAM_TOKEN_3)
    throw Error;
if (!process.env.TELEGRAM_TOKEN_4)
    throw Error;
if (!process.env.TELEGRAM_TOKEN_5)
    throw Error;
const bots = [
    { bot: new node_telegram_bot_api_1.default(process.env.TELEGRAM_TOKEN_1, { polling: true }),
        active: false,
        clientId: '' },
    { bot: new node_telegram_bot_api_1.default(process.env.TELEGRAM_TOKEN_2, { polling: true }),
        active: false,
        clientId: '' },
    { bot: new node_telegram_bot_api_1.default(process.env.TELEGRAM_TOKEN_3, { polling: true }),
        active: false,
        clientId: '' },
    { bot: new node_telegram_bot_api_1.default(process.env.TELEGRAM_TOKEN_4, { polling: true }),
        active: false,
        clientId: '' },
    { bot: new node_telegram_bot_api_1.default(process.env.TELEGRAM_TOKEN_5, { polling: true }),
        active: false,
        clientId: '' }
];
io.on("connection", (socket) => {
    console.log("New client connected: ", socket.id);
    socket.on('message', (msg, id) => {
        if (!process.env.TELEGRAM_ID)
            throw Error;
        let isFirst = true;
        for (let x in bots) {
            if (bots[x].clientId === id) {
                bots[x].bot.sendMessage(process.env.TELEGRAM_ID, msg);
                isFirst = false;
                break;
            }
        }
        if (isFirst) {
            for (let x in bots) {
                if (!bots[x].active) {
                    bots[x].active = true;
                    bots[x].clientId = id;
                    bots[x].bot.sendMessage(process.env.TELEGRAM_ID, "### New conversation ### ");
                    bots[x].bot.sendMessage(process.env.TELEGRAM_ID, msg);
                    break;
                    //TODO logic to WAIT when there is no availble bots
                }
            }
        }
    });
    socket.on('disconnect', () => {
        if (!process.env.TELEGRAM_ID)
            throw Error;
        console.log('User disconected: ', socket.id);
        for (let x in bots) {
            if (bots[x].clientId === socket.id) {
                bots[x].active = false;
                bots[x].clientId = '';
                bots[x].bot.sendMessage(process.env.TELEGRAM_ID, "### User disconnected ###");
                break;
            }
        }
    });
});
bots[0].bot.on('message', (msg) => {
    bots[0].active ?
        io.to(bots[0].clientId).emit('response', msg.text) : null;
});
bots[1].bot.on('message', (msg) => {
    bots[1].active ?
        io.to(bots[1].clientId).emit('response', msg.text) : null;
});
bots[2].bot.on('message', (msg) => {
    bots[2].active ?
        io.to(bots[2].clientId).emit('response', msg.text) : null;
});
bots[3].bot.on('message', (msg) => {
    bots[3].active ?
        io.to(bots[3].clientId).emit('response', msg.text) : null;
});
bots[4].bot.on('message', (msg) => {
    bots[4].active ?
        io.to(bots[4].clientId).emit('response', msg.text) : null;
});
server.listen(port, () => console.log(`Listening on port ${port}`));
//# sourceMappingURL=server.js.map