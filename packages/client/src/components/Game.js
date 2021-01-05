import React, { useCallback, useEffect, useState } from 'react';
import "./Game.css"
import Over from "./Over"
import Board from "./Board"
import Online from "./interface/Online"
import { axios } from "../utils/axios"

const Players = {
  PlayerOne: 0,
  PlayerTwo: 1
}

export default function Game() {
  const [over, set_over] = useState(false)
  const [turn, set_turn] = useState(Players.PlayerOne)
  const [online, set_online] = useState(false)
  const [socket, set_socket] = useState()
  const [move_to_send, send_move] = useState(false)

  useEffect(() => {
    if (move_to_send) {
      socket.once("move", ({ src, dst }) => move(src, dst))
      const { src, dst } = move_to_send
      if (src && dst)
        axios.post("/api/game/move", { src, dst })
      send_move(false)
    }
  }, [move_to_send])

  const restart = useCallback(() => {
    const turn = Players.PlayerOne;
    set_over()
    set_turn(turn)
  }, [set_over, set_turn])

  const start_online = useCallback((socket) => {
    restart()
    set_online(true)
    set_socket(socket)
  }, [restart, set_online, set_socket])


  return (
    <div className="game">
      <Online
      start={start_online}
      started={online}
      />
      <Board />
      {over &&
        <Over
          winner={over}
          won={over === controls}
          restart={restart}
        />}

    </div>
  )
}
