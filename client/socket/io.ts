import { io } from 'socket.io-client';

const url = 'http://localhost:5000';
export const socket = io(`${url}/game`);
