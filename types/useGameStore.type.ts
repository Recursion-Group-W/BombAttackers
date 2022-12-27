//プレイ中のゲームの状態を管理するための型
type Game = {
  player: {
    name?: string;
    spriteKey?: string; //Phaserが読み込むオブジェクト画像のキー
    stock?: number; // 残機
    bomb?: {
      putOnce?: number; // 1度に置ける個数
      range?: number; // 爆発の範囲
      power?: number; // 爆弾の威力
    };
    speed?: number; // 速さ
  };
  stage?: { type?: string; level?: number }; // 現在のステージ
  time?: number; // プレイ時間
  killCount?: number; // 倒した敵の数
};

//useGameStoreが持つ状態とメソッドの型
export type GameState = {
  game: Game;
  updateGame: (payload: Game) => void;
  resetGame: () => void;
};
