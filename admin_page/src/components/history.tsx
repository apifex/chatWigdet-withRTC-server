import React, { useState, useEffect} from 'react';
import serverActions from '../services/serverActions';
import { useMediaQuery } from 'react-responsive';
import {useTranslation} from 'react-i18next'
import useStyles from '../services/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from './tabpanel'
import Conversation from './conversation'

const useHistory = () => {
  const classes = useStyles();
  const {t} = useTranslation()
  const [conversationID, setConversationID] = useState<string | null | undefined>();
  const [history, setHistory] = useState([{id: '', date: ''}])
  const [value, setValue] = useState(0);

  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

  const getHistory = async () => {
    const historyList = await serverActions.getHistory()
    if (historyList) setHistory(historyList)
  }

  useEffect(()=>{
    getHistory()
  }, [])

  useEffect(()=>{
    setConversationID(history[0].id)
  }, [history])

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
    const e = (event.currentTarget as HTMLButtonElement).id
    setConversationID(e);
  }; 

  return {t, classes, conversationID, history, value, isMobile, handleChange}
}


export default function VerticalTabs() {
        const {t, classes, conversationID, history, value, isMobile, handleChange} = useHistory()
    
    return (
      <div className={isMobile?classes.rootMobile:classes.root}>
        <Tabs
          orientation="vertical"
          indicatorColor="primary"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs"
          className={isMobile?classes.tabsMobile:classes.tabs}
        >
          {history.length===0
          ?<Tab label={t('No conversations in history')} id='empty' />
          :history.map(el => <Tab label={el.date} key={el.id} id={el.id} />)}
        </Tabs>
        {conversationID?
          <TabPanel >
            <Conversation conversationID={conversationID}/>
          </TabPanel >:null}
      </div>
    );
  }
  
