import { Document, Schema, model, Model } from 'mongoose'

export interface ILog {
  message: string,
  level: string,
  timestamp: string,
  owner?: string
}

interface ILogDocument extends ILog, Document {
  addOwner(): void,
}

interface ILogModel extends Model<ILogDocument> {
  build(args: ILog): any
}

const LogSchema = new Schema<ILogDocument, ILogModel>({
  message: {
    type: String,
  },
  level: {
    type: String,
  },
  timestamp: {
    type: String,
  },
  owner: {
    type: String
  }
})

LogSchema.statics.build = (args: ILog) => {
  return new LogModel(args)
}

LogSchema.methods.addOwner = function (owner: string) {
  this.owner = owner
}

const LogModel = model<ILogDocument, ILogModel>('Log', LogSchema)

export default LogModel
