import React, {useCallback, useState, useEffect} from 'react'
import { useTranslation } from 'react-i18next'
import serverActions from '../services/serverActions'
import useStyles from '../services/styles';
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import CloseIcon from "@material-ui/icons/Close"
import SaveIcon from '@material-ui/icons/Save'
import TelegramIcon from '@material-ui/icons/Telegram'
import CardActions from '@material-ui/core/CardActions';

const useSetting = () => {
  const {t} = useTranslation()
  const classes = useStyles()
  const [settings, setSettings] = useState({
      telegramID: '',
      telegramToken: [''],
      whatsappNumber: '',
      telegramNumber: '',
    })

  const getSettings = useCallback(async () => {
    const settings = await serverActions.getSettings()
    if (settings) setSettings(settings)
  },[])

    useEffect(()=>{
      getSettings()
    }, [getSettings])


    const handleChange = (e: React.ChangeEvent) => {
      const event = (e.currentTarget as HTMLInputElement)
      if (event.id.includes('Token')) {
        const arr = [...settings.telegramToken]
        arr[Number(event.id[event.id.length-1])] = event.value
        setSettings({...settings, telegramToken: arr})
      } else {
        setSettings({...settings, [event.id]: event.value})
      } 
    }

    const handleClick = (e: React.MouseEvent) => {
      if (e.currentTarget.id==='addTelegram') {
        const arr = [...settings.telegramToken]
        arr.push('')
        setSettings({...settings, telegramToken: arr})
      }
      if (e.currentTarget.id.includes('token')) {
        const arr = [...settings.telegramToken]
        arr.splice(Number(e.currentTarget.id[e.currentTarget.id.length-1]), 1)
        setSettings({...settings, telegramToken: arr})
      }
      if (e.currentTarget.id==='save') {
        serverActions.addSettings(settings)
        //TODO return information
      }
    }
  return {t, classes, settings, handleClick, handleChange}
}

const Settings = () => {
    const {t, classes, settings, handleClick, handleChange} = useSetting()

    return(
      <div className={classes.root}>
      <Paper elevation={0}>
         <CardActions>
           <Button id='save' onClick={handleClick}>{t('Save')}
            <SaveIcon/>
           </Button>
         </CardActions>
         <TextField className={classes.input} label='telegram ID' id='telegramID' required value={settings.telegramID} variant="outlined" onChange={handleChange}/>
         <TextField className={classes.input} label='Telegram Number' id='telegramNumber' variant="outlined" value={settings.telegramNumber} onChange={handleChange}/>
         <TextField className={classes.input} label='Whatsapp Number' id='whatsappNumber' variant="outlined" value={settings.whatsappNumber} onChange={handleChange}/>
        {settings.telegramToken.map((token, index)=> {
           return  <TextField 
           key={index}
           className={classes.input} 
           label={'telegram Token ' + (index+1)} 
           id={'telegramToken ' + index} 
           value={settings.telegramToken[index]} 
           variant="outlined" 
           onChange={handleChange}
           InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton id={'token'+index} onClick={handleClick}>
                  <CloseIcon/>
                </IconButton>
              </InputAdornment>
            ),
          }}/>
         })}
         <CardActions>
           <Button id='addTelegram' onClick={handleClick} >
             <TelegramIcon/>{t('Add Telegram Token')}
           </Button>
         </CardActions>
      </Paper>
      </div>
    )
}

export default Settings