import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

export default function Post({_id, title, summary, cover, content, author, createdAt }) {
    return (
        <div className="post" style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', padding: '20px', marginBottom: '30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div className="image" style={{ flex: '1', marginRight: '20px' }}>
                <Link to={`/post/${_id}`}>
                    <img src={'http://localhost:4000/' + cover} alt='' style={{ width: '100%', height: '200px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }} />
                </Link>
            </div>
            <div className="texts" style={{ flex: '2' }}>
                <Link to={`/post/${_id}`}>
                    <h2 style={{ color: '#007bff', marginBottom: '10px', fontSize: '1.5rem' }}>{title}</h2>
                </Link>
                <p className="info" style={{ color: '#777', marginBottom: '10px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                <> create by </>
                    {author && <span className="author" style={{ color: '#555' }}>{author.username} </span>}
                    <> at </>
                    {createdAt && <time style={{ color: '#777' }}>{format(new Date(createdAt), "MMMM dd, yyyy")}</time>}
                </p>
                <p className="summary" style={{ color: '#555', lineHeight: '1.5', marginBottom: '10px' }}>{summary}</p>
                <Link to={`/post/${_id}`} style={{ textDecoration: 'none' }}>
                    <button className="button" style={{ backgroundColor: '#4CAF50', color: '#fff', borderRadius: '8px', padding: '10px 20px', fontSize: '16px', cursor: 'pointer', transition: 'background-color 0.3s', border: 'none' }}>Read More</button>
                </Link>
            </div>
        </div>
    );
}
