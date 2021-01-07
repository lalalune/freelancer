import React from 'react';
import {
    Link,
 } from "react-router-dom";

import "./ManiMenu.css";

const ManiMenu = () => {
    return (
        <div className="main_menu">
            <div className="main_menu_detail">
                <Link to="join">JOIN GAME</Link>
                <Link to="hostgame">HOST GAME</Link>
                <Link to="quickmatch">QUICK MATCH</Link>
            </div> 
        </div>
    )
}

export default ManiMenu;
