import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import axios from "axios";

import "./ViewCardsForUser.css";
import Card from "../Card/Card";

const ViewCardsForUser = () => {
   const [result, setResult] = useState(null);
   const [inputValue, setInputValue] = useState(null);
   const onSubmitHandler = () => {
      axios
         .get(`https://tokens.webaverse.com/${inputValue}`)
         .then((response) => {
            response.data
               .filter((obj) => obj.description === "(Freelancer)")
               .map(async (data) => {
                  let parseData = {
                     name: "Test Deck 1",
                     cards: [
                        {
                           assetId: 246,
                           abilities: ["RECRUIT_1", "DISCARD_2"],
                        },
                     ],
                  };
                  setResult(parseData);
               });
         });
   };

   return (
      <div className="wrapper">
         <div className="item__wrapper">
            <TextField
               id="outlined-basic"
               label="Address"
               variant="outlined"
               onChange={(e) => setInputValue(e.target.value)}
            />

            <Button
               variant="contained"
               color="primary"
               onClick={onSubmitHandler}
            >
               Submit
            </Button>
            {result && <Card cards={result} />}
         </div>
      </div>
   );
};

export default ViewCardsForUser;
