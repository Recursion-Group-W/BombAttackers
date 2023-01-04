import { Namespace } from 'socket.io';

export default class IoGame {
  time: Date = new Date();

  constructor(public ioNspGame: Namespace) {
    ioNspGame.on('connect', async (socket: any) => {
      console.log('クライアントと接続しました');

      //接続が切れたとき
      socket.on('disconnect', () => {
        //退室する処理

        console.log('クライアントと接続が切れました');
      });
    });
  }
}
