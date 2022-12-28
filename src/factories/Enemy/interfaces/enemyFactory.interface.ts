import { LowEnemy } from '../../../models/Enemy/interfaces/lowEnemy';
import { MidEnemy } from '../../../models/Enemy/interfaces/midEnemy';
import { GameScene } from '../../../scenes/GameScene';

export interface EnemyFactory {
  //指定した数のLowEnemyをSceneに配置する
  createLowEnemiesByCount(
    scene: GameScene,
    count: number
  ): void;

  //指定した数のMidEnemyをSceneに配置する
  createMidEnemiesByCount(
    scene: GameScene,
    count: number
  ): void;

  //指定した数のHighEnemyをSceneに配置する
  // createHighEnemiesByCount(
  //   scene: GameScene,
  //   count: number
  // ): void;

  createLowEnemy(scene: GameScene): LowEnemy;
  createMidEnemy(scene: GameScene): MidEnemy;
  // createHighEnemy(scene: GameScene): HighEnemy;
}
