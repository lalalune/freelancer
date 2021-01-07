import React, { useCallback, useRef, useState } from "react";
import useWindowSize from "../../hooks/useWindowSize";
import "./Board.css";

const cancel = (e) => {
  e.preventDefault();
  return false;
};

export default function Board() {
  const [selected, select] = useState();

  const size = useWindowSize();
  const board = useRef(null);

  const mouse_down = useCallback(
    (e) => {
      switch (e.button) {
        case 0: // left click
        case 2: // right click
          select();
          break;
      }
    },
    [select]
  );

  return (
    <div ref={board} className="board_wrapper">
      <div
        className="board"
        onMouseDown={mouse_down}
        onContextMenu={cancel}
        style={{
          
        }}
      >
      </div>
    </div>
  );
}
