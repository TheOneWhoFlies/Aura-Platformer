export class Target extends Phaser.Physics.Arcade.Image {
    constructor(scene,x,y) {
        super(scene,x,y,'target');
        scene.add.existing(this)
        scene.physics.add.existing(this,true);
        this.body.setImmovable(true);
    }
}