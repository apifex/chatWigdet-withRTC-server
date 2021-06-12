import React, {useState, useContext, Context, useEffect} from 'react'
import HistoryContext from './HistoryContext'
import './App.scss';
import './i18n'
import SignIn from '../src/components/login'
import NavBar from './components/appbar'
import SettingsList from './components/settingslist';
import History from './components/history'
import Chat from './components/chat'
import Grid from '@material-ui/core/Grid'
import ServerActions from './serverActions'

const useAdmin = () => {
  
  const [history, setHistory] = useState([{
    _id: '', 
    chatID: '',
    conversation: [{
            isUser: true,
            msg: '',
            timestamp: ''
        }]
  }])
  const [chatId, setChatId] = useState('')
  console.log(chatId, 'hello')
  const [chatToDisplay, setChatToDisplay] = useState([{
    isUser: true,
    msg: '',
    timestamp: ''
}])
const takechat = (id: string) => {
  let index = history.findIndex(el=> el._id ===id)
  setChatToDisplay(history[index].conversation)
}
console.log(chatId, 'a tutaj')
  // setChatToDisplay(history[history.findIndex(el=>el._id === chatId)].conversation)
  return {takechat, history, setHistory, chatId, setChatId, chatToDisplay, setChatToDisplay}
}

function AdminPage() {
  const {takechat, history, setHistory, chatId, setChatId, chatToDisplay, setChatToDisplay} = useAdmin()

  useEffect(()=>{
    ServerActions.getChat().then(chats=>setHistory(chats))
  }, [])

  return (
    <div className="AdminPage">
      {/* <HistoryContext.Provider value={{history: history, setHistoryContext: setHistory, chatToDisplay: chatToDisplay, setChatToDisplay: setChatToDisplay}}> */}
      <SignIn/>
      <NavBar/>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
        spacing={3}>
      <SettingsList />
      <History history={history} setChat={takechat}/>
      <Chat chat={chatToDisplay} />
      </Grid>
      {/* </HistoryContext.Provider> */}
    </div>
    
  );
}

export default AdminPage;
