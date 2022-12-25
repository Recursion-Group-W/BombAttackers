import { Obstacle } from './obstacle';

type Position = {
  x: number;
  y: number;
};

export class Square {
  private obstacle: Obstacle | null = null;
  constructor(
    private coordinateX: number,
    private coordinateY: number,
    private width: number,
    private height: number
  ) {}
  getPosition(): Position {
    return { x: this.coordinateX, y: this.coordinateY };
  }
  getWidth(): number {
    return this.width;
  }
  getHeight(): number {
    return this.height;
  }
  setPosition(x: number, y: number): void {
    this.coordinateX = x;
    this.coordinateY = y;
  }
  haveObstacle(): boolean {
    return this.obstacle !== null;
  }
  getObstacle(): Obstacle | null {
    return this.obstacle;
  }
  setObstacle(obstacle: Obstacle) {
    this.obstacle = obstacle;
  }
  deleteObstacle() {
    this.obstacle = null;
  }
}
