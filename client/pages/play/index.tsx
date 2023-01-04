import React from 'react';
import { socket } from '../../socket/io';

const index = () => {
  socket.on('connect', () => {
    console.log("サーバーと接続しました");
  });
  return <div>index</div>;
};

export default index;
