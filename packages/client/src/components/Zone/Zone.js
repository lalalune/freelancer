import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import BlueTeam from "../svgs/blueSvg";
import RedTeam from "../svgs/redSvg";
import LeftBar from "../svgs/leftBar";
import { DeckA, DeckB } from "../../../../engine/MockDecks";
import {
  move,
  reorder,
  getListStyle,
  getItemStyle,
} from "../../../../engine/CardMove";
import "./Zone.css";
import swal from "sweetalert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    items: DeckA.slice(0, 7),
    selected: [],
  });

  const [RedState, setRedState] = useState({
    items: [],
    selected: DeckB.slice(0, 7),
  });

  const id1List = {
    droppable: "items",
    droppable2: "selected",
  };

  const OutOfPlayBlueClick = (selected) => {
    const items = BlueState.items.filter((item) => item.id !== selected.id);
    setBlueState({ ...BlueState, items: items });
    isBlueTurn.BlueOutOfPlay.push(selected);
    setblueCoin(blueCoin - 1);
  };

  const OutOfPlayRedClick = (selected1) => {
    const item1 = RedState.selected.filter((item) => item.id !== selected1.id);
    setRedState({ ...RedState, selected: item1 });
    isRedTurn.RedOutOfPlay.push(selected1);
    setredCoin(redCoin - 1);
  };

  const getList = (id) => BlueState[id1List[id]];

  const handleBlueClick = (e) => {
    e.preventDefault();
    if (playerBlue) {
      var card = blueDeck;
      card.sort(() => Math.random() - 0.5);
      var blueCard = card.shift();
      BlueState.items.push(blueCard);
      setBlueState({ ...BlueState });
      if (BlueState.items.length > 8) {
        toast("You Need To discard you card");
      }
    }
  };

  const handleRedClick = (e) => {
    e.preventDefault();
    if (playerRed) {
      var card = redDeck;
      card.sort(() => Math.random() - 0.5);
      var redCard = card.shift();
      RedState.selected.push(redCard);
      setRedState({ ...RedState });
      if (RedState.selected.length > 8) {
        toast("You Need To discard you card");
      }
    }
  };

  const onDragBlue = (result) => {
    if (playerBlue) {
      const { source, destination } = result;
      if (!destination) {
        return;
      }

      if (source.droppableId === destination.droppableId) {
        const items = reorder(
          getList(source.droppableId),
          source.index,
          destination.index
        );

        let stateBlue = { items };
        if (source.droppableId === "droppable2") {
          stateBlue = { selected: items };
        }

        let swipe = {
          items: stateBlue.items ? stateBlue.items : BlueState.items,
          selected: stateBlue.selected
            ? stateBlue.selected
            : BlueState.selected,
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
          items: result.droppable,
          selected: result.droppable2,
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
        const items = reorder(
          getList2(source.droppableId),
          source.index,
          destination.index
        );

        let stateRed = { items };

        if (source.droppableId === "droppable4") {
          stateRed = { selected: items };
        }
        let swipe = {
          items: stateRed.items ? stateRed.items : RedState.items,
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
        {/* -----------blue----------- */}
        <div className={playerRed ? "disable" : ""}>
          <DragDropContext onDragEnd={onDragBlue}>
            <Droppable droppableId="droppable" direction="horizontal">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {BlueState.items.map((item, index) => (
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
                            OutOfPlayBlueClick(item);
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
                  {BlueState.selected.map((item, index) => (
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
                            OutOfPlayRedClick(item);
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
                onClick={handleBlueClick}
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
              <div className="play_card" onClick={handleRedClick}>
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
