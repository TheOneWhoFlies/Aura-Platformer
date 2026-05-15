
const sizes = {
    width: 800,
    height: 600
}

const config = {
    type: Phaser.AUTO,
    width: sizes.width,
    height: sizes.height,
    parent: 'game-wrapper',
    backgroundColor: '#FFFFFF',
    canvas:'game-canvas',
    physics: {
        default: 'arcade',
        arcade: {gravity: {y:300} }
       },
    scene: {
        preload: preload,
        create: create
    }
}
const game = new Phaser.Game(config);