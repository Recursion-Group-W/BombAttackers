import { Character } from './character';

export class Player extends Character {
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private bombCounter: number;
  private bombPower:number;

  constructor(params: {
    scene: Phaser.Scene;
    x: number;
    y: number;
  }) {
    super(params, 'player');
    this.setSpeed(120);
    // 上、下、左、右、スペース、シフトのキーを含むオブジェクトを作成して返す。
    this.cursors =
      params.scene.input.keyboard.createCursorKeys();
    this.bombCounter = 3;
    this.bombPower = 2;

    params.scene.add.existing(this);
    params.scene.physics.world.enable(this);

    this.body.maxVelocity = <any>{ x: 250, y: 250 };

    this.setStock(3);
  }

  public get getBombPower() {
    return this.bombPower;
  }

  public bombPowerUp() {
    this.bombPower++;
  }

  update() {
    this.handleInput();
  }

  //敵とぶつかった時
  collideWithEnemy(stockText: Phaser.GameObjects.Text, gameOverText: Phaser.GameObjects.Text) {
    this.scene.cameras.main.shake(1000, 0.001);
    this.setTintFill(0xff0000);
    //残機を減らす
    this.setStock(this.getStock() - 1);

    //残機の表示を更新
    stockText.setText('Stock: ' + this.getStock());

    //残機が0になったらGAME OVER
    if (this.getStock() <= 0) {
      // this.disableBody(true, true);
      gameOverText.setText('GAME OVER');
      setTimeout(() => this.scene.scene.restart(), 1000);
    }
  }

  //爆風に重なった時
  overlapExplosion() {
    this.scene.cameras.main.shake(1000, 0.001);
    //残機を減らす
    this.setStock(this.getStock() - 1);
    //残機が0になったらオブジェクトを削除
    if (this.getStock() <= 0) {
      this.disableBody(true, true);
    }
  }

  handleInput() {
    if (this.cursors.left.isDown) {
      this.anims.play('player-right', true);
      this.setDirection(3);
      this.setVelocity(-this.getSpeed(), 0);
    } else if (this.cursors.right.isDown) {
      this.anims.play('player-right', true);
      this.setDirection(1);
      this.setVelocity(this.getSpeed(), 0);
    } else if (this.cursors.down.isDown) {
      this.anims.play('player-down', true);
      this.setDirection(2);
      this.setVelocity(0, this.getSpeed());
    } else if (this.cursors.up.isDown) {
      this.anims.play('player-up', true);
      this.setDirection(0);
      this.setVelocity(0, -this.getSpeed());
    } else {
      //キーが押されていない時
      switch (this.getDirection()) {
        case 0:
          this.anims.play('player-turn-up', true);
          break;
        case 1:
          break;
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
    this.flipX = this.getDirection() === 3;
  }

  public placingBomb() {
    return Phaser.Input.Keyboard.JustDown(this.cursors.space) && this.bombCounter > 0;
  }
  public decreaseBombCounter() {
    this.bombCounter--;
  }
  public increaseBombCounter() {
    this.bombCounter++;
  }
  
  // 爆弾を作る関数
}
