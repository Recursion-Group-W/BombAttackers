import { LowEnemy } from '../interfaces/lowEnemy.interface';
import { GenericEnemy } from './genericEnemy';

export class GenericLowEnemy extends GenericEnemy implements LowEnemy {
  constructor(
    params: {
      scene: Phaser.Scene;
      x: number;
      y: number;
    },
    spriteKey: string,
    speed: number,
    stock: number,
    initialMode: string
  ) {
    super(params, spriteKey,speed, stock, initialMode);
  }
}
