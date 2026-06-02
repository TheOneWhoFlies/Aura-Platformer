export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor (scene,x,y) {
        super(scene,x,y,'subaru');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.x = x;
        this.y = y
    }

    preload() {

    }
    create() {
        this.add.sprite(this.x,this.y,'subaru');
    }
    update() {

    }
}
