import { Namespace } from 'socket.io';
import RoomManager from '../manager/roomManager';

export default class IoGame {
  time: Date = new Date();

  constructor(public ioNspGame: Namespace, public roomManager: RoomManager) {
    ioNspGame.on('connect', async (socket: any) => {
      console.log('クライアントと接続しました');

      //clientIdを生成して送信する処理
      roomManager.generateClientId(socket)


      

      //接続が切れたとき
      socket.on('disconnect', () => {
        //退室する処理

        console.log('クライアントと接続が切れました');
      });
    });
  }
}
