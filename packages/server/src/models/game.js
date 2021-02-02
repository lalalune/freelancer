const { io } = require("./io");
const redis = require("./redis");

const start = async (id1, id2) => {
  const [socket1, socket2] = await redis.mget([
    `client:${id1}`,
    `client:${id2}`,
  ]);

  await io().to(socket1).emit("start");
  await io().to(socket2).emit("start");
  console.log(`match started between ${id1} and ${id2}`);
};

const disconnect = async (session_id) => {
  await redis.hmset(`game:${session_id}`, "connected", false);
  const [opponent, connected] = await redis.hmget(
    `game:${session_id}`,
    "opponent",
    "connected"
  );
  if (!opponent) return;
  console.log(`${session_id} was in a game`);
  const socket = await redis.get(`client:${opponent}`);
  if (connected && socket) {
    await io().to(socket).emit("info", {
      message: "opponent disconnected",
    });
    console.log(`${session_id} opponent (${opponent}) was notified`);
  } else {
    await redis.del(`game:${session_id}`, `game:${opponent}`);
    console.log(
      `${session_id} opponent (${opponent}) disconnected too, stopped the game`
    );
  }
};

const recover = async (session_id) => {
  const [opponent, turn] = await redis.hmget(
    `game:${session_id}`,
    "opponent",
    "turn"
  );
  if (opponent && turn) {
    console.log(`recovering ${session_id} game against ${opponent}`);
    const player_socket = await redis.get(`client:${session_id}`);
    const opponent_socket = await redis.get(`client:${opponent}`);
    // await io().to(player_socket).emit("recover")
    // await io().to(opponent_socket).emit("recover")
  }
};

const hostCreateNewGame = async (req, res) => {
  const GameId = await Math.random().toString(36).substr(2, 9);
  console.log(GameId)
  redis.set(GameId, (err, reply) => {
    if (err) {
      res.status(404).json(err);
    } else {
      res.status(200).json({
        message: "Success",
        data: [
          {
            GameCode: reply,
          },
        ],
      });
    }
  });
};

module.exports = {
  start,
  disconnect,
  recover,
  hostCreateNewGame,
};
