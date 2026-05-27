import TitleScene from '/Scenes/title.js';
import GameScene from '/Scenes/game.js';

const aspectRatio = {
    width: 800,
    height: 600
}

const gravity = 300;

const config = {
    type: Phaser.AUTO,
    parent: 'game-wrapper',
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

this.scene.add('Title', config, true);
