import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';

const EditPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, updatePost } = useAuth();
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      // Fetch post data from API or localStorage
      const posts = JSON.parse(localStorage.getItem('posts') || '[]');
      const foundPost = posts.find(p => p.id === id);
      
      if (foundPost) {
        if (foundPost.authorId !== user?.id) {
          setError('Bạn không có quyền chỉnh sửa bài viết này');
          return;
        }
        setPost(foundPost);
        setFormData({
          title: foundPost.title,
          content: foundPost.content,
          excerpt: foundPost.excerpt || ''
        });
      } else {
        setError('Không tìm thấy bài viết');
      }
    } catch (err) {
      setError('Lỗi khi tải bài viết');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      updatePost(id, formData);
      navigate('/');
    } catch (err) {
      setError('Lỗi khi cập nhật bài viết');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !post) {
    return (
      <Container maxWidth="md">
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error && !post) {
    return (
      <Container maxWidth="md">
        <Alert severity="error" sx={{ mt: 8 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Chỉnh sửa bài viết
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Tiêu đề"
              name="title"
              value={formData.title}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            
            <TextField
              margin="normal"
              fullWidth
              id="excerpt"
              label="Tóm tắt"
              name="excerpt"
              multiline
              rows={3}
              value={formData.excerpt}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="content"
              label="Nội dung"
              name="content"
              multiline
              rows={12}
              value={formData.content}
              onChange={handleChange}
              sx={{ mb: 3 }}
            />

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button
                variant="outlined"
                onClick={() => navigate('/')}
                disabled={loading}
              >
                Hủy
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
              >
                {loading ? 'Đang cập nhật...' : 'Cập nhật'}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default EditPostPage;
