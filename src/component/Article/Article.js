// src/component/Article/Article.js
import React from 'react';
import '.././../styles.css';

// Khai báo component bằng hàm thông thường
// Các props được truyền vào làm tham số của hàm
export default function Article({ article, isAuthor, onEdit, onDelete, onToggleComment }) {
    return (
        <div className="article-post">
            <h3>{article.title}</h3>
            <div className="author">Tác giả: {article.author}</div>
            <p className="post-content">{article.content}</p>

            <div className="article-actions">
                <button onClick={() => onToggleComment(article.id)} className="action-button comment-button">
                    Hiện/Ẩn Comment
                </button>
                {isAuthor && (
                    <>
                        <button onClick={() => onEdit(article.id)} className="action-button edit-button">
                            Sửa
                        </button>
                        <button onClick={() => onDelete(article.id)} className="action-button delete-button">
                            Xóa
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};