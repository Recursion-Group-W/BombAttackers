import { GenericLowEnemy } from '../Generic/genericLowEnemy';
export class VolcanoLowEnemy extends GenericLowEnemy {
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
    super(params, speed, stock, initialMode);
  }
}
