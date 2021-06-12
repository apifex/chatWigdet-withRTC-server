"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startSocket = void 0;
var socket_io_1 = require("socket.io");
var database_1 = require("./database");
var startSocket = function (bots, httpServer, TELEGRAM_ID) {
    var io = new socket_io_1.Server(httpServer, { cors: { origin: "*:*",
            methods: ["GET", "POST"] }
    });
    io.on("connection", function (socket) {
        var waitingConnections = new Array;
        socket.on('message', function (msg, id) {
            var isFirstConnection = true;
            for (var x in bots) {
                if (bots[x].clientId === id) {
                    bots[x].bot.sendMessage(TELEGRAM_ID, msg);
                    bots[x].conversation.push({ isUser: true, msg: msg, timestamp: new Date().toLocaleString() });
                    isFirstConnection = false;
                    break;
                }
            }
            if (isFirstConnection) {
                var isLinkedToBot = false;
                var _loop_2 = function (x) {
                    if (!bots[x].isBusy) {
                        bots[x].isBusy = true;
                        bots[x].clientId = id;
                        bots[x].chatStartTime = new Date().toUTCString(),
                            bots[x].bot.sendMessage(TELEGRAM_ID, "### New conversation ### ")
                                .then(function () { bots[x].bot.sendMessage(TELEGRAM_ID, msg); });
                        bots[x].conversation.push({ isUser: true, msg: msg, timestamp: new Date().toLocaleString() });
                        isLinkedToBot = true;
                        return "break";
                    }
                };
                for (var x in bots) {
                    var state_1 = _loop_2(x);
                    if (state_1 === "break")
                        break;
                }
                if (!isLinkedToBot) {
                    var isWaiting = waitingConnections.find(function (el) { return el.id === id; });
                    if (isWaiting) {
                        isWaiting.msgs.push(msg);
                    }
                    else {
                        waitingConnections.push({ id: id, msgs: [msg] });
                        io.to(id).emit('response', "Niestety czas oczekiwania na rozmowę może się przedłużyć... możesz zaczekać, albo zostawić nam swojego maila na którego na pewno odpowiemy");
                    }
                }
            }
        });
        socket.on('disconnect', function () {
            var _loop_3 = function (x) {
                if (bots[x].clientId === socket.id) {
                    database_1.ChatModel.build({ chatID: bots[x].chatStartTime,
                        conversation: bots[x].conversation
                    }).save();
                    bots[x].conversation = [];
                    bots[x].clientId = '';
                    bots[x].bot.sendMessage(TELEGRAM_ID, "### User disconnected ###");
                    if (waitingConnections.length > 0) {
                        var waitingClient = waitingConnections.shift();
                        if (!waitingClient)
                            return { value: void 0 };
                        bots[x].clientId = waitingClient.id;
                        bots[x].bot.sendMessage(TELEGRAM_ID, "### New conversation ###");
                        waitingClient.msgs.forEach(function (msg) { return bots[x].bot.sendMessage(TELEGRAM_ID, msg); });
                    }
                    else {
                        bots[x].isBusy = false;
                    }
                    return "break";
                }
            };
            for (var x in bots) {
                var state_2 = _loop_3(x);
                if (typeof state_2 === "object")
                    return state_2.value;
                if (state_2 === "break")
                    break;
            }
        });
        var _loop_1 = function (x) {
            bots[x].bot.on('message', function (_a) {
                var text = _a.text;
                if (!text)
                    return;
                bots[x].isBusy ?
                    (io.to(bots[x].clientId).emit('response', text),
                        bots[x].conversation.push({ isUser: false, msg: text, timestamp: new Date().toLocaleString() }))
                    : null;
            });
        };
        for (var x in bots) {
            _loop_1(x);
        }
    });
};
exports.startSocket = startSocket;
//# sourceMappingURL=socket.js.map