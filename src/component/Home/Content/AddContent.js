// src/component/Home/Content/AddContent.js
import React from 'react';
import '../../../styles.css';

export default function AddContent() {
    return (
        <div className="form-container">
            <h2>Tạo bài viết mới</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="title">Tiêu đề</label>
                    <input type="text" id="title" name="title" />
                </div>
                <div className="form-group">
                    <label htmlFor="content">Nội dung</label>
                    <textarea id="content" name="content" rows="10"></textarea>
                </div>
                <button type="submit" className="form-submit-button">Đăng bài</button>
            </form>
        </div>
    );
};
