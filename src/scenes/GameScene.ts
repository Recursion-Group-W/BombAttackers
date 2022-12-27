import { Scene } from 'phaser';
import { Enemy } from '../models/enemy';
import { Player } from '../models/player';
import { Bomb } from '../models/bomb';
import { setTimeout } from 'timers/promises';
import { LocationDisabled } from '@mui/icons-material';

export class GameScene extends Scene {
  private width: number; //描画範囲(width)
  private height: number; //描画範囲(width)
  private player: Player; //プレイヤー
  private enemies: Phaser.GameObjects.Group; //敵キャラのグループ
  private map: Phaser.Tilemaps.Tilemap; //タイルマップ（ステージ）
  private level: number; //ステージレベル
  private scoreText: Phaser.GameObjects.Text;
  private stockText: Phaser.GameObjects.Text;
  private gameOverText: Phaser.GameObjects.Text;
  private bombs: Phaser.GameObjects.Group;
  private bombLog: {
    x: number;
    y: number;
    existed: boolean;
  };

  constructor() {
    super({ key: 'GameScene' });
    this.bombLog = {
      x: -1,
      y: -1,
      existed: false,
    };
  }

  //init, preload, create, updateはSceneに用意されているメソッドなので、オーバーライドする
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
    const tiles = this.map.addTilesetImage(
      'tileset',
      'tileset'
    );

    const groundLayer = this.map.createLayer(
      'ground',
      tiles,
      0,
      0
    );
    const wallLayer = this.map.createLayer(
      'wall',
      tiles,
      0,
      0
    );
    const blockLayer = this.map.createLayer(
      'blocks',
      tiles,
      0,
      0
    );
    this.bombs = this.physics.add.staticGroup();
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

    const objectLayer = this.map.getObjectLayer('objects');
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

    // 残機
    this.stockText = this.add.text(
      16,
      0,
      `Stock ${this.player.getStock()}`,
      {
        fontSize: '32px',
      }
    );

    // ゲームオーバー表示を追加する
    this.gameOverText = this.add.text(400, 300, '', {
      fontSize: '64px',
    });
    this.gameOverText.setOrigin(0.5);

    //衝突を設定
    // overlapはすり抜ける（爆弾,アイテム取得など）
    // colliderはすり抜けずに衝突する
    this.physics.add.collider(wallLayer, this.player);
    this.physics.add.collider(blockLayer, this.player);
    this.physics.add.collider(wallLayer, this.enemies);
    this.physics.add.collider(blockLayer, this.enemies);
    this.physics.add.collider(this.bombs, this.player);
    this.physics.add.collider(this.bombs, this.enemies);
    this.physics.add.collider(
      this.player,
      this.enemies,
      (
        player: Phaser.Types.Physics.Arcade.GameObjectWithBody,
        enemy: Phaser.Types.Physics.Arcade.GameObjectWithBody
      ) => {
        //衝突した時の処理
        player.collideWithEnemy(
          this.stockText,
          this.gameOverText
        );
        enemy.collideWithPlayer();
      },
      null,
      this
    );
    //すり抜けた時（爆弾、アイテムなど）
    // this.physics.add.overlap(
    //   this.player,
    //   this.bomb,
    //   () => {
    //     //すり抜けた時の処理(残機を減らす、アイテム取得)
    //   }
    // );
  }

  // 爆弾を作る関数

  update() {
    //キー入力によってプレイヤーの位置を更新
    this.player.update();

    let bomb: any;
    if (this.player.placingBomb()) {
      if (
        this.bombLog.x != this.player.x ||
        this.bombLog.y != this.player.y ||
        !this.bombLog.existed
      ) {
        bomb = new Bomb({
          scene: this,
          x: this.player.x,
          y: this.player.y,
        });
        this.bombLog.existed = true;
        this.player.decreaseBombCounter();
        bomb.anims.play('bomb-anime', true);
        window.setTimeout(() => {
          this.bombLog.x = bomb.x;
          this.bombLog.y = bomb.y;
          bomb.destroy();
          this.bombLog.existed = false;
          this.player.increaseBombCounter();
        }, 2000);
      }
    }
    //敵の位置を更新
    this.enemies.getChildren().forEach((e) => e.update());
  }

  //アニメーション設定
  initAnimation() {
    //アニメーションマネージャー
    this.anims.create({
      key: 'player-right',
      frameRate: 10,
      repeat: 0,
      frames: this.anims.generateFrameNumbers('player', {
        start: 5,
        end: 7,
      }),
    });
    this.anims.create({
      key: 'player-turn-right',
      frameRate: 10,
      repeat: 0,
      frames: [{ key: 'player', frame: 4 }],
    });
    this.anims.create({
      key: 'player-down',
      frameRate: 10,
      repeat: 0,
      frames: this.anims.generateFrameNumbers('player', {
        start: 2,
        end: 3,
      }),
    });
    this.anims.create({
      key: 'player-turn-down',
      frameRate: 10,
      repeat: 0,
      frames: [{ key: 'player', frame: 1 }],
    });
    this.anims.create({
      key: 'player-up',
      frameRate: 10,
      repeat: 0,
      frames: this.anims.generateFrameNumbers('player', {
        start: 8,
        end: 9,
      }),
    });
    this.anims.create({
      key: 'player-turn-up',
      frameRate: 10,
      repeat: 0,
      frames: [{ key: 'player', frame: 0 }],
    });

    this.anims.create({
      key: 'enemy-right',
      frameRate: 10,
      repeat: -1,
      frames: this.anims.generateFrameNumbers('enemy', {
        start: 5,
        end: 7,
      }),
    });
    this.anims.create({
      key: 'enemy-turn-right',
      frameRate: 10,
      repeat: 0,
      frames: [{ key: 'player', frame: 4 }],
    });
    this.anims.create({
      key: 'enemy-down',
      frameRate: 10,
      repeat: -1,
      frames: this.anims.generateFrameNumbers('enemy', {
        start: 2,
        end: 3,
      }),
    });
    this.anims.create({
      key: 'enemy-turn-down',
      frameRate: 10,
      repeat: 0,
      frames: [{ key: 'enemy', frame: 1 }],
    });
    this.anims.create({
      key: 'enemy-up',
      frameRate: 10,
      repeat: -1,
      frames: this.anims.generateFrameNumbers('enemy', {
        start: 8,
        end: 9,
      }),
    });
    this.anims.create({
      key: 'enemy-turn-up',
      frameRate: 10,
      repeat: 0,
      frames: [{ key: 'enemy', frame: 0 }],
    });
    this.anims.create({
      key: 'bomb-anime',
      frameRate: 10,
      repeat: 2,
      frames: this.anims.generateFrameNumbers('bomb', {
        start: 0,
        end: 7,
      }),
    });
  }
}
