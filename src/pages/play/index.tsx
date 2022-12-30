import React, { useEffect, useState } from 'react';

import { Game as GameType } from 'phaser';

const index = () => {
  const [game, setGame] = useState<GameType>();
  const initPhaser = async () => {
    const Phaser = await import('phaser');
    const { PreloadScene } = await import(
      '../../scenes/PreloadScene'
    );
    const { GameScene } = await import(
      '../../scenes/GameScene'
    );

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      parent: 'game',
      width: 800,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: true,
        },
      },
      height: 800,
      pixelArt: true,
      scene: [PreloadScene, GameScene],
      backgroundColor: '#a9a9a9',
    };
    const phaserGame = new Phaser.Game(config);
    setGame(phaserGame);
  };

  useEffect(() => {
    initPhaser();
  }, []);

  return (
    <>
      <div id='game' key='game' />
    </>
  );
};

export default index;
