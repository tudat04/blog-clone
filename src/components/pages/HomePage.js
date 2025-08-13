import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Avatar,
  IconButton,
  TextField,
  InputAdornment,
  Divider,
  Alert
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Comment as CommentIcon,
  Visibility as VisibilityIcon,
  Search as SearchIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

const HomePage = () => {
  const { user, posts, deletePost, addComment } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [commentText, setCommentText] = useState({});
  const [showCommentForm, setShowCommentForm] = useState({});

  // Lọc bài viết dựa trên trạng thái đăng nhập và tìm kiếm
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!user) {
      return post.visibility === 'public' && matchesSearch;
    }
    
    return (post.visibility === 'public' || post.authorId === user.id) && matchesSearch;
  });

  const handleEditPost = (postId) => {
    navigate(`/edit-post/${postId}`);
  };

  const handleDeletePost = (postId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
      deletePost(postId);
    }
  };

  const handleAddComment = (postId) => {
    const comment = commentText[postId];
    if (comment && comment.trim()) {
      addComment(postId, comment.trim());
      setCommentText({ ...commentText, [postId]: '' });
      setShowCommentForm({ ...showCommentForm, [postId]: false });
    }
  };

  const toggleCommentForm = (postId) => {
    setShowCommentForm({ ...showCommentForm, [postId]: !showCommentForm[postId] });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncateContent = (content, maxLength = 200) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <Box>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Chào mừng đến với BlogHub
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          Khám phá những bài viết thú vị và chia sẻ kiến thức của bạn
        </Typography>
        
                 <TextField
           fullWidth
           placeholder="Tìm kiếm bài viết..."
           value={searchTerm}
           onChange={(e) => setSearchTerm(e.target.value)}
           sx={{ maxWidth: 600 }}
           InputProps={{
             startAdornment: (
               <InputAdornment position="start">
                 <SearchIcon />
               </InputAdornment>
             ),
           }}
         />
      </Box>

      {!user && (
        <Alert severity="info" sx={{ mb: 3 }}>
          Bạn chỉ có thể xem các bài viết công khai. <strong>Đăng nhập</strong> để xem tất cả bài viết và tạo bài viết mới!
        </Alert>
      )}

      {filteredPosts.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            {searchTerm ? 'Không tìm thấy bài viết nào phù hợp' : 'Chưa có bài viết nào'}
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredPosts.map((post) => (
            <Grid item xs={12} md={6} lg={4} key={post.id}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4
                  }
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ mr: 1, bgcolor: 'primary.main' }}>
                      {post.authorName?.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        {post.authorName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {formatDate(post.createdAt)}
                      </Typography>
                    </Box>
                  </Box>

                  <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {post.title}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {post.excerpt ? post.excerpt : truncateContent(post.content)}
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                    {post.tags?.map((tag, index) => (
                      <Chip
                        key={index}
                        label={tag}
                        size="small"
                        variant="outlined"
                        color="primary"
                      />
                    ))}
                  </Box>

                                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                     <Chip
                       icon={<VisibilityIcon />}
                       label={post.visibility === 'public' ? 'Công khai' : 'Riêng tư'}
                       size="small"
                       color={post.visibility === 'public' ? 'success' : 'warning'}
                       variant="outlined"
                     />
                     <Chip
                       icon={<CommentIcon />}
                       label={`${post.comments?.length || 0} bình luận`}
                       size="small"
                       variant="outlined"
                     />
                   </Box>
                </CardContent>

                <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                  <Box>
                    {user && post.authorId === user.id && (
                      <>
                                                 <IconButton
                           size="small"
                           onClick={() => handleEditPost(post.id)}
                           color="primary"
                         >
                           <EditIcon />
                         </IconButton>
                         <IconButton
                           size="small"
                           onClick={() => handleDeletePost(post.id)}
                           color="error"
                         >
                           <DeleteIcon />
                         </IconButton>
                      </>
                    )}
                  </Box>

                                     {user && (
                     <Button
                       size="small"
                       startIcon={<CommentIcon />}
                       onClick={() => toggleCommentForm(post.id)}
                     >
                       Bình luận
                     </Button>
                   )}
                </CardActions>

                {/* Comment Form */}
                {showCommentForm[post.id] && user && (
                  <Box sx={{ px: 2, pb: 2 }}>
                    <Divider sx={{ mb: 2 }} />
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <TextField
                        fullWidth
                        size="small"
                        placeholder="Viết bình luận..."
                        value={commentText[post.id] || ''}
                        onChange={(e) => setCommentText({ ...commentText, [post.id]: e.target.value })}
                      />
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleAddComment(post.id)}
                        disabled={!commentText[post.id]?.trim()}
                      >
                        Gửi
                      </Button>
                    </Box>
                  </Box>
                )}

                {/* Comments List */}
                {post.comments && post.comments.length > 0 && (
                  <Box sx={{ px: 2, pb: 2 }}>
                    <Divider sx={{ mb: 2 }} />
                    <Typography variant="subtitle2" gutterBottom>
                      Bình luận ({post.comments.length})
                    </Typography>
                    {post.comments.map((comment) => (
                      <Box key={comment.id} sx={{ mb: 1, p: 1, bgcolor: 'grey.50', borderRadius: 1 }}>
                                                 <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                           <PersonIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                           <Typography variant="caption" color="primary" sx={{ fontWeight: 'bold' }}>
                             {comment.userName}
                           </Typography>
                           <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                             {formatDate(comment.createdAt)}
                           </Typography>
                         </Box>
                        <Typography variant="body2">{comment.content}</Typography>
                      </Box>
                    ))}
                  </Box>
                )}
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default HomePage;


