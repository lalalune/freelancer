import React, { useState } from "react";
import {
  OutOfPlayBlueClick,
  onDragBlue,
} from "../../../../engine/zoneFunctions";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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

const BlueDrop = (props) => {
  
  return (
    <DragDropContext
      onDragEnd={(result) => {
        onDragBlue(
          result,
          props.playerBlue,
          props.BlueState,
          props.setBlueState,
          props.redCoin,
          props.setredCoin,
          props.setplayerBlue,
          props.setplayerRed
        );
      }}
    >
      <Droppable droppableId="droppable" direction="horizontal">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {props.BlueState.inHand &&
              props.BlueState.inHand.map((item, index) => {
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
                        onClick={() => {
                          OutOfPlayBlueClick(
                            item,
                            props.setblueCoin,
                            props.setBlueState,
                            props.isBlueTurn,
                            props.BlueState,
                            props.blueCoin
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
                            <p>{item.id}</p>
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
      <Droppable droppableId="droppable2" direction="horizontal">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {props.BlueState.inPlay &&
              props.BlueState.inPlay.map((item, index) => {
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
                );
              })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default BlueDrop;
