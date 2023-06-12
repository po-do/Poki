import React, { useEffect, useState } from 'react';
import { Badge, Drawer, Space } from "antd";
import {FaUserAlt, FaBell} from 'react-icons/fa';
import "./AppHeader.css";

export default function AppHeader() {
    // 알람의 갯수
    const [orders, setOrders] = useState(0);
    // 온 알람 목록
    const [commentsOpen, setCommentsOpen] = useState(false);
    // 더미 데이터 받아오기
    const getOrders = () => {
      return fetch('https://dummyjson.com/comments')
        .then(res => res.json())
        .then(data => data);
    }
    //알람 갯수 확인
    useEffect(() => {
      getOrders().then((res) => {
        setOrders(res.total); 
      });
    }, []);

    return (
        <div className='AppHeader'>
            <Space>
                <div className='banner-icon'>
                    <Badge count={orders}>
                        <FaBell style={{fontSize: 30, cursor: 'pointer'}} onClick={()=>{
                            setCommentsOpen(true);
                        }}/>
                    </Badge>
                </div>
                <a href="mypage">
                    <FaUserAlt style={{fontSize: 30, color: "black"}} />            
                </a>
            </Space>
            <Drawer title="Alarms" open={commentsOpen} onClose={()=>{
                setCommentsOpen(false);
            }} maskClosable/>
        </div>
    );
}

