import React, { useState } from "react"
import "./Zone.css"
import BlueDrop from "./BlueDrop"
import RedDrop from "./RedDrop"
import DeckArea from "./DeckArea"
import { ZoneLeftBar } from "./ZoneLeftBar"
import { ZoneRightBar } from "./ZoneRightBar"
import { DeckA, DeckB } from "../../../../engine/MockDecks"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const Zone = () => {
    const [playerBlue, setplayerBlue] = useState(true)
    const [playerRed, setplayerRed] = useState(false)
    const [blueDeck] = useState(DeckA.slice(7))
    const [redDeck] = useState(DeckB.slice(7))
    const [blueCoin, setblueCoin] = useState(30)
    const [redCoin, setredCoin] = useState(30)
    const [isBlueTurn] = useState({ BlueOutOfPlay: [] })
    const [isRedTurn] = useState({ RedOutOfPlay: [] })
    const [BlueState, setBlueState] = useState({
        Deck: [
            {
                inHand: DeckA.slice(0, 7),
                inPlay: [],
            },
            {
                inHand: [],
                inPlay: DeckB.slice(0, 7),
            },
        ],
    })
    const [RedState, setRedState] = useState({
        inHand: [],
        inPlay: DeckB.slice(0, 7),
    })

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

            <ZoneLeftBar blueCoin={blueCoin} redCoin={redCoin} isBlueTurn={isBlueTurn} isRedTurn={isRedTurn} />

            <div className="zone_centre_bar">
                {/* <div className={playerRed ? "disable" : ""}> */}
                <div>
                    <DeckArea
                        playerBlue={playerBlue}
                        BlueState={BlueState}
                        setBlueState={setBlueState}
                        redCoin={redCoin}
                        setredCoin={setredCoin}
                        setplayerBlue={setplayerBlue}
                        setplayerRed={setplayerRed}
                        setblueCoin={setblueCoin}
                        isBlueTurn={isBlueTurn}
                        blueCoin={blueCoin}
                        RedState={RedState}
                        setRedState={setRedState}
                        isRedTurn={isRedTurn}
                    />
                </div>
                {/* </div> */}
                {/* <div className={playerRed ? "disable" : ""}>
                    <BlueDrop
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
                        playerRed={playerRed}
                        RedState={RedState}
                        setRedState={setRedState}
                        blueCoin={blueCoin}
                        setblueCoin={setblueCoin}
                        setplayerBlue={setplayerBlue}
                        setplayerRed={setplayerRed}
                        isRedTurn={isRedTurn}
                        setredCoin={setredCoin}
                    />
                </div> */}
            </div>
            <ZoneRightBar
                blueDeck={blueDeck}
                redDeck={redDeck}
                playerBlue={playerBlue}
                playerRed={playerRed}
                BlueState={BlueState}
                RedState={RedState}
                setBlueState={setBlueState}
                setRedState={setRedState}
                setplayerRed={setplayerRed}
                setplayerBlue={setplayerBlue}
            />
        </div>
    )
}

export default Zone
