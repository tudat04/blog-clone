// src/component/Register/Register.js
import React from 'react';
import {Link, useNavigate} from "react-router-dom";
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
import {URl_USER} from "../../URL";
import axios from "axios";


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

export default function Register(prop){
    const [user, setUser] = React.useState({name:'', username: "", password: "" });
    const navigate = useNavigate();

    function handleChange(e) {
        setUser({...user, [e.target.name]: e.target.value});
    }

    function register(){
        if(user.username === '' || user.password === '' || user.name === ""){
            return(alert('vui lòng không bỏ trống'))
        }
        axios.get(URl_USER).then((res) => {
            let data = res.data.some((val) => val.username === data.username);
            if(data){
                (alert('trùng tên tài khoản'))
            }else{
                axios.post(URl_USER).then((res) => {
                    alert('tạo tài khoản thành công');
                    navigate('/login');
                })
            }
        })
    }

    return (
        <main>
            <CssVarsProvider {...prop}>
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
                        <Typography level="body-sm">Tạo tài khoản để tiếp tục.</Typography>
                    </div>
                    <FormControl>
                        <FormLabel>Username</FormLabel>
                        <Input
                            type="text" placeholder="Tên đăng nhập" name="name" value={user.name} onChange={handleChange}
                            sx={{height: 40, display: 'flex', alignItems: 'center', '& input': {paddingY: '0 !important', margin: 0,}}}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Username</FormLabel>
                        <Input type="text" placeholder="Tên đăng nhập" name="username" value={user.username} onChange={handleChange}
                            sx={{height: 40, display: 'flex', alignItems: 'center', '& input': {paddingY: '0 !important', margin: 0,}}}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Password</FormLabel>
                        <Input type="password" placeholder="Mật khẩu" name="password" value={user.password} onChange={handleChange}
                            sx={{height: 40, display: 'flex', alignItems: 'center', '& input': {paddingY: '0 !important', margin: 0,}}}
                        />
                    </FormControl>
                    <Button color="success" sx={{ mt: 2 }} onClick={register}>Tạo tài khoản</Button>
                    <Typography endDecorator={<Link to="/login">Đăng Nhập</Link>} sx={{ fontSize: 'sm', alignSelf: 'center' }}> Đã có tài khoản?
                    </Typography>
                </Sheet>
            </CssVarsProvider>
        </main>
    );
}






