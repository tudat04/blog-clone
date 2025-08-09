import {
    Card, CardContent, Typography, Button, Textarea, List, ListItem, IconButton, Divider
} from '@mui/joy';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '../../../context/AuthContext.js';
import axios from 'axios';
import { URl_POST, URl_USER } from "../../../URL";

export default function EditAndComment() {
    const { id } = useParams();
    const { user } = useUser();

    const [post, setPost] = useState(null);
    const [author, setAuthor] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState('');
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    // Tải bài viết + tác giả
    useEffect(() => {
        axios.get(`${URl_POST}/${id}`)
            .then(res => {
                setPost(res.data);
                setEditedContent(res.data.content);
                setComments(res.data.comments || []);
                return axios.get(`${URl_USER}/${res.data.authorId}`);
            })
            .then(res => setAuthor(res.data))
            .catch(err => console.error('Lỗi khi tải bài viết:', err));
    }, [id]);

    const isOwner = user?.id === post?.authorId;

    // Chuyển chế độ edit
    const handleEditToggle = () => setIsEditing(prev => !prev);

    // Lưu bài viết sau khi edit
    const handleSaveEdit = () => {
        axios.put(`${URl_POST}/${id}`, { ...post, content: editedContent })
            .then(() => {
                setPost(prev => ({ ...prev, content: editedContent }));
                setIsEditing(false);
            })
            .catch(err => console.error('Lỗi khi lưu bài viết:', err));
    };

    // Thêm bình luận
    const handleAddComment = () => {
        if (!user || !newComment.trim()) return;

        const newCmt = {
            id: 'c' + Date.now(),
            userId: user.id,
            userName: user.name,
            content: newComment,
            createdAt: new Date().toISOString()
        };

        const updatedPost = {
            ...post,
            comments: [...comments, newCmt]
        };

        axios.put(`${URl_POST}/${id}`, updatedPost)
            .then(res => {
                setComments(res.data.comments);
                setNewComment('');
            })
            .catch(err => console.error('Lỗi khi thêm bình luận:', err));
    };

    // Xóa bình luận
    const handleDeleteComment = (commentId) => {
        const updatedPost = {
            ...post,
            comments: comments.filter(c => c.id !== commentId)
        };

        axios.put(`${URl_POST}/${id}`, updatedPost)
            .then(res => {
                setComments(res.data.comments);
            })
            .catch(err => console.error('Lỗi khi xóa bình luận:', err));
    };

    if (!post || !author) return <Typography>Đang tải...</Typography>;

    return (
        <Card variant="outlined" sx={{ maxWidth: 800, mx: 'auto', mt: 4, borderColor: '#2e7d32' }}>
            <CardContent>
                <Typography level="h3" sx={{ color: '#2e7d32' }}>{post.title}</Typography>
                <Typography level="body-sm" sx={{ mb: 1 }}>
                    Tác giả: {author.name} | Ngày đăng: {new Date(post.createdAt).toLocaleDateString()}
                </Typography>

                {isEditing ? (
                    <>
                        <Textarea
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                            minRows={4}
                            sx={{ mb: 1 }}
                        />
                        <Button onClick={handleSaveEdit} color="success">Lưu</Button>
                    </>
                ) : (
                    <Typography level="body-md" sx={{ mb: 2 }}>{post.content}</Typography>
                )}

                {isOwner && (
                    <Button variant="soft" onClick={handleEditToggle} sx={{ mt: 1 }}>
                        {isEditing ? 'Hủy' : 'Chỉnh sửa'}
                    </Button>
                )}

                <Divider sx={{ my: 2 }} />
                <Typography level="h4" sx={{ color: '#2e7d32' }}>Bình luận</Typography>
                <List sx={{ mt: 1 }}>
                    {comments.map(comment => (
                        <ListItem key={comment.id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>
                                <Typography level="body-sm">
                                    <strong>{comment.userName || 'Ẩn danh'}</strong>: {comment.content}
                                </Typography>
                                <Typography level="body-xs">{new Date(comment.createdAt).toLocaleString()}</Typography>
                            </div>
                            {(user?.id === comment.userId || isOwner) && (
                                <IconButton
                                    size="sm"
                                    variant="plain"
                                    color="danger"
                                    onClick={() => handleDeleteComment(comment.id)}
                                >
                                    🗑
                                </IconButton>
                            )}
                        </ListItem>
                    ))}
                </List>

                <Textarea
                    placeholder="Thêm bình luận..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    minRows={2}
                    sx={{ mt: 2 }}
                />
                <Button onClick={handleAddComment} sx={{ mt: 1 }} color="success">
                    Thêm bình luận
                </Button>
            </CardContent>
        </Card>
    );
}
