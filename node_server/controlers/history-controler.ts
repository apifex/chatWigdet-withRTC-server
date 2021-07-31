import { NextFunction, Request, Response } from 'express';
import HistoryModel, { IConversation } from '../models/conversation-model'
import UserModel from '../models/user-model';


class HistoryActions {
  errorHandler = async (next: NextFunction, promise: any) => {
    try {
      const result = await promise()
      return result
    } catch (error) {
      next(error)
    }
  }

  saveConversation = async (conversation: IConversation["conversation"], Telegram_ID: string) => {
    try {
      const history = await HistoryModel.build({
        conversation: conversation
      })
      await history.save()
      const owner = await UserModel.findOne({ 'settings.telegramID': Telegram_ID }).exec()
      if (!owner) throw new Error("no user found")
      history.addOwner(owner._id)
      history.save()
    } catch (error) {
      return error
    }
  }

  getConversation = async (req: Request, res: Response, next: NextFunction) => {
    this.errorHandler(next, async () => {
      const history = await HistoryModel.findOne({ _id: req.query.id }).exec()
      if (!history || !history.owner == req.user) throw new Error("no history found")
      res.status(200).json(history)
    })
  }

  getHistory = async (req: Request, res: Response, next: NextFunction) => {
    this.errorHandler(next, async () => {
      const historyList = await HistoryModel.find({ owner: req.user }).exec()
      const response: { id: string, date: Date }[] = []
      historyList.forEach(el => response.push({
        id: el._id,
        date: el.conversation[0].timestamp
      }))
      res.status(200).json(response)
    })
  }

  deleteConversation = async (req: Request, res: Response, next: NextFunction) => {
    this.errorHandler(next, async () => {
      const del = await HistoryModel.findOneAndRemove({ _id: req.body.id }).exec()
      if (!del) throw new Error('no conversation with this id')
      res.status(200).send("deleted")
    })
  }
}

export default new HistoryActions
