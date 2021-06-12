"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var cors_1 = __importDefault(require("cors"));
var http_1 = require("http");
var body_parser_1 = __importDefault(require("body-parser"));
var router_1 = __importDefault(require("./router"));
var telegramBots_1 = require("./telegramBots");
var socket_1 = require("./socket");
//TODO :
// - obługa błędów... zwłaszcza w telegramBots.ts i database.ts
// - system do zapisu/wyświetlania logów
// - potwierdzenie dostarczenia wiadomości
// - 'pamietanie' logowania strony admin (cookies? czy localstorage?)
// - usuwanie historii czatów z bazy danych ze strony admina
// - szyfrowanie wiadomości (o ile ma sens)??
// start server
var port = process.env.PORT || 4000;
var server = express_1.default();
server.use(cors_1.default());
server.use(body_parser_1.default.json());
server.use(router_1.default);
server.use('/admin', express_1.default.static(path_1.default.join(__dirname, 'dist')));
var httpServer = http_1.createServer(server);
//services
telegramBots_1.startBots().then(function (bot) {
    socket_1.startSocket(bot.bots, httpServer, bot.TELEGRAM_ID);
}).then(function () {
}).catch(function (error) { return console.log('error', error); }); // TODO: zmienić sposób obsługi błędu
httpServer.listen(port);
//# sourceMappingURL=server.js.map