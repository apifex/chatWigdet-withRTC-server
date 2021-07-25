import React, {useState, useEffect} from "react";
import serverActions from "./serverActions";


const UserContext = React.createContext<null | {user: string | null | undefined, setUser: React.Dispatch<React.SetStateAction<string | null | undefined>> }>(null)

function UserContextProvider({children}:any) {
    const[user, setUser] = useState<string | null>()
    
    const isLogged = async () => {
       const actualUser = await serverActions.getUserInfo()
       setUser(actualUser)
       return actualUser
    }

    useEffect(()=>{
        isLogged()
    })

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </ UserContext.Provider>
        )   
}

export {UserContext, UserContextProvider}