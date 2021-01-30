import React, { useState } from "react";
import { BlueTeam, RedTeam, LeftBar } from "../svgs/svgs";
import "./Zone.css";
import BlueDrop from "./BlueDrop";
import RedDrop from "./RedDrop";
import { DeckA, DeckB } from "../../../../engine/MockDecks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  handleBlueDeckClick,
  handleRedDeckClick,
} from "../../../../engine/zoneFunctions";

const Zone = () => {
  const [playerBlue, setplayerBlue] = useState(true);
  const [playerRed, setplayerRed] = useState(false);
  const [blueDeck] = useState(DeckA.slice(7));
  const [redDeck] = useState(DeckB.slice(7));
  const [blueCoin, setblueCoin] = useState(30);
  const [redCoin, setredCoin] = useState(30);
  const [isBlueTurn] = useState({ BlueOutOfPlay: [] });
  const [isRedTurn] = useState({ RedOutOfPlay: [] });
  const [BlueState, setBlueState] = useState({
    inHand: DeckA.slice(0, 7),
    inPlay: [],
  });
  const [RedState, setRedState] = useState({
    inHand: [],
    inPlay: DeckB.slice(0, 7),
  });

  return (
    <div className="zone_main">
      {playerBlue ? (
        <div className="blueTeam">
          <ToastContainer position="top-right" autoClose={2000} />
        </div>
      ) : (
        <div className="redTeam">
          <ToastContainer position="bottom-right" autoClose={2000} />
        </div>
      )}

      <div className="zone_left_bar">
        <BlueTeam blueCoins={blueCoin} />
        <RedTeam redCoins={redCoin} />
        <div className="card_box ">
          {isBlueTurn.BlueOutOfPlay.length != 0 ? (
            <div className="play_card blue_play_card">
              <div className="card_name">
                <p>{isBlueTurn.BlueOutOfPlay[0].name}</p>
              </div>
              <div className="card_space"></div>
              <div className="hire">
                <p>{isBlueTurn.BlueOutOfPlay[0].type}</p>
              </div>
              <div className="card_detail">
                <p>{isBlueTurn.BlueOutOfPlay[0].abilities[0]}</p>
                <p>{isBlueTurn.BlueOutOfPlay[0].abilities[1]}</p>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="card_box ">
          {isRedTurn.RedOutOfPlay.length != 0 ? (
            <div className="play_card">
              <div>
                <div className="card_name">
                  <p>{isRedTurn.RedOutOfPlay[0].name}</p>
                </div>
                <div className="card_space"></div>
                <div className="hire">
                  <p>{isRedTurn.RedOutOfPlay[0].type}</p>
                </div>
                <div className="card_detail">
                  <p>{isRedTurn.RedOutOfPlay[0].abilities[0]}</p>
                  <p>{isRedTurn.RedOutOfPlay[0].abilities[1]}</p>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="zone_centre_bar">
        <div className={playerRed ? "disable" : ""}>
          <BlueDrop
            BlueState={BlueState}
            playerBlue={playerBlue}
            playerBlue={playerBlue}
            BlueState={BlueState}
            setBlueState={setBlueState}
            redCoin={redCoin}
            setredCoin={setredCoin}
            setplayerBlue={setplayerBlue}
            setplayerRed={setplayerRed}
            setblueCoin={setblueCoin}
            isBlueTurn={isBlueTurn}
          />
        </div>

        <div className="status_message_area">
          <button className="btn">
            It's <strong>your</strong> turn , draw <strong>one</strong> card
          </button>
        </div>

        <div className={playerBlue ? "disable classname1" : "classname1"}>
          <RedDrop
            RedState={RedState}
            playerRed={playerRed}
            playerRed={playerRed}
            RedState={RedState}
            setRedState={setRedState}
            blueCoin={blueCoin}
            setblueCoin={setblueCoin}
            setplayerBlue={setplayerBlue}
            setplayerRed={setplayerRed}
          />
        </div>
      </div>
      <div className="zone_right_bar">
        <LeftBar />
        <div className="remainCard">
          <div className="card_remain"> {blueDeck.length} CARDS REMAINING</div>
          <div className="card_box ">
            {blueDeck.length != 0 ? (
              <div
                className="play_card blue_play_card"
                onClick={() => {
                  handleBlueDeckClick(
                    playerBlue,
                    blueDeck,
                    BlueState,
                    setBlueState
                  );
                }}
              >
                <div className="card_name">
                  <p>{blueDeck[0].name}</p>
                </div>
                <div className="card_space"></div>
                <div className="hire">
                  <p>{blueDeck[0].type}</p>
                </div>
                <div className="card_detail">
                  <p>{blueDeck[0].abilities[0]}</p>
                  <p>{blueDeck[0].abilities[1]}</p>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>

        <div
          className="action_button"
          onClick={() => {
            setplayerBlue(!playerBlue);
            setplayerRed(!playerRed);
          }}
        >
          <button className="btn">END TURN</button>
        </div>
        <div>
          <div className="card_box ">
            {redDeck.length != 0 ? (
              <div
                className="play_card"
                onClick={() => {
                  handleRedDeckClick(redDeck, playerRed, RedState, setRedState);
                }}
              >
                <div>
                  <div className="card_name">
                    <p>{redDeck[0].name}</p>
                  </div>
                  <div className="card_space"></div>
                  <div className="hire">
                    <p>{redDeck[0].type}</p>
                  </div>
                  <div className="card_detail">
                    <p>{redDeck[0].abilities[0]}</p>
                    <p>{redDeck[0].abilities[1]}</p>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="card_remain"> {redDeck.length} CARDS REMAINING</div>
        </div>
      </div>
    </div>
  );
};

export default Zone;
