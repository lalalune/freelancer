import React from "react";
import { handleDeckClick } from "../../../../engine/zoneFunctions";

const Deck = (props) => {
  const deck = props.deck;

  return (
    <>
      <div className="remainCard">
        <div className="card_remain">{deck && deck.length} CARDS REMAINING</div>
        <div className="card_box ">
          <div>
            {deck && deck.length != 0 ? (
              <div
                className="play_card blue_play_card"
                onClick={() => {
                  {
                    handleDeckClick(props);
                  }
                }}
              >
                <div>
                  <div className="card_name">
                    <p>{props.deck[0].name}</p>
                  </div>
                  <div className="card_space"></div>
                  <div className="hire">
                    <p>{props.deck[0].type}</p>
                  </div>
                  <div className="card_detail">
                    <p>{props.deck[0].abilities[0]}</p>
                    <p>{props.deck[0].abilities[1]}</p>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Deck;
