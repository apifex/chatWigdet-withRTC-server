import {NextFunction, Request, Response} from 'express';
import HistoryModel, { IHistory } from '../models/history-model'
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

  saveHistory = async (conversation: IHistory["conversation"], Telegram_ID: string) => {
    try {
      const history = await HistoryModel.build({
        date: new Date().toLocaleString(),
        conversation: conversation
      })
      await history.save()
      console.log('save history conversation agrs ', conversation)
      console.log('save history controler kropka ', history.conversation)
      const owner = await UserModel.findOne({'settings.telegramID': Telegram_ID}).exec()
      if (!owner) throw new Error ("no user found")
      history.addOwner(owner.email)
      history.save()
    } catch (error) {
      return error
    }
  }

  getHistory = async (req: Request, res: Response, next: NextFunction) => {
    this.errorHandler(next, async () => {
      const history = await HistoryModel.findOne({_id: req.body.id}).exec()
      if (!history || !history.owner == req.user) throw new Error("no history found")
      res.status(200).json(history)
    })
  }

  getHistoryList = async (req: Request, res: Response, next: NextFunction) => {
    this.errorHandler(next, async () => {
      const historyList = await HistoryModel.find({owner: req.body.email}).exec()
      console.log('history list', historyList)
      res.status(200).json(historyList)
    })
  }

  deleteHistory = async (req: Request, res: Response, next: NextFunction) => {
    this.errorHandler(next, async () => {
      await HistoryModel.findOneAndRemove({_id: req.body.id}).exec()
      res.status(200).send("deleted")
    })
  }
  
}

export default new HistoryActions
