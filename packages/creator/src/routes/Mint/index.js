import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-grid-system';
import { FileDrop } from 'react-file-drop';
import { useAppContext } from "../../libs/contextLib";
import { mintNft, setAvatar, setHomespace } from '../../functions/AssetFunctions.js';
import Loader from '../../components/Loader';
import AssetCard from '../../components/Card';
import CardGrid from "../../components/CardGrid";
import { getTokens } from "../../functions/UIStateFunctions.js";
import { storageHost } from "../../webaverse/constants";
import { getExt } from '../../webaverse/util.js';
import "./style.css";

import cardMainImg from '../../assets/images/card-girl.png';
import iconLowerLogo from '../../assets/images/lowerCardInfoIcon.png';


export default () => {
  const { globalState, setGlobalState } = useAppContext();
  const [file, setFile] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [imagePreview, setImagePreview] = useState(null);
  const [mintedState, setMintedState] = useState(null);
  const [mintedMessage, setMintedMessage] = useState(null);
  const [sequence, setSequence]=useState(0);
  const [name, setName]=useState("New Player");
  const [description, setDescription] = useState("Description Detail");
  const [addDescription, setAddDescription] = useState("Additional Description Detail");
  const [ability, setAbility]=useState(["Recuirt 2","Subcontract 3"]);
  const [abilityInputTxt, setAbilityInputTxt]=useState("");
  const [leftMenu, setLeftMenu]=useState("create_deck");
  const [booths, setBooths] = useState(null);
  const [currentCard, setCurrentCard] = useState(null);

  const handleNameChange  = (e) => setName(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleAddDescriptionChange = (e) => setAddDescription(e.target.value);

  const handleAbilityInputTxtChange = (e) => {
    setAbilityInputTxt(e.target.value);
  };

  useEffect(() => {
    (async () => {
      const data = await getTokens(1, 50);
      setBooths(data);
    })();
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     const booths = await getBooths(0, globalState);
  //     setBooths(booths);
  //   })();
  // }, []);
  const handleQuantityChange = (e) => setQuantity(e.target.value);

  // const handleSuccess = (e) => {
  //   setMintedMessage(e.toString());
  // }
  // const handleError = (e) => {
  //   setMintedMessage(e.toString());
  // }

  const handleMintNftButton = (e) => {
    e.preventDefault();
    setMintedState('loading');


    const extName = getExt(file.name);
    const fileName = extName ? file.name.slice(0, -(extName.length + 1)) : file.name;
    setName(fileName);

    console.log("FETCHING")
    fetch(storageHost, {
      method: 'POST',
      body: file
    })
    .then(response => response.json())
    .then(data => {
      console.log("HASH IS", data.hash)
      mintNft(data.hash,
        name,
        extName,
        description,
        quantity,
        (tokenId) => {
          setMintedState('success')
          setMintedMessage(tokenId)
        },
        (err) => {
          console.log("Minting failed", err);
          setMintedState('error')
          setMintedMessage(err.toString())
        },
        globalState
      );

  })
  .catch(error => {
    console.error(error)
  })
  }

  const handleFileUpload = file => {
    console.log(file);
    if (file) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setFile(file);
        setSequence(1);
        setImagePreview(reader.result);
      }
      reader.readAsDataURL(file);
    }else console.warn("Didnt upload file");
  };

  const MintSteps = () => {
    if (mintedState === "loading") {
      return (
        <Loader loading={true} />
      )
    } else if (mintedState === "success") {
      return (
        <div>
          <h1>Success</h1>
          Your token is now minted as #{mintedMessage}.
        </div>
      )
    } else if (mintedState === "error") {
      return (
        <div>
          <h1>Error</h1>
          Minting failed: {mintedMessage}.
        </div>
      )
    }
  }

  const uploadAgain = () =>{
    setSequence(0);
    setImagePreview(null);
    setFile(null);
  }

  var sequenceArray=["Select Asset", "Prepare Asset", "Mint token"];
  let rarity = "epic";
  let cardSize = 'md';
  return (
    <>
      <div className="container row mint-row">
        <div className="col-2">
        </div>
        
        <div className="col-10">
          <div className="right-top-sequence">
            {sequenceArray.map(function(data, index){
              return <div className={sequence===index?"sequence-div active":"sequence-div"} kye={index}>
                      <div className="sequence-circle" onClick={()=>setSequence(index)}>{index+1}</div>
                      <p className="sequence-txt">{data}</p>
                    </div>;
            })}
          </div>
        </div>
      </div>

      {sequence===0&&
        <div className="container row mint-row sequence-1">
          <div className="col-2 left-menu">
            <p className={leftMenu==="create_deck"?"activated":""} onClick={()=>setLeftMenu("create_deck")}>Create Deck</p>
            <p className={leftMenu==="upload_card"?"activated":""} onClick={()=>setLeftMenu("upload_card")}>Upload Card</p>
            <p className={leftMenu==="import_card"?"activated":""} onClick={()=>setLeftMenu("import_card")}>Import Card</p>
          </div>
          {leftMenu==="create_deck" && 
            <div className="col-10">
                <p className="right-bottom-title mt-5 pt-3">Upload an image for your deck.</p>
                <p className="right-bottom-txt">This will be used as the card back for your cards.</p>
                  
                  <FileDrop onDrop={(files, e) => handleFileUploadCreate(files[0])}>
                    <p className="right-bottom-sm-txt mt-5 mb-3 pt-3">Files can be of the following types:</p>
                    <p className="right-bottom-xsm-txt font-bold">PNG, JPG, OBJ, FBX, VRM, GLTF, GLB, VOX, MP4, M4V, MP3, M4A, WAV</p>
                    
                    <div className="row mt-5">
                      <div className="col-3"></div>
                      <div className="col-3"><p className="selected-file-label">No File Chosen</p></div>
                      <div className="col-2">
                        <label htmlFor="input-file" className="button">Choose file</label>
                        <input type="file" id="input-file" onChange={(e) => handleFileUploadCreate(e.target.files[0])} multiple={false} style={{display: 'none'}} />
                      </div>
                    
                    </div>
                  </FileDrop>
            </div>
          }
          {leftMenu==="upload_card" &&
          <div className="col-10">
                <FileDrop onDrop={(files, e) => handleFileUpload(files[0])}>
                  <p className="right-bottom-sm-txt mt-5 mb-3 pt-3">Files can be of the following types:</p>
                  <p className="right-bottom-xsm-txt font-bold">PNG, JPG, OBJ, FBX, VRM, GLTF, GLB, VOX, MP4, M4V, MP3, M4A, WAV</p>
                  
                  <div className="row mt-5">
                    <div className="col-3"></div>
                    <div className="col-3"><p className="selected-file-label">No File Chosen</p></div>
                    <div className="col-2">
                      <label htmlFor="input-file" className="button">Choose file</label>
                      <input type="file" id="input-file" onChange={(e) => handleFileUpload(e.target.files[0])} multiple={false} style={{display: 'none'}} />
                    </div>
                  
                  </div>
                </FileDrop>
          </div>
          }
          {leftMenu==="import_card" &&
          <div className="col-10">
            <CardGrid data={booths} globalState={globalState} cardSize="" filter={true}/>
            {/* currentCard={currentCard} setCurrentCard={setCurrentCard}  */}
          </div>
          }
        </div>
      }

      {sequence===1&&
          <div className="container row mint-row mt-5 sequence-2">
            <div className="col-4">
              <AssetCard
                  assetName={name}
                  description={description}
                  additionalDescription = {addDescription}
                  image={imagePreview ? imagePreview : null}
                  ext=".png"
                  totalSupply={3}
                  cardSize="large"
                  onClickFunction={() => function(){console.log("card clicked");}}
                />
            </div>
            <div className="col-4 text-left pr-3 pl-3">
              <div className="bottom-center-detail">
                <p className="right-bottom-txt font-wh-500">Name</p>
                <input type="text" value={name} onChange={handleNameChange} className="mint-input right-bottom-txt"/>
                <p className="right-bottom-txt font-wh-500 mt-5 pt-5">Abilities</p>
                <div className="mint-input">
                  {ability.map(function(data, index){
                    return <p className={index>0?"ability-p font-red":"ability-p font-green"} key={index}>{data}</p>
                  })}
                  <input type="text" value={abilityInputTxt} onChange={handleAbilityInputTxtChange} className="mint-input mint-input-abilities"/>
                </div>
                <p className="right-bottom-txt font-wh-500 mt-5 pt-5">Description</p>
                <input type="text" value={description} onChange={handleDescriptionChange} className="mint-input font-size-17"/>
                <input type="text" value={addDescription} onChange={handleAddDescriptionChange} className="mint-input font-size-17 mt-3"/>

                <div className="inline-div full-width text-center mt-5">
                  <button className="button button-secondary" onClick={uploadAgain}>Upload Again</button>
                  <button className="button button-secondary" onClick={()=>setSequence(2)}>Continue</button>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="bottom-right-mint-card">
                <div className="bottom-right-mint-card-head">
                  <p className="bottom-right-mint-card-row-1 text-left">Ability</p>
                  <p className="bottom-right-mint-card-row-2">SYN</p>
                  <p className="bottom-right-mint-card-row-2">1</p>
                  <p className="bottom-right-mint-card-row-2">2</p>
                  <p className="bottom-right-mint-card-row-2">3</p>
                </div>
                <div className="bottom-right-mint-card-body pt-4">
                  <div className="bottom-right-mint-card-row-1 text-left">
                    <p className="font-size-17 font-green">Recruit</p>
                    <p className="font-size-9">Gain ownership of X of your opponenet's hires</p>
                  </div>
                  <div className="bottom-right-mint-card-row-2">
                    <p className="bottom-right-mint-card-circle font-green">+1</p>
                  </div>
                  <div className="bottom-right-mint-card-row-2">
                    <p className="bottom-right-mint-card-circle font-green blue-shadow">+4</p>
                  </div>
                  <div className="bottom-right-mint-card-row-2">
                    <p className="bottom-right-mint-card-circle font-green">+6</p>
                  </div>
                  <div className="bottom-right-mint-card-row-2">
                  </div>
                </div>
                <div className="bottom-right-mint-card-body">
                  <div className="bottom-right-mint-card-row-1 text-left">
                    <p className="font-size-17 font-yellow">Shuffle</p>
                    <p className="font-size-9">Shuffle your deck</p>
                  </div>
                  <div className="bottom-right-mint-card-row-2">
                    <p className="bottom-right-mint-card-circle font-yellow">0</p>
                  </div>
                  <div className="bottom-right-mint-card-row-2">
                    <p className="bottom-right-mint-card-circle font-yellow">0</p>
                  </div>
                  <div className="bottom-right-mint-card-row-2">
                  </div>
                  <div className="bottom-right-mint-card-row-2">
                  </div>
                </div>
                <div className="bottom-right-mint-card-body">
                  <div className="bottom-right-mint-card-row-1 text-left">
                    <p className="font-size-17 font-red">Subcontract</p>
                    <p className="font-size-9">For each of your opponent's hire, pay X coin.</p>
                  </div>
                  <div className="bottom-right-mint-card-row-2">
                    <p className="bottom-right-mint-card-circle font-green">+1</p>
                  </div>
                  <div className="bottom-right-mint-card-row-2">
                    <p className="bottom-right-mint-card-circle font-red">-2</p>
                  </div>
                  <div className="bottom-right-mint-card-row-2">
                    <p className="bottom-right-mint-card-circle font-red">-4</p>
                  </div>
                  <div className="bottom-right-mint-card-row-2">
                    <p className="bottom-right-mint-card-circle font-red">-6</p>
                  </div>
                </div>
                <div className="bottom-right-mint-card-body">
                  <div className="bottom-right-mint-card-row-1 text-left">
                    <p className="font-size-17 font-green">Ability</p>
                    <p className="font-size-9">Gain ownership of X of your opponenet's hires</p>
                  </div>
                  <div className="bottom-right-mint-card-row-2">
                    <p className="bottom-right-mint-card-circle font-green">+1</p>
                  </div>
                  <div className="bottom-right-mint-card-row-2">
                    <p className="bottom-right-mint-card-circle font-green">+4</p>
                  </div>
                  <div className="bottom-right-mint-card-row-2">
                    <p className="bottom-right-mint-card-circle font-green">+6</p>
                  </div>
                  <div className="bottom-right-mint-card-row-2">
                  </div>
                </div>
                <div className="bottom-right-mint-card-body">
                  <div className="bottom-right-mint-card-row-1 text-left">
                    <p className="font-size-17 font-yellow">Ability</p>
                    <p className="font-size-9">Gain ownership of X of your opponenet's hires</p>
                  </div>
                  <div className="bottom-right-mint-card-row-2">
                    <p className="bottom-right-mint-card-circle font-green">+1</p>
                  </div>
                  <div className="bottom-right-mint-card-row-2">
                    <p className="bottom-right-mint-card-circle font-green">+4</p>
                  </div>
                  <div className="bottom-right-mint-card-row-2">
                    <p className="bottom-right-mint-card-circle font-green">+6</p>
                  </div>
                  <div className="bottom-right-mint-card-row-2">
                  </div>
                </div>
                <div className="bottom-right-mint-card-body">
                  <div className="bottom-right-mint-card-row-1 text-left">
                    <p className="font-size-17 font-red">Recruit</p>
                    <p className="font-size-9">Gain ownership of X of your opponenet's hires</p>
                  </div>
                  <div className="bottom-right-mint-card-row-2">
                    <p className="bottom-right-mint-card-circle font-green">+1</p>
                  </div>
                  <div className="bottom-right-mint-card-row-2">
                    <p className="bottom-right-mint-card-circle font-green">+4</p>
                  </div>
                  <div className="bottom-right-mint-card-row-2">
                    <p className="bottom-right-mint-card-circle font-green">+6</p>
                  </div>
                  <div className="bottom-right-mint-card-row-2">
                  </div>
                </div>
              </div>
            </div>
          </div>
      }
      {sequence===2 &&
      ( mintedState === null ?
          <div className="container row mint-row mt-5 sequence-3">
            <div className="col-2"></div>
            <div className="col-4">
              <AssetCard
                  assetName={name}
                  description={description}
                  additionalDescription = {addDescription}
                  image={imagePreview ? imagePreview : null}
                  ext=".png"
                  totalSupply={3}
                  cardSize="large"
                  onClickFunction={() => function(){console.log("card clicked");}}
                />
            </div>
            <div className="col-4 pr-3 pl-3">
              <div className="bottom-center-detail">
                <p className="font-wh-500 font-size-32">Ready For Minting</p>
                <p className="mt-5 font-size-12 mb-0">
                  This token will be deposited in your Webaverse wallet with the address;
                </p>
                <p className="font-wh-500 font-size-12">
                  0x35ddcd7d8b66f1331f77186af17dbcf231909433
                </p>
                <div className="sequence-3-right-description">
                  <div className="row mt-5 pt-5">
                    <p className="col-8 text-left">Quantity:</p>
                    <input type="number" className="col-4 text-right sequence-3-right-description-bordered" value={quantity} onChange={handleQuantityChange} />
                  </div>
                  <div className="row mt-3">
                    <p className="col-6 text-left">Minting Fee:</p>
                    <p className="col-6 text-right">2.5Ψ</p>
                  </div>
                  <div className="row mt-1">
                    <p className="col-6 text-left font-gray">You Have:</p>
                    <p className="col-6 text-right font-gray">1208Ψ</p>
                  </div>
                </div>
                <div className="inline-div full-width text-center mt-5">
                  <button className="button button-secondary" onClick={()=>setSequence(1)}>EDIT ASSET</button>
                  <button className="button button-orange" onClick={handleMintNftButton}>MINT</button>
                </div>
              </div>
            </div>
            <div className="col-2"></div>
          </div>
          :
          <div className="text-center">
            <MintSteps />
          </div>
      )
      }

      {/* {[
       !globalState.loginToken && (
          <h1>You need to login to Mint.</h1>
        ),
        globalState.loginToken && ( !file ?
          <div className="file-drop-container">
            <FileDrop
              onDrop={(files, e) => handleFileUpload(files[0])}
            >
              Drop the file you want to mint here!
              <label htmlFor="input-file" className="button">Or choose file</label>
              <input type="file" id="input-file" onChange={(e) => handleFileUpload(e.target.files[0])} multiple={false} style={{display: 'none'}} />
            </FileDrop>
          </div>
        :
          <Container>
            <Row style={{ justifyContent: "center" }}>
              <Col sm={12}>
                { mintedState === null ?
                  <div>
                    <img className="nft-preview" src={imagePreview ? imagePreview : null} />
                    <div>
                        <label>Name</label>
                    </div>
                    <div>
                        <input type="text" value={name} onChange={handleNameChange} />
                    </div>
                    <div>
                        <label>Description</label>
                    </div>
                    <div>
                        <input type="text" value={description} onChange={handleDescriptionChange} />
                    </div>
                    <div>
                        <label>Quantity</label>
                    </div>
                    <div>
                        <input type="number" value={quantity} onChange={handleQuantityChange} />
                    </div>
                    <div>
                        <a className="button" onClick={handleMintNftButton}>
                          Mint NFT for 10 FLUX
                        </a>
                    </div>
                  </div>
                :
                  <MintSteps />
                }
              </Col>
            </Row>
          </Container>
        )
      ]} */}
    </>
  )
}
