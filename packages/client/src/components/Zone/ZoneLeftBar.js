import React from "react"
import "./Zone.css"
import { BlueTeam, RedTeam } from "../svgs/svgs"

export const ZoneLeftBar = (props) => {
    return (
        <div className="zone_left_bar">
            <BlueTeam blueCoins={props.blueCoin} />
            <RedTeam redCoins={props.redCoin} />
            <div className="card_box ">
                {props.isBlueTurn.BlueOutOfPlay.length != 0 ? (
                    <div className="play_card blue_play_card">
                        <div className="card_name">
                            <p>{props.isBlueTurn.BlueOutOfPlay[0].name}</p>
                        </div>
                        <div className="card_space"></div>
                        <div className="hire">
                            <p>{props.isBlueTurn.BlueOutOfPlay[0].type}</p>
                        </div>
                        <div className="card_detail">
                            <p>{props.isBlueTurn.BlueOutOfPlay[0].abilities[0]}</p>
                            <p>{props.isBlueTurn.BlueOutOfPlay[0].abilities[1]}</p>
                        </div>
                    </div>
                ) : (
                    ""
                )}
            </div>
            <div className="card_box ">
                {props.isRedTurn.RedOutOfPlay.length != 0 ? (
                    <div className="play_card">
                        <div>
                            <div className="card_name">
                                <p>{props.isRedTurn.RedOutOfPlay[0].name}</p>
                            </div>
                            <div className="card_space"></div>
                            <div className="hire">
                                <p>{props.isRedTurn.RedOutOfPlay[0].type}</p>
                            </div>
                            <div className="card_detail">
                                <p>{props.isRedTurn.RedOutOfPlay[0].abilities[0]}</p>
                                <p>{props.isRedTurn.RedOutOfPlay[0].abilities[1]}</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    ""
                )}
            </div>
        </div>
    )
}
