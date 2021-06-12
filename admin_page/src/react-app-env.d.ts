/// <reference types="react-scripts" />


interface IHistory {
    _id: string,
    chatID: string,
    conversation: IConversation[]
}

interface IConversation {
    isUser: boolean,
    msg: string,
    timestamp: string,
}
