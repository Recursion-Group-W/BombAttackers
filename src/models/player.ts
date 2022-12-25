import { Character } from './character';

export class Player extends Character {
  private cursors: any;
  // 0:up, 1:right, 2:down, 3:left

  constructor(params: {
    scene: Phaser.Scene;
    x: number;
    y: number;
  }) {
    super(params, 'player');
    this.speed = 500;
    // 上、下、左、右、スペース、シフトのキーを含むオブジェクトを作成して返す。
    this.cursors =
      params.scene.input.keyboard.createCursorKeys();

    params.scene.add.existing(this);
    params.scene.physics.world.enable(this);

    this.body.maxVelocity = <any>{ x: 150, y: 150 };
  }

  public update() {
    this.handleInput();
  }

  public handleInput() {
    if (this.cursors.left.isDown) {
      this.anims.play('player-right', true);
      this.direction = 3;
      this.setVelocityX(-this.speed);
      this.setVelocityY(0);
    } else if (this.cursors.right.isDown) {
      this.anims.play('player-right', true);
      this.direction = 1;
      this.setVelocityX(this.speed);
      this.setVelocityY(0);
    } else if (this.cursors.down.isDown) {
      this.anims.play('player-down', true);
      this.direction = 2;
      this.setVelocityX(0);
      this.setVelocityY(this.speed);
    } else if (this.cursors.up.isDown) {
      this.anims.play('player-walk-up', true);
      this.direction = 0;
      this.setVelocityX(0);
      this.setVelocityY(-this.speed);
    } else {
      switch (this.direction) {
        case 0:
          this.anims.play('player-turn-up', true);
          break;
        case 1:
        case 2:
          this.anims.play('player-turn-down', true);
          break;
        case 3:
          this.anims.play('player-turn-right', true);
          break;
      }
      this.setVelocity(0, 0);
    }

    //左に進むときは右方向の動きを反転させる
    this.flipX = this.direction === 3;
  }
}
