import { useContext, useState } from "react";
import { Navigate } from 'react-router-dom';
import { UserContext } from "../UserContext";

export default function LoginPage() {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setReDirect] = useState(false);
    const { setUserInfo } = useContext(UserContext);

    async function login(ev) {
        ev.preventDefault();
        const res = await fetch('http://localhost:4000/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });
        if (res.ok) {
            res.json().then(userInfo => {
                setUserInfo(userInfo);
                setReDirect(true);
            });
        } else {
            alert('Invalid credentials. Please try again.');
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />;
    }

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={login}>
                <h1 className="login-header">Login</h1>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={ev => setUserName(ev.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={ev => setPassword(ev.target.value)}
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Log In</button>
            </form>
        </div>
    );
}
