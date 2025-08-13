// App.js
import { Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Components
import BlogLayout from "./components/layout/BlogLayout";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import CreatePostPage from "./components/pages/CreatePostPage";
import EditPostPage from "./components/pages/EditPostPage";
import ProfilePage from "./components/pages/ProfilePage";

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<BlogLayout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="create-post" element={<CreatePostPage />} />
          <Route path="edit-post/:id" element={<EditPostPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
