import express from 'express'
import passport from '../services/passport/passport-jwt'
import passportLocal from '../services/passport/passport-local'
import {localAuth} from '../controlers/auth-controler'
import UserActions from '../controlers/user-controler';
import HistoryActions from '../controlers/history-controler';

const adminRouter = express.Router()

adminRouter.get('/test', (req, res)=> res.send('admin router works'))

adminRouter.post('/signup', passportLocal.authenticate('signup', {session: false}), localAuth)

adminRouter.post('/login', passportLocal.authenticate('login', {session: false}), localAuth)

adminRouter.post('/delete', passport.authenticate('jwt', {session: false}), UserActions.deleteUser)

adminRouter.get('/getuserinfo', passport.authenticate('jwt', {session: false}), UserActions.getUserInfo)

adminRouter.post('/edituser', passport.authenticate('jwt', {session: false}), UserActions.editUser)

adminRouter.post('/addsettings', passport.authenticate('jwt', {session: false}), UserActions.addSettings)

adminRouter.get('/getsettings', passport.authenticate('jwt', {session: false}), UserActions.getSettings)

adminRouter.post('/editsettings', passport.authenticate('jwt', {session: false}), UserActions.editSettings)

adminRouter.get('/gethistory', passport.authenticate('jwt', {session: false}), HistoryActions.getHistory)

adminRouter.get('/gethistorylist', passport.authenticate('jwt', {session: false}), HistoryActions.getHistoryList)

adminRouter.post('/deletehistory', passport.authenticate('jwt', {session: false}), HistoryActions.deleteHistory)

export default adminRouter;