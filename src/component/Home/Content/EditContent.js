// src/component/Home/Content/EditContent.js
import React from 'react';
import '../../../styles.css';
import AddContent from "./AddContent";

export default function  EditContent () {
    // Giả định có dữ liệu của bài viết cần sửa từ props
    const article = {
        title: "Tiêu đề của bài viết đang sửa",
        content: "Nội dung của bài viết đang sửa..."
    };

    return (
        <div className="form-container">
            <h2>Sửa bài viết</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="title">Tiêu đề</label>
                    <input type="text" id="title" name="title" defaultValue={article.title} />
                </div>
                <div className="form-group">
                    <label htmlFor="content">Nội dung</label>
                    <textarea id="content" name="content" rows="10" defaultValue={article.content}></textarea>
                </div>
                <button type="submit" className="form-submit-button">Cập nhật</button>
            </form>
        </div>
    );
};
