import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.svg';
import preview from '../../assets/images/preview.png';
import settingIcon from '../../assets/images/settingIcon.svg';
import discordLogin from '../../assets/images/discord-login.png';
import { useAppContext } from "../../libs/contextLib";
import '../../assets/css/navbar.css';
import Modal from 'react-bootstrap/Modal'
import "./style.css";
import { discordOauthUrl } from '../../webaverse/constants';

export default () => {
  const { globalState, setGlobalState } = useAppContext();
  const [show, setShow] = useState(false);
  const [tempLogin, setTempLogin] = useState(false)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log("globalState", globalState);

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
              <a className="item" href="#">Anonymous</a>
              {/* https://discord.gg/R5wqYhvv53">Anonymous</a> */}
            </div>
            <div className="user-logo">
              {/* { globalState.address ?
                <a href={"/profiles/" + globalState.address}>
                  <img className={`accountPicture loggedIn`} src={globalState.avatarPreview ? globalState.avatarPreview.replace(/\.[^.]*$/, '.png') : preview} />
                </a>
              : */}
                <div onClick={handleShow}>
                  <img className="accountPicture" src={preview} />
                </div>
              {/* } */}
            </div>
  
        </div>
      </div>
      <Modal show={show} onHide={handleClose} className="right-top-modal">
        <Modal.Body>
        { tempLogin?//globalState.address ?
          <div>
            <div className="button-transparent mb-3">
              View Account on Webaverse
              <img src={settingIcon} className="right-top-settingIcon"/>
            </div>
            
            <Link to="/settings">
              <div className="button-transparent">
                Settings
                <img src={settingIcon} className="right-top-settingIcon"/>
                </div>
            </Link>
            
          </div>
          :
          <div>
            <div className="row">
              <p className="guest-warning-label">!</p>
              <span className="font-size-14 font-wh-500 mt-1">YOU ARE A GUEST</span>
            </div>
            <div className="row font-size-9 mt-3 text-left">
              To make your account permanent either login, connect an account or copy your private key somewhere safe.
            </div>
            <div className="row font-size-14 mt-4 relative-position">
              Sign In With Private Key
              <div className="arrow-down"></div>
            </div>
            <div className="row font-size-14 mt-4 relative-position">
              Email Login / Signup
              <div className="arrow-down"></div>
            </div>
            {/* <a className="discord-login mt-3" href={discordOauthUrl}> */}
              <button className="discord-login mt-3" onClick={()=>setTempLogin(true)}>
                <img src={discordLogin} />
              </button>
            {/* </a> */}
          </div>
        }
          
        </Modal.Body>
      </Modal>
    </div>
  )
}
