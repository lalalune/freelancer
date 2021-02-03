import React from "react"
import "./Zone.css"
import { LeftBar } from "../svgs/svgs"
import { handleBlueClick, handleRedClick, handleEndTurn } from "../../../../engine/zoneFunctions"

export const ZoneRightBar = (props) => {
    return (
        <div className="zone_right_bar">
            <LeftBar />
            <div className="remainCard">
                <div className="card_remain"> {props.blueDeck.length} CARDS REMAINING</div>
                <div className="card_box ">
                    {props.blueDeck.length != 0 ? (
                        <div
                            className="play_card blue_play_card"
                            onClick={() => {
                                handleBlueClick(props.playerBlue, props.blueDeck, props.BlueState, props.setBlueState)
                            }}
                        >
                            <div className="card_name">
                                <p>{props.blueDeck[0].name}</p>
                            </div>
                            <div className="card_space"></div>
                            <div className="hire">
                                <p>{props.blueDeck[0].type}</p>
                            </div>
                            <div className="card_detail">
                                <p>{props.blueDeck[0].abilities[0]}</p>
                                <p>{props.blueDeck[0].abilities[1]}</p>
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
                    props.setplayerBlue(!props.playerBlue)
                    props.setplayerRed(!props.playerRed)
                }}
            >
                <button className="btn">END TURN</button>
            </div>
            <div>
                <div className="card_box ">
                    {props.redDeck.length != 0 ? (
                        <div
                            className="play_card"
                            onClick={() => {
                                handleRedClick(props.redDeck, props.playerRed, props.RedState, props.setRedState)
                            }}
                        >
                            <div>
                                <div className="card_name">
                                    <p>{props.redDeck[0].name}</p>
                                </div>
                                <div className="card_space"></div>
                                <div className="hire">
                                    <p>{props.redDeck[0].type}</p>
                                </div>
                                <div className="card_detail">
                                    <p>{props.redDeck[0].abilities[0]}</p>
                                    <p>{props.redDeck[0].abilities[1]}</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
                <div className="card_remain"> {props.redDeck.length} CARDS REMAINING</div>
            </div>
        </div>
    )
}
