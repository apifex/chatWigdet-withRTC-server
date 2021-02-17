import _ from 'lodash'

const loginForm = document.getElementById('loginform')
loginForm.addEventListener('submit', (event) => {
  if (loginForm.elements['login'].value === 'admin' &&
  loginForm.elements['password'].value === 'password') {
    document.getElementById('main').style.display = 'grid'
    document.getElementById('login-wrapper').style.display = 'none'
    fetchChatsHistory()
  }
  event.preventDefault()
})

const settingsForm = document.getElementById('settings')
settingsForm.addEventListener('submit', (event)=> {
  let settings = {
  telegram_id: settingsForm.elements['telegram_id'].value,
  token_1: settingsForm.elements['token1'].value,
  token_2: settingsForm.elements['token2'].value,
  token_3: settingsForm.elements['token3'].value,
  token_4: settingsForm.elements['token4'].value,
  token_5: settingsForm.elements['token5'].value,
  whatsapp1: settingsForm.elements['whatsapp1'].value}

  fetch('https://widgettelegram-server.azurewebsites.net/settings',
        {headers: {'Content-Type': 'application/json'}, 
        method: "POST",
        body: JSON.stringify(settings)
      }
    ).then((res)=> res.status==='200'?
    document.getElementById('status').innerHTML('Zapisano w bazie danych'):
    document.getElementById('status').innerHTML('Wystąpił błąd! Spróbuj ponownie!'));  
  event.preventDefault()
})

let chatsHistory = []
const fetchChatsHistory = async () => {
    const chats = await fetch(
        'https://widgettelegram-server.azurewebsites.net/getchats',
        {headers: {'Content-Type': 'application/json'}, method: "POST"}
    );
    chatsHistory = await chats.json()  
    displayChatHistoryList(chatsHistory)
};

const chatHistoryList = document.getElementById('chatsList')
const displayChatHistoryList = (chatsHistory) => {
  for (let i=0; i<chatsHistory.length; i++) {
      let li = document.createElement('li')
      li.classList.add('listHistory')
      li.innerHTML = chatsHistory[i].chatID
      li.addEventListener('click', ()=>displayChatHistory(i))
      chatHistoryList.appendChild(li)
    }
}
const chatTitle = document.getElementById('chatTitle')
const chat = document.getElementById('chat')
const displayChatHistory = (chatID) => {
  chat.innerHTML = ''
  chatTitle.innerHTML = chatsHistory[chatID].chatID
  chatsHistory[chatID].conversation.forEach((message)=>{
    const chatLineElement = document.createElement('div')
        if (message.isUser) {
          chatLineElement.classList.add("message")
          chatLineElement.classList.add("message-personal")
          chatLineElement.innerHTML = message.msg
        } else {
          chatLineElement.classList.add("message")
          chatLineElement.innerHTML = message.msg
        }
        chat.appendChild(chatLineElement)
    }
  )
} 
