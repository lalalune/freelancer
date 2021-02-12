import React, { useState } from "react";
import { BlueTeam, RedTeam, LeftBar } from "../svgs/svgs";
import "./Zone.css";
import BlueDrop from "./BlueDrop";
import RedDrop from "./RedDrop";
import { DeckA, DeckB } from "../../../../engine/MockDecks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OutOfPlay from "./OutOfPlay";
import Deck from "./Deck";
const Zone = () => {
  const [player1, setplayer1] = useState(true);
  const [player2, setplayer2] = useState(false);
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
      {player1 ? (
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
        <OutOfPlay turn={isBlueTurn} />
        <OutOfPlay turn={isRedTurn} />
      </div>
      <div className="zone_centre_bar">
        <div className={player2 ? "disable" : ""}>
          <BlueDrop
            BlueState={BlueState}
            player1={player1}
            BlueState={BlueState}
            setBlueState={setBlueState}
            redCoin={redCoin}
            setredCoin={setredCoin}
            setplayer1={setplayer1}
            setplayer2={setplayer2}
            setblueCoin={setblueCoin}
            isBlueTurn={isBlueTurn}
          />
        </div>

        <div className="status_message_area">
          <button className="btn">
            It's <strong>your</strong> turn , draw <strong>one</strong> card
          </button>
        </div>

        <div className={player1 ? "disable classname1" : "classname1"}>
          <RedDrop
            RedState={RedState}
            player2={player2}
            RedState={RedState}
            setRedState={setRedState}
            blueCoin={blueCoin}
            setblueCoin={setblueCoin}
            setplayer1={setplayer1}
            setplayer2={setplayer2}
          />
        </div>
      </div>
      <div className="zone_right_bar">
        <LeftBar />
        <div className="remainCard">
          <Deck
            player1={player1}
            deck={blueDeck}
            BlueState={BlueState}
            setBlueState={setBlueState}
          />
        </div>

        <div
          className="action_button"
          onClick={() => {
            setplayer1(!player1);
            setplayer2(!player2);
          }}
        >
          <button className="btn">END TURN</button>
        </div>
        <div className="red_play_card_detail">
          <Deck
            player2={player2}
            deck={redDeck}
            RedState={RedState}
            setRedState={setRedState}
          />
        </div>
        </div>
</div>
    )
}

export default Zone
