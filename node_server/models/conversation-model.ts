import { Document, Schema, model, Model }from 'mongoose'
  
export interface IConversation {
    conversation: {
      isUser: boolean, 
      msg: string,
      timestamp: Date}[],
    owner?: string;
  }

interface IConversationDocument extends IConversation, Document {
    addOwner(): void,
} 

interface IConversationModel extends Model<IConversationDocument> {
    build(args: IConversation): any
}

const ConversationSchema = new Schema<IConversationDocument, IConversationModel>({
    conversation: {
      type: Array,
    },
    owner: {
      type: String,
    },
})

ConversationSchema.methods.addOwner = function (owner: string) {
    this.owner = owner
  }

ConversationSchema.statics.build = (args: IConversation) => {
    return new ConversationModel(args)
  }

const ConversationModel = model<IConversationDocument, IConversationModel>('Conversation', ConversationSchema)

export default ConversationModel
