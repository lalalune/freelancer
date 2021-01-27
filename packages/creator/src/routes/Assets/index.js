import React, { useState, useEffect } from 'react'
// import { useHistory } from "react-router-dom";
import { useAppContext } from "../../libs/contextLib";
import './style.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getTokens } from "../../functions/UIStateFunctions.js";
import CardGrid from "../../components/CardGrid";
import Loader from "../../components/Loader";

// export default () => {
//   const history = useHistory();
//   const { globalState, setGlobalState } = useAppContext();
//   console.log("globalState", globalState);
//   const [booths, setBooths] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [currentCard, setCurrentCard] = useState(null);

//   const pathName = window.location.pathname.split("/")[2];

//   useEffect(() => {
//     if (pathName && pathName != "") {
//       setCurrentCard(pathName);
//     } else if (pathName === "" || pathName === undefined || !pathName) {
//       console.log("pathName is now", pathName);
//       setCurrentCard(null);
//     }

//   }, [pathName]);

//   useEffect(() => {
//     (async () => {
//       const booths = await getBooths(0, globalState);
//       setBooths(booths);
//     })();

//     if (pathName && pathName != "") {
//       setCurrentCard(pathName);
//     } else if (!pathName) {
//       setCurrentCard(null);
//     }
//   }, []);

//   useEffect(() => {
//     if (booths && booths.length > 0) {
//       setLoading(false);
//     }
//   }, [booths, currentCard]);

//   useEffect(() => {
//     if (!currentCard) return;

//     if (currentCard && currentCard.hide === true) {
//       setCurrentCard(null);
//       history.push("/assets");
//     } else if (currentCard && currentCard.id) {
//       history.push("/assets/" + currentCard.id);
//     }
//   }, [currentCard]);

//   return !loading && booths && booths.length > 0 ?
//     <div className="container row construct-row mt-5">
//       <div className="col-2">
//         <div className="gray-card">
//           <div className="gray-card-detail">
//             <p>SELECT DECK</p>
//             <p>New</p>
//           </div>
//         </div>
//       </div>
//       <div className="col-10">
//         <CardGrid data={booths} globalState={globalState} cardSize="" currentCard={currentCard} setCurrentCard={setCurrentCard} filter={true}/>
//       </div>
//     </div>
//   :
//     <div className="container">
//       <Loader loading={true} />
//     </div>
// }


export default ({ data }) => {
  const [hasMore, setHasMore] = useState(true);
  const [start, setStart] = useState(51);
  const [end, setEnd] = useState(60);
  const [cardData, setCardData] = useState(null);
  const { globalState, setGlobalState } = useAppContext();

  useEffect(() => {
    (async () => {
      const data = await getTokens(1, 50);
      setCardData(data);
    })();
  }, []);

  const fetchData = async () => {
    const newData = await getTokens(start, end);

    if (newData[newData.length-1].minter.address === "0x0000000000000000000000000000000000000000") {
      setHasMore(false);
      return;
    }

    setCardData(cardData.concat(newData));
    setStart(start+20);
    setEnd(end+20);
  }

  return (
    
    // <div className="container">
    //   { cardData ?
    //     <InfiniteScroll
    //       dataLength={cardData.length} //This is important field to render the next data
    //       next={fetchData}
    //       hasMore={hasMore}
    //       loader={<p className="containerText">Loading...</p>}
    //       endMessage={
    //         <p className="containerText">
    //           You have seen it all!
    //         </p>
    //       }
    //     >
    //       <CardGrid data={cardData} cardSize="small" globalState={globalState} />
    //     </InfiniteScroll>
    //   :
    //     <Loader loading={true} />
    //   }
    // </div>
    cardData && cardData.length > 0 &&
    <div className="container row construct-row mt-5">
      <div className="col-2">
        <div className="gray-card">
          <div className="gray-card-detail">
            <p>SELECT DECK</p>
            <p>New</p>
          </div>
        </div>
      </div>
      <div className="col-10">
        <CardGrid data={cardData} globalState={globalState} cardSize="" filter={true}/>
      </div>
    </div>
  )
}
