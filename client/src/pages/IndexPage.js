import { useEffect, useState } from "react";
import Post from "../Post";

export default function IndexPage() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/post')
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to fetch posts');
                }
                return res.json();
            })
            .then(posts => {
                setPosts(posts);
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
            });
    }, []);

    return (
        <div className="index-page">
            <h1 className="page-title">Employee list</h1>
            <div className="post-list">
                {posts.length > 0 ? (
                    posts.map(post => <Post key={post.id} {...post} />)
                ) : (
                    <p className="no-posts-message">No Employee available.</p>
                )}
            </div>
        </div>
    );
}
