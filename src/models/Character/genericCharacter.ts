import { Position } from '../../types/position';
import { GameObject } from '../GameObject/gameObject';
import { Character } from './character.interface';

export class GenericCharacter
  extends GameObject
  implements Character
{
  private characterName: string;
  //   private img: string;

  private speed: number = 0;
  // 0:up, 1:right, 2:down, 3:left
  private direction: number = 2;

  private stock: number = 0;

  constructor(
    params: {
      scene: Phaser.Scene;
      x: number;
      y: number;
    },
    spriteKey: string
  ) {
    super(params, spriteKey);

    // //Arcade Physicsをゲームオブジェクトに追加
    // params.scene.physics.world.enable(this);
    // //Sceneにゲームオブジェクトを追加
    // params.scene.add.existing(this);
  }

  getDirection() {
    return this.direction;
  }

  getPosition(): Position {
    return { x: this.x, y: this.y };
  }
  getSpeed(): number {
    return this.speed;
  }
  setSpeed(value: number): void {
    this.speed = value;
  }
  getStock(): number {
    return this.stock;
  }
  isAlive(): boolean {
    return this.stock !== 0;
  }

  setDirection(value: number) {
    this.direction = value;
  }

  setStock(value: number): void {
    this.stock = value;
  }
  accelerate(value: number): void {
    this.setSpeed(this.getSpeed() + value);
  }
}
