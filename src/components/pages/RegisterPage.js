import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
  Alert,
  Avatar,
  Container,
  InputAdornment,
  IconButton,
  Grid
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  PersonAdd as PersonAddIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Lock as LockIcon
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

const RegisterPage = () => {
  const { users, addUser } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
    setSuccess('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!formData.name || !formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }

    if (formData.password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    // Check if username already exists
    const existingUser = users.find(u => u.username === formData.username);
    if (existingUser) {
      setError('Tên đăng nhập đã tồn tại');
      return;
    }

    // Check if email already exists
    const existingEmail = users.find(u => u.email === formData.email);
    if (existingEmail) {
      setError('Email đã được sử dụng');
      return;
    }

    // Create new user
    const newUser = {
      id: `u${Date.now()}`,
      name: formData.name,
      username: formData.username,
      email: formData.email,
      password: formData.password,
      avatar: `https://via.placeholder.com/150/${Math.floor(Math.random()*16777215).toString(16)}/FFFFFF?text=${formData.name.charAt(0)}`
    };

    // Add user to the system (in real app, this would be an API call)
    addUser(newUser);
    
    setSuccess('Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.');
    
    // Clear form
    setFormData({
      name: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    });

    // Redirect to login after 2 seconds
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            borderRadius: 2
          }}
        >
                     <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 56, height: 56 }}>
             <PersonAddIcon sx={{ fontSize: 32 }} />
           </Avatar>
          
          <Typography component="h1" variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
            Đăng ký
          </Typography>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3, textAlign: 'center' }}>
            Tạo tài khoản mới để tham gia BlogHub và chia sẻ kiến thức của bạn
          </Typography>

          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ width: '100%', mb: 2 }}>
              {success}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <Grid container spacing={2}>
                             <Grid item xs={12}>
                 <TextField
                   required
                   fullWidth
                   id="name"
                   label="Họ và tên"
                   name="name"
                   autoComplete="name"
                   value={formData.name}
                   onChange={handleChange}
                   InputProps={{
                     startAdornment: (
                       <InputAdornment position="start">
                         <PersonIcon color="action" />
                       </InputAdornment>
                     ),
                   }}
                 />
               </Grid>
              
                             <Grid item xs={12}>
                 <TextField
                   required
                   fullWidth
                   id="username"
                   label="Tên đăng nhập"
                   name="username"
                   autoComplete="username"
                   value={formData.username}
                   onChange={handleChange}
                   InputProps={{
                     startAdornment: (
                       <InputAdornment position="start">
                         <PersonIcon color="action" />
                       </InputAdornment>
                     ),
                   }}
                 />
               </Grid>
              
                             <Grid item xs={12}>
                 <TextField
                   required
                   fullWidth
                   id="email"
                   label="Email"
                   name="email"
                   type="email"
                   autoComplete="email"
                   value={formData.email}
                   onChange={handleChange}
                   InputProps={{
                     startAdornment: (
                       <InputAdornment position="start">
                         <EmailIcon color="action" />
                       </InputAdornment>
                     ),
                   }}
                 />
               </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Mật khẩu"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                                                          InputProps={{
                       startAdornment: (
                         <InputAdornment position="start">
                           <LockIcon color="action" />
                         </InputAdornment>
                       ),
                       endAdornment: (
                         <InputAdornment position="end">
                           <IconButton
                             aria-label="toggle password visibility"
                             onClick={handleTogglePasswordVisibility}
                             edge="end"
                           >
                             {showPassword ? <VisibilityOff /> : <Visibility />}
                           </IconButton>
                         </InputAdornment>
                       ),
                     }}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Xác nhận mật khẩu"
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                                                          InputProps={{
                       startAdornment: (
                         <InputAdornment position="start">
                           <LockIcon color="action" />
                         </InputAdornment>
                       ),
                       endAdornment: (
                         <InputAdornment position="end">
                           <IconButton
                             aria-label="toggle confirm password visibility"
                             onClick={handleToggleConfirmPasswordVisibility}
                             edge="end"
                           >
                             {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                           </IconButton>
                         </InputAdornment>
                       ),
                     }}
                />
              </Grid>
            </Grid>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ 
                mt: 3, 
                mb: 2,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 'bold'
              }}
            >
              Đăng ký
            </Button>
            
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Đã có tài khoản?{' '}
                <Link component={RouterLink} to="/login" variant="body2" sx={{ fontWeight: 'bold' }}>
                  Đăng nhập ngay
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default RegisterPage;


