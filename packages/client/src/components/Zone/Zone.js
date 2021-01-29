import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { BlueTeam, RedTeam, LeftBar } from "../svgs/svgs";
import "./Zone.css";
import { DeckA, DeckB } from "../../../../engine/MockDecks";
import { move, reorder } from "../../../../engine/CardMove";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  OutOfPlayBlueClick,
  OutOfPlayRedClick,
  handleBlueClick,
  handleRedClick,
  onDragBlue,
} from "../../../../engine/zoneFunctions";

const grid = 3;

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: grid * 2,
  margin: `0 ${grid}px 0 0`,
  ...draggableStyle,
});

const getListStyle = () => ({
  padding: "0px 5px",
  width: "100%",
  height: "161px",
  border: "1px solid #FFFFFF",
  borderRadius: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: " center",
  margin: "10px",
  overflowX: "scroll",
});
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

  const id1List = {
    droppable: "inHand",
    droppable2: "inPlay",
  };
  const getList = (id) => BlueState[id1List[id]];

  const [RedState, setRedState] = useState({
    items: [],
    selected: DeckB.slice(0, 7),
  });

  // const onDragBlue = (result) => {
  //   if (playerBlue) {
  //     const { source, destination } = result;
  //     if (!destination) {
  //       return;
  //     }

  //     if (source.droppableId === destination.droppableId) {
  //       const blueOrder = reorder(
  //         getList(source.droppableId),
  //         source.index,
  //         destination.index
  //       );

  //       let stateBlue = { blueOrder };
  //       if (source.droppableId === "droppable2") {
  //         stateBlue = { selected: blueOrder };
  //       }

  //       let swipe = {
  //         inHand: stateBlue.blueOrder ? stateBlue.blueOrder : BlueState.inHand,
  //         inPlay: stateBlue.selected ? stateBlue.selected : BlueState.inPlay,
  //       };
  //       setBlueState(swipe);
  //     } else {
  //       const result = move(
  //         getList(source.droppableId),
  //         getList(destination.droppableId),
  //         source,
  //         destination
  //       );

  //       setBlueState({
  //         inHand: result.droppable,
  //         inPlay: result.droppable2,
  //       });

  //       if (redCoin == 0) {
  //         setredCoin(0);
  //         swal("Blue Team,You Have won This Match");
  //         setplayerBlue(!playerBlue);
  //         setplayerRed(!playerRed);
  //       } else {
  //         setredCoin(redCoin - 1);
  //       }
  //     }
  //   }
  // };

  const id2List = {
    droppable3: "items",
    droppable4: "selected",
  };

  const getList2 = (id) => RedState[id2List[id]];

  const onDragRed = (result) => {
    if (playerRed) {
      const { source, destination } = result;

      if (!destination) {
        return;
      }

      if (source.droppableId === destination.droppableId) {
        const redOrder = reorder(
          getList2(source.droppableId),
          source.index,
          destination.index
        );

        let stateRed = { redOrder };

        if (source.droppableId === "droppable4") {
          stateRed = { selected: redOrder };
        }
        let swipe = {
          items: stateRed.redOrder ? stateRed.redOrder : RedState.items,
          selected: stateRed.selected ? stateRed.selected : RedState.selected,
        };
        setRedState(swipe);
      } else {
        const result = move(
          getList2(source.droppableId),
          getList2(destination.droppableId),
          source,
          destination
        );

        setRedState({
          items: result.droppable3,
          selected: result.droppable4,
        });
      }
      if (blueCoin == 0) {
        setblueCoin(0);
        swal("Red Team,You Have won This Match");
        setplayerBlue(false);
        setplayerRed(false);
      } else {
        setblueCoin(blueCoin - 1);
      }
    }
  };

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
          <DragDropContext onDragEnd={(result)=>{onDragBlue(result,playerBlue, BlueState, setBlueState);}}>
           <Droppable droppableId="droppable" direction="horizontal">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {BlueState.inHand.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id.toString()}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                          onClick={() => {
                            OutOfPlayBlueClick(
                              item,
                              setblueCoin,
                              setBlueState,
                              isBlueTurn,
                              BlueState,
                              blueCoin
                            );
                          }}
                        >
                          <div className="play_card blue_play_card">
                            <div className="card_name">
                              <p>{item.name}</p>
                            </div>
                            <div className="card_space"></div>
                            <div className="hire">
                              <p>{item.type}</p>
                            </div>
                            <div className="card_detail">
                              <p>{item.abilities[0]}</p>
                              <p>{item.abilities[1]}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <Droppable droppableId="droppable2" direction="horizontal">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {BlueState.inPlay.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id.toString()}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <div className="play_card blue_play_card">
                            <div className="card_name">
                              <p>{item.name}</p>
                            </div>
                            <div className="card_space"></div>
                            <div className="hire">
                              <p>{item.type}</p>
                            </div>
                            <div className="card_detail">
                              <p>{item.abilities[0]}</p>
                              <p>{item.abilities[1]}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>

        <div className="status_message_area">
          <button className="btn">
            It's <strong>your</strong> turn , draw <strong>one</strong> card
          </button>
        </div>

        <div className={playerBlue ? "disable classname1" : "classname1"}>
          <DragDropContext onDragEnd={onDragRed}>
            <Droppable droppableId="droppable3" direction="horizontal">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {RedState.items.map((item, index) => {
                    return (
                      <Draggable
                        key={item.id}
                        draggableId={item.id.toString()}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                            <div className="play_card">
                              <div className="card_name">
                                <p>{item.name}</p>
                              </div>
                              <div className="card_space"></div>
                              <div className="hire">
                                <p>{item.type}</p>
                              </div>
                              <div className="card_detail">
                                <p>{item.abilities[0]}</p>
                                <p>{item.abilities[1]}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            <Droppable droppableId="droppable4" direction="horizontal">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {RedState.selected.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id.toString()}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                          onClick={() => {
                            OutOfPlayRedClick(
                              item,
                              RedState,
                              setRedState,
                              isRedTurn,
                              redCoin,
                              setredCoin
                            );
                          }}
                        >
                          <div className="play_card">
                            <div className="card_name">
                              <p>{item.name}</p>
                            </div>
                            <div className="card_space"></div>
                            <div className="hire">
                              <p>{item.type}</p>
                            </div>
                            <div className="card_detail">
                              <p>{item.abilities[0]}</p>
                              <p>{item.abilities[1]}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
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
                  handleBlueClick(
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
                  handleRedClick(redDeck, playerRed, RedState, setRedState);
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
