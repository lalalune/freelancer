import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import getBlueDeck from "../helper/blueDeck";
import getRedDeck from "../helper/redDeck";
import BlueTeam from "../svgs/blueSvg";
import RedTeam from "../svgs/redSvg";
import "./Zone.css";

const getBlueDecks = {
  name: "Test Deck",
  cards: getBlueDeck.cards.map((item, index) => {
    item.id = index;
    return item;
  }),
};

const getRedDecks = {
  name: "Test Deck",
  cards: getRedDeck.cards.map((item, index) => {
    item.id = index;
    return item;
  }),
};

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);
  destClone.splice(droppableDestination.index, 0, removed);
  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;
  return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  margin: "5px",
  // change background colour if dragging
  // background: isDragging ? 'lightgreen' : 'grey',
  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  padding: "0px 5px",
  width: "100%",
  height: "205px",
  border: "1px solid #FFFFFF",
  borderRadius: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: " center",
  margin: "10px",
  overflowX: "scroll",
});

const Zone = () => {
  const [player1, setplayer1] = useState(false);
  const [player2, setplayer2] = useState(true);
  const [state1, setState1] = useState({
    items: [],
    selected: [],
  });

  const [state2, setState2] = useState({
    items: [],
    selected: [],
  });

  const id1List = {
    droppable: "items",
    droppable2: "selected",
  };

  const getList = (id) => state1[id1List[id]];

  const handleBlueClick = (e) => {
    e.preventDefault();
    if (player2) {
      var card = getBlueDecks.cards;
      var blueCard = card.shift();
      state1.items.push(blueCard);
      setState1({ ...state1 });
      setplayer1(true);
      setplayer2(false);
    }
  };

  const handleRedClick = (e) => {
    e.preventDefault();
    if (player1) {
      var card = getRedDecks.cards;
      var redCard = card.shift();
      state2.items.push(redCard);
      setState2({ ...state2 });
      setplayer2(true);
      setplayer1(false);
    }
  };
  const onDragEnd = (result) => {
    if (player1) {
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
          items: stateBlue.items ? stateBlue.items : state1.items,
          selected: stateBlue.selected ? stateBlue.selected : state1.selected,
        };
        setState1(swipe);
      } else {
        const result = move(
          getList(source.droppableId),
          getList(destination.droppableId),
          source,
          destination
        );
        setState1({
          items: result.droppable,
          selected: result.droppable2,
        });
      }
      setplayer1(true);
      setplayer2(false);
    }
  };

  const id2List = {
    droppable3: "items",
    droppable4: "selected",
  };

  const getList2 = (id) => state2[id2List[id]];

  const onDragEnd1 = (result) => {
    if (player2) {
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
          items: stateRed.items ? stateRed.items : state2.items,
          selected: stateRed.selected ? stateRed.selected : state2.selected,
        };
        setState2(swipe);
      } else {
        const result = move(
          getList2(source.droppableId),
          getList2(destination.droppableId),
          source,
          destination
        );

        setState2({
          items: result.droppable3,
          selected: result.droppable4,
        });
      }
      setplayer2(true);
      setplayer1(false);
    }
  };
  return (
    <div className="zone_main">
      <div className="zone_left_bar">
        <RedTeam />
        <BlueTeam />
        <div className="card_box">
          <div className="card_text"></div>
        </div>
        <div className="card_box">
          <div className="card_text"></div>
        </div>
      </div>
      <div className="zone_centre_bar">
        {/* -----------blue----------- */}
        <div className={player2 ? "disable" : ""}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {state1.items.map((item, index) => (
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
                              <p>Card Name</p>
                            </div>
                            <div className="card_space"></div>
                            <div className="hire">
                              <p>hire</p>
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
            <Droppable droppableId="droppable2">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {state1.selected.map((item, index) => (
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
                              <p>Card Name</p>
                            </div>
                            <div className="card_space"></div>
                            <div className="hire">
                              <p>hire</p>
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
        {/* ---------blue------------- */}
        {/* <div className="status_message_area">
          <pu>Status Message Area</pu
        </div> */}
        {/* ------red---------- */}
        <div className={player1 ? "disable" : ""}>
          <DragDropContext onDragEnd={onDragEnd1}>
            <Droppable droppableId="droppable3">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {state2.items.map((item, index) => {
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
                                <p>Card Name</p>
                              </div>
                              <div className="card_space"></div>
                              <div className="hire">
                                <p>hire</p>
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
            <Droppable droppableId="droppable4">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {state2.selected.map((item, index) => (
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
                              <p>Card Name</p>
                            </div>
                            <div className="card_space"></div>
                            <div className="hire">
                              <p>hire</p>
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
        <div className="menu_set">
          <svg
            width="30"
            height="23"
            viewBox="0 0 30 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 2H30" stroke="white" strokeWidth="3" />
            <path d="M0 11.5H30" stroke="white" strokeWidth="3" />
            <path d="M0 21.5H30" stroke="white" strokeWidth="3" />
          </svg>
        </div>
        <div className={"card_box " + (player1 ? "  card_box_disable2" : "")}>
          {getBlueDecks.cards.length != 0 ? (
            <div className="play_card blue_play_card" onClick={handleBlueClick}>
              <div className="card_name">
                <p>{getBlueDecks.name}</p>
              </div>
              <div className="card_space"></div>
              <div className="hire">
                <p>hire</p>
              </div>
              <div className="card_detail">
                <p>{getBlueDecks.cards[0].abilities[0]}</p>
                <p>{getBlueDecks.cards[0].abilities[1]}</p>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        {/* <div className="action_button">
          <button>ACTION BUTTON</button>
        </div> */}
        <div className={"card_box " + (player2 ? "  card_box_disable" : "")}>
          {getRedDecks.cards.length != 0 ? (
            <div className="play_card" onClick={handleRedClick}>
              <div>
                <div className="card_name">
                  <p>{getRedDecks.name}</p>
                </div>
                <div className="card_space"></div>
                <div className="hire">
                  <p>hire</p>
                </div>
                <div className="card_detail">
                  <p>{getRedDecks.cards[0].abilities[0]}</p>
                  <p>{getRedDecks.cards[0].abilities[1]}</p>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Zone;
