import { HighEnemy } from '../interfaces/highEnemy';
import { GenericLowEnemy } from './genericLowEnemy';

export class GenericHighEnemy
  extends GenericLowEnemy
  implements HighEnemy
{
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
    super(params, spriteKey, speed, stock, initialMode);
  }
}
