import React from 'react'
import { useTranslation } from 'react-i18next'
import {useFormik} from 'formik'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import CloseIcon from "@material-ui/icons/Close"
import SaveIcon from '@material-ui/icons/Save'
import {useStyles} from '../styles'

interface IProps {
  isOpen: boolean
  closeEdit: ()=>void
}

const Settings = ({isOpen, closeEdit}: IProps) => {
         
    const classes = useStyles()
    const { t } = useTranslation()
    const formik = useFormik({
      initialValues: {
        telegram_id: "fsadf",
        token1: "",
        token2: "",
        token3: "",
        token4: "",
        token5: "",
        whatsappNumber: "",
        telegramUsername: ""
      },
      onSubmit: values => {
        alert(JSON.stringify(values, null, 2))
      }
    })

    const handleSubmit = () => {console.log('submit')
      formik.handleSubmit()
      }
    
    return(
        
          <Dialog open={isOpen} onClose={closeEdit} aria-labelledby="form-dialog-title">
          <DialogTitle>Ustawienia nr 
          </DialogTitle>
          <DialogContent>
            <TextField
                id='telegram_id' 
                name="telegram_id" 
                label="Telegram ID" 
                fullWidth
                style={{margin: 7}} 
                size="small"
                onChange={formik.handleChange} 
                value={formik.values.telegram_id} 
                variant="outlined"/>
            <TextField
                id='token1' 
                name="token1" 
                label="Telegram Token 1"
                fullWidth
                style={{margin: 7}} 
                size="small"
                onChange={formik.handleChange} 
                value={formik.values.token1} 
                variant="outlined"/>
              <TextField 
                className={classes.input} 
                id='token2' 
                name="token2" 
                label="Telegram Token 2" 
                fullWidth
                style={{margin: 7}} 
                size="small"
                onChange={formik.handleChange} 
                value={formik.values.token2} 
                variant="outlined"/>
              <TextField 
                className={classes.input} 
                id='token3' 
                name="token3" 
                label="Telegram Token 3" 
                fullWidth
                style={{margin: 7}} 
                size="small"
                onChange={formik.handleChange} 
                value={formik.values.token3} 
                variant="outlined"/>
              <TextField 
                className={classes.input} 
                id='token4' 
                name="token4" 
                label="Telegram Token 4" 
                fullWidth
                style={{margin: 7}} 
                size="small"
                onChange={formik.handleChange} 
                value={formik.values.token4} 
                variant="outlined"/>
              <TextField 
                className={classes.input} 
                id='token5' 
                name="token5" 
                label="Telegram Token 5" 
                fullWidth
                style={{margin: 7}} 
                size="small"
                onChange={formik.handleChange} 
                value={formik.values.token5} 
                variant="outlined"/>
              <TextField 
                className={classes.input} 
                id='whatsappNumber' 
                name="whatsappNumber" 
                label={t("Phone number assotiated with Whatsapp")}
                fullWidth
                style={{margin: 7}} 
                size="small"
                onChange={formik.handleChange} 
                value={formik.values.whatsappNumber} 
                variant="outlined"/>
              <TextField 
                className={classes.input} 
                id='telegramUsername' 
                name="telegramUsername" 
                label={t("Telegram's username")}
                fullWidth
                style={{margin: 6}} 
                size="small"
                onChange={formik.handleChange} 
                value={formik.values.telegramUsername} 
                variant="outlined"/>
            
            <DialogActions>
            <Button 
              style={{margin: 'auto'}}
              variant="contained" 
              onClick={handleSubmit} 
              color="primary" 
              size="small"
              startIcon={<SaveIcon/>}>{t("Save")}</Button>
            <Button 
              style={{margin: 'auto'}}
              variant="contained" 
              onClick={handleSubmit} 
              color="secondary" 
              size="small"
              startIcon={<SaveIcon/>}>{t("Save and Activate")}</Button>
            <Button 
              style={{margin: 'auto'}}
              variant="contained" 
              onClick={handleSubmit} 
              color="primary" 
              size="small"
              startIcon={<CloseIcon/>}>{t("Cancel")}</Button>
            </DialogActions>
            </DialogContent>
          </Dialog>
        
        
    )
}

export default Settings