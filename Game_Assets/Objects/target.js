export class Target extends Phaser.Physics.Arcade.Image {
    constructor(scene,x,y) {
        super(scene,x,y,'target');
        scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.body.setImmovable(true);
    }
}