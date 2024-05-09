import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { format } from 'date-fns';
import { UserContext } from "../UserContext";

export default function PostPage() {
    const [postInfo, setPostInfo] = useState(null);
    const { userInfo } = useContext(UserContext);
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:4000/post/${id}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to fetch post data');
                }
                return res.json();
            })
            .then(postInfo => {
                setPostInfo(postInfo);
            })
            .catch(error => {
                console.error('Error fetching post data:', error);
            });
    }, [id]);

    const handleDelete = () => {
        fetch(`http://localhost:4000/post/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(res => {
            if (res.ok) {
                window.location.href = '/'; // Redirect to home page after successful deletion
            } else {
                throw new Error('Failed to delete post');
            }
        })
        .catch(error => {
            console.error('Error deleting post:', error);
        });
    };

    if (!postInfo) return null;

    return (
        <div className="post-page">
            <h1 className="post-title">{postInfo.title}</h1>
            <div className="post-meta">
                <time className="post-date">{format(new Date(postInfo.createdAt), "MMMM dd, yyyy")}</time>
                {/* <div className="post-author">by {postInfo.author.username}</div> */}
                {userInfo.id === postInfo.author._id && (
                    <div className="edit-delete-row" style={{ display: 'flex', alignItems: 'center' }}>
    <Link className="edit-btn" to={`/edit/${postInfo._id}`} style={{ textDecoration: 'none', backgroundColor: '#007bff', color: '#fff', borderRadius: '8px', padding: '10px 20px', fontSize: '16px', marginRight: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background-color 0.3s', border: 'none', width: '150px' }}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" style={{ marginRight: '5px' }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
        </svg>
        Edit this Employee
    </Link>
    <button className="delete-btn" onClick={handleDelete} style={{ backgroundColor: '#dc3545', color: '#fff', borderRadius: '8px', padding: '10px 20px', fontSize: '16px', cursor: 'pointer', transition: 'background-color 0.3s', border: 'none', width: '150px' }}>
        Delete this Employee
    </button>
</div>

               
                )}
            </div>
            <div className="post-image">
                <img src={`http://localhost:4000/${postInfo.cover}`} alt="" />
            </div>
            <div className="post-content" dangerouslySetInnerHTML={{ __html: postInfo.content }}></div>
        </div>
    );
}
