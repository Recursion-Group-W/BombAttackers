import { LowEnemy } from '../../../models/Enemy/interfaces/lowEnemy';
import { MidEnemy } from '../../../models/Enemy/interfaces/midEnemy';
import { VolcanoLowEnemy } from '../../../models/Enemy/Volcano/volcanoLowEnemy';
import { GameScene } from '../../../scenes/GameScene';
import { EnemyUtil } from '../../../utils/enemy.util';
import { GenericEnemyFactory } from '../Generic/genericEnemyFactory';
import { EnemyFactory } from '../interfaces/enemyFactory.interface';

//ステージクラス内でインスタンス化して使う
export class VolcanoEnemyFactory
  extends GenericEnemyFactory
  implements EnemyFactory
{
  private readonly SpriteKey = 'enemy';
  constructor() {
    super();
  }

  //指定した数のLowEnemyをSceneに配置する
  createLowEnemiesByCount(
    scene: GameScene,
    count: number
  ): void {
    //敵キャラのグループをセット
    scene.setEnemies();

    for (let i = 0; i < count; i++) {
      this.createLowEnemy(scene);
    }
  }

  //指定した数のMidEnemyをSceneに配置する
  createMidEnemiesByCount(
    scene: GameScene,
    count: number
  ): void {
    //敵キャラのグループをセット
    scene.setEnemies();

    for (let i = 0; i < count; i++) {
      this.createMidEnemy(scene);
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
      'enemy',
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
      'enemy',
      this.EnemyMap['mid'].speed,
      this.EnemyMap['mid'].stock,
      this.EnemyMap['mid'].initialMode
    );
  }
}
