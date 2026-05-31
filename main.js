import title_scene from '/Game-Assets/Scenes/title.js';
import game_scene from '/Game-Assets/Scenes/game.js';

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
        arcade: {
            gravity: { y: gravity},
            debug: false
        }
    },
    scene: [title_scene,game_scene],
    backgroundColor: '#000000'
};

const game = new Phaser.Game(config);