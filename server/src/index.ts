import express from 'express';
import { createServer } from 'http';

const app = express();
const httpServer = createServer(app);

const PORT = 5000;

httpServer.listen(PORT, () => {
  console.log(`Server is runnning PORT:${PORT}`);
});
