export default class title_scene extends Phaser.Scene {
    constructor() {
        super({key: 'Title'});
    }

    preload() {
        
    }
    create() {
        this.add.text(60, 20, 'AURA', { fontSize: '30px', fill: '#ffffff' }).setOrigin(0.5);
        this.add.text(90, 50, 'MONSTER', { fontSize: '30px', fill: '#ffffff' }).setOrigin(0.5);
        const button = this.add.text(120, 100, 'START', { fontSize: '16px', fill: '#ffffff' })
        .setOrigin(0.5)
        .setInteractive({useHandCursor: true});

        button.on('pointerdown', () => {
            this.scene.start('Game');
        });
    }
    update() {

    }
}