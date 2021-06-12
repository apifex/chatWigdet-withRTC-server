import React, {useEffect, useState, useContext, useCallback} from 'react'
import { useTranslation } from 'react-i18next'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import DeleteIcon from '@material-ui/icons/Delete';
import {useStyles} from '../styles'

import HistoryContext from '../HistoryContext'


// const useHistory = () => {
//   const setChat = useContext(HistoryContext).setChatToDisplay
//   const handleClick = useCallback((ev:any) => {
//     console.log('handle clik value', ev.currentTarget.id)
//     setChat(ev.currentTarget.id)
//   }, [])
//   return {handleClick}
// }

interface IProps {
  history: IHistory[],
  setChat: (id:string) => void ,
}

const History = (history: IProps) => {
  const { t } = useTranslation()
  const classes = useStyles()
  // const history = useContext(HistoryContext).history
  // const {handleClick} = useHistory()
  const handleClick = useCallback((ev:any) => {
    console.log('handle clik value', ev.currentTarget.id)
    history.setChat(ev.currentTarget.id)
  }, [])
  
  

    return(
      <Grid item xs={12} md={6} lg={4}>
        <Paper className={classes.paper}>
        <Typography variant="h4">{t("History")}</Typography>
          <List>
            {
            history.history.map((chat:any)=>
              <ListItem button id={chat._id} onClick={handleClick} >
                {console.log('here', chat)}
                <ListItemText primary={chat.chatID}/>
                <ListItemSecondaryAction>
                  <DeleteIcon className={classes.delete} onClick={()=>console.log('delete')}/>
                </ListItemSecondaryAction>
              </ListItem>
          
            )
            }
          </List>
        </Paper>
        
      </Grid>
      
    )
}

export default History