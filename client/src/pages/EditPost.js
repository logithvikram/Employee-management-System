import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Editor from '../Editor';

export default function EditPost() {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState('');
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:4000/post/${id}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to fetch post data');
                }
                return res.json();
            })
            .then(postInfo => {
                setTitle(postInfo.title);
                setContent(postInfo.content);
                setSummary(postInfo.summary);
            })
            .catch(error => {
                console.error('Error fetching post data:', error);
            });
    }, [id]);

    async function updatePost(ev) {
        ev.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        if (file) {
            data.append('file', file);
        }
        const res = await fetch(`http://localhost:4000/post/${id}`, {
            method: 'PUT',
            body: data,
            credentials: 'include'
        });
        if (res.ok) {
            setRedirect(true);
        }
    }

    if (redirect) {
        return <Navigate to={`/post/${id}`} />;
    }

    return (
        <div className="edit-post-container">
            <h1>Edit Employee</h1>
            <form onSubmit={updatePost} className="edit-post-form">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={ev => setTitle(ev.target.value)}
                    className="edit-input"
                />
                <input
                    type="text"
                    placeholder="Summary"
                    value={summary}
                    onChange={ev => setSummary(ev.target.value)}
                    className="edit-input"
                />   
                 <Editor onChange={setContent} value={content} />

                <input
                    type="file"
                    onChange={ev => setFile(ev.target.files[0])}
                    className="edit-input"
                />
                <button type="submit" className="edit-submit-btn">Update Post</button>
            </form>
        </div>
    );
}
