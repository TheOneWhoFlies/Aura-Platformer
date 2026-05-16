const sizes = {
    width: 800,
    height: 600
}

const gravity = 300;

const config = {
    type: Phaser.AUTO,
    width: sizes.width,
    height: sizes.height,
    parent: 'game-wrapper',
    backgroundColor: '#000000',
    canvas: document.getElementById('game-canvas'),
    scale: {
        mode: Phaser.Scale.FIT
    },
    physics: {
        default: 'arcade',
        arcade: {gravity: {y:gravity} },
        debug:true
       },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
}

function preload(){

}

function create(){
    this.add.text(sizes.width / 2, sizes.height / 2, 'Hello World!', { font: '48px Arial', fill: '#FFFFFF' });
}

function update() {

}

const game = new Phaser.Game(config);