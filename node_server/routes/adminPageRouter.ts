import express from 'express'
import {NextFunction, Request, Response} from 'express';

const adminPageRouter = express.Router()

//TODO :
adminPageRouter.post('/settings/:action', async (req: Request, res: Response, next: NextFunction) => {
    switch (req.params.action) {
        case("add"): 
            // databaseResponse = await SettingsModel.build(req.body).save()
            // if (databaseResponse._id) {
            //     res.status(200).send("added successfully")
            // }
            break;
        case("update"):
            // let actualSettings = await SettingsModel.findOne({_id: req.body._id}).exec()
            // for (let x in actualSettings) {
            //     req.body[x]?actualSettings[x] = req.body[x]:null
            // }
            // databaseResponse = await actualSettings.save()
            // if (databaseResponse === actualSettings) {
            //     res.status(200).send("updated successfully")
            // }
            break;
        case("change"):
            // turnOffSettings()
            // let toOnSettings = await SettingsModel.findOne({_id: req.body._id}).exec()
            // toOnSettings.isActive = true;
            // databaseResponse = await toOnSettings.save()
            // if (databaseResponse === toOnSettings) {
            //     startBots()
            //     res.status(200).send("changed successfully")
            // }
            break;
        case("loadallsettings"):
            // let settings = await SettingsModel.find().exec()
            // res.send(JSON.stringify(settings))
            break;
        case("delete"):
            // databaseResponse = await SettingsModel.deleteOne({_id: req.body._id})
            // console.log(databaseResponse)
            // // if (databaseResponse.deletedCount > 0) res.status(200).send("settings deleted")
            // if (databaseResponse.deletedCount === 0) res.status(200).send("no settings found")
            break;
        }
})

export default adminPageRouter;