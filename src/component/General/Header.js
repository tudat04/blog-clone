import { Box, Stack, Typography, Button } from '@mui/joy';
import {Link, useNavigate} from 'react-router-dom';
import { useUser } from '../../context/AuthContext';

export default function Header() {
    const navigate = useNavigate();
    const { user, logout } = useUser();


    const handleLogout = () => {
        logout();
        alert('Bạn đã đăng xuất');
        navigate('/');
    };

    return (
        <Box sx={{ backgroundColor: 'success.solidBg', px: 3, py: 2 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" spacing={2} alignItems="center">
                    {user ? (
                        <>
                            <Typography level="body-md">Xin chào, {user.name}</Typography>

                            <Button color="neutral" variant="outlined" size="sm"
                                onClick={() => navigate(`/edit-user/${user.id}`)}
                            >Sửa thông tin
                            </Button>

                            <Button color="danger" onClick={handleLogout}>
                                Đăng xuất
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button color="primary" onClick={() => navigate('/login')}>
                                Đăng nhập
                            </Button>
                            <Button color="neutral" onClick={() => navigate('/register')}>
                                Đăng ký
                            </Button>
                        </>
                    )}
                </Stack>

                <Typography level="h4">
                    <Link to={'/'}>⎇ Blog Xanh </Link>
                </Typography>
            </Stack>
        </Box>
    );
}