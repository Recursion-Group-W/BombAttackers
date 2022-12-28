import { GenericMidEnemy } from '../Generic/genericMidEnemy';

export class VolcanoMidEnemy extends GenericMidEnemy {
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
