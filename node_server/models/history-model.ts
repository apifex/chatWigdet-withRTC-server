import { Document, Schema, model, Model }from 'mongoose'
  
export interface IHistory {
    date: string;
    conversations: {
      isUser: boolean, 
      msg: string,
      timestamp: string}[],
    owner?: string;
  }

interface IHistoryDocument extends IHistory, Document {
    addOwner(): void,
    addStep(stepId: string, position?: number): void,
    editStepsPosition(stepId: string, position?: number): void,
    generateJWT(): string,
} 

interface IHistoryModel extends Model<IHistoryDocument> {
    build(args: IHistory): any
}

const HistorySchema = new Schema<IHistoryDocument, IHistoryModel>({
    date: {
      type: String,
      required: true,
    },
    conversations: {
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
