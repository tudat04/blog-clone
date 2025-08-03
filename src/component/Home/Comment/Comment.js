// src/component/Comment/Comment.js
import React from 'react';
import '../../../styles.css';

export default function Comment ({ comment }){
    return (
        <div className="comment-item">
            <div className="comment-author">{comment.author}</div>
            <div className="comment-text">{comment.text}</div>
        </div>
    );
};
