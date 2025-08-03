// src/component/General/Header.js
import React from 'react';
import '../../styles.css';

export default function Header (){
    return (
        <div className="header">
            <div className="header-left">
                <input type="text" placeholder="Tìm kiếm bài viết..." className="search-bar" />
            </div>
            <div className="header-right">
                {/* Nút này sẽ được hiện khi đã đăng nhập */}
                <button className="logout-button">Đăng xuất</button>
                {/* Hoặc các nút Login/Register khi chưa đăng nhập */}
                {/* <button className="logout-button">Đăng nhập</button>
        <button className="logout-button">Đăng ký</button> */}
            </div>
        </div>
    );
};
