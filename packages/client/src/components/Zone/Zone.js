import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import getBlueDeck from "../helper/blueDeck";
import getRedDeck from "../helper/redDeck";
import BlueTeam from "../svgs/blueSvg";
import RedTeam from "../svgs/redSvg";
import LeftBar from "../svgs/leftBar";
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

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const grid = 3;
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
  userSelect: "none",
  padding: grid * 2,
  margin: `0 ${grid}px 0 0`,
  // background: isDragging ? 'lightgreen' : 'grey',
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
  const [playerBlue, setplayerBlue] = useState(true);
  const [playerRed, setplayerRed] = useState(false);
  const [blueData, setBlueData] = useState(getBlueDecks.cards.slice(7));
  const [redData, setRedData] = useState(getRedDecks.cards.slice(7));
  const [blueCoin, setblueCoin] = useState(30);
  const [redCoin, setredCoin] = useState(30);
  const [isBlueTurn, setBlueTurn] = useState({ items: [] });
  const [rightBlock, setRightBlokck] = useState([]);
  const [state1, setState1] = useState({
    items: getBlueDecks.cards.slice(0, 7),
    selected: [],
  });

  const [state2, setState2] = useState({
    items: [],
    selected: getRedDecks.cards.slice(0, 7),
  });

  const id1List = {
    droppable: "items",
    droppable2: "selected",
  };

  const handleRightClick = () => {
    const items = state1.items.filter((item) => item.id !== rightBlock.id);
    setState1({ ...state1, items: items });
    isBlueTurn.items.push(rightBlock);
    setBlueTurn({ ...isBlueTurn });
  };

  const getList = (id) => state1[id1List[id]];

  const handleBlueClick = (e) => {
    e.preventDefault();
    if (playerBlue) {
      var card = blueData;
      var blueCard = card.shift();
      state1.items.push(blueCard);
      setState1({ ...state1 });
      // setplayerRed(true);
      // setplayerBlue(false);
    }
  };

  const handleRedClick = (e) => {
    e.preventDefault();
    if (playerRed) {
      var card = redData;
      var redCard = card.shift();
      state2.selected.push(redCard);
      setState2({ ...state2 });
      // setplayerBlue(true);
      // setplayerRed(false);
    }
  };

  const onDragEnd = (result) => {
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

        if (blueCoin == 0) {
          //  setblueCoin(0);
          setplayerBlue(!playerBlue);
          setplayerRed(!playerRed);
        } else {
          setblueCoin(blueCoin - 1);
        }
      }
      // setplayerRed(true);
      // setplayerBlue(false);
    }
  };

  const id2List = {
    droppable3: "items",
    droppable4: "selected",
  };

  const getList2 = (id) => state2[id2List[id]];

  const onDragEnd1 = (result) => {
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
      if (redCoin == 0) {
        //  setblueCoin(0);
        setplayerBlue(!playerBlue);
        setplayerRed(!playerRed);
      } else {
        setredCoin(redCoin - 1);
      }
      // setplayerBlue(true);
      // setplayerRed(false);
    }
  };
  return (
    <div className="zone_main">
      <div className="zone_left_bar">
        <BlueTeam blueCoins={blueCoin} />
        <RedTeam redCoins={redCoin} />
        <div className="card_box">
          {isBlueTurn.items.map((item, index) => {
            return (
              <div className="play_card blue_play_card" key={index}>
                <div className="card_name">
                  <p>Card Name</p>
                </div>
                <div className="card_space"></div>
                <div className="hire">
                  <p>hire</p>
                </div>
                <div className="card_detail">
                  <p>{item.id}</p>
                  <p>{item.abilities[0]}</p>
                  <p>{item.abilities[1]}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="card_box">
          <div className="play_card ">
            <div className="card_name">
              <p>name</p>
            </div>
            <div className="card_space"></div>
            <div className="hire">
              <p>hire</p>
            </div>
            <div className="card_detail">
            
              <p>card</p>
              <p>card</p>
            </div>
          </div>
        </div>
      </div>
      <div className="zone_centre_bar">
        {/* -----------blue----------- */}
        <div className={playerRed ? "disable" : ""}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable" direction="horizontal">
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
                          onClick={() => setRightBlokck(item)}
                        >
                          <div className="play_card blue_play_card">
                            <div className="card_name">
                              <p>Card Name</p>
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
        <div className={playerRed ? "disable" : ""}>
          <div className="status_message_area">
            <button className="btn" onClick={handleRightClick}>
              It's <strong>your</strong> turn , draw <strong>one</strong> card
            </button>
          </div>
        </div>
        <div className={playerBlue ? "disable classname1" : "classname1"}>
          <DragDropContext onDragEnd={onDragEnd1}>
            <Droppable droppableId="droppable3" direction="horizontal">
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
                            <div className="play_card" onClick={handleRedClick}>
                              <div className="card_name">
                                <p>Card Name</p>
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
          <div className="card_remain"> {blueData.length} CARDS REMAINING</div>
          <div className="card_box ">
            {blueData.length != 0 ? (
              <div
                className="play_card blue_play_card"
                onClick={handleBlueClick}
              >
                <div className="card_name">
                  <p>{getBlueDecks.name}</p>
                </div>
                <div className="card_space"></div>
                <div className="hire">
                  <p>hire</p>
                </div>
                <div className="card_detail">
                 
                  <p>{blueData[0].abilities[0]}</p>
                  <p>{blueData[0].abilities[1]}</p>
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
            {redData.length != 0 ? (
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
                  
                    <p>{redData[0].abilities[0]}</p>
                    <p>{redData[0].abilities[1]}</p>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="card_remain"> {redData.length} CARDS REMAINING</div>
        </div>
      </div>
    </div>
  );
};

export default Zone;
