import getBlueDeck from "../helper/blueDeck";
import getRedDeck from "../helper/redDeck";

export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export const move = (
  source,
  destination,
  droppableSource,
  droppableDestination
) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);
  destClone.splice(droppableDestination.index, 0, removed);
  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;
  return result;
};
export const grid = 3;
export const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: grid * 2,
  margin: `0 ${grid}px 0 0`,
  // background: isDragging ? 'lightgreen' : 'grey',
  ...draggableStyle,
});
export const getListStyle = (isDraggingOver) => ({
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
export const getBlueDecks = {
  name: "Test Deck",
  cards: getBlueDeck.cards.map((item, index) => {
    item.id = index;
    return item;
  }),
};
export const getRedDecks = {
  name: "Test Deck",
  cards: getRedDeck.cards.map((item, index) => {
    item.id = index;
    return item;
  }),
};
