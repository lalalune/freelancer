import React from 'react'
import "./HostGame.css";

const HostGame = () => {
    return (
        <div className="host_game">
            <div className="host_game_detail">
                <p>WAITING FOR PLAYERS...</p>
                <p>INVITE CODE:<span> h78a2</span></p>
                <a className="cancel">CANCEL</a>
            </div> 
        </div>
    )
}

export default HostGame;
