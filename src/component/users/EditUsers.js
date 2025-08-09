import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Stack, Typography, Input, Button, FormControl, FormLabel } from '@mui/joy';
import axios from 'axios';
import { URl_USER } from '../../URL';

export default function EditUsers() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [namePassword, setNamePassword] = useState({ name: '', password: '' });

    // Load thông tin user hiện tại
    useEffect(() => {
        axios.get(`${URl_USER}/${id}`).then(res => {
                setNamePassword({
                    name: res.data.name || '',
                    password: ''
                });
            })
            .catch(err => {
                console.error("Lỗi khi tải dữ liệu:", err);
                alert("Không thể tải thông tin người dùng.");
            });
    }, [id]);

    // Hàm lưu dữ liệu
    function save() {
        const payload = { ...namePassword };
        if (!payload.password.trim()) {
            delete payload.password; // Nếu không nhập mật khẩu mới → không gửi
        }
        axios.put(`${URl_USER}/${id}`, payload).then(() => {
                alert('Đã cập nhật tên và mật khẩu');
                navigate('/');
            })
            .catch((err) => {
                console.error("Lỗi khi cập nhật:", err);
                alert("Cập nhật thất bại.");
            });
    }

    // Cập nhật state khi nhập liệu
    function handleLoad(e) {
        setNamePassword(prev => ({...prev, [e.target.name]: e.target.value.trimStart()}));}

    return (
        <Stack spacing={3} sx={{ maxWidth: 500, mx: 'auto', mt: 4 }}>
            <Typography level="h3" sx={{ color: 'green' }}>Cập nhật thông tin</Typography>
            <Typography level="body-sm" sx={{  color: 'Success', mb: 1 }}> Tên hiện tại: {namePassword.name}</Typography>
            <FormControl>

                <FormLabel sx={{ color: 'green' }}>Tên mới</FormLabel>
                <Input value={namePassword.name} name='name' onChange={handleLoad}
                    sx={{borderColor: 'green', '&:hover': { borderColor: '#66b198' }, '&.Mui-focused': { borderColor: '#66b198' }}}
                />
            </FormControl>

            <FormControl>
                <FormLabel sx={{ color: 'green' }}>Mật khẩu mới</FormLabel>
                <Input type="password" value={namePassword.password} name='password' onChange={handleLoad} placeholder="Để trống nếu không đổi"
                    sx={{borderColor: 'green', '&:hover': { borderColor: '#66b198' }, '&.Mui-focused': { borderColor: '#66b198' }}}/>
            </FormControl>

            <Button
                onClick={save}
                sx={{backgroundColor: 'green', '&:hover': { backgroundColor: '#1b5e20' }, color: 'white'}}>
                Lưu thay đổi
            </Button>
        </Stack>
    );
}
