export class Bomb extends Phaser.Physics.Arcade.Sprite {
  private strength = 1;
  constructor(
    params: {
      scene: Phaser.Scene;
      x: number;
      y: number;
    }
  ) {
    super(params.scene, params.x, params.y, 'bomb');
    params.scene.add.existing(this);
    params.scene.physics.world.enable(this);

    this.body.maxVelocity = <any>{ x: 150, y: 150 };
  }
}
