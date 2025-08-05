// component/Home/Content/ViewContent.js
import '../../../styles.css'
export default function ViewContent() {
    return (
        <div className="view-content">
            <h2 className="post-title">Lập trình React từ A đến Z</h2>
            <p className="post-author">Tác giả: Nguyễn Văn A</p>
            <p className="post-content">
                React là thư viện JavaScript phổ biến để xây dựng giao diện người dùng...
            </p>

            <div className="comment-section">
                <h4>Bình luận</h4>

                <div className="comment">
                    <strong>Trần Thị B:</strong> Bài viết rất hữu ích!
                    <div className="comment-actions">
                        <button>Sửa</button> {/* là user đó */}
                        <button>Xóa</button>
                    </div>
                </div>

                <div className="comment">
                    <strong>Nguyễn Văn A:</strong> Cảm ơn bạn!
                    <div className="comment-actions">
                        <button>Xóa</button> {/* là tác giả */}
                    </div>
                </div>

                <textarea placeholder="Viết bình luận..." />
                <button className="comment-button">Gửi</button>
            </div>
        </div>
    );
}
