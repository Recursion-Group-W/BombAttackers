import 'phaser';

export default class MainScene extends Phaser.Scene {
  player: any;
  stone: any;
  stars: any;
  cursors: any;
  scoreText: any;
  bombs: any;
  score = 0;
  gameOver = false;

  constructor() {
    super({ key: 'Main' });
  }

  preload(): void {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('stone', 'assets/stone.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude', 'assets/dude.png', {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create(): void {
    this.add.image(400, 300, 'sky');

    this.player = this.physics.add.sprite(100, 450, 'dude');
    this.stars = this.physics.add.group({
      key: 'star',
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 },
    });
    this.stone = this.physics.add.staticGroup();
    this.cursors = this.input.keyboard.createCursorKeys();
    this.scoreText = this.add.text(16, 16, 'score: 0', {
      fontSize: '32px',
    });
    this.bombs = this.physics.add.group();

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        this.stone
          .create(i * 100, j * 100, 'stone')
          .setScale(0.1)
          .refreshBody();
      }
    }
    // for (let i = 0; i < 10; i++) {
    //     stones = this.physics.add.group({
    //         key: "stone",
    //         repeat: 10,
    //         setXY: { x: 50, y: 50 + i * 150, stepX: 150 },
    //         setScale: { x: .1, y: .1 }
    //     });
    // }

    this.player.setCollideWorldBounds(true);

    this.anims.create({
      key: 'up',
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'turn',
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 20,
    });
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', {
        start: 5,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'down',
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 10,
      repeat: -1,
    });

    this.stars.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
      child.setCollideWorldBounds(true);
    });

    const x =
      this.player.x < 400
        ? Phaser.Math.Between(400, 800)
        : Phaser.Math.Between(0, 400);
    const bomb = this.bombs.create(x, 16, 'bomb');
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

    this.physics.add.collider(this.player, this.stone);
    this.physics.add.collider(this.stars, this.stone);
    this.physics.add.overlap(
      this.player,
      this.stars,
      this.collectStar,
      null,
      this
    );
    this.physics.add.collider(this.bombs, this.stone);
    this.physics.add.overlap(
      this.player,
      this.bombs,
      this.hitBomb,
      null,
      this
    );
  }

  update() {
    if (this.gameOver) {
      return;
    }

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play('left', true);
    }
    if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play('right', true);
    }
    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-160);
      this.player.anims.play('up', true);
    }
    if (this.cursors.down.isDown) {
      this.player.setVelocityY(160);
      this.player.anims.play('down', true);
    }
    if (
      this.cursors.up.isUp &&
      this.cursors.down.isUp &&
      this.cursors.left.isUp &&
      this.cursors.right.isUp
    ) {
      this.player.setVelocityX(0);
      this.player.setVelocityY(0);
      this.player.anims.play('turn');
    }
  }

  collectStar(player, star) {
    star.disableBody(true, true);
    this.score += 10;
    this.scoreText.setText('Score: ' + this.score);
  }
  hitBomb(player, bomb) {
    this.physics.pause();
    this.player.setTint(0xff0000);
    this.player.anims.play('turn');
    this.gameOver = true;
  }
}
