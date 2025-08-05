// component/Home/Dashboard.js
import { Link } from "react-router-dom";
import { Card, CardContent, Typography, Button, Stack, Box } from '@mui/joy';
import '../../styles.css'
import {useEffect, useState} from "react";
import axios from "axios";
import {URl_POST, URl_USER} from "../../URL";

export default function Dashboard() {
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    function loadData(){
        Promise.all([axios.get(URl_POST), axios.get(URl_USER)])
            .then(([resPost, resUser])=>{
            setPosts(resPost.data);
            setUsers(resUser.data);
        });
    }

    function filterPost(posts){
        if(!currentUser){
            return posts.visibility === 'public'
        }
    }

    function getAuthorName(authorId){
        const author = users.find(u => u.id === authorId);
        if(author){
            return author.name;
        }
        else{
            return 'người dùng ẩn danh';
        }
    }

    useEffect(()=>{loadData()
    },[])

    return (
        <Box sx={{ backgroundColor: '#e6f4ea', minHeight: '100vh', py: 4 }}>
        <Box sx={{ p: 4 }}>
            <Stack spacing={2}>
                {posts.map((post) => {
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
                            <Stack direction="row" spacing={1}>
                                <Button color="primary">Sửa</Button>
                                <Button color="danger" variant="outlined">Xoá</Button>
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


