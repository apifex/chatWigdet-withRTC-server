import React, {useContext} from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import {useStyles} from '../styles'
import HistoryContext from '../HistoryContext'


interface IConversation {
  isUser: boolean,
  msg: string,
  timestamp: string
}

interface IProps {
    chat: IConversation[]
}
let title = 'czat takie i taki'

const Chat = (chat: IProps) => {
  // const contextHistory = useContext(HistoryContext)
  // const chat = contextHistory.history[contextHistory.history.findIndex(el=> el._id === contextHistory.chatToDisplay )]
  const classes = useStyles()
  // console.log(contextHistory, 'in chat ')
  console.log(chat, 'conversation in chat ')
  
  return(
      <Grid item xs={12} md={6} lg={4}>
        <Paper className={classes.paper}>
        <Typography variant="h4">{title}</Typography>
          <div className='messages'>
          {chat.chat.map((message:IConversation)=>
            message.isUser?
            <div key={message.timestamp}
                id={message.msg}
                className='message message-personal'>
                {message.msg}
            </div>
            :
            <div key={message.timestamp} 
                className='message'>
                {message.msg}
            </div>
            )
            }
            </div>
        </Paper>
        </Grid>
    )
}

export default Chat