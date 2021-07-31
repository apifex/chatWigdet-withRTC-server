import { useState, useCallback, useEffect } from 'react';
import serverActions from '../services/serverActions';
import Card from '@material-ui/core/Card'
import {useStyles} from '../services/styles'

  interface IMessage {
    isUser: boolean,
    msg: string,
    timestamp: Date
  }
  
  interface IProps {
      conversationID: string
  }

  interface IConversation {
    conversation: IMessage[]
  }

  const useConversation = (conversationID: string) => {
    const classes = useStyles()
    const [conversation, setConversation] = useState<IConversation | null>(null)

    const getConversation = useCallback(async () => {
      const conversation = await serverActions.getConversation(conversationID)
      if (conversation) setConversation(conversation)
    },[conversationID])

    useEffect(()=>{
      getConversation()
    }, [getConversation])

    return {classes, conversation, }
  }
  
 export default function Conversation ({conversationID}: IProps) {
    const {classes, conversation} = useConversation(conversationID)
  
    return(
          <Card className={classes.conversation} >
            {conversation?
            <div className='messages'>
            {conversation.conversation.map((message: IMessage)=>
              message.isUser?
              <div key={message.timestamp.toString()}
                  id={message.msg}
                  className='message message-personal'>
                  {message.msg}
                  <span className='timestamp'><br/>{new Date(message.timestamp).toLocaleTimeString()}</span>
              </div>
              :
              <div key={message.timestamp.toString()} 
                  className='message'>
                  {message.msg} <br/>
                  <span className='timestamp'>{new Date(message.timestamp).toLocaleTimeString()}</span>
              </div>
              )
              }
              </div>:null}
          </Card>
      )
  }