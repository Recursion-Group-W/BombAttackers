type Position = {
  x: number;
  y: number;
};

interface GameObject {
  //   getName(): string;
  //   getPosition(): Position;
  //   getSpeed(): number {
  //     return this.speed;
  //   }
  //   setSpeed(value: number): void {
  //     this.speed = value;
  //   }
  //   accelerate(value: number): void {
  //     this.setSpeed(this.getSpeed() + value);
  //   }
}

// ↓↓↓ implements GameObject
export class Character extends Phaser.Physics.Arcade
  .Sprite {
  protected id: number;
  protected characterName: string;
  //   protected img: string;

  protected speed: number = 0;
  // 0:up, 1:right, 2:down, 3:left
  protected direction: number = 2;
  protected isAlive: boolean = true;

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

  //   getPosition(): Position {
  //     return { x: this.x, y: this.y };
  //   }
  //   getSpeed(): number {
  //     return this.speed;
  //   }
  //   setSpeed(value: number): void {
  //     this.speed = value;
  //   }
  //   accelerate(value: number): void {
  //     this.setSpeed(this.getSpeed() + value);
  //   }
}
