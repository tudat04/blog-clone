// src/component/Login/Login.js
import React, {useState} from 'react';
import '@mui/material/styles';
import {useNavigate} from "react-router-dom";
import { Link } from "react-router-dom";
import {URl_USER} from "../../URL";
import axios from "axios";

import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import CssBaseline from '@mui/joy/CssBaseline';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

function ModeToggle() {
    const { mode, setMode } = useColorScheme();
    const [mounted, setMounted] = React.useState(false);

    // necessary for server-side rendering
    // because mode is undefined on the server
    React.useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted) {
        return <Button variant="soft">Change mode</Button>;
    }

    return (
        <Select
            variant="soft"
            value={mode}
            onChange={(event, newMode) => {
                setMode(newMode);
            }}
            sx={{ width: 'max-content' }}
        >
            <Option value="system">System</Option>
            <Option value="light">Light</Option>
            <Option value="dark">Dark</Option>
        </Select>
    );
}

export default function Login(props) {
    const [usernamePassword, setUsernamePassword] = useState({ username: "", password: "" });
    const navigate = useNavigate();

    function handleChange(e) {
        setUsernamePassword({ ...usernamePassword, [e.target.name]: e.target.value });
    }

    function login() {
        if(usernamePassword.username === '' || usernamePassword.password === ''){
            return(alert('vui lòng không bỏ trống'))
        }
        axios.get(URl_USER).then((res) => {
            const database = res.data;
            const found = database.find(u =>
                u.username === usernamePassword.username &&
                u.password === usernamePassword.password
            );
            if (found) {
                alert("Đăng nhập thành công");
                localStorage.setItem("currentUser", JSON.stringify(found));
                navigate('/');
            } else {
                alert("Sai tài khoản hoặc mật khẩu");
            }
        });
    }
    return (
        <main>
            <CssVarsProvider {...props}>
                <ModeToggle />
                <CssBaseline />
                <Sheet
                    sx={{
                        width: 300,
                        mx: 'auto',
                        my: 4,
                        py: 3,
                        px: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        borderRadius: 'sm',
                        boxShadow: 'md',
                        backgroundColor: '#e6f4ea', //
                    }}
                    variant="outlined"
                >
                    <div>
                        <Typography level="h4" component="h1">
                            <b>Welcome!</b>
                        </Typography>
                        <Typography level="body-sm">Đăng nhập để tiếp tục.</Typography>
                    </div>
                    <FormControl>
                        <FormLabel>Username</FormLabel>
                        <Input
                            type="text"
                            placeholder="Tên đăng nhập"
                            name="username"
                            value={usernamePassword.username}
                            onChange={handleChange}
                            sx={{height: 40, display: 'flex', alignItems: 'center', '& input': {paddingY: '0 !important', margin: 0,}}}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Password</FormLabel>
                        <Input
                            type="password"
                            placeholder="Mật khẩu"
                            name="password"
                            value={usernamePassword.password}
                            onChange={handleChange}
                            sx={{height: 40, display: 'flex', alignItems: 'center', '& input': {paddingY: '0 !important', margin: 0,}}}
                        />
                    </FormControl>
                    <Button color="success" sx={{ mt: 2 }} onClick={login}>Đăng Nhập</Button>
                    <Typography
                        endDecorator={<Link to="/register">Tạo tài khoản</Link>}
                        sx={{ fontSize: 'sm', alignSelf: 'center' }}
                    >
                        Chưa có tài khoản?
                    </Typography>
                </Sheet>
            </CssVarsProvider>
        </main>
    );
}
