import '../../../App.css';

export default function EditComment() {
    return (
        <div className="edit-comment">
            <input type="text" defaultValue="Bình luận cần chỉnh sửa" />
            <button className="primary-btn">Cập nhật</button>
        </div>
    );
}