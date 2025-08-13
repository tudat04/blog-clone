import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Avatar,
  Divider,
  Grid,
  Card,
  CardContent
} from '@mui/material';
import { Person, Edit, Save, Cancel } from '@mui/icons-material';

const ProfilePage = () => {
  const { user, updateProfile, logout } = useAuth();
  const navigate = useNavigate();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      bio: user?.bio || ''
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      bio: user?.bio || ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await updateProfile(formData);
      setSuccess('Cập nhật thông tin thành công!');
      setIsEditing(false);
    } catch (err) {
      setError(err.message || 'Cập nhật thất bại');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Avatar sx={{ width: 80, height: 80, mr: 3 }}>
              <Person sx={{ fontSize: 40 }} />
            </Avatar>
            <Box>
              <Typography variant="h4" component="h1">
                {user.name || 'Người dùng'}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {user.email}
              </Typography>
            </Box>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}

          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6">Thông tin cá nhân</Typography>
                    {!isEditing ? (
                                              <Button
                          startIcon={<Edit />}
                          onClick={handleEdit}
                          variant="outlined"
                          size="small"
                        >
                          Chỉnh sửa
                        </Button>
                    ) : (
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          startIcon={<Cancel />}
                          onClick={handleCancel}
                          variant="outlined"
                          size="small"
                        >
                          Hủy
                        </Button>
                        <Button
                          startIcon={<Save />}
                          onClick={handleSubmit}
                          variant="contained"
                          size="small"
                          disabled={loading}
                        >
                          {loading ? 'Đang lưu...' : 'Lưu'}
                        </Button>
                      </Box>
                    )}
                  </Box>

                  {isEditing ? (
                    <Box component="form" onSubmit={handleSubmit}>
                      <TextField
                        margin="normal"
                        fullWidth
                        id="name"
                        label="Tên"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        sx={{ mb: 2 }}
                      />
                      
                      <TextField
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        sx={{ mb: 2 }}
                      />

                      <TextField
                        margin="normal"
                        fullWidth
                        id="bio"
                        label="Giới thiệu"
                        name="bio"
                        multiline
                        rows={4}
                        value={formData.bio}
                        onChange={handleChange}
                        sx={{ mb: 2 }}
                      />
                    </Box>
                  ) : (
                    <Box>
                      <Typography variant="body1" sx={{ mb: 2 }}>
                        <strong>Tên:</strong> {user.name || 'Chưa cập nhật'}
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 2 }}>
                        <strong>Email:</strong> {user.email}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Giới thiệu:</strong> {user.bio || 'Chưa cập nhật'}
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Tài khoản
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={handleLogout}
                    sx={{ mb: 2 }}
                  >
                    Đăng xuất
                  </Button>
                  
                  <Typography variant="body2" color="text.secondary">
                    Tham gia từ: {new Date(user.createdAt || Date.now()).toLocaleDateString('vi-VN')}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default ProfilePage;
