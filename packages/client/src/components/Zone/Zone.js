import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import BlueTeam from "../svgs/blueSvg";
import RedTeam from "../svgs/redSvg";
import LeftBar from "../svgs/leftBar";
import {
  move,
  reorder,
  getListStyle,
  getItemStyle,
  getBlueDecks,
  getRedDecks,
} from "./functions";
import "./Zone.css";

const Zone = () => {
  const [playerBlue, setplayerBlue] = useState(true);
  const [playerRed, setplayerRed] = useState(false);
  const [blueData, setBlueData] = useState(getBlueDecks.cards.slice(7));
  const [redData, setRedData] = useState(getRedDecks.cards.slice(7));
  const [blueCoin, setblueCoin] = useState(30);
  const [redCoin, setredCoin] = useState(30);
  const [isBlueTurn, setBlueTurn] = useState({ items: [] });
  //const [leftBlock, setBlueLeft] = useState(null);
  const [isRedTurn, setRedTurn] = useState({ selected: [] });
  // const [leftBlockRed, setLeftBlockRed] = useState(null);
  const [state1, setState1] = useState({
    items: getBlueDecks.cards.slice(0, 7),
    selected: [],
  });
  const [state3, setState3] = useState({ item1: [] });
  const [state2, setState2] = useState({
    items: [],
    selected: getRedDecks.cards.slice(0, 7),
  });

  const id1List = {
    droppable: "items",
    droppable2: "selected",
  };

  const handleRightClick = () => {
    const items = state1.items;
    console.log(items);
    const card = items.shift();
    //setState1({ ...state1, items: items });
    isBlueTurn.items.push(card);
    setBlueTurn({ ...isBlueTurn });
    setBlueLeft(null);
    setblueCoin(blueCoin - 1);
  };

  const handleRightClicks = () => {
    const selected = state2.selected;
    const card = selected.shift();
    //setState2({ ...state2, selected: selected });
    isRedTurn.selected.push(card);
    setRedTurn({ ...isRedTurn });
    //setLeftBlockRed(null);
  };

  const getList = (id) => state1[id1List[id]];

  const handleBlueClick = (e) => {
    e.preventDefault();
    if (playerBlue) {
      var card = blueData;
      card.sort(() => Math.random() - 0.5);
      if (card[0].abilities[0] == "DRAW_1") {
        var blueCard = card.shift();
        state1.items.push(blueCard);
        setState1({ ...state1 });
      } else {
        console.log("you can not pushed element");
      }
      // setplayerRed(true);
      // setplayerBlue(false);
    }
  };

  const handleRedClick = (e) => {
    e.preventDefault();
    if (playerRed) {
      var card = redData;
      card.sort(() => Math.random() - 0.5);
      if (card[0].abilities[0] == "DRAW_1") {
        var redCard = card.shift();
        console.log("redCard", redCard);
        state2.selected.push(redCard);
        setState2({ ...state2 });
      } else {
        console.log("you can not pushed element");
      }
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
        console.log(source.droppableId, destination.droppableId, "result");
        setState1({
          items: result.droppable,
          selected: result.droppable2,
        });

        // if (blueCoin == 0) {
        //  setblueCoin(0);
        // setplayerBlue(!playerBlue);
        // setplayerRed(!playerRed);
        // } else {
        // setblueCoin(blueCoin - 1);
        setredCoin(redCoin - 1);
        // }
      }
    }
    // setplayerRed(true);
    // setplayerBlue(false);
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
      // if (redCoin == 0) {
      //  setblueCoin(0);
      //   setplayerBlue(!playerBlue);
      //   setplayerRed(!playerRed);
      // } else {
      //  setredCoin(redCoin - 1);
      setblueCoin(blueCoin - 1);
      // }
      // setplayerBlue(true);
      // setplayerRed(false);
    }
  };
  return (
    <div className="zone_main">
      <div className="zone_left_bar">
        <BlueTeam blueCoins={blueCoin} />
        <RedTeam redCoins={redCoin} />
        <div className="card_box ">
          {isBlueTurn.items.length != 0 ? (
            <div className="play_card blue_play_card">
              <div className="card_name">
                <p>{getBlueDecks.name}</p>
              </div>
              <div className="card_space"></div>
              <div className="hire">
                <p>{isBlueTurn.items[0].type}</p>
              </div>
              <div className="card_detail">
                <p>{isBlueTurn.items.length}</p>
                <p>{isBlueTurn.items[0].abilities[0]}</p>
                <p>{isBlueTurn.items[0].abilities[1]}</p>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="card_box ">
          {isRedTurn.selected.length != 0 ? (
            <div className="play_card">
              <div>
                <div className="card_name">
                  <p>{getRedDecks.name}</p>
                </div>
                <div className="card_space"></div>
                <div className="hire">
                  <p>{isRedTurn.selected[0].type}</p>
                </div>
                <div className="card_detail">
                  <p>{isRedTurn.selected[0].abilities[0]}</p>
                  <p>{isRedTurn.selected[0].abilities[1]}</p>
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
                          onClick={handleRightClick}
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
                              <p>{item.id}</p>
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

        <div className="status_message_area">
          <button
            className="btn"
            // onClick={() => {
            //   {
            //     playerBlue ? handleRightClick() : handleRightClicks();
            //   }
            // }}
          >
            It's <strong>your</strong> turn , draw <strong>one</strong> card
          </button>
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
                          onClick={handleRightClicks}
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
                              <p>{item.id}</p>
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
