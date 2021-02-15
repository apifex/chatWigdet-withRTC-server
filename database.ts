import 'dotenv/config'
import mongoose from 'mongoose'

interface IChat {
    userName: String,
    conversation: {
            me: boolean,
            msg: String,
            timestamp: String
        }[],
}

interface saveChatInterface extends mongoose.Model<any> {
    build(args: IChat): any
}

if (!process.env.MONGOURL) throw Error
mongoose.connect(process.env.MONGOURL, 
    {useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    },
    ()=> console.log("connected to MongoDB")
    )

const chatSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    conversation: {
        type: Array,
        reuired: true
    }
})

chatSchema.statics.build = (args: IChat) => {
    return new SaveChat(args)
}

export const SaveChat = mongoose.model<any, saveChatInterface>('Chat', chatSchema)
