
export default class TitleScene extends Phaser.Scene {
    preload() {
        
    }
    create() {
        this.add.text(160, 400, 'AURA', { fontSize: '64px', fill: '#ffffff' }).setOrigin(0.5);
        this.add.text(210, 460, 'MONSTER', { fontSize: '64px', fill: '#ffffff' }).setOrigin(0.5);
        const button = this.add.text(580, 460, 'START', { fontSize: '32px', fill: '#ffffff' })
        .setOrigin(0.5)
        .setInteractive({useHandCursor: true});

        button.on('pointerdown', () => {
            this.scene.start('GameScene');
        });
    }
    update() {

    }
}