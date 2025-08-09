import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Stack, Typography, Input, Button, FormControl, FormLabel } from '@mui/joy';
import axios from 'axios';
import { URl_USER } from '../../URL';

export default function EditUsers() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [namePassword, setNamePassword] = useState({ name: '', password: '' });

    useEffect(() => {
        axios.get(`${URl_USER}/${id}`).then(res => {
                setNamePassword({name: res.data.name || '', password: ''});
            }).catch(err => {console.error("Lỗi khi tải dữ liệu:", err);
                alert("Không thể tải thông tin người dùng.");
            });
    }, [id]);


    // Hàm lưu dữ liệu
    function save() {
        const payload = { ...namePassword };
        if (!payload.password.trim()) {
            delete payload.password;
        }
        axios.patch(`${URl_USER}/${id}`, payload).then(() => {
                alert('Đã cập nhật tên và mật khẩu');
                navigate('/');
            })
            .catch((err) => {
                console.error("Lỗi khi cập nhật:", err);
                alert("Cập nhật thất bại.");
            });
    }

    function handleLoad(e) {
        setNamePassword(prev => ({...prev, [e.target.name]: e.target.value.trimStart()}));}

    return (
        <Stack spacing={3} sx={{ maxWidth: 500, mx: 'auto', mt: 4 }}>
            <Typography level="h3" sx={{ color: '66b198' }}>Cập nhật thông tin</Typography>
            <Typography level="body-sm" sx={{  color: '66b198', mb: 1 }}> Tên hiện tại: {namePassword.name}</Typography>
            <FormControl>

                <FormLabel sx={{ color: 'green' }}>Tên mới</FormLabel>
                <Input value={namePassword.name} name='name' onChange={handleLoad}
                    sx={{borderColor: '66b198', '&:hover': { borderColor: '#66b198' }, '&.Mui-focused': { borderColor: '#81f181' }}}
                />
            </FormControl>

            <FormControl>
                <FormLabel sx={{ color: 'green' }}>Mật khẩu mới</FormLabel>
                <Input type="password" value={namePassword.password} name='password' onChange={handleLoad} placeholder="Để trống nếu không đổi"
                    sx={{borderColor: '66b198', '&:hover': { borderColor: '#66b198' }, '&.Mui-focused': { borderColor: '#81f181' }}}/>
            </FormControl>

            <Button
                onClick={save}
                sx={{backgroundColor: '#66b198', '&:hover': { backgroundColor: '#264526' }, color: 'white'}}>
                Lưu thay đổi
            </Button>
        </Stack>
    );
}
