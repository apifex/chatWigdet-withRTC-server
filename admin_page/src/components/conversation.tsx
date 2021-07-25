import { useState, useCallback, useEffect } from 'react';
import serverActions from '../services/serverActions';
import useStyles from '../services/styles'
import Card from '@material-ui/core/Card'

  interface IMessage {
    isUser: boolean,
    msg: string,
    timestamp: string
  }
  
  interface IProps {
      conversationID: string
  }

  interface IConversation {
    date: string,
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
              </div>:null}
          </Card>
      )
  }