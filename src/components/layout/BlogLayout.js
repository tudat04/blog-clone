import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Container,
  Chip
} from '@mui/material';
import { AccountCircle, Add as AddIcon, Logout as LogoutIcon } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

const BlogLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    handleClose();
  };

  const handleProfile = () => {
    navigate('/profile');
    handleClose();
  };

  const handleCreatePost = () => {
    navigate('/create-post');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" elevation={1}>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Typography
              variant="h5"
              component="div"
              sx={{ 
                flexGrow: 1, 
                cursor: 'pointer',
                fontWeight: 'bold',
                color: 'white'
              }}
              onClick={() => navigate('/')}
            >
              BlogHub
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {!user ? (
                <>
                  <Button
                    color="inherit"
                    onClick={() => navigate('/login')}
                    sx={{
                      color: 'white',
                      border: isActive('/login') ? '2px solid white' : 'none',
                      borderRadius: 2
                    }}
                  >
                    Đăng nhập
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => navigate('/register')}
                    sx={{
                      backgroundColor: 'white',
                      color: 'primary.main',
                      '&:hover': {
                        backgroundColor: '#f5f5f5'
                      }
                    }}
                  >
                    Đăng ký
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleCreatePost}
                    sx={{
                      backgroundColor: 'white',
                      color: 'primary.main',
                      '&:hover': {
                        backgroundColor: '#f5f5f5'
                      }
                    }}
                  >
                    Tạo bài viết
                  </Button>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip
                      label={user.name}
                      size="small"
                      sx={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}
                    />
                    <IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleMenu}
                      color="inherit"
                    >
                      <Avatar
                        sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}
                      >
                        {user.name?.charAt(0)}
                      </Avatar>
                    </IconButton>
                  </Box>

                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleProfile}>
                      <AccountCircle sx={{ mr: 1 }} />
                      Thông tin cá nhân
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <LogoutIcon sx={{ mr: 1 }} />
                      Đăng xuất
                    </MenuItem>
                  </Menu>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Box component="main" sx={{ flexGrow: 1, py: 3 }}>
        <Container maxWidth="lg">
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};

export default BlogLayout;


