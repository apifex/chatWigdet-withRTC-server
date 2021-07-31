import axios from 'axios'

axios.defaults.baseURL = "http://localhost:5000/adminpage"
axios.defaults.headers.post['Content-Type'] = "application/json"

interface ISettings {
  telegramID: string,
  telegramToken: string[],
  whatsappNumber?: string,
  telegramNumber?: string,
}

interface IConversation {
  date: Date;
  conversation: {
    isUser: boolean,
    msg: string,
    timestamp: Date
  }[],
  owner?: string;
}

class ServerActions {
  setConfig = () => {
    const token = localStorage.getItem('token')
    if (token) {
      return {
        headers: { 'Authorization': `Bearer ${JSON.parse(token)}` }
      }
    }
  }

  saveToken = (token: string) => {
    localStorage.setItem('token', JSON.stringify(token))
  }

  clearToken = () => localStorage.removeItem('token')

  signup = async (email: string, password: string) => {
    await axios.post('/signup', {
      email: email,
      password: password
    })
  }

  login = async (email: string, password: string) => {
    try {
      if (email === '') throw new Error('Empty email')
      if (password === '') throw new Error('Empty password')
      const token = await axios.post('/login', {
        email: email,
        password: password
      })
      this.saveToken(token.data.token)
      return token.data.email
    } catch (error) {
      return {
        status: 'error',
        message: error.response ? error.response.data.error : error.message
      }
    }
  }

  logout = async () => {
    this.clearToken()
  }

  getUserInfo = async (): Promise<string | null> => {
    try {
      const config = this.setConfig()
      if (config) {
        const user = await axios.get('/getuserinfo', config)
        return user.data.user.email
      } else return null
    } catch (error) {
      console.log('get user error', error)
      return null
    }

  }

  addSettings = async (settings: ISettings) => {
    const config = this.setConfig()
    if (config) {
      await axios.post('/addsettings', {
        settings: settings
      }, config)
    }
  }

  getSettings = async (): Promise<ISettings | any> => {
    try {
      const config = this.setConfig()
      if (config) {
        const settings = await axios.get('/getsettings', config)
        return settings.data.settings
      } else return null
    } catch (error) {
      console.log('get setting error', error)
      return null
    }
  }
  //TODO 
  editSettings = async (settings: ISettings) => {
    await axios.post('/editsettings', {
      settings: settings
    })
  }

  getHistory = async (): Promise<string[] | any> => {
    try {
      const config = this.setConfig()
      if (config) {
        const history = await axios.get('/gethistory', config)
        return history.data
      } else return null
    } catch (error) {
      console.log('get history error', error)
      return null
    }
  }

  getConversation = async (id: string): Promise<IConversation | null> => {
    try {
      const config = this.setConfig()
      if (config) {
        const conversation = await axios.get(`/getconversation`, { params: { id: id }, ...config })
        return conversation.data
      } else return null
    } catch (error) {
      console.log('get conversation error', error)
      return null
    }
  }
}

export default new ServerActions()
