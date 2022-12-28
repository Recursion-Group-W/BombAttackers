import { HighEnemy } from '../../../models/Enemy/interfaces/highEnemy.interface';
import { LowEnemy } from '../../../models/Enemy/interfaces/lowEnemy.interface';
import { MidEnemy } from '../../../models/Enemy/interfaces/midEnemy.interface';
import { VolcanoHighEnemy } from '../../../models/Enemy/Volcano/volcanoHighEnemy';
import { VolcanoLowEnemy } from '../../../models/Enemy/Volcano/volcanoLowEnemy';
import { VolcanoMidEnemy } from '../../../models/Enemy/Volcano/volcanoMidEnemy';
import { GameScene } from '../../../scenes/GameScene';
import { EnemyUtil } from '../../../utils/enemy.util';
import { GenericEnemyFactory } from '../Generic/genericEnemyFactory';
import { EnemyFactory } from '../interfaces/enemyFactory.interface';

//ステージクラス内でインスタンス化して使う
export class VolcanoEnemyFactory
  extends GenericEnemyFactory
  implements EnemyFactory
{
  static SpriteKey = 'volcanoEnemy';
  constructor() {
    super();
  }

  //指定した数のLowEnemyをSceneに配置する
  createLowEnemiesByCount(
    scene: GameScene,
    count: number
  ): void {
    //敵キャラのグループを初期化
    scene.initEnemies();

    for (let i = 0; i < count; i++) {
      scene.enemies.add(this.createLowEnemy(scene));
    }
  }

  //指定した数のMidEnemyをSceneに配置する
  createMidEnemiesByCount(
    scene: GameScene,
    count: number
  ): void {
    //敵キャラのグループをセット
    scene.initEnemies();

    for (let i = 0; i < count; i++) {
      scene.enemies.add(this.createMidEnemy(scene));
    }
  }
  //指定した数のHighEnemyをSceneに配置する
  createHighEnemiesByCount(
    scene: GameScene,
    count: number
  ): void {
    //敵キャラのグループをセット
    scene.initEnemies();

    for (let i = 0; i < count; i++) {
      scene.enemies.add(this.createHighEnemy(scene));
    }
  }

  createLowEnemy(scene: GameScene): LowEnemy {
    const position = EnemyUtil.getRandomPosition(scene);

    return new VolcanoLowEnemy(
      {
        scene: scene,
        x: position.x,
        y: position.y,
      },
      VolcanoEnemyFactory.SpriteKey,
      this.EnemyMap['low'].speed,
      this.EnemyMap['low'].stock,
      this.EnemyMap['low'].initialMode
    );
  }

  createMidEnemy(scene: GameScene): MidEnemy {
    const position = EnemyUtil.getRandomPosition(scene);

    return new VolcanoMidEnemy(
      {
        scene: scene,
        x: position.x,
        y: position.y,
      },
      VolcanoEnemyFactory.SpriteKey,
      this.EnemyMap['mid'].speed,
      this.EnemyMap['mid'].stock,
      this.EnemyMap['mid'].initialMode
    );
  }

  createHighEnemy(scene: GameScene): HighEnemy {
    const position = EnemyUtil.getRandomPosition(scene);

    return new VolcanoHighEnemy(
      {
        scene: scene,
        x: position.x,
        y: position.y,
      },
      VolcanoEnemyFactory.SpriteKey,
      this.EnemyMap['high'].speed,
      this.EnemyMap['high'].stock,
      this.EnemyMap['high'].initialMode
    );
  }
}
