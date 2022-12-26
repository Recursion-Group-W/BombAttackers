type Position = {
  x: number;
  y: number;
};

interface GameObject {
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

export class Character
  extends Phaser.Physics.Arcade.Sprite
  implements GameObject
{
  private id: number;
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
    type: string
  ) {
    super(params.scene, params.x, params.y, type);
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
