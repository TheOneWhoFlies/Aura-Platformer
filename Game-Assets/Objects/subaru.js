export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor (scene,x,y) {
        super(scene,x,y,'subaru');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setScale(2);
    }

    preload() {

    }
    create() {
        this.add.sprite(100,100,'subaru');
    }
    update() {

    }
}
