export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor (scene,x,y) {
        super(scene,x,y,'Subaru');
    }

    preload() {
    this.preload.spritesheet('subaru','/Game-Assets/Sprites/SubaruSheet.png');
    }
    create() {

    }
    update() {

    }
}
