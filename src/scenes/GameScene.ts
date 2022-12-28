import { Scene } from 'phaser';
import { Enemy } from '../models/enemy';
import { Player } from '../models/player';
import { Bomb } from '../models/bomb';
import { View } from '../view/view';

export class GameScene extends Scene {
  private width: number; //描画範囲(width)
  private height: number; //描画範囲(width)
  private player: Player; //プレイヤー
  private enemies: Phaser.GameObjects.Group; //敵キャラのグループ
  // note:mapはcurrentMapとそれ以外みたいな保持の仕方もあり？
  private map: Phaser.Tilemaps.Tilemap; //タイルマップ（ステージ）
  private timer: number;
  private level: number; //ステージレベル
  private isGameOver: boolean;
  private isGameClear: boolean;
  // 絵柄のデザインをこだわるならidで判別するよりstring型が良い？exモナリザ、洞窟
  private stageName: string;
  private scoreText: Phaser.GameObjects.Text;
  private stockText: Phaser.GameObjects.Text;
  private gameOverText: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'GameScene' });
    this.timer = 0;
    // Playerのparamsの座標などの取得がわからないのでいじらないでおきます
    this.player = new Player(),
    // this.enemies = [],
    this.isGameOver = false,
    this.isGameClear = false,
    this.stageName = "first"
    // とりあえず残機を４に設定
    // this.player.setRemainingLives = 4
  }

  // getter,setter
  public get getWidth():number{
    return this.width;
  }

  public set setWidth(newWidth:number){
    this.width = newWidth;
  }

  public get getHeight():number{
    return this.height;
  }

  public set setHeight(newHeight:number){
    this.height = newHeight;
  }

  public get getIsGameOver():boolean{
    return this.isGameOver;
  }

  public set setIsGameOver(gameStatus:boolean){
    this.isGameOver = gameStatus;
  }

  public get getIsGameClear():boolean{
    return this.isGameClear;
  }

  public set setIsGameClear(gameStatus:boolean){
    this.isGameClear = gameStatus;
  }

  public get getStageName():string{
    return this.stageName;
  }

  public set setStageName(nextStage:string){
    this.stageName = nextStage;
  }

  //init, preload, create, updateはSceneに用意されているメソッドなので、オーバーライドする
  init(data: { stageLevel: number }) {
    this.level = data.stageLevel;
  }
  // note:widthやheightの再宣言の理由
  // note:データ型の理由
  // note:コンストラクタで行わない理由

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
    // note:12/28 コンストラクターでやらない理由
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
      `Stock ${this.player.getRemainingLives}`,
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

  update() {
    //キー入力によってプレイヤーの位置を更新
    this.player.update();
    if (this.player.placingBomb()) {
      const bomb = new Bomb({
        scene: this,
        x: this.player.x,
        y: this.player.y,
      });
    };
    //敵の位置を更新
    this.enemies.getChildren().forEach((e) => e.update());
  }

  //アニメーション設定
  initAnimation() {
    //アニメーションマネージャー
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

  private activateGameOverScreen():void{
    if (this.player.getRemainingLives <= 0 && !this.isGameOver) {
        View.renderGameOverPage()
    }
}

  private activateGameClear():void{
      // if (ゲームクリアの条件);
      if (this.stageName == "second") this.setIsGameClear = true;
  }

  private changeStage(nextStage:string):void{
      if (this.isGameClear) {
          this.setStageName = nextStage
          this.activateNewScreen()
      }
  }

  private activateNewScreen():void{
      switch(this.stageName){
          case "first":
              View.renderFirstStagePage();
              break;
          case "second":
              View.renderSecondStagePage();
              break;
      }
  }

  private set setPlayerColor(color:string){
      // idをkey、colorをvalueにして色を配る？
  }
}

