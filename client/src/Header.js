import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Header() {
  const { userInfo, logout } = useContext(UserContext);
  const username = userInfo?.username;

  return (
    <header className="header">
      <Link to="/" className="logo">
        MyBlog
      </Link>
      <nav className="nav">
        {username ? (
          <>
            <Link to="/create" className="nav-link">Add Post</Link>
            <button onClick={logout} className="nav-button">Logout</button>
            <span className="username">{username}</span>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
