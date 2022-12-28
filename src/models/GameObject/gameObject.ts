//ゲーム内の全てのオブジェクトの親クラス
export class GameObject extends Phaser.Physics.Arcade
  .Sprite {
  protected spriteKey: string = '';

  constructor(
    params: {
      scene: Phaser.Scene;
      x: number;
      y: number;
    },
    spriteKey: string
  ) {
    super(params.scene, params.x, params.y, spriteKey);

    this.spriteKey = spriteKey;

    //Sceneに追加
    params.scene.add.existing(this);
    //物理計算を可能にする
    params.scene.physics.world.enable(this);
  }
}
