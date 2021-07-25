import {useEffect, useContext} from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from '../services/userContext';

export default function AuthorizedComponent(props: any) {
    const history = useHistory()
    const user = useContext(UserContext)?.user
    useEffect(()=>{
        if (!user) history.push('/login')
    })

    return(
        user?
        <div>
            {props.children}
        </div>:null
    )
}

