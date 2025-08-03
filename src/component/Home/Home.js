// src/component/Home/Home.js
import { Outlet } from 'react-router-dom';
import Header from '../General/Header';
import '../../styles.css';

export default function Home() {
// Quản lý trạng thái đăng nhập
    // Bạn sẽ cần thay thế logic này bằng việc kiểm tra localStorage hoặc context
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Hàm xử lý đăng xuất
    const handleLogout = () => {
        // Xóa token hoặc thông tin người dùng khỏi localStorage
        // Chuyển hướng về trang login
        setIsLoggedIn(false);
    };

    return (
        <div className="home-layout">
            {/* Truyền prop isLoggedIn và hàm onLogout cho Header */}
            <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
            <div className="container">
                <Outlet />
            </div>
        </div>
    );
};
