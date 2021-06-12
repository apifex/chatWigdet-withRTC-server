import React from 'react'

interface IHistoryContext {
    history : IHistory[],
    setHistoryContext: React.Dispatch<React.SetStateAction<IHistory[]>>,
    chatToDisplay: string,
    setChatToDisplay: React.Dispatch<React.SetStateAction<string>>
}
const HistoryContext = React.createContext<IHistoryContext>({
    history: [{
        _id: '',
        chatID: '',
        conversation: [{
            isUser: true,
            msg: '',
            timestamp: ''
            }]
        }],
    setHistoryContext: ()=>{}, 
    chatToDisplay: '',
    setChatToDisplay: ()=>{}})

export default HistoryContext