import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Web3 from 'web3';
import { Container, Row, Col } from 'react-grid-system';
import { FileDrop } from 'react-file-drop';
import { useAppContext } from "../../libs/contextLib";
import { mintNft } from '../../functions/AssetFunctions.js';
import "../../assets/css/mint.css";
import { storageHost } from "../webaverse/constants";


export default () => {
  const { globalState, setGlobalState } = useAppContext();

  const [file, setFile] = useState(null);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [mintedState, setMintedState] = useState(null);
  const [extName, setExtName] = useState(null);

  const handleNameChange = (e) => setName(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleQuantityChange = (e) => setQuantity(e.target.value);

  const handleMintNftButton = (e) => {
    setLoading(true);
    e.preventDefault();
    setMintedState('loading');


    const extName = getExt(file.name);
    const fileName = extName ? file.name.slice(0, -(extName.length + 1)) : file.name;
    setExtName(extName);
    setName(fileName);

    console.log("FETCHING")
    fetch(storageHost, {
      method: 'POST',
      body: file
    })
    .then(response => response.json())
    .then(data => {
      setHash(data.hash);
      console.log("HASH IS", data.hash)
    mintNft(data.hash,
      name,
      extName,
      description,
      quantity,
      (tokenId) => {
        setMintedState('success')
        setMintedMessage(tokenId)
        router.push('/assets/' + tokenId);
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
        setImagePreview(reader.result);
      }
      reader.readAsDataURL(file);
    }
    else console.warn("Didnt upload file");
  };

  return (
    <>
          { !file ?
            <div className="file-drop-container">
              <FileDrop
                onDrop={(files, e) => handleFileUpload(files[0])}
              >
                Drop the file you want to mint here!
              </FileDrop>
            </div>
          :
            <Container>
              <Row style={{ justifyContent: "center" }}>
                <Col sm={12}>
                  <div>
                    <img className="nft-preview" src={imagePreview ? imagePreview : null} />
                    <label>Name</label>
                    <input type="text" onChange={handleNameChange} />
                    <label>Description</label>
                    <input type="text" onChange={handleDescriptionChange} />
                    <label>Quantity</label>
                    <input type="number" onChange={handleQuantityChange} />

                    <a className="button" onClick={handleMintNftButton}>
                      Mint NFT
                    </a>
                  </div>
                </Col>
              </Row>
            </Container>
          }
    </>
  )
}
