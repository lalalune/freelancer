import React from 'react'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import "./JoinGame.css";

const JoinGame = () => {
    return (
        <div className="join_manu">
            <div className="join_manu_deatil">
                <div className="code_box">
                    <p>ENTER INVITE CODE</p>
                  <div className="code_box_tab">
                    <input type="text"/>
                    <ChevronRightIcon />
                  </div>
                </div>
                <a className="cancel">CANCEL</a>
            </div> 
        </div>
    )
}

export default JoinGame;
