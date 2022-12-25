type Position = {
  x: number;
  y: number;
};

export class Obstacle {
  private isAttacked: boolean = false;
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
  getIsAttacked(): boolean {
    return this.isAttacked;
  }
  setPosition(x:number, y: number) :void {
    this.coordinateX = x
    this.coordinateY = y
  }
  setIsAttacked(value: boolean): void {
    this.isAttacked = value;
  }
  attacked(): void {
    this.setIsAttacked(true);
  }
}
