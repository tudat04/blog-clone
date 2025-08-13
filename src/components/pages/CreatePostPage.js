import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  OutlinedInput,
  Alert,
  Container,
  Grid,
  Avatar
} from '@mui/material';
import {
  Save as SaveIcon,
  Cancel as CancelIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

const CreatePostPage = () => {
  const { user, addPost } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    visibility: 'public',
    tags: []
  });
  const [newTag, setNewTag] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()]
      });
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.title.trim() || !formData.content.trim()) {
      setError('Vui lòng nhập đầy đủ tiêu đề và nội dung');
      return;
    }

    if (formData.title.trim().length < 5) {
      setError('Tiêu đề phải có ít nhất 5 ký tự');
      return;
    }

    if (formData.content.trim().length < 20) {
      setError('Nội dung phải có ít nhất 20 ký tự');
      return;
    }

    try {
      const newPost = {
        title: formData.title.trim(),
        content: formData.content.trim(),
        excerpt: formData.excerpt.trim(),
        visibility: formData.visibility,
        tags: formData.tags,
        authorId: user.id,
        authorName: user.name
      };

      addPost(newPost);
      setSuccess('Tạo bài viết thành công!');
      
      // Redirect to home page after 2 seconds
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      setError('Có lỗi xảy ra khi tạo bài viết');
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (!user) {
    return null;
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 3 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
              {user.name?.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
                Tạo bài viết mới
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Chia sẻ kiến thức và kinh nghiệm của bạn với cộng đồng
              </Typography>
            </Box>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 3 }}>
              {success}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="title"
                  label="Tiêu đề bài viết"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Nhập tiêu đề bài viết..."
                  sx={{ mb: 2 }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="excerpt"
                  label="Tóm tắt"
                  name="excerpt"
                  multiline
                  rows={3}
                  value={formData.excerpt}
                  onChange={handleChange}
                  placeholder="Nhập tóm tắt bài viết (không bắt buộc)..."
                  sx={{ mb: 2 }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="content"
                  label="Nội dung bài viết"
                  name="content"
                  multiline
                  rows={12}
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="Viết nội dung bài viết của bạn ở đây..."
                  sx={{ mb: 2 }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="visibility-label">Quyền xem</InputLabel>
                  <Select
                    labelId="visibility-label"
                    id="visibility"
                    name="visibility"
                    value={formData.visibility}
                    label="Quyền xem"
                    onChange={handleChange}
                  >
                    <MenuItem value="public">Công khai</MenuItem>
                    <MenuItem value="private">Riêng tư</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box>
                  <Typography variant="subtitle2" gutterBottom>
                    Thêm tags
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                    <TextField
                      size="small"
                      placeholder="Nhập tag..."
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddTag();
                        }
                      }}
                    />
                                         <Button
                       variant="outlined"
                       size="small"
                       onClick={handleAddTag}
                       disabled={!newTag.trim()}
                     >
                       <AddIcon />
                     </Button>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {formData.tags.map((tag, index) => (
                      <Chip
                        key={index}
                        label={tag}
                        onDelete={() => handleRemoveTag(tag)}
                        color="primary"
                        variant="outlined"
                        size="small"
                      />
                    ))}
                  </Box>
                </Box>
              </Grid>
            </Grid>

            <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
                             <Button
                 type="submit"
                 variant="contained"
                 size="large"
                 startIcon={<SaveIcon />}
                 sx={{ 
                   py: 1.5,
                   px: 4,
                   fontSize: '1.1rem',
                   fontWeight: 'bold'
                 }}
               >
                 Tạo bài viết
               </Button>
               
               <Button
                 variant="outlined"
                 size="large"
                 startIcon={<CancelIcon />}
                 onClick={handleCancel}
                 sx={{ 
                   py: 1.5,
                   px: 4,
                   fontSize: '1.1rem'
                 }}
               >
                 Hủy
               </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default CreatePostPage;


