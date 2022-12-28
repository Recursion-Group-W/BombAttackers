import { GenericHighEnemy } from '../Generic/genericHighEnemy';

export class VolcanoHighEnemy extends GenericHighEnemy {
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
