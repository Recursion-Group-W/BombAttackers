import { Character } from './character';

export class Enemy extends Character {
  constructor(params: {
    scene: Phaser.Scene;
    x: number;
    y: number;
  }) {
    super(params, 'enemy');
    this.speed = 150;

    //Arcade Physicsをゲームオブジェクトに追加
    params.scene.physics.world.enable(this);
    //Sceneにゲームオブジェクトを追加
    params.scene.add.existing(this);
  }

  public update() {
    if (this.body.velocity.x + this.body.velocity.y === 0) {
      if (this.body.velocity.x == 0) {
        this.direction === 1
          ? this.moveLeft()
          : this.moveRight();
      } else if (this.body.velocity.y === 0) {
        this.direction === 0
          ? this.moveDown()
          : this.moveUp();
      }
    }
  }

  moveUp() {
    this.direction = 0;
    this.setVelocityX(0);
    this.setVelocityY(-this.speed);
    this.anims.play('enemy-up', true);
  }

  moveRight() {
    this.direction = 1;
    this.setVelocityX(this.speed);
    this.setVelocityY(0);
    this.flipX = false;
    this.anims.play('enemy-right', true);
  }

  moveDown() {
    this.direction = 2;
    this.setVelocityX(0);
    this.setVelocityY(this.speed);
    this.anims.play('enemy-down', true);
  }

  moveLeft() {
    this.direction = 3;
    this.setVelocityX(-this.speed);
    this.setVelocityY(0);
    this.flipX = true;
    this.anims.play('enemy-right', true);
  }
}
