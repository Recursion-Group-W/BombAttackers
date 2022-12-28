import { MidEnemy } from '../interfaces/midEnemy';
import { GenericLowEnemy } from './genericLowEnemy';

export class GenericMidEnemy
  extends GenericLowEnemy
  implements MidEnemy
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
    super(params, spriteKey,speed, stock, initialMode);
  }
}
