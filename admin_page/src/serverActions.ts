import React, { useEffect, useState } from 'react'
const url = 'http://localhost:4001/'


class ServerActions {
  
  
  getChat = async (): Promise<IHistory[]> => {
      const response = await fetch(url + 'getchats')
      const history = await response.json()
      console.log(history, ' in server action')
      return history
    }

}
export default new ServerActions





// export const loadSettings = async () => {
//   const response = await fetch(url + 'settings/loadallsettings', {
//     method: 'POST',
//     mode: 'cors',
//     headers: {
//       'Content-Type': 'application/json',
//     }
//   })
//   const settings = await response.json()
//   return settings
// }

// export const getChatsHistory = async () => {
//   const response = await fetch(url + 'getchats')
//   const chats = await response.json()
//   return chats
// }
