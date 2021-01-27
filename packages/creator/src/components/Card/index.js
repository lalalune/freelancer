import React from 'react';
import './style.css';
import iconWebaverse from '../../assets/images/exts/icon-webaverse.svg';
import iconEthereum from '../../assets/images/exts/icon-ethereum.svg';
import iconGif from '../../assets/images/exts/icon-gif.svg';
import iconGlb from '../../assets/images/exts/icon-glb.svg';
import iconJpg from '../../assets/images/exts/icon-jpg.svg';
import iconPng from '../../assets/images/exts/icon-jpg.svg';
import iconVrm from '../../assets/images/exts/icon-vrm.svg';
import iconLowerLogo from '../../assets/images/lowerCardInfoIcon.png';


export default ({
  id,
  assetName,
  description,
  additionalDescription,
  image,
  hash,
  external_url,
  filename,
  buyPrice,
  ext,
  totalSupply,
  numberInEdition,
  balance,
  ownerAvatarPreview,
  ownerUsername,
  ownerAddress,
  minterAvatarPreview,
  minterAddress,
  minterUsername,
  cardSize,
  networkType,
  glow,
  onClickFunction
}) => {

  let networkIcon;
  if (networkType === "webaverse") {
    networkIcon = iconWebaverse;
  } else if (networkType === "ethereum") {
    extIcon = iconEthereum;
  }

  let extIcon;
  if (ext.toLowerCase() === "png") {
    extIcon = iconPng;
  } else if (ext.toLowerCase() === "jpg" || ext.toLowerCase() === "jpeg") {
    extIcon = iconJpg;
  } else if (ext.toLowerCase() === "vrm") {
    extIcon = iconVrm;
  } else if (ext.toLowerCase() === "glb") {
    extIcon = iconGlb;
  } else if (ext.toLowerCase() === "gif") {
    extIcon = iconGif;
  }

  let rarity;
  if (totalSupply < 2) {
    rarity = "unique";
  } else if (totalSupply < 3) {
    rarity = "mythic";
  } else if (totalSupply < 8) {
    rarity = "legendary";
  } else if (totalSupply < 15) {
    rarity = "epic";
  } else if (totalSupply < 30) {
    rarity = "rare";
  } else if (totalSupply < 50) {
    rarity = "uncommon";
  } else if (totalSupply > 50) {
    rarity = "common";
  }
  
  return (
      <div className={`card cardItem ${rarity} ${cardSize}`} onClick={onClickFunction}>
        <div className={`${rarity} upperCardInfo  ${cardSize} upperCardInfo_${(ext ?? "").replace('.','')}`}>
          <div className={`upperCardInfoLeft ${cardSize}`}>
            <span className={`cardAssetName cardName ${cardSize}`}>{assetName}</span>
          </div>
          {/* <div className={`upperCardInfoRight ${cardSize}`}>
            <div className={`itemType ext ${cardSize} ext_${ext}`}>
              <img className={`itemTypeIcon itemTypeIcon ${cardSize}`} src={extIcon} />
              <span className={`itemTypeExt itemTypeExt ${cardSize}`}>.{ext}</span> 
            </div>
          </div> */}
        </div>
        <div className={`assetImage assetImage ${cardSize}`}><img src={image} /></div>
        <div className={`lowerCardInfo ${cardSize}`}>
          <div className={`lowerCardInfoTop ${rarity} ${cardSize}`}>
            <div className={`lowerCardInfoTopLeft ${cardSize}`}>
              <div className={`lowerCardInfoTopLeftGroup`}>
                <span className={`creator ${cardSize}`}>
                  <span className={`creatorIcon ${cardSize}`}>
                  {/* <span className={`creatorIcon tooltip ${cardSize}`}> */}
                    {/* <img src={minterAvatarPreview.replace(/\.[^.]*$/, '.png')} /> */}
                    <img src={iconLowerLogo} />
                    <img src={iconLowerLogo} />
                    {/* <span className={`creatorName tooltiptext ${cardSize}`}>
                      {minterUsername}
                    </span> */}
                  </span>
                </span>
                <span className={`arrow-down ${cardSize}`}></span>
              </div>
              {/* <div className="lowerCardInfoTopClear"></div> */}
            </div>
            <span className={`lowerCardInfoTopLeftSpan ${cardSize}`}>
              #1 out of 10
            </span>
            <span className={`greaseLoadedIntoAsset ${cardSize}`}>
              {/* {`${buyPrice ? "岾 " + buyPrice : ""} ${buyPrice ? "FLUX" : ""}`} */}
              1208W
            </span>
          </div>
          <div className={`lowerCardInfoMiddle ${cardSize}`}>
            <p className={`assetDescription ${cardSize}`}>
              {description}
              <br/>
              {additionalDescription}
            </p>
            {/* <p className={`assetDescription ${cardSize}`}>
              {additionalDescription}
            </p> */}
            <div className={`${rarity} lowerCardInfoMiddle legendary ${cardSize}`}>
              <div className="triangle-down"></div>
              <div className="parallelogram"></div>
              <div className="parallelogram parallelogram-2"></div>
              <p>0x35ddcd7d8b66f1331f77186af17dbcf231909433</p>
            </div>
          </div>
          
          {/* <div className={`lowerCardInfoBottom ${cardSize}`}>
            <span className={`assetHash ${cardSize}`}>{hash}</span>
          </div> */}
        </div>
      </div>
  );
};
