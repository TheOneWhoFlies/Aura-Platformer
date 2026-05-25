
export default class TitleScene extends Phaser.Scene {
    preload() {
        
    }
    create() {
        this.add.text(250, 400, 'AURA', { fontSize: '64px', fill: '#ffffff' }).setOrigin(0.5);
        this.add.text(270, 460, 'MONSTER', { fontSize: '64px', fill: '#ffffff' }).setOrigin(0.5);
    }
    update() {

    }
}