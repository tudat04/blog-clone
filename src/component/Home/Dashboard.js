// component/Home/Dashboard.js
import { Card, CardContent, Typography, Button, Stack, Box } from '@mui/joy';

import {useEffect, useMemo, useState} from "react";
import axios from "axios";
import {URl_POST, URl_USER} from "../../URL";
import {useUser} from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";

export default function Dashboard() {
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useUser();
    const navigate = useNavigate();

    function loadData(){
        Promise.all([axios.get(URl_POST), axios.get(URl_USER)])
            .then(([resPost, resUser])=>{
            setPosts(resPost.data);
            setUsers(resUser.data);
        }).finally(() => {
            setLoading(false);
        });
    }


    const visiblePosts = useMemo(() => {
        return user
            ? posts
            : posts.filter(post => post.visibility === 'public');
    }, [posts, user]);



    function getAuthorName(authorId){
        const author = users.find(u => u.id === authorId);
        if(author){
            return author.name;
        }
        else{
            return 'người dùng ẩn danh';
        }
    }

    const handleCreatePost = () => {
        navigate('/add-content');
    };

    function handleDelete(id) {
        if (window.confirm('Bạn có chắc muốn xoá bài viết này?')) {
            axios.delete(`${URl_POST}/${id}`).then(() => {
                setPosts((prev) => prev.filter((p) => p.id !== id));
            });
        }
    }

    useEffect(() => {
        setLoading(true);
        loadData();
    }, [user]);
    if (loading) return <p>Đang tải dữ liệu...</p>;

    return (
        <Box sx={{ backgroundColor: '#e6f4ea', minHeight: '100vh', py: 4 }}>
            <Button onClick={handleCreatePost}
                startDecorator={<span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>＋</span>}
                color="success"
                variant="solid"
                size="lg"
            >
                Tạo bài viết
            </Button>
        <Box sx={{ p: 4 }}>


            <Stack spacing={2}>
                {visiblePosts.map((post) => {
                    const authorName = getAuthorName(post.authorId);
                    return (
                    <Card key={post.id} variant="outlined" sx={{ borderColor: 'green', borderWidth: 2 }}>
                        <CardContent>
                            <Typography level="h2">{post.title}</Typography>
                            <Typography level="body-sm" sx={{ mb: 1 }}>
                                Tác giả: {authorName}  — {post.visibility}
                            </Typography>
                            <Typography level="body-md" sx={{ mb: 2 }}>
                                {post.content}
                            </Typography>
                            {user?.id && String(post.authorId) === String(user.id) && (
                                <Stack direction="row" spacing={1}>
                                    <Button color="primary" onClick={() => navigate(`/edit-content/${post.id}`)}>Sửa</Button>
                                    <Button color="danger" variant="outlined" onClick={() => handleDelete(post.id)}>Xoá</Button>
                                </Stack>)}
                            <Stack direction="row" spacing={3}>
                            <Button  color="primary" onClick={() => navigate(`/edit-post/${post.id}`)}>Xem chi tiết</Button>
                            </Stack>
                        </CardContent>
                    </Card>
                    );
                })}
            </Stack>
        </Box>
        </Box>
    );
}


