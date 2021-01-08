import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import './Zone.css';

// fake data generator
const getItems = (count, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k + offset}`,
    content: `item ${k + offset}`
  }));

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

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  margin: "5px",

  // change background colour if dragging
  // background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  padding: "0px 5px",
  width: "100%",
  height: "205px",
  border: "1px solid #FFFFFF",
  borderRadius: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: " center",
  margin: "10px",
  overflow: "hidden",


});

//---------------------------------------------------------------------
const Zone = () => {
  const [state1, setState1] = useState({
    items: getItems(7),
    selected: getItems(2, 7)
  })
  const [state2, setState2] = useState({
    items: getItems(3),
    selected: getItems(1, 3)
  })

  const id1List = {
    droppable: 'items',
    droppable2: 'selected'
  };

  const getList = id => state1[id1List[id]];

  const onDragEnd = result => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        getList(source.droppableId),
        source.index,
        destination.index
      );

      let state = { items };

      if (source.droppableId === 'droppable2') {
        state = { selected: items };
      }

      setState1(state);
    } else {
      const result = move(
        getList(source.droppableId),
        getList(destination.droppableId),
        source,
        destination
      );

      setState1({
        items: result.droppable,
        selected: result.droppable2
      });
    }
  };

  const id2List = {
    droppable3: 'items',
    droppable4: 'selected'
  };

  const getList2 = id => state1[id2List[id]];

  const onDragEnd1 = result => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        getList2(source.droppableId),
        source.index,
        destination.index
      );

      let state = { items };

      if (source.droppableId === 'droppable4') {
        state = { selected: items };
      }

      setState2(state);
    } else {
      const result = move(
        getList2(source.droppableId),
        getList2(destination.droppableId),
        source,
        destination
      );

      setState2({
        items: result.droppable,
        selected: result.droppable2
      });
    }
  };

  return (
    <div className="zone_main">
      <div className="zone_left_bar">
        <div className="blue_team">
          <div className="blue_team_icon">
            <svg width="356" height="62" viewBox="0 0 356 62" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0.00012207L310.144 6.60975e-05L356 33.0001L5.58998e-06 33.0002L0 0.00012207Z" fill="#062AAA" />
              <path d="M-4 61.0551L296.325 61.0551L320.67 42L-4 42.0001L-4 61.0551Z" fill="#062AAA" />
              <path d="M328.634 43.1747L306.624 60.141L314.876 60.141L337.436 43.1747L328.634 43.1747Z" fill="#062AAA" />
              <path d="M347.131 43.1935L325.319 60.1411L334.671 60.1411L355.933 43.1935L347.131 43.1935Z" fill="#062AAA" />
            </svg>
            <div className="blue_coins_count">
              <div className="coins_count">
                <svg width="21" height="34" viewBox="0 0 21 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 21V13L0 17.2786L10 21Z" fill="white" />
                  <path d="M10 11.8288V0L0 16L10 11.8288Z" fill="white" />
                  <path d="M11 0V11.7866L21 16L11 0Z" fill="white" />
                  <path d="M11 13V21L21 17.2813L11 13Z" fill="white" />
                  <path d="M11 22.1712L11 34L21 18L11 22.1712Z" fill="white" />
                  <path d="M10 34L10 22.2134L-1.39876e-06 18L10 34Z" fill="white" />
                </svg>
                <p className="coins_count_text">COIN</p>
                <p className="team_name">BLUE TEAM</p>
              </div>
            </div>
          </div>
        </div>
        <div className="blue_team red_team">
          <div className="blue_team_icon">
            <svg width="356" height="64" viewBox="0 0 356 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M-1.5 0.00012207L310.144 8.14737e-05L356 33.0001L-1.49999 33.0002L-1.5 0.00012207Z" fill="#AA0606" />
              <path d="M-4 63.0551L296.325 63.055L320.67 44L-4 44L-4 63.0551Z" fill="#AA0606" />
              <path d="M328.634 45.1747L306.624 62.141L314.876 62.141L337.436 45.1747L328.634 45.1747Z" fill="#AA0606" />
              <path d="M347.131 45.1935L325.319 62.1411L334.671 62.1411L355.933 45.1935L347.131 45.1935Z" fill="#AA0606" />
            </svg>
            <div className="blue_coins_count">
              <div className="coins_count">
                <svg width="21" height="34" viewBox="0 0 21 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 21V13L0 17.2786L10 21Z" fill="white" />
                  <path d="M10 11.8288V0L0 16L10 11.8288Z" fill="white" />
                  <path d="M11 0V11.7866L21 16L11 0Z" fill="white" />
                  <path d="M11 13V21L21 17.2813L11 13Z" fill="white" />
                  <path d="M11 22.1712L11 34L21 18L11 22.1712Z" fill="white" />
                  <path d="M10 34L10 22.2134L-1.39876e-06 18L10 34Z" fill="white" />
                </svg>
                <p className="coins_count_text">COIN</p>
                <p className="team_name">RED TEAM</p>
              </div>
            </div>
          </div>
        </div>
        <div className="card_box">
          <div className="card_text">
          </div>
        </div>
        <div className="card_box">
          <div className="card_text">
          </div>
        </div>
      </div>
      <div className="zone_centre_bar">
        {/* ---------------------- */}
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}>
                {state1.items.map((item, index) => (
                  <Draggable
                    key={item.id}
                    draggableId={item.id}
                    index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}>
                        {/* {item.content} */}
                        <div class="play_card blue_play_card">
                          <div class="card_name">
                            <p>CARD NAME</p>
                          </div>
                          <div class="card_space">

                          </div>
                          <div class="hire">
                            <p>hire</p>
                          </div>
                          <div class="card_detail">
                            <p>Discard 1.</p>
                            <p>Draw 3.</p>
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
                style={getListStyle(snapshot.isDraggingOver)}>
                {state1.selected.map((item, index) => (
                  <Draggable
                    key={item.id}
                    draggableId={item.id}
                    index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}>
                        {/* {item.content} */}
                        <div class="play_card blue_play_card">
                          <div class="card_name">
                            <p>CARD NAME</p>
                          </div>
                          <div class="card_space">

                          </div>
                          <div class="hire">
                            <p>hire</p>
                          </div>
                          <div class="card_detail">
                            <p>Discard 1.</p>
                            <p>Draw 3.</p>
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
        {/* ---------------------- */}
        {/* <div className="status_message_area">
          <p>Status Message Area</p>
        </div> */}
        {/* ------red---------- */}
        <DragDropContext onDragEnd={onDragEnd1}>
          <Droppable droppableId="droppable3">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}>
                {state2.items.map((item, index) => (
                  <Draggable
                    key={item.id}
                    draggableId={item.id}
                    index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}>
                        {/* {item.content} */}
                        <div class="play_card">
                          <div class="card_name">
                            <p>CARD NAME</p>
                          </div>
                          <div class="card_space">

                          </div>
                          <div class="hire">
                            <p>hire</p>
                          </div>
                          <div class="card_detail">
                            <p>Discard 1.</p>
                            <p>Draw 3.</p>
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
          <Droppable droppableId="droppable4">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}>
                {state2.selected.map((item, index) => (
                  <Draggable
                    key={item.id}
                    draggableId={item.id}
                    index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}>
                        {/* {item.content} */}
                        <div class="play_card">
                          <div class="card_name">
                            <p>CARD NAME</p>
                          </div>
                          <div class="card_space">

                          </div>
                          <div class="hire">
                            <p>hire</p>
                          </div>
                          <div class="card_detail">
                            <p>Discard 1.</p>
                            <p>Draw 3.</p>
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
        {/* ------red---------- */}
      </div>
      <div className="zone_right_bar">
        <div className="menu_set">
          <svg width="30" height="23" viewBox="0 0 30 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 2H30" stroke="white" strokeWidth="3" />
            <path d="M0 11.5H30" stroke="white" strokeWidth="3" />
            <path d="M0 21.5H30" stroke="white" strokeWidth="3" />
          </svg>
        </div>
        <div className="card_box">
          <div class="play_card blue_play_card">
            <div class="card_name">
              <p>CARD NAME</p>
            </div>
            <div class="card_space">

            </div>
            <div class="hire">
              <p>hire</p>
            </div>
            <div class="card_detail">
              <p>Discard 1.</p>
              <p>Draw 3.</p>
            </div>
          </div>
        </div>
        {/* <div className="action_button">
          <button>ACTION BUTTON</button>
        </div> */}
        <div className="card_box">
          <div class="play_card">
            <div class="card_name">
              <p>CARD NAME</p>
            </div>
            <div class="card_space">

            </div>
            <div class="hire">
              <p>hire</p>
            </div>
            <div class="card_detail">
              <p>Discard 1.</p>
              <p>Draw 3.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Zone;
