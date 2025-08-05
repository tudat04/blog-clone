// src/component/Home/Content/AddContent.js
import React from 'react';
import '../../../styles.css';

// component/Home/Content/AddContent.js
export default function AddContent() {
    return (
        <div className="add-content-form">
            <h2>Tạo bài viết mới</h2>
            <input type="text" placeholder="Tiêu đề" />
            <textarea placeholder="Nội dung bài viết..." rows="6" />
            <select>
                <option value="public">Công khai</option>
                <option value="private">Riêng tư</option>
            </select>
            <button className="submit-button">Đăng bài</button>
        </div>
    );
}

