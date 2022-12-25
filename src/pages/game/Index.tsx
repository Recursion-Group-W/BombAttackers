import MainScene from './main'
import { CSSProperties, useEffect } from 'react';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  physics: {
      default: "arcade",
  },
  height: 600,
  scene: [MainScene],
};

class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}

export default function Index() {
  const style: CSSProperties = {
    textAlign: 'center',
  };

  useEffect(() => {
    const g = new Game(config);
    return () => {
      g?.destroy(true);
    };
  }, []);

  return (
    <div
      id='game'
      style={style}
    ></div>
  );
};
