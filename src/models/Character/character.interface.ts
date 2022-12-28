import { Position } from '../../types/position';

export interface Character {
  //   getName(): string;
  getDirection(): number; //向きを取得
  getPosition(): Position; //位置を取得
  getSpeed(): number; //速さを取得
  getStock(): number; //残機を取得
  // getHP(): number;
  isAlive(): boolean; //残機があるかどうか
  setDirection(value: number): void; //向きを設定
  setSpeed(value: number): void; //速さを設定
  setStock(value: number): void; //残機を設定
  accelerate(value: number): void; //加速
}
