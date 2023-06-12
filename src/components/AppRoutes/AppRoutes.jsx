import React from 'react';
import {Routes, Route } from 'react-router-dom';
import Home from '../PageContent/Home';
import MyPage from '../PageContent/MyPage';
import WishList from '../PageContent/WishList';
import Calender from '../PageContent/Calender';
import History from '../PageContent/History';
import Setting from '../PageContent/Setting';
import Message from '../PageContent/Message';
import Mission from '../PageContent/Mission';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/mypage" element={<MyPage />}/>
            <Route path="/wishList" element={<WishList />}/>
            <Route path="/calender" element={<Calender />}/>
            <Route path="/history" element={<History />}/>
            <Route path="/message" element={<Message />}/>
            <Route path="/setting" element={<Setting />}/>
            <Route path="/mission" element={<Mission />}/>
        </Routes>
    );
}

