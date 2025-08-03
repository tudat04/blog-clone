import React from 'react';
import {Routes, Route } from 'react-router-dom';

import Home from './component/Home/Home'; // Home bây giờ là Layout
import Login from './component/Login/Login';
import Register from './component/Register/Register';
import AddContent from './component/Home/Content/AddContent';
import EditContent from './component/Home/Content/EditContent';
import Dashboard from './component/Home/Dashboard'; // Component mới cho nội dung trang chủ
import './styles.css'; // Import CSS chung

function App() {
  return (

        <Routes>
          {/* Tuyến đường chính với Home là layout cha */}
          <Route path="/" element={<Home />}>
            {/* Dashboard sẽ là trang mặc định khi truy cập "/" */}
            <Route index element={<Dashboard />} />
            {/* Các tuyến đường con sẽ render trong <Outlet> của Home */}
            <Route path="add-content" element={<AddContent />} />
            <Route path="edit-content" element={<EditContent />} />
          </Route>

          {/* Các tuyến đường không có layout Home */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
  );
}

export default App;
