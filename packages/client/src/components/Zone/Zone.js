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
import swal from "sweetalert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Zone = () => {
  const [playerBlue, setplayerBlue] = useState(true);
  const [playerRed, setplayerRed] = useState(false);
  const [blueData, setBlueData] = useState(getBlueDecks.cards.slice(7));
  const [redData, setRedData] = useState(getRedDecks.cards.slice(7));
  const [blueCoin, setblueCoin] = useState(30);
  const [redCoin, setredCoin] = useState(30);
  const [isBlueTurn, setBlueTurn] = useState({ items: [] });
  const [isRedTurn, setRedTurn] = useState({ selected: [] });
  const [state1, setState1] = useState({
    items: getBlueDecks.cards.slice(0, 7),
    selected: [],
  });

  const [state2, setState2] = useState({
    items: [],
    selected: getBlueDecks.cards.slice(0, 7),
  });

  const id1List = {
    droppable: "items",
    droppable2: "selected",
  };

  const handleRightClick = (selected) => {
    if (selected.abilities[0] == "DRAW_1") {
      const items = state1.items.filter((item) => item.id !== selected.id);
      setState1({ ...state1, items: items });
      isBlueTurn.items.push(selected);
      setblueCoin(blueCoin - 1);
      // setBlueTurn({ ...isBlueTurn });
      // setBlueLeft(null);
      // setplayerBlue(false);
      // setplayerRed(true);
    } else {
      toast("It's Charge Card !");
    }
  };

  const handleRightClicks = (selected1) => {
    if (selected1.abilities[0] == "DRAW_1") {
      const item1 = state2.selected.filter((item) => item.id !== selected1.id);
      setState2({ ...state2, selected: item1 });
      isRedTurn.selected.push(selected1);
      //setRedTurn({ ...isRedTurn });
      //setState2({ ...state2, selected: selected });
      //setLeftBlockRed(null);
      setredCoin(redCoin - 1);
    } else {
      toast("It's Charge Card!");
    }
    // setplayerBlue(true);
    // setplayerRed(false);
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
        if (state1.items.length > 8) {
          toast("You Need To discard you card");
        }
      } else {
        toast("Can Not move this card");
        // toast("Wow so easy !");
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
        state2.selected.push(redCard);
        setState2({ ...state2 });
        if (state2.selected.length > 8) {
          toast("You Need To discard you card");
        }
      } else {
        toast("Can Not move this card");
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

        setState1({
          items: result.droppable,
          selected: result.droppable2,
        });

        if (redCoin == 0) {
          setredCoin(0);
          swal("Blue Team,You Have won This Match");
          setplayerBlue(!playerBlue);
          setplayerRed(!playerRed);
        } else {
          // setblueCoin(blueCoin - 1);
          setredCoin(redCoin - 1);
        }
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
      if (blueCoin == 0) {
        setblueCoin(0);
        swal("Red Team,You Have won This Match");
        setplayerBlue(false);
        setplayerRed(false);
      } else {
        //  setredCoin(redCoin - 1);
        setblueCoin(blueCoin - 1);
      }
      // setplayerBlue(true);
      // setplayerRed(false);
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
                          onClick={() => {
                            handleRightClick(item);
                          }}
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

        <div className="status_message_area">
          <button className="btn">
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
                          onClick={() => {
                            handleRightClicks(item);
                          }}
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
          // disabled
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
