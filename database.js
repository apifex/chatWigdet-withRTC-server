"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatModel = exports.SettingsModel = void 0;
require("dotenv/config");
var mongoose_1 = __importDefault(require("mongoose"));
if (!process.env.MONGOURL)
    throw Error("Can't find MONGOURL in global variable");
mongoose_1.default.connect(process.env.MONGOURL, { useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});
var chatSchema = new mongoose_1.default.Schema({
    chatID: {
        type: String,
        required: true
    },
    conversation: {
        type: Array,
        reuired: true
    }
});
chatSchema.statics.build = function (args) {
    return new exports.ChatModel(args);
};
var settingsSchema = new mongoose_1.default.Schema({
    isActive: {
        type: Boolean,
        required: true
    },
    telegram_id: {
        type: String,
        required: true
    },
    token_1: {
        type: String,
        required: true
    },
    token_2: {
        type: String,
        required: true
    },
    token_3: {
        type: String,
        required: true
    },
    token_4: {
        type: String,
        required: true
    },
    token_5: {
        type: String,
        required: true
    },
    whatsappNumber: {
        type: String,
        required: true
    },
    telegramUsername: {
        type: String,
        required: true
    }
});
settingsSchema.statics.build = function (args) {
    return new exports.SettingsModel(args);
};
exports.SettingsModel = mongoose_1.default.model('Settings', settingsSchema);
exports.ChatModel = mongoose_1.default.model('Chat', chatSchema);
//# sourceMappingURL=database.js.map