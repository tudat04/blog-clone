// src/component/Register/Register.js
import React from 'react';
import '../../styles.css';

export default function Register () {
    return (
        <div className="form-page-wrapper">
            <div className="form-container">
                <h2>Đăng ký</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="username">Tên người dùng</label>
                        <input type="text" id="username" name="username" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Mật khẩu</label>
                        <input type="password" id="password" name="password" />
                    </div>
                    <button type="submit" className="form-submit-button">Đăng ký</button>
                </form>
            </div>
        </div>
    );
};

