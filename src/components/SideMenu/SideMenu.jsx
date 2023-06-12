import React, { useState } from 'react';
import "./SideMenu.css";
import ChildList from './ChildList';
import SideButton from './SideButton';
import Profile from './Profile';

import {
  FaHome,
  FaBars,
  FaUserAlt,
  FaShoppingBasket,
  FaRegCalendarAlt,
  FaHistory,
  FaComment,
  FaCog,
  FaSignOutAlt,
  FaBookReader
} from 'react-icons/fa';


export default function SideMenu() {
    const [isOpen, setIsOpen] = useState(true);
    const menuBar = () => setIsOpen(!isOpen);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const menuTop = ([
        {
            path: "/",
            name: "Home",
            icon: <FaHome />
        },
        {
            path: "/mission",
            name: "미션관리",
            icon: <FaBookReader />
        },
        {
            path: "/wishList",
            name: "위시리스트",
            icon: <FaShoppingBasket />
        },
        {
            path: "/calender",
            name: "캘린더",
            icon: <FaRegCalendarAlt />
        },
        {
            path: "/message",
            name: "메세지",
            icon: <FaComment />
        },
        {
            path: "/history",
            name: "기록",
            icon: <FaHistory />
        }
    ]);
    
    const menuBottom = ([
        {
            path: "/mypage",
            name: "마이페이지",
            icon: <FaUserAlt />
        },
        {
            path: "/setting",
            name: "설정",
            icon: <FaCog />
        },
        {
            path: "/login",
            name: isLoggedIn ? 'Logout' : 'Login',
            icon: <FaSignOutAlt />
        }
    ]);

  return (
    <>
        <div style={{width: isOpen ? "250px" : "80px"}} className="sideBar">
            <div>

                <div className="topSection">
                    <div style={{display: isOpen ? "block" : "none"}} >
                        <img
                            width="50"
                            src="https://cdn-icons-png.flaticon.com/512/2431/2431996.png"
                            alt="" /> 
                    </div>
                    <div style={{display: isOpen ? "block" : "none"}} className='logo'>Poki</div>
                    <div style={{marginLeft : isOpen ? "15px" : "10px"}} className="bars">
                        <FaBars onClick={menuBar}/>
                    </div>
                </div>

                <ChildList isOpen={isOpen} />
                <SideButton menuItem={menuTop} isOpen={isOpen} setIsLoggedIn={setIsLoggedIn}/>
            </div>

            <div>
                <SideButton menuItem={menuBottom} isOpen={isOpen} setIsLoggedIn={setIsLoggedIn}/>
                {isLoggedIn && ( <Profile /> )}
            </div>
            
        </div>
    </>
  );
}
