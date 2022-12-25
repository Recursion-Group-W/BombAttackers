class Character {
  coordinateX:number
  coordinateY: number;
  id:string;
  img = new Image();
  speed:number;
  constructor(x: number, y: number, id:string) {
    this.coordinateX = x;
    this.coordinateY = y;
    this.id = id;
    this.speed = 1; // player：アイテムの取得・NPC：難易度により変化
  }
}

export class Player extends Character {
  name: string;
  constructor(x: number, y: number) {
    super(x, y, "player");
    this.name = 'Player';
    this.img.src = this.id + ".png";
  }
}

/*
↓以下サンプル
export class NPC extends Character {
  constructor(x: number, y: number) {
    super(x, y);
    this.img.src = "test.png";
  }
}
*/