export class GenericEnemyFactory {
  protected readonly EnemyMap: {
    [key: string]: {
      speed: number;
      stock: number;
      initialMode: string;
    };
  } = {
    low: {
      speed: 70,
      stock: 1,
      initialMode: 'mono',
    },
    mid: {
      speed: 100,
      stock: 2,
      initialMode: 'random',
    },
    high: {
      speed: 150,
      stock: 1,
      initialMode: 'complicated',
    },
  };

  constructor() {}
}
