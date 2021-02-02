import React from "react";

const OutOfPlay = (props) => {
const turn = props.turn
  return (
    <>
      <div className="card_box ">
        {turn.BlueOutOfPlay && turn.BlueOutOfPlay.length != 0 ? (
          <div className="play_card blue_play_card">
            <div className="card_name">
              <p>{turn.BlueOutOfPlay[0].name}</p>
            </div>
            <div className="card_space"></div>
            <div className="hire">
              <p>{turn.BlueOutOfPlay[0].type}</p>
            </div>
            <div className="card_detail">
              <p>{turn.BlueOutOfPlay[0].abilities[0]}</p>
              <p>{turn.BlueOutOfPlay[0].abilities[1]}</p>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};
export default OutOfPlay;
