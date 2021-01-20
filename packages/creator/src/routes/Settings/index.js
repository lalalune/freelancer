import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Container, Row, Col } from 'react-grid-system';
import { useAppContext } from "../../libs/contextLib";
import { loginWithPrivateKey, pullUser, getBalance, getInventoryForCreator, getProfileForCreator } from "../../functions/UIStateFunctions.js";
import bip39 from '../../libs/bip39.js';
import { getLoadout } from "../../functions/AssetFunctions.js";
import preview from "../../assets/images/preview.png";
import { discordOauthUrl } from '../../webaverse/constants.js';
import Loader from '../../components/Loader';
import Profile from '../../components/Profile';
import Cards from '../../components/Inventory';
import "./style.css";

export default () => {
  const { globalState, setGlobalState } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [key, setKey] = useState(null);
  const [inventory, setInventory] = useState(null);
  const [balance, setBalance] = useState(null);
  const [loadout, setLoadout] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (globalState.loginToken && globalState.loginToken.mnemonic && !globalState.address) {
      loginWithKey(globalState.loginToken.mnemonic);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);


  const ethEnabled = () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      window.ethereum.enable();
      return true;
    }
    return false;
  }

  const setInitialState = async (state) => {
    const balance = await getBalance(state.address);
    const newState = await pullUser({ ...state });
    setGlobalState({ balance, ...globalState, ...newState });
  }

  const loginWithKey = (key) => {
    if (bip39.validateMnemonic(key)) {
      loginWithPrivateKey(key, globalState)
      .then(res => {
        setInitialState(res);
      })
      .catch(err => {
        console.log(err);
      });
    } else {
      alert("not a valid private key!");
    }
  }

  const loginWithMetaMask = () => {
    if (!ethEnabled()) {
      alert("Please install an Ethereum-compatible browser or extension like MetaMask to use Webaverse!");
    } else {
      const web3 = window.web3;
      const ens = web3.eth.ens;
      window.ethereum.request({ method: 'eth_accounts' })
      .then(account => {
        if (!web3.utils.isAddress(account)) {
          return;
        } else {
          console.log(account[0]);
        }
      });
      ethereum.on('accountsChanged', function (accounts) {
        if(!web3.utils.isAddress(accounts[0])) {
          return;
         } else {
          console.log(accounts[0]);
        }
      });
    }
  }

  const handleChange = e => {
    setKey(e.target.value);
  }

  return (
    <div className="container settings-container">
      <div className="row">
        <div className="setting-banner upper-text font-size-32 font-bold">
          Account settings
          <div className="triangle"></div>
        </div>
      </div>
      <div className="row m-5 pl-5">
        <div className="setting-rectangle text-left">
          <div className="font-size-22 font-bold">Webaverse Wallet</div>
          <div className="font-size-14 mt-3">0x35ddcd7d8b66f1331f77186af17dbcf231909433 </div>
          <div className="font-size-14 mt-5 relative-position">
            Copy Private Key
            <div className="arrow-down"></div>
          </div>
          <div className="font-size-14 mt-4 relative-position">
            My Account on Webaverse
            <div className="arrow-down"></div>
          </div>
        </div>
        <div className="setting-rectangle text-left mt-3">
          <div className="font-size-22 font-bold">Metamask</div>
          <div className="font-size-14 mt-4 relative-position font-green">
            Metamask is installed
          </div>
        </div>
        <div className="setting-rectangle text-left mt-3">
          <div className="font-size-22 font-bold">Account Actions</div>
          <div className="font-size-14 mt-5 relative-position">
            Sign Out / Switch to Anonymous Account
            <div className="arrow-down"></div>
          </div>
          <div className="font-size-14 mt-4 relative-position">
            Delete Account
            <div className="arrow-down"></div>
          </div>
        </div>
      </div>
    </div>
    // <Row style={{ justifyContent: "center" }}>
    //   { loading ?
    //     <Loader loading={loading} />
    //   :
    //     globalState.address ?
    //       <Redirect to={"/profiles/" + globalState.address} />
    //     :
    //       <Col sm={12}>
    //         <Col sm={7} style={{ margin: "0 auto" }}>
    //           <h2>Discord</h2>
    //           <br />
    //           <a className="button" href={discordOauthUrl}>
    //             Login With Discord
    //           </a>

    //           <h2>Private Key</h2>
    //           <input
    //             type="text"
    //             onChange={handleChange}
    //           />
    //           <a className="button" onClick={() => loginWithKey(key) }>
    //             Login With Key
    //           </a>
    //         </Col>
    //       </Col>
    //   }
    // </Row> 
  )
}
