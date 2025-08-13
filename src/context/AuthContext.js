
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Load data from localStorage
        const savedUser = localStorage.getItem("currentUser");
        if (savedUser && savedUser !== "undefined") {
            setUser(JSON.parse(savedUser));
        }

        // Load posts and users from localStorage or data.json
        loadData();
    }, []);

    const loadData = async () => {
        try {
            // First try to load from localStorage
            const savedPosts = localStorage.getItem('posts');
            const savedUsers = localStorage.getItem('users');
            
            if (savedPosts && savedUsers) {
                setPosts(JSON.parse(savedPosts));
                setUsers(JSON.parse(savedUsers));
            } else {
                // If no localStorage data, load from data.json
                const response = await fetch('/data.json');
                const data = await response.json();
                
                // Save to localStorage for future use
                localStorage.setItem('posts', JSON.stringify(data.posts || []));
                localStorage.setItem('users', JSON.stringify(data.users || []));
                
                setPosts(data.posts || []);
                setUsers(data.users || []);
            }
        } catch (error) {
            console.error('Error loading data:', error);
            // Fallback to empty arrays
            setPosts([]);
            setUsers([]);
        }
    };

    const login = async (email, password) => {
        // Simulate API call for authentication
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);
        
        if (!user) {
            throw new Error('Email hoặc mật khẩu không đúng');
        }
        
        const { password: _, ...userWithoutPassword } = user;
        localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword));
        setUser(userWithoutPassword);
    };

    const logout = () => {
        localStorage.removeItem("currentUser");
        setUser(null);
    };

    const addPost = (newPost) => {
        const post = {
            ...newPost,
            id: `p${Date.now()}`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            comments: []
        };
        const updatedPosts = [post, ...posts];
        setPosts(updatedPosts);
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
        return post;
    };

    const updatePost = (postId, updatedData) => {
        const updatedPosts = posts.map(post => 
            post.id === postId 
                ? { ...post, ...updatedData, updatedAt: new Date().toISOString() }
                : post
        );
        setPosts(updatedPosts);
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
    };

    const deletePost = (postId) => {
        const updatedPosts = posts.filter(post => post.id !== postId);
        setPosts(updatedPosts);
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
    };

    const addComment = (postId, comment) => {
        const newComment = {
            id: `c${Date.now()}`,
            userId: user.id,
            userName: user.name,
            content: comment,
            createdAt: new Date().toISOString()
        };

        const updatedPosts = posts.map(post => 
            post.id === postId 
                ? { ...post, comments: [...post.comments, newComment] }
                : post
        );
        setPosts(updatedPosts);
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
    };

    const addUser = (newUser) => {
        const updatedUsers = [...users, newUser];
        setUsers(updatedUsers);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
    };

    const updateUser = (userId, updatedData) => {
        const updatedUsers = users.map(u => 
            u.id === userId ? { ...u, ...updatedData } : u
        );
        setUsers(updatedUsers);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        
        // Update current user if it's the same user
        if (user && user.id === userId) {
            const updatedUser = { ...user, ...updatedData };
            setUser(updatedUser);
            localStorage.setItem("currentUser", JSON.stringify(updatedUser));
        }
    };

    const updateProfile = async (profileData) => {
        if (!user) {
            throw new Error('Bạn chưa đăng nhập');
        }
        
        const updatedUser = { ...user, ...profileData };
        setUser(updatedUser);
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));
        
        // Update in users array
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const updatedUsers = users.map(u => 
            u.id === user.id ? { ...u, ...profileData } : u
        );
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        setUsers(updatedUsers);
    };

    const getPublicPosts = () => posts.filter(post => post.visibility === 'public');
    
    const getUserPosts = (userId) => posts.filter(post => post.authorId === userId);
    
    const getCurrentUserPosts = () => user ? getUserPosts(user.id) : [];

            return (
        <AuthContext.Provider value={{ 
            user, 
            posts, 
            users,
            login, 
            logout, 
            addPost, 
            updatePost, 
            deletePost, 
            addComment,
            addUser,
            updateUser,
            updateProfile,
            getPublicPosts,
            getUserPosts,
            getCurrentUserPosts,
            loadData
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);