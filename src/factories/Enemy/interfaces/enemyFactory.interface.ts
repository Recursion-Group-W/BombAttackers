import { HighEnemy } from '../../../models/Enemy/interfaces/highEnemy.interface';
import { LowEnemy } from '../../../models/Enemy/interfaces/lowEnemy.interface';
import { MidEnemy } from '../../../models/Enemy/interfaces/midEnemy.interface';

export interface EnemyFactory {
  //指定した数のLowEnemyをSceneに配置する
  createLowEnemiesByCount(
    scene: Phaser.Scene,
    count: number
  ): void;

  //指定した数のMidEnemyをSceneに配置する
  createMidEnemiesByCount(
    scene: Phaser.Scene,
    count: number
  ): void;

  //指定した数のHighEnemyをSceneに配置する
  createHighEnemiesByCount(
    scene: Phaser.Scene,
    count: number
  ): void;

  createLowEnemy(scene: Phaser.Scene): LowEnemy;

  createMidEnemy(scene: Phaser.Scene): MidEnemy;

  createHighEnemy(scene: Phaser.Scene): HighEnemy;
}
