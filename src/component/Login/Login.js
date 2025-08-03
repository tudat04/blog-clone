// src/component/Login/Login.js
import React from 'react';
import '../../styles.css';
import {useNavigate} from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [usernamePassword, setUsernamePassword] = React.useState({username: "", password: ""});

    function handleLogin() {
        axios.get()
    }

    return (
        <div className="form-page-wrapper">
            <div className="form-container">
                <h2>Đăng nhập</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Mật khẩu</label>
                        <input type="password" id="password" name="password" />
                    </div>
                    <button type="submit" className="form-submit-button">Đăng nhập</button>
                </form>
            </div>
        </div>
    );
};
