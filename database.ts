import 'dotenv/config'
import mongoose from 'mongoose'

interface ChatModelInterface extends mongoose.Model<any> {
    build(args: IChat): any
}

interface SettingsModelInterface extends mongoose.Model<any> {
    build(args: ISettings): any
}

if (!process.env.MONGOURL) throw Error
mongoose.connect(process.env.MONGOURL, 
    {useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    },
    // ()=> console.log("connected to MongoDB")
    )

const chatSchema = new mongoose.Schema({
    chatID: {
        type: String,
        required: true
    },
    conversation: {
        type: Array,
        reuired: true
    }
})

chatSchema.statics.build = (args: IChat) => {
    return new ChatModel(args)
}

const settingsSchema = new mongoose.Schema({
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
    whatsapp1: {
        type: String,
        required: false
    },
    whatsapp2: {
        type: String,
        required: false
    },
})

settingsSchema.statics.build = (args: ISettings) => {
    return new SettingsModel(args)
}



export const SettingsModel = mongoose.model<any, SettingsModelInterface>('Settings', settingsSchema)
export const ChatModel = mongoose.model<any, ChatModelInterface>('Chat', chatSchema)
export const getAllChats = ChatModel.find().exec()
export const getSettings = SettingsModel.find().exec()
export const updateSettings = async (newSettings:ISettings) => {
    const settings = await SettingsModel.findOne()
    settings.overwrite(newSettings)
    await settings.save()
    
}


