import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import IoGame from './socket/ioGame';

const app = express();
const httpServer = createServer(app);

const PORT = 5000;

const io = new Server(httpServer, {
  cors: {
    origin: ['http://localhost:3005'],
  },
});

//ゲームに関するソケット通信を行うためのNameSpace
const ioNspGame = io.of('/game');
const ioGame = new IoGame(ioNspGame);

httpServer.listen(PORT, () => {
  console.log(`Server is runnning PORT:${PORT}`);
});
