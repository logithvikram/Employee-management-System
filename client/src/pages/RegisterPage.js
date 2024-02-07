import { useState } from "react";

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [registrationStatus, setRegistrationStatus] = useState('');

    async function register(ev) {
        ev.preventDefault();
        const res = await fetch('http://localhost:4000/register', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (res.status === 200) {
            setRegistrationStatus('success');
            alert('Registration successful!');
        } else {
            setRegistrationStatus('failed');
            alert('Registration failed. Please try again.');
        }
    }

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={register}>
                <h1 className="register-header">Register</h1>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={ev => setUsername(ev.target.value)}
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
                <button type="submit" className="btn btn-primary">Sign Up</button>
                {registrationStatus === 'success' && <p className="success-message">Registration successful!</p>}
                {registrationStatus === 'failed' && <p className="error-message">Registration failed. Please try again.</p>}
            </form>
        </div>
    );
}
