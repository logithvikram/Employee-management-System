import { useContext, useState } from "react"
import {Navigate} from 'react-router-dom'
import { UserContext } from "../UserContext";


export default function LoginPage() {

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setReDirect] = useState(false);
    const {setUserInfo} = useContext(UserContext)
    async function login(ev) {
        ev.preventDefault();
        const res = await fetch('http://localhost:4000/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })
        if (res.ok)
        {
            res.json().then(userInfo =>{
                setUserInfo(userInfo)
                setReDirect(true);});
        }
            else
            alert('wrong credientail');
    }
    if(redirect){
        return <Navigate to={'/'}/>
    }
    return (
        <form className="login" onSubmit={login}>
            <h1> Login</h1>
            <input type="text"
                placeholder="username"
                value={username}
                onChange={ev => setUserName(ev.target.value)}
            />
            <input type="Password"
                placeholder="Password"
                value={password}
                onChange={ev => setPassword(ev.target.value)} />
            <button>Log In</button>
        </form>

    )
}