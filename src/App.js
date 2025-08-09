// App.js
import { Routes, Route } from "react-router-dom";
import Home from "./component/Home/Home";
import Login from "./component/Login/Login";
import Register from "./component/Register/Register";
import AddContent from "./component/Home/Content/AddContent";
import Dashboard from "./component/Home/Dashboard";
import EditUsers from "./component/users/EditUsers";
import EditAndComment from "./component/Home/Content/EditAndComment";

function App() {
    return (

        <Routes>
            <Route path="/" element={<Home />}>
                <Route index element={<Dashboard />} />
                <Route path="add-content" element={<AddContent />} />
                <Route path="edit-user/:id" element={<EditUsers />} />
                <Route path="edit-post/:id" element={<EditAndComment />} />

            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    );
}

export default App;
