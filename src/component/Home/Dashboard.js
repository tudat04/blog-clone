// src/component/Home/Dashboard.js
import React, { useState } from 'react';
import Article from '../Article/Article';
import Comment from './Comment/Comment';
import '../../styles.css';

// Dữ liệu giả định
const mockArticles = [
    { id: 1, title: 'Bài viết công khai 1', content: 'Nội dung bài viết công khai 1...', author: 'Tác giả A', isPrivate: false },
    { id: 2, title: 'Bài viết công khai 2', content: 'Nội dung bài viết công khai 2...', author: 'Tác giả B', isPrivate: false },
    { id: 3, title: 'Bài viết riêng tư của tôi', content: 'Nội dung bài viết riêng tư của tôi...', author: 'Tôi', isPrivate: true },
];

const mockComments = [
    { id: 1, author: 'Người dùng X', text: 'Đây là bình luận 1.' },
    { id: 2, author: 'Người dùng Y', text: 'Đây là bình luận 2.' },
];

export default function Dashboard () {
    const [showComments, setShowComments] = useState(false);
    const [selectedArticleComments, setSelectedArticleComments] = useState([]);

    const handleToggleComments = (articleId) => {
        // Logic của bạn sẽ lấy comments từ API, ở đây dùng dữ liệu giả định
        if (showComments) {
            setShowComments(false);
            setSelectedArticleComments([]);
        } else {
            setShowComments(true);
            setSelectedArticleComments(mockComments);
        }
    };

    return (
        <div className="dashboard-container">
            <div className="main-content">
                <div className="add-post-section">
                    <input type="text" placeholder="Bạn đang nghĩ gì?" className="add-post-input" />
                    <button className="add-post-button">Đăng bài</button>
                </div>
                {mockArticles.map(article => (
                    <Article
                        key={article.id}
                        article={article}
                        isAuthor={article.author === 'Tôi'} // Giả định
                        onToggleComment={handleToggleComments}
                        onEdit={() => console.log('Sửa bài:', article.id)}
                        onDelete={() => console.log('Xóa bài:', article.id)}
                    />
                ))}
            </div>
            {showComments && (
                <div className="comment-sidebar">
                    <h3>Bình luận</h3>
                    <div className="comment-list">
                        {selectedArticleComments.map(comment => (
                            <Comment key={comment.id} comment={comment} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
