// component/General/Header.js
import '../../styles.css'
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
export default function Header() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const savedUser = localStorage.getItem("currentUser");

        try {
            if (savedUser && savedUser !== "undefined") {
                setUser(JSON.parse(savedUser));
            }
        } catch (error) {
            console.error("Lỗi parse JSON:", error);
            localStorage.removeItem("currentUser"); // dọn dẹp nếu dữ liệu hỏng
        }
    }, []);
    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        setUser(null);
        navigate("/"); // quay về trang chủ
    };

    let authSection;
    if (user) {
        authSection = (
            <div> {user.username}<button className="logout-button" onClick={handleLogout}>
                  Đăng xuất
            </button></div>
        );
    } else {
        authSection = (
            <>
                <Link to="/login" className="auth-link">Đăng nhập</Link>
                <Link to="/register" className="auth-link">Đăng ký</Link>
            </>
        );
    }

    return (
        <header className="main-header">
            <div className="search-box">
                <input type="text" placeholder="🔍 Tìm kiếm bài viết..." />
            </div>

            <div className="user-actions">
                {authSection}
            </div>
        </header>
    );
}