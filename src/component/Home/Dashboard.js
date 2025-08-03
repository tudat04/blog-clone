// src/component/Home/Dashboard.js
import React, {useEffect, useState} from 'react';
import '../../styles.css';
import axios from "axios";
import {URl_POST} from "../../URL";

export default function Dashboard () {
    return (
        <div className="dashboard-container">
            {/* Phần chính: Hiển thị các bài viết (70%) */}
            <div className="main-content">
                {/* Phần thêm bài viết */}
                <div className="add-post-section">
                    <input type="text" placeholder="Bạn đang nghĩ gì?" className="add-post-input" />
                    <button className="add-post-button">Đăng bài</button>
                </div>

                {/* Khung bài viết mẫu 1 */}
                <div className="article-post">
                    <h3>Tiêu đề bài viết mẫu 1</h3>
                    <div className="author">Tác giả: Tên tác giả</div>
                    <p className="post-content">
                        Nội dung bài viết mẫu. Đây là một đoạn văn bản tóm tắt nội dung chính của bài viết.
                        Khi có dữ liệu thật, phần này sẽ được lặp lại cho mỗi bài viết.
                    </p>
                    <div className="article-actions">
                        <button className="action-button comment-button">
                            Hiện/Ẩn Comment
                        </button>
                        <button className="action-button edit-button">
                            Sửa
                        </button>
                        <button className="action-button delete-button">
                            Xóa
                        </button>
                    </div>
                </div>

                {/* Khung bài viết mẫu 2 */}
                <div className="article-post">
                    <h3>Tiêu đề bài viết mẫu 2</h3>
                    <div className="author">Tác giả: Tên tác giả</div>
                    <p className="post-content">
                        Đây là bài viết mẫu thứ hai. Mỗi bài viết sẽ có một khung tương tự như thế này.
                        Các nút chức năng sẽ được điều khiển bằng logic React.
                    </p>
                    <div className="article-actions">
                        <button className="action-button comment-button">
                            Hiện/Ẩn Comment
                        </button>
                        <button className="action-button edit-button">
                            Sửa
                        </button>
                        <button className="action-button delete-button">
                            Xóa
                        </button>
                    </div>
                </div>

            </div>

            {/* Sidebar: Hiển thị comments (30%) */}
            <div className="comment-sidebar">
                <h3>Bình luận</h3>
                <div className="comment-list">
                    {/* Khung comment mẫu 1 */}
                    <div className="comment-item">
                        <div className="comment-author">Người dùng A</div>
                        <div className="comment-text">Bình luận mẫu 1.</div>
                    </div>
                    {/* Khung comment mẫu 2 */}
                    <div className="comment-item">
                        <div className="comment-author">Người dùng B</div>
                        <div className="comment-text">Bình luận mẫu 2.</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
