import React from 'react';
import { Link } from 'react-router-dom';

export default function Post({_id, title, summary, cover, content, author, createdAt }) {
    return (
        <div className="post">
            <div className="image">
                <Link to={`/post/${_id}`}>
                <img src={'http://localhost:4000/' + cover} alt='' style={{ width: '100%', height: '200px' }} />
                </Link>
            </div>
            <div className="texts">
                <Link to={`/post/${_id}`}>
                <h2>{title}</h2>
                </Link>
                <p className="info">
                    {author && <a className="author">{author.username}</a>}
                    
                    {createdAt && <time>{createdAt}</time>}
                </p>
                <p className="summary">{summary}</p>
            </div>
        </div>
    );
}
