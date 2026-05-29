export default class TitleScene extends Phaser.Scene {
    constructor() {
        super({key: 'Title'});
    }

    preload() {
        
    }
    create() {
        this.add.text(90, 20, 'AURA', { fontSize: '64px', fill: '#ffffff' }).setOrigin(0.5);
        this.add.text(146, 84, 'MONSTER', { fontSize: '64px', fill: '#ffffff' }).setOrigin(0.5);
        const button = this.add.text(90, 200, 'START', { fontSize: '32px', fill: '#ffffff' })
        .setOrigin(0.5)
        .setInteractive({useHandCursor: true});

        button.on('pointerdown', () => {
            this.scene.start('Game');
        });
    }
    update() {

    }
}