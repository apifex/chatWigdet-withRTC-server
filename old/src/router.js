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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var database_1 = require("./database");
var telegramBots_1 = require("./telegramBots");
var router = express_1.default.Router();
router.use(function (req, res, next) {
    // TODO authentification
    next();
});
var endpointsErrorHandlar = function (req, res, next) {
    try {
        return next();
    }
    catch (err) {
        console.log(err);
        res.status(500).send("error catched");
    }
};
router.get('/status', endpointsErrorHandlar, function (req, res) {
    res.send('server works');
});
router.post('/settings/:action', endpointsErrorHandlar, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var databaseResponse, turnOffSettings, _a, actualSettings, x, toOnSettings, settings;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                turnOffSettings = function () { return __awaiter(void 0, void 0, void 0, function () {
                    var activeSettings;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, database_1.SettingsModel.findOne({ isActive: true }).exec()];
                            case 1:
                                activeSettings = _a.sent();
                                activeSettings.isActive = false;
                                return [4 /*yield*/, activeSettings.save()];
                            case 2:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); };
                _a = req.params.action;
                switch (_a) {
                    case ("add"): return [3 /*break*/, 1];
                    case ("update"): return [3 /*break*/, 3];
                    case ("change"): return [3 /*break*/, 6];
                    case ("loadallsettings"): return [3 /*break*/, 9];
                    case ("delete"): return [3 /*break*/, 11];
                }
                return [3 /*break*/, 13];
            case 1: return [4 /*yield*/, database_1.SettingsModel.build(req.body).save()];
            case 2:
                databaseResponse = _b.sent();
                if (databaseResponse._id) {
                    res.status(200).send("added successfully");
                }
                return [3 /*break*/, 13];
            case 3: return [4 /*yield*/, database_1.SettingsModel.findOne({ _id: req.body._id }).exec()];
            case 4:
                actualSettings = _b.sent();
                for (x in actualSettings) {
                    req.body[x] ? actualSettings[x] = req.body[x] : null;
                }
                return [4 /*yield*/, actualSettings.save()];
            case 5:
                databaseResponse = _b.sent();
                if (databaseResponse === actualSettings) {
                    res.status(200).send("updated successfully");
                }
                return [3 /*break*/, 13];
            case 6:
                turnOffSettings();
                return [4 /*yield*/, database_1.SettingsModel.findOne({ _id: req.body._id }).exec()];
            case 7:
                toOnSettings = _b.sent();
                toOnSettings.isActive = true;
                return [4 /*yield*/, toOnSettings.save()];
            case 8:
                databaseResponse = _b.sent();
                if (databaseResponse === toOnSettings) {
                    telegramBots_1.startBots();
                    res.status(200).send("changed successfully");
                }
                return [3 /*break*/, 13];
            case 9: return [4 /*yield*/, database_1.SettingsModel.find().exec()];
            case 10:
                settings = _b.sent();
                res.send(JSON.stringify(settings));
                return [3 /*break*/, 13];
            case 11: return [4 /*yield*/, database_1.SettingsModel.deleteOne({ _id: req.body._id })];
            case 12:
                databaseResponse = _b.sent();
                console.log(databaseResponse);
                if (databaseResponse.deletedCount > 0)
                    res.status(200).send("settings deleted");
                if (databaseResponse.deletedCount === 0)
                    res.status(200).send("no settings found");
                return [3 /*break*/, 13];
            case 13: return [2 /*return*/];
        }
    });
}); });
router.get('/getchats', endpointsErrorHandlar, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var chatsHistory;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, database_1.ChatModel.find().exec()];
            case 1:
                chatsHistory = _a.sent();
                res.send(JSON.stringify(chatsHistory));
                return [2 /*return*/];
        }
    });
}); });
router.get('/getNumber/:client', endpointsErrorHandlar, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var responseFromDb;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, database_1.SettingsModel.findOne({ isActive: true }).exec()];
            case 1:
                responseFromDb = _a.sent();
                switch (req.params.client) {
                    case ('telegram'):
                        if (responseFromDb.telegramUsername)
                            res.send(JSON.stringify(responseFromDb.telegramUsername));
                        break;
                    case ('whatsapp'):
                        if (responseFromDb.whatsappNumber)
                            res.send(JSON.stringify(responseFromDb.whatsappNumber));
                        break;
                }
                return [2 /*return*/];
        }
    });
}); });
exports.default = router;
//# sourceMappingURL=router.js.map