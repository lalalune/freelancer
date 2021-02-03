import { reorder, move } from "./CardMove";

export const OutOfPlayBlueClick = (
  inPlay,
  setblueCoin,
  setBlueState,
  isBlueTurn,
  BlueState,
  blueCoin
) => {
  const blueFiler = BlueState.inHand.filter((item) => item.id !== inPlay.id);
  setBlueState({ ...BlueState, inHand: blueFiler });
  isBlueTurn.BlueOutOfPlay.push(inPlay);
  setblueCoin(blueCoin - 1);
};

export const OutOfPlayRedClick = (
  inPlay,
  RedState,
  setRedState,
  isRedTurn,
  redCoin,
  setredCoin
) => {
  const redFilter = RedState.inPlay.filter((item) => item.id !== inPlay.id);
  setRedState({ ...RedState, inPlay: redFilter });
  isRedTurn.RedOutOfPlay.push(inPlay);
  setredCoin(redCoin - 1);
};

export const handleDeckClick = (props) => {
  var card = props.deck.sort(() => 0.5 - Math.random());
  var blueCard = card.shift();
  if (props.player1 == true) {
    props.BlueState.inHand.push(blueCard);
    props.setBlueState({ ...props.BlueState });
  } else {
    props.RedState.inPlay.push(blueCard);
    props.setRedState({ ...props.RedState });
  }
};

export const handleRedDeckClick = (redDeck, player2, RedState, setRedState) => {
  if (player2) {
    var card = redDeck.sort(() => 0.5 - Math.random());
    var redCard = card.shift();
    RedState.inPlay.push(redCard);
    setRedState({ ...RedState });
  }
};

export const blueIdList = {
  droppable: "inHand",
  droppable2: "inPlay",
};

export const getList = (id, BlueState) => BlueState[blueIdList[id]];

export const onDragBlue = (
  result,
  player1,
  BlueState,
  setBlueState,
  redCoin,
  setredCoin,
  setplayer1,
  setplayer2
) => {
  const { source, destination } = result;
  if (!destination) {
    return;
  }

  if (source.droppableId === destination.droppableId) {
    const inHand = reorder(
      getList(source.droppableId, BlueState),
      source.index,
      destination.index
    );

    let stateBlue = { inHand };

    if (source.droppableId === "droppable2") {
      stateBlue = { inPlay: inHand };
    }

    let swipe = {
      inHand: stateBlue.inHand ? stateBlue.inHand : BlueState.inHand,
      inPlay: stateBlue.inPlay ? stateBlue.inPlay : BlueState.inPlay,
    };

    setBlueState(swipe);
  } else {
    const result = move(
      getList(source.droppableId, BlueState),
      getList(destination.droppableId, BlueState),
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
      setplayer1(!player1);
      setplayer2(!player2);
    } else {
      setredCoin(redCoin - 1);
    }
  }
};

export const redIdList = {
  droppable3: "inHand",
  droppable4: "inPlay",
};

export const getList2 = (id, RedState) => RedState[redIdList[id]];

export const onDragRed = (
  result,
  player2,
  RedState,
  setRedState,
  blueCoin,
  setblueCoin,
  setplayer1,
  setplayer2
) => {
  if (player2) {
    const { source, destination } = result;

    if (!destination) {
      return;
=======
import React from "react"
import swal from "sweetalert"
import { reorder, move } from "./CardMove"

export const OutOfPlayBlueClick = (inPlay, setblueCoin, setBlueState, isBlueTurn, BlueState, blueCoin) => {
    const blueFiler = BlueState.Deck[0].inHand.filter((item) => item.id !== inPlay.id)
    setBlueState({
        ...BlueState,
        inHand: blueFiler,
    })
    isBlueTurn.BlueOutOfPlay.push(inPlay)
    setblueCoin(blueCoin - 1)
}
export const OutOfPlayRedClick = (inPlay, RedState, setRedState, isRedTurn, redCoin, setredCoin) => {
    const redFilter = RedState.inPlay.filter((item) => item.id !== inPlay.id)
    setRedState({
        ...RedState,
        inPlay: redFilter,
    })
    isRedTurn.RedOutOfPlay.push(inPlay)
    setredCoin(redCoin - 1)
}

export const handleBlueDeckClick = (playerBlue, blueDeck, BlueState, setBlueState) => {
    if (playerBlue) {
        var card = blueDeck.sort(() => 0.5 - Math.random())
        var blueCard = card.shift()
        BlueState.inHand.push(blueCard)
        setBlueState({
            ...BlueState,
        })
        {
            BlueState.inHand.length > 8 && swal("You Need To discard you card")
        }
    }
}

export const handleRedDeckClick = (redDeck, playerRed, RedState, setRedState) => {
    if (playerRed) {
        var card = redDeck.sort(() => 0.5 - Math.random())
        var redCard = card.shift()
        RedState.inPlay.push(redCard)
        setRedState({
            ...RedState,
        })
        {
            RedState.inPlay.length > 8 && swal("You Need To discard you card")
        }
    }
}

export const blueIdList = {
    droppable: "inHand",
    droppable2: "inPlay",
}

export const getList = (id, BlueState) => BlueState[blueIdList[id]]

export const onDragBlue = (
    result,
    playerBlue,
    BlueState,
    setBlueState,
    redCoin,
    setredCoin,
    setplayerBlue,
    setplayerRed
) => {
    if (playerBlue) {
        const { source, destination } = result
        if (!destination) {
            return
    }
}

export const redIdList = {
    droppable3: "inHand",
    droppable4: "inPlay",
}

export const getList2 = (id, RedState) => RedState[redIdList[id]]

export const onDragRed = (
    result,
    playerRed,
    RedState,
    setRedState,
    blueCoin,
    setblueCoin,
    setplayerBlue,
    setplayerRed
) => {
    if (playerRed) {
        const { source, destination } = result

        if (!destination) {
            return
        }

        if (source.droppableId === destination.droppableId) {
            const inHand = reorder(getList2(source.droppableId, RedState), source.index, destination.index)

            let stateRed = {
                inHand,
            }

            if (source.droppableId === "droppable4") {
                stateRed = {
                    inPlay: inHand,
                }
            }

            let swipe = {
                inHand: stateRed.inHand ? stateRed.inHand : RedState.inHand,
                inPlay: stateRed.inPlay ? stateRed.inPlay : RedState.inPlay,
            }

            setRedState(swipe)
        } else {
            const result = move(
                getList2(source.droppableId, RedState),
                getList2(destination.droppableId, RedState),
                source,
                destination
            )

    if (source.droppableId === destination.droppableId) {
      const inHand = reorder(
        getList2(source.droppableId, RedState),
        source.index,
        destination.index
      );

      let stateRed = { inHand };

      if (source.droppableId === "droppable4") {
        stateRed = { inPlay: inHand };
      }

      let swipe = {
        inHand: stateRed.inHand ? stateRed.inHand : RedState.inHand,
        inPlay: stateRed.inPlay ? stateRed.inPlay : RedState.inPlay,
      };

      setRedState(swipe);
    } else {
      const result = move(
        getList2(source.droppableId, RedState),
        getList2(destination.droppableId, RedState),
        source,
        destination
      );

      setRedState({
        inHand: result.droppable3,
        inPlay: result.droppable4,
      });
    }
    if (blueCoin == 0) {
      setblueCoin(0);
      swal("Red Team,You Have won This Match");
      setplayer1(false);
      setplayer2(false);
    } else {
      setblueCoin(blueCoin - 1);
    }
}
