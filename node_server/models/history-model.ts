import { Document, Schema, model, Model }from 'mongoose'
  
export interface IHistory {
    date: string;
    conversation: {
      isUser: boolean, 
      msg: string,
      timestamp: string}[],
    owner?: string;
  }

interface IHistoryDocument extends IHistory, Document {
    addOwner(): void,
} 

interface IHistoryModel extends Model<IHistoryDocument> {
    build(args: IHistory): any
}

const HistorySchema = new Schema<IHistoryDocument, IHistoryModel>({
    date: {
      type: String,
      required: true,
    },
    conversation: {
      type: Array,
    },
    owner: {
      type: String,
    },
})

HistorySchema.methods.addOwner = function (owner: string) {
    this.owner = owner
  }

HistorySchema.statics.build = (args: IHistory) => {
    return new HistoryModel(args)
  }

const HistoryModel = model<IHistoryDocument, IHistoryModel>('History', HistorySchema)

export default HistoryModel
