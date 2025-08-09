import { useUser } from '../../../context/AuthContext.js';
import {useEffect, useState} from 'react';
import {Stack, Input, Textarea, Button, Typography, Select, Option, FormControl, FormLabel,} from '@mui/joy';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {URl_POST} from "../../../URL";

export default function AddContent() {
    const { user } = useUser();
    const navigate = useNavigate();

    const [posts, setPosts] = useState({title:'',content:'',authorId:'',visibility:''});

    useEffect(() => {
        if (user?.id) {
            setPosts((prev) => ({ ...prev, authorId: user.id }));
        }
    }, [user]);


    function handleLoad(e){
        setPosts({...posts, [e.target.name]: e.target.value});
    }

    function addPost(){
        axios.post(URl_POST, posts).then((res) => {
            alert('đăng bài thành công')
            navigate('/')
        })
    }

    return (
        <Stack spacing={3} sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
            <Typography level="h3">📝 Tạo bài viết mới</Typography>

            <FormControl>
                <FormLabel>Tiêu đề</FormLabel>
                <Input placeholder="Nhập tiêu đề bài viết" value={posts.title} name={'title'} onChange={handleLoad}
                />
            </FormControl>

            <FormControl>
                <FormLabel>Tác giả</FormLabel>
                <Input
                    value={user?.name || 'Ẩn danh'} disabled
                />
            </FormControl>

            <FormControl>
                <FormLabel>Chế độ hiển thị</FormLabel>
                <Select
                    value={posts.visibility}
                    name="visibility"
                    onChange={(event, newValue) =>
                        setPosts({ ...posts, visibility: newValue })
                    }
                >
                    <Option value="public">Công khai</Option>
                    <Option value="private">Riêng tư</Option>
                </Select>
            </FormControl>


            <FormControl>
                <FormLabel>Nội dung</FormLabel>
                <Textarea
                    placeholder="Viết nội dung bài viết..."
                    minRows={6}
                    value={posts.content}
                    name={'content'}
                    onChange={handleLoad}
                />
            </FormControl>

            <Button onClick={addPost} color="success" size="lg">
                Đăng bài
            </Button>
        </Stack>
    );
}