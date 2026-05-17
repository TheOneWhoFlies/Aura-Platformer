
export default class TitleScene extends Phaser.Scene {
    constructor() {
        super('Title');
    }

    preload() {
        
    }
    create() {
        this.add.text(250, 400, 'AURA', { fontSize: '64px', fill: '#ffffff' }).setOrigin(0.5);
    }
    update() {

    }
}