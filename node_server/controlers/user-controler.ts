import {NextFunction, Request, Response} from 'express';
import UserModel from '../models/user-model'


class UserActions {
  
  errorHandler = async (next: NextFunction, promise: any) => {
    try {
        const result = await promise()
        return result
    } catch (error) {
        next(error)
    }
  }

  editUser = async (req: Request, res: Response, next: NextFunction) => {
    this.errorHandler(next, async () => {
      const user = await UserModel.findOne({_id: req.user}).exec()
      if (!user) throw new Error ("No user with this ID")
      user.email = req.body.email
      user.passwordToHash(req.body.password)
      res.status(200).json({user: user})
    })
  }

  deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    this.errorHandler(next, async () => {
      const user = await UserModel.findOneAndDelete({email: req.body.email}).exec()
      if (user) res.status(200).send("user deleted")
    })  
  }

  getUserInfo = async (req: Request, res: Response, next: NextFunction) => {
    this.errorHandler(next, async () => {
      const user = await UserModel.findOne({_id: req.user}).exec()
      res.status(200).json({user: user})
    })
  } 

  addSettings = async (req: Request, res: Response, next: NextFunction) => {
    this.errorHandler(next, async () => {
      const user = await UserModel.findOne({_id: req.user}).exec()
      if (!user) throw new Error("No user with this ID") 
      user.settings = req.body.settings
      await user.save()
      res.status(200).json({
        settings: user.settings
      })
    })
  }

  getSettings = async (req: Request, res: Response, next: NextFunction) => {
    this.errorHandler(next, async () => {
      const user = await UserModel.findOne({_id: req.user}).exec()
      if (!user) throw new Error("No user with this ID") 
      const settings = user.settings
      if (!settings) throw new Error("No settings found")
      res.status(200).json({
        settings: settings
      })
    })
  }

  editSettings = async (req: Request, res: Response, next: NextFunction) => {
    this.errorHandler(next, async () => {
      const user = await UserModel.findOne({_id: req.user}).exec()
      if (!user) throw new Error("No user with this ID") 
      user.settings = req.body.settings
      res.status(200).json({
        settings: user.settings
      })
    })
  }
}

export default new UserActions
