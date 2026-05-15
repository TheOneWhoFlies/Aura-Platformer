const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-wrapper',
    physics: {
        default: 'arcade',
        arcade: {gravity: {y:300} }
       },
    scene: {
        preload: preload,
        create: create
    }
}

function preload() {

}

function create() {
    this.add.text(400, 100, 'Game running from external game.js!', { fill: '#00ff00' }).setOrigin(0.5);
}