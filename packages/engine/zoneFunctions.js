import React from "react";
import swal from "sweetalert";
import {reorder , move} from "./CardMove"
export const OutOfPlayBlueClick = (
  selected,
  setblueCoin,
  setBlueState,
  isBlueTurn,
  BlueState,
  blueCoin
) => {

  const blueFiler = BlueState.inHand.filter((item) => item.id !== selected.id);
  setBlueState({ ...BlueState, inHand: blueFiler });
  isBlueTurn.BlueOutOfPlay.push(selected);
  setblueCoin(blueCoin - 1);
};
export const OutOfPlayRedClick = (
  selected1,
  RedState,
  setRedState,
  isRedTurn,
  redCoin,
  setredCoin
) => {
  const redFilter = RedState.selected.filter(
    (item) => item.id !== selected1.id
  );
  setRedState({ ...RedState, selected: redFilter });
  isRedTurn.RedOutOfPlay.push(selected1);
  setredCoin(redCoin - 1);
};

export const handleBlueClick = (
  playerBlue,
  blueDeck,
  BlueState,
  setBlueState
) => {
  if (playerBlue) {
    var card = blueDeck;
    card.sort(() => Math.random() - 0.5);
    var blueCard = card.shift();
    BlueState.inHand.push(blueCard);
    setBlueState({ ...BlueState });
    {
      BlueState.inHand.length > 8 && swal("You Need To discard you card");
    }
  }
};

export const handleRedClick = (redDeck, playerRed, RedState, setRedState) => {
  if (playerRed) {
    var card = redDeck;
    card.sort(() => Math.random() - 0.5);
    var redCard = card.shift();
    RedState.selected.push(redCard);
    setRedState({ ...RedState });
    {
      RedState.selected.length > 8 && swal("You Need To discard you card");
    }
  }
};
 export  const id1List = {
    droppable: "inHand",
    droppable2: "inPlay",
  };
export  const getList = (id,BlueState) => BlueState[id1List[id]];

export const onDragBlue = (result, playerBlue, BlueState, setBlueState) => {
  
  if (playerBlue) {
    const { source, destination } = result;
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const blueOrder = reorder(
        getList(source.droppableId),
        source.index,
        destination.index
      );

      let stateBlue = { blueOrder };
      if (source.droppableId === "droppable2") {
        stateBlue = { selected: blueOrder };
      }

      let swipe = {
        inHand: stateBlue.blueOrder ? stateBlue.blueOrder : BlueState.inHand,
        inPlay: stateBlue.selected ? stateBlue.selected : BlueState.inPlay,
      };
      setBlueState(swipe);
    } else {
      const result = move(
        getList(source.droppableId),
        getList(destination.droppableId),
        source,
        destination
      );

      setBlueState({
        inHand: result.droppable,
        inPlay: result.droppable2,
      });

      if (redCoin == 0) {
        setredCoin(0);
        swal("Blue Team,You Have won This Match");
        setplayerBlue(!playerBlue);
        setplayerRed(!playerRed);
      } else {
        setredCoin(redCoin - 1);
      }
    }
  }
};
