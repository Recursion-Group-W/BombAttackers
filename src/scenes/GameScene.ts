import { Scene } from 'phaser';
import { Enemy } from '../models/enemy';
import { Player } from '../models/player';

export class GameScene extends Scene {
  private width: number;
  private height: number;
  private player: Player;
  private enemies: Phaser.GameObjects.Group;
  private map: Phaser.Tilemaps.Tilemap;
  private level: number;

  constructor() {
    super({ key: 'GameScene' });
  }

  init(data: { stageLevel: number }) {
    this.level = data.stageLevel;
  }

  preload() {
    const width: string | number =
      this.scene.systems.game.config['width'];
    const height: string | number =
      this.scene.systems.game.config['height'];

    this.width =
      typeof width === 'string' ? parseInt(width) : width;
    this.height =
      typeof height === 'string'
        ? parseInt(height)
        : height;
  }

  create() {
    this.map = this.make.tilemap({
      key: `stage${this.level}`,
    });
    let tiles = this.map.addTilesetImage(
      'tileset',
      'tileset'
    );

    let groundLayer = this.map.createLayer(
      'ground',
      tiles,
      0,
      0
    );
    let wallLayer = this.map.createLayer(
      'wall',
      tiles,
      0,
      0
    );
    let blockLayer = this.map.createLayer(
      'blocks',
      tiles,
      0,
      0
    );
    //ステージマップの衝突を有効にする
    groundLayer.setCollisionByExclusion([-1], true);
    wallLayer.setCollisionByExclusion([-1], true);
    blockLayer.setCollisionByExclusion([-1], true);

    //ステージマップの境界を設定
    this.physics.world.bounds.width = groundLayer.width;
    this.physics.world.bounds.height = groundLayer.height;
    //ステージマップの衝突を有効にする。(left, right, up, down)
    this.physics.world.setBoundsCollision(
      true,
      true,
      true,
      true
    );

    //キー操作のアニメーション実行
    this.initAnimation();

    //敵キャラたち
    this.enemies = this.add.group();

    let objectLayer = this.map.getObjectLayer('objects');
    objectLayer.objects.forEach((object) => {
      if (object.name === 'player') {
        this.player = new Player({
          scene: this,
          x: object.x + 0,
          y: object.y + 0,
        });
      }
      if (object.name === 'enemy') {
        this.enemies.add(
          new Enemy({
            scene: this,
            x: object.x + 0,
            y: object.y + 0,
          })
        );
      }
    });
    //衝突を設定
    // overlapはすり抜ける（アイテム取得など）
    // colliderはすり抜けずに衝突する
    this.physics.add.collider(wallLayer, this.player);
    this.physics.add.collider(blockLayer, this.player);
    this.physics.add.collider(wallLayer, this.enemies);
    this.physics.add.collider(blockLayer, this.enemies);
    this.physics.add.collider(
      this.player,
      this.enemies,
      () => {
        //衝突した時の処理(残機を減らす)
      }
    );
  }

  update() {
    //キーによってプレイヤーの位置を更新
    this.player.update();
    //敵の位置を更新
    this.enemies.getChildren().forEach((e) => e.update());
  }

  initAnimation() {
    //アニメーションマネージャー
    let anims = this.anims;
    anims.create({
      key: 'player-right',
      frameRate: 10,
      repeat: 0,
      frames: anims.generateFrameNumbers('player', {
        start: 5,
        end: 7,
      }),
    });
    anims.create({
      key: 'player-turn-right',
      frameRate: 10,
      repeat: 0,
      frames: [{ key: 'player', frame: 4 }],
    });
    anims.create({
      key: 'player-down',
      frameRate: 10,
      repeat: 0,
      frames: anims.generateFrameNumbers('player', {
        start: 2,
        end: 3,
      }),
    });
    anims.create({
      key: 'player-turn-down',
      frameRate: 10,
      repeat: 0,
      frames: [{ key: 'player', frame: 1 }],
    });
    anims.create({
      key: 'player-up',
      frameRate: 10,
      repeat: 0,
      frames: anims.generateFrameNumbers('player', {
        start: 8,
        end: 9,
      }),
    });
    anims.create({
      key: 'player-turn-up',
      frameRate: 10,
      repeat: 0,
      frames: [{ key: 'player', frame: 0 }],
    });

    anims.create({
      key: 'enemy-right',
      frameRate: 10,
      repeat: -1,
      frames: anims.generateFrameNumbers('enemy', {
        start: 5,
        end: 7,
      }),
    });
    anims.create({
      key: 'enemy-turn-right',
      frameRate: 10,
      repeat: 0,
      frames: [{ key: 'player', frame: 4 }],
    });
    anims.create({
      key: 'enemy-down',
      frameRate: 10,
      repeat: -1,
      frames: anims.generateFrameNumbers('enemy', {
        start: 2,
        end: 3,
      }),
    });
    anims.create({
      key: 'enemy-turn-down',
      frameRate: 10,
      repeat: 0,
      frames: [{ key: 'enemy', frame: 1 }],
    });
    anims.create({
      key: 'enemy-up',
      frameRate: 10,
      repeat: -1,
      frames: anims.generateFrameNumbers('enemy', {
        start: 8,
        end: 9,
      }),
    });
    anims.create({
      key: 'enemy-turn-up',
      frameRate: 10,
      repeat: 0,
      frames: [{ key: 'enemy', frame: 0 }],
    });
  }
}
