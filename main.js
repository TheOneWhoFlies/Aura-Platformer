import TitleScene from '/Scenes/title.js';
import GameScene from '/Scenes/game.js';

const aspectRatio = {
    width: 480,
    height: 270
}

const gravity = 300;

const config = {
    type: Phaser.AUTO,
    parent: 'game-wrapper',
    pixelArt:true,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: aspectRatio.width,
        height: aspectRatio.height
    },
    physics: {
        default: 'arcade',
        gravity: { y: gravity}
    },
    scene: [TitleScene,GameScene],
    backgroundColor: '#000000'
};

const game = new Phaser.Game(config);