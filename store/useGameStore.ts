import create from 'zustand/react';
import { GameState } from '../types/useGameStore.type';

//プレイ中のゲームの状態を管理
export const useGameStore = create<GameState>((set) => ({
  //初期値
  game: {
    player: {
      name: '',
      spriteKey: '',
      stock: 0, // 残機
      bomb: {
        putOnce: 0, // 1度に置ける個数
        range: 0, // 爆発の範囲
        power: 0, // 爆弾の威力
      },
      speed: 0, // 速さ
    },
    stage: { type: '', level: 0 }, // 現在のステージ
    time: 0, // プレイ時間
    killCount: 0, // 倒した敵の数
  },

  //状態を更新するメソッド
  updateGame: (payload) =>
    set({
      game: {
        player: {
          name: payload.player.name,
          spriteKey: payload.player.spriteKey,
          stock: payload.player.stock,
          bomb: {
            putOnce: payload.player.bomb?.putOnce,
            range: payload.player.bomb?.range,
            power: payload.player.bomb?.power,
          },
          speed: payload.player.speed,
        },
        stage: {
          type: payload.stage?.type,
          level: payload.stage?.level,
        },
        time: payload.time,
        killCount: payload.killCount,
      },
    }),

  //状態をリセットするメソッド
  resetGame: () =>
    set({
      game: {
        player: {
          id: '',
          name: '',
          spriteKey: '',
          stock: 0,
          bomb: {
            putOnce: 0,
            range: 0,
            power: 0,
          },
          speed: 0,
        },
        stage: { type: '', level: 0 },
        time: 0,
        killCount: 0,
      },
    }),
}));
