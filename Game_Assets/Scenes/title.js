export default class title_scene extends Phaser.Scene {
    constructor() {
        super({key: 'Title'});
    }

    preload() {
        
    }
    create() {
        this.add.text(90, 20, 'AURA', { fontSize: '24px', fill: '#ffffff' }).setOrigin(0.5);
        this.add.text(90, 44, 'MONSTER', { fontSize: '24px', fill: '#ffffff' }).setOrigin(0.5);
        const button = this.add.text(90, 90, 'START', { fontSize: '32px', fill: '#ffffff' })
        .setOrigin(0.5)
        .setInteractive({useHandCursor: true});

        button.on('pointerdown', () => {
            this.scene.start('Game');
        });
    }
    update() {

    }
}