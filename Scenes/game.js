import Player from '/Game-Assets/Objects/subaru.js';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({key: 'Game'});
    }

    preload() {
        //ALWAYS PRELOAD GAME ASSETS HERE!!!!!
        this.load.spritesheet('subaru','/Game-Assets/Sprites/SubaruSheet.png',{
            frameWidth: 16,
            frameHeight: 16
        });
    }
    create() {
        this.add.text(160, 400, 'YOU ARE PLAYING', { fontSize: '23px', fill: '#ffffff' }).setOrigin(0.5);
        this.player = new Player(this,100,100);
    }
    update() {

    }
}