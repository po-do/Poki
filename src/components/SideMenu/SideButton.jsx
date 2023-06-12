import React from 'react';
import { NavLink } from 'react-router-dom';
import "./SideButton.css";

export default function SideButton({menuItem,isOpen,setIsLoggedIn}) {

    const handleLogin = () => {
        setIsLoggedIn(true);
    };
    
      const handleLogout = () => {
        setIsLoggedIn(false);
    };
    return <>
        <div className="line">
        {
            menuItem.map((item, index) => (
                <NavLink
                    to={item.path}
                    key={index}
                    className="link"
                    activeClassName="active"
                    onClick={item.name === 'Login' ? handleLogin : handleLogout}
                    >

                    <div className="icon">{item.icon}</div>
                    <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                </NavLink>
            ))
        }
        </div>
    </>
}

