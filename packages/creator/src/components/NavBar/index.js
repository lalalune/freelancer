import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.svg';
import preview from '../../assets/images/preview.png';
import { useAppContext } from "../../libs/contextLib";
import '../../assets/css/navbar.css';

export default () => {
  const { globalState, setGlobalState } = useAppContext();

  return (
    <div className="navbar">
      <div className="container">
        <div className="navbar-menu">
  
            <div className="left-menu-container">
              <Link to="/">
                <img className="logo" src={logo}/>
                <img className="logo" src={logo}/>
              </Link>
            </div>
  
            <div className="secondary-menu">
              <Link className="item logo-string">FREELANCER</Link>
              <Link className="item" to="/assets">Construct</Link>
              {/* <Link className="item" to="/land">Land</Link> */}
              <Link className="item" to="/profiles">Profiles</Link>
              <Link className="item" to="/mint">Create</Link>
              <Link className="item" to="/duel">Duel</Link>
            </div>
  
            <div className="right-menu-container">
              <a className="item" href="https://discord.gg/R5wqYhvv53">Anonymous</a>
            </div>
            <div className="user-logo">
              { globalState.address ?
                <a href={"/profiles/" + globalState.address}>
                  <img className={`accountPicture loggedIn`} src={globalState.avatarPreview ? globalState.avatarPreview.replace(/\.[^.]*$/, '.png') : preview} />
                </a>
              :
                <Link to="/settings">
                  <img className="accountPicture" src={preview} />
                </Link>
              }
            </div>
  
        </div>
      </div>
    </div>
  )
}
