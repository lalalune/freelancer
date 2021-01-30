import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import Game from "./Game/Game"
import ManiMenu from "./ManiMenu/ManiMenu"
import HostGame from "./HostGame/HostGame"
import QuickMatch from "./QuickMatch/QuickMatch"
import JoinGame from "./JoinGame/JoinGame"
import Zone from "./Zone/Zone"
import ZoneLayout from "./ZoneLayout/ZoneLayout"

import "./App.css"
import "normalize.css"
import "@blueprintjs/core/lib/css/blueprint.css"
import ViewCardsForUser from "./ViewCardsForUser/ViewCardsForUser"

export default function App() {
    return (
        <Router>
            <Switch>
                <Route path="/users" exact>
                    <ViewCardsForUser />
                </Route>
                <Route path="/mainmenu" exact>
                    <ManiMenu />
                </Route>
                <Route path="/hostgame" exact>
                    <HostGame />
                </Route>
                <Route path="/quickmatch" exact>
                    <QuickMatch />
                </Route>
                <Route path="/join" exact>
                    <JoinGame />
                </Route>
                <Route path="/zone" exact>
                    <Zone />
                </Route>
                <Route path="/zonelayout" exact>
                    <ZoneLayout />
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
    )
}
