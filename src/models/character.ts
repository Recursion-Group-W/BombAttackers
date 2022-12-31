type Position = {
  x: number;
  y: number;
};

interface GameObject {
  //   getName(): string;
  get getDirection(): number; //向きを取得
  get getPosition(): Position; //位置を取得
  get getSpeed(): number; //速さを取得
  get getRemainingLives(): number; //残機を取得
  // getHP(): number;
  isAlive(): boolean; //残機があるかどうか
  set setDirection(value: number); //向きを設定
  set setSpeed(value: number); //速さを設定
  set setRemainingLives(value: number); //残機を設定
  accelerate(value: number): void; //加速
}

export class Character
  extends Phaser.Physics.Arcade.Sprite
  implements GameObject
{
  private id = 0;
  private characterName = "NoName";
  // private img: string;
  private speed = 0;
  // 0:up, 1:right, 2:down, 3:left
  private direction = 2;
  private remainingLives = 0; // protectedにしてset/getを不要にした方が扱いやすいかも

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

  public get getID():number{
    return this.id;
  }
  public set setID(ID:number){
    this.id = ID;
  }
  public get getDirection():number {
    return this.direction;
  }
  public get getPosition(): Position {
    return { x: this.x, y: this.y };
  }
  public get getSpeed(): number {
    return this.speed;
  }
  public set setSpeed(value: number) {
    this.speed = value;
  }
  public get getRemainingLives(): number {
    return this.remainingLives;
  }
  public isAlive(): boolean {
    return this.remainingLives >= 0;
  }
  public set setDirection(value: number) {
    this.direction = value;
  }
  public set setRemainingLives(value: number){
    this.remainingLives = value;
  }

  public accelerate(value: number): void {
    this.setSpeed = this.getSpeed + value;
  }
}
