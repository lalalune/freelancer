import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { OutOfPlayRedClick, onDragRed } from "../../../../engine/zoneFunctions";

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
const RedDrop = (props) => {
  return (
    <DragDropContext
      onDragEnd={(result) => {
        onDragRed(
          result,
          props.playerRed,
          props.RedState,
          props.setRedState,
          props.blueCoin,
          props.setblueCoin,
          props.setplayerBlue,
          props.setplayerRed
        );
      }}
    >
      <Droppable droppableId="droppable3" direction="horizontal">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {props.RedState.inHand.map((item, index) => {
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
            {props.RedState.inPlay.map((item, index) => (
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
                        props.RedState,
                        props.setRedState,
                        props.isRedTurn,
                        props.redCoin,
                        props.setredCoin
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
  );
};

export default RedDrop;
