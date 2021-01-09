import React, { useEffect, useState } from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

import { CardEffects } from "../../engine/CardEffects";

const Card = ({ cards }) => {
   const [state, setstate] = useState([]);
   useEffect(() => {
      let finalData = [];
      cards.cards.map((cardData, index) => {
         cardData.abilities.map((data) => {
            if (data.split("_")[0].toLowerCase() === "recruit") {
               finalData.push({
                  desc: CardEffects["RECRUIT"].description.replace(
                     "$AMT",
                     CardEffects["RECRUIT"].levels[data.split("_")[1]].amount
                  ),
               });
            } else if (data.split("_")[0].toLowerCase() === "discard") {
               finalData.push({
                  desc: CardEffects["REMOVE"].description.replace(
                     "$AMT",
                     CardEffects["REMOVE"].levels[data.split("_")[1]].amount
                  ),
               });
            }
         });
         if (cards.cards.length === index + 1) {
            setstate(finalData);
         }
      });
   }, []);

   return (
      <>
         {state.map((cardData, index) => (
            <>
               <TextareaAutosize
                  key={index}
                  aria-label="minimum height"
                  rowsMin={3}
                  value={cardData.desc}
               />
               <br />
            </>
         ))}
      </>
   );
};

export default Card;
