import React from "react";
import {
   BrowserRouter as Router,
   Switch,
   Route,
   Link,
   useRouteMatch,
   useParams,
} from "react-router-dom";

import Game from "./Game";
import "./App.css";
import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import ViewCardsForUser from "./ViewCardsForUser";

export default function App() {
   return (
      <Router>
         <Switch>
            <Route path="/users" exact>
               <ViewCardsForUser />
            </Route>
            <Route path="/" exact>
               <div>
                  <Game />
                  <div className="source">
                     <a href="https://github.com/ntibi/fog_chess">source</a>
                  </div>
               </div>
            </Route>
         </Switch>
      </Router>
   );
}
