import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

export default () => {
  const history = useHistory();
  const { id } = useParams();

  return (
    <div className="container">
      <div className="row profile-row">
          <div className="col-12">
              <p className="font-34 text-center">Your Assets. Your deck.</p>
              <p className="font-26 text-center">Trun any NFT into a playable card with on-chain metadata.</p>
          </div>
      </div>
      <div className="row profile-row">
        <div className="col-6 text-left">
          <p className="font-34">For Artists</p>
          <p className="font-26">Create and sell your assets on the Webaverse marketplace. Transfer to mainnet any time.</p>
        </div>
      </div>
      <div className="row profile-row">
        <div className="col-6"></div>
        <div className="col-6 text-right">
          <p className="font-34">For Gamers</p>
          <p className="font-26">Construct the ultimate deck and battle your friends in Discord and in full 3D.</p>
        </div>
      </div>
      <div className="row profile-row">
        <div className="col-6 text-left">
          <p className="font-34">For Collectors</p>
          <p className="font-26">Invest in NFTs that have real value to real people.</p>
        </div>
      </div>
      <div className="row profile-row"></div>
    </div>
  )
}
