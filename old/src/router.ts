import express, {NextFunction, Request, Response} from 'express';
import {SettingsModel, ChatModel} from './database';
import {startBots} from './telegramBots';


const router = express.Router();

router.use((req: Request, res: Response, next: NextFunction)=> {
    // TODO authentification
    next();
})

const endpointsErrorHandlar = (req: Request, res: Response, next: NextFunction) => {
    try{
      return next ()
    } catch (err) {
        console.log(err)
      res.status(500).send("error catched")
    }
  }

router.get('/status', endpointsErrorHandlar, (req: Request, res: Response) => {
    res.send('server works')
})

router.post('/settings/:action', endpointsErrorHandlar, async (req: Request, res: Response)=>{
    let databaseResponse
    const turnOffSettings =  async() => {
        let activeSettings = await SettingsModel.findOne({isActive: true}).exec()
            activeSettings.isActive = false;
            await activeSettings.save()
    }
    switch (req.params.action) {
        case("add"): 
            databaseResponse = await SettingsModel.build(req.body).save()
            if (databaseResponse._id) {
                res.status(200).send("added successfully")
            }
            break;
        case("update"):
            let actualSettings = await SettingsModel.findOne({_id: req.body._id}).exec()
            for (let x in actualSettings) {
                req.body[x]?actualSettings[x] = req.body[x]:null
            }
            databaseResponse = await actualSettings.save()
            if (databaseResponse === actualSettings) {
                res.status(200).send("updated successfully")
            }
            break;
        case("change"):
            turnOffSettings()
            let toOnSettings = await SettingsModel.findOne({_id: req.body._id}).exec()
            toOnSettings.isActive = true;
            databaseResponse = await toOnSettings.save()
            if (databaseResponse === toOnSettings) {
                startBots()
                res.status(200).send("changed successfully")
            }
            break;
        case("loadallsettings"):
            let settings = await SettingsModel.find().exec()
            res.send(JSON.stringify(settings))
            break;
        case("delete"):
            databaseResponse = await SettingsModel.deleteOne({_id: req.body._id})
            console.log(databaseResponse)
            // if (databaseResponse.deletedCount > 0) res.status(200).send("settings deleted")
            if (databaseResponse.deletedCount === 0) res.status(200).send("no settings found")
            break;
        }
  })

router.get('/getchats', endpointsErrorHandlar, async (req: Request, res: Response) => {
    let chatsHistory = await ChatModel.find().exec()
    res.send(JSON.stringify(chatsHistory))
})
  
router.get('/getNumber/:client', endpointsErrorHandlar , async (req: Request, res: Response) => {
    const responseFromDb = await SettingsModel.findOne({isActive: true}).exec()
    switch(req.params.client) {
        case('telegram'):
            if (responseFromDb.telegramUsername) res.send(JSON.stringify(responseFromDb.telegramUsername));
            break;
        case('whatsapp'):
            if (responseFromDb.whatsappNumber) res.send(JSON.stringify(responseFromDb.whatsappNumber));
            break;
    }
})
  
export default router;

