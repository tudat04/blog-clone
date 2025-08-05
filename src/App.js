// App.js
import { Routes, Route } from "react-router-dom";
import Home from "./component/Home/Home";
import Login from "./component/Login/Login";
import Register from "./component/Register/Register";
import AddContent from "./component/Home/Content/AddContent";
import EditContent from "./component/Home/Content/EditContent";
import ViewContent from "./component/Home/Content/ViewContent";
import Dashboard from "./component/Home/Dashboard";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />}>
                <Route index element={<Dashboard />} />
                <Route path="add-content" element={<AddContent />} />
                <Route path="edit-content/:id" element={<EditContent />} />
                <Route path="view/:id" element={<ViewContent />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    );
}

export default App;
