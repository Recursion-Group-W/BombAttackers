type Position = {
  x: number;
  y: number;
};

export class Player {
  private speed: number = 1;
  constructor(
    private coordinateX: number,
    private coordinateY: number
  ) {}

  getSpeed(): number {
    return this.speed;
  }
  setSpeed(value: number): void {
    this.speed = value;
  }
  accelerate(value: number): void {
    this.setSpeed(this.getSpeed() + value);
  }
  getPosition(): Position {
    return { x: this.coordinateX, y: this.coordinateY };
  }
  setPosition(x: number, y: number): void {
    (this.coordinateX = x), (this.coordinateY = y);
  }
  moveX(dx: number): void {
    this.setPosition(
      this.getPosition().x + dx,
      this.getPosition().y
    );
  }
  moveY(dy: number): void {
    this.setPosition(
      this.getPosition().x,
      this.getPosition().y + dy
    );
  }
}
