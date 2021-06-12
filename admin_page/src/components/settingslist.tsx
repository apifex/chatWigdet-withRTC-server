import React, {useState, useEffect} from 'react'
import Settings from './settings'
import { useTranslation } from 'react-i18next'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Switch from '@material-ui/core/Switch'
import TelegramIcon from "@material-ui/icons/Telegram"
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import {useStyles} from '../styles'
// import {loadSettings} from '../serverActions'

const SettingsList = () => {
    const [settings, setSettings] = useState([])
    const classes = useStyles()
    const { t } = useTranslation()
    const [editSettings, setEditSettings] = useState(false)
    // useEffect(()=> {
    //   console.log('use effect in settigs')
    //   const loadSet = async () => {
    //     setSettings(await loadSettings())}  
    //   loadSet()
    // },[])
    
    return(
        <Grid item xs={12} md={6} lg={4}>
          <Paper className={classes.paper}>
          <Typography variant="h4">{t("Settings")}</Typography>
          <List>
            {settings.map((setting:any)=>
                <ListItem>
                <ListItemIcon><TelegramIcon/></ListItemIcon>
                <ListItemText primary={setting.telegram_id}/>
                <ListItemSecondaryAction>
                  <Switch 
                    checked={setting.isActive}
                    name="checkedA"
                    color="primary"/>
                  <Button variant="outlined" onClick={()=>{setEditSettings(true)}}>Edit</Button>
                </ListItemSecondaryAction>
                </ListItem>
            )
            }
          </List>
          </Paper>
          <Settings isOpen={editSettings} closeEdit={()=>setEditSettings(false)}/>
        </Grid>
    )
}

export default SettingsList