export default class GameScene extends Phaser.Scene {
    constructor() {
        super({key: 'Game'});
    }

    preload() {
        
    }
    create() {
        this.add.text(160, 400, 'YOU ARE PLAYING', { fontSize: '23px', fill: '#ffffff' }).setOrigin(0.5);
    }
    update() {

    }
}