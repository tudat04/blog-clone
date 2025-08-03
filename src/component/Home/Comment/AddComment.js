import '../../../App.css';

export default function AddComment() {
    return (
        <div className="add-comment">
            <input type="text" placeholder="Viết bình luận..." />
            <button className="primary-btn">Gửi</button>
        </div>
    );
}