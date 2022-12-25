type Position = {
    x: number;
    y: number;
  };
  interface Character {
    getName(): string;
    getPosition(): Position;
    getSpeed(): number;
  }
  class GenericCharacter implements Character {
    protected id: number;
    protected name: string;
    protected img: string;
    protected coordinateX: number;
    protected coordinateY: number;
    protected speed: number;
    protected isAttacked: boolean = false;
    constructor(
      id: number,
      name: string,
      img: string,
      coordinateX: number,
      coordinateY: number,
      speed: number
    ) {
      this.id = 0;
      this.name = name;
      this.img = img;
      this.coordinateX = coordinateX;
      this.coordinateY = coordinateY;
      this.speed = speed;
    }
  
    getName(): string {
      return this.name;
    }
    getPosition(): Position {
      return { x: this.coordinateX, y: this.coordinateY };
    }
    getSpeed(): number {
      return this.speed;
    }
  }
  export class Monster extends GenericCharacter {
    constructor(
      id: number,
      name: string,
      img: string,
      coordinateX: number,
      coordinateY: number,
      speed: number
    ) {
      super(id, name, img, coordinateX, coordinateY, speed);
    }
  }