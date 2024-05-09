import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { Navigate } from 'react-router-dom';
import Editor from '../Editor';

export default function CreateNewPost() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);

  async function createNewPost(ev) {
    ev.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(summary)) {
      setIsValidEmail(false);
      return;
    }

    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', file);

    const res = await fetch('http://localhost:4000/post', {
      method: 'POST',
      body: data,
      credentials: 'include'
    });

    if (res.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className="create-new-post-container">
      <h1>Create New Employee</h1>
      <form onSubmit={createNewPost} className="create-new-post-form">
        <input
          type="text"
          placeholder="Name"
          value={title}
          onChange={ev => setTitle(ev.target.value)}
          className="create-input"
        />
        <input
          type="text"
          placeholder="Employee Email"
          value={summary}
          onChange={ev => {
            setSummary(ev.target.value);
            setIsValidEmail(true); 
          }}
          className={`create-input ${isValidEmail ? '' : 'invalid-email'}`}
        />  
        {!isValidEmail && <p className="error-message">Please enter a valid email address</p>}
        <Editor onChange={setContent} value={content} />
        <input
          type="file"
          onChange={ev => setFile(ev.target.files[0])}
          className="create-input"
        />
        <button type="submit" className="create-submit-btn">Add Employee</button>
      </form>
    </div>
  );
}
