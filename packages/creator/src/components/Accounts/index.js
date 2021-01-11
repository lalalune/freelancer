import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MoonLoader from "react-spinners/MoonLoader";
import { Container, Row, Col } from 'react-grid-system';
import { useParams } from "react-router-dom"
import Web3 from 'web3';
import axios from "axios";
import { useAppContext } from "../../libs/contextLib";
import { getInventoryForCreator, getProfileForCreator } from "../../functions/UIStateFunctions.js";

export default () => {
  const { id } = useParams();
  const { globalState, setGlobalState } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [inventory, setInventory] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getInventoryForCreator(id, 0, true, globalState).then(res => {
      setInventory(res.creatorInventories[id][0]);
    });

    getProfileForCreator(id, globalState).then(res => {
      setProfile(res.creatorProfiles[id]);
      setLoading(false);
    });
  }, []);

  const Inventory = () => inventory ? inventory.map((item, i) =>
     <Col key={i} className="content" sm={2}>
       <Link to={"/browse/" + item.id}>
         <img src={item.image} />
         <h3>{item.name}</h3>
       </Link>
     </Col>
   ) : null

  const Profile = () => profile ? 
    <Col sm={10}>
      <div className="profileHeader">
        <div className="profileName">
          <h1>{profile.name}</h1>
          <p>{profile.address}</p>
        </div>
        <img src={profile.avatarPreview} />
      </div>
    </Col>
  : null


  return (
    <>
      <Container>
       <Row style={{ justifyContent: "center" }}>
        {loading ?
              <MoonLoader
                css={"display: inline-block"}
                size={50}
                color={"#c4005d"}
                loading={loading}
              />
        :
          <>
            <Profile />
            <Inventory />
          </>
        }
        </Row>
      </Container>
    </>
  )
}
