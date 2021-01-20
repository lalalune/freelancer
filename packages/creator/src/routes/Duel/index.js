import React, { useState, useEffect } from 'react';
import checkLabel from '../../assets/images/check-label.svg';
import "./style.css";


export default () => {
  const [leftMenu, setLeftMenu]=useState("quick_match");
  const [currentCard, setCurrentCard] = useState(null);

  return (
    <>
      <div className="row">
            <div className="alert error-alert">
              <div className="alert-icon">
                <div className="alert-icon-label">!</div>
              </div>
              <div className="alert-message font-size-14">
                <p className="font-bold">An error was encountered.</p>
                <p>Something went wrong. Please try your request again.</p>
              </div>
            </div>
      </div>
      <div className="row">
            <div className="alert info-alert">
              <div className="alert-icon">
                <div className="alert-icon-label">
                  <img src={checkLabel}></img>
                </div>
              </div>
              <div className="alert-message font-size-14">
                <p className="font-bold">Transaction successful.</p>
                <p>Something went wrong. Please try your request again.</p>
              </div>
            </div>
      </div>
      <div className="row">
            <div className="alert warning-alert">
              <div className="alert-icon">
                <div className="alert-icon-label">...</div>
              </div>
              <div className="alert-message font-size-14">
                <p className="font-bold">Transaction in progress.</p>
                <p>Something went wrong. Please try your request again.</p>
              </div>
            </div>
      </div>
        <div className="container row duel-row">
          <div className="col-2 left-menu">
            <p className={leftMenu==="quick_match"?"activated":""} onClick={()=>setLeftMenu("quick_match")}>Quick Match</p>
            <p className={leftMenu==="join_game"?"activated":""} onClick={()=>setLeftMenu("join_game")}>Join Game</p>
            <p className={leftMenu==="host_game"?"activated":""} onClick={()=>setLeftMenu("host_game")}>Host Game</p>
          </div>
          
          <div className="col-10">
            <p className="">Current Deck:</p>
            <div className="gray-card">
              <div className="gray-card-detail">
                <p>SELECT DECK</p>
              </div>
            </div>
            
            {leftMenu==="quick_match" &&
              <button className="button">CONNECT</button>
            }
            {leftMenu==="join_game" &&
            <div className="duel-right-bottom">
              <p className="font-size-32 font-bold mt-5">ENTER INVITE CODE</p>
              <input type="text"></input>
              <button className="button">CANCEL</button>
            </div>
            }
            {leftMenu==="host_game" &&
              <button className="button">START GAME</button>
            }
          </div>
        </div>
    </>
  )
}
