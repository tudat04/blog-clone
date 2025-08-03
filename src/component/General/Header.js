// src/component/General/Header.js
import React, {useEffect, useState} from 'react';
import '../../styles.css';
import {Link, useNavigate} from "react-router-dom";

export default function Header (){
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        navigate('/login');
    };

    // Khai báo một biến để lưu trữ các nút cần render
    let actionButtons;

    if (isLoggedIn) {
        // Nếu đã đăng nhập, gán các nút Đăng xuất và Sửa thông tin
        actionButtons = (
            <>
                <button className="user-profile-button">
                    Sửa thông tin
                </button>
                <button onClick={handleLogout} className="logout-button">
                    Đăng xuất
                </button>
            </>
        );
    } else {
        // Nếu chưa đăng nhập, gán các nút Đăng nhập và Đăng ký
        actionButtons = (
            <>
                <Link to="/login" className="login-button">
                    <button className="action-button">Đăng nhập</button>
                </Link>
                <Link to="/register" className="register-button">
                    <button className="action-button">Đăng ký</button>
                </Link>
            </>
        );
    }

    return (
        <div className="header">
            <div className="header-left">
                <input type="text" placeholder="Tìm kiếm bài viết..." className="search-bar" />
            </div>
            <div className="header-right">
                {/* Sử dụng biến đã được gán giá trị */}
                {actionButtons}
            </div>
        </div>
    )
}