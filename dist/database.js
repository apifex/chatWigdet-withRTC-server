"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hello = exports.SaveChat = void 0;
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
if (!process.env.MONGOURL)
    throw Error;
mongoose_1.default.connect(process.env.MONGOURL, { useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true }, () => console.log("connected to MongoDB"));
const chatSchema = new mongoose_1.default.Schema({
    userName: {
        type: String,
        required: true
    },
    conversation: {
        type: Array,
        reuired: true
    }
});
chatSchema.statics.build = (args) => {
    return new exports.SaveChat(args);
};
exports.SaveChat = mongoose_1.default.model('Chat', chatSchema);
const hello = () => console.log('jak');
exports.hello = hello;
//# sourceMappingURL=database.js.map