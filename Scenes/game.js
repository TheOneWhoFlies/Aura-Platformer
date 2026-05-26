export default class GameScene extends Phaser.Scene {
    preload() {
        
    }
    create() {
        this.add.text(160, 400, 'YOU ARE IN GAME', { fontSize: '64px', fill: '#ffffff' }).setOrigin(0.5);
    }
    update() {

    }
}