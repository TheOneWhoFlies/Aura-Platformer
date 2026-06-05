export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor (scene,x,y) {
        super(scene,x,y,'subaru');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.x = x;
        this.y = y;
        this.keys = scene.input.keyboard.addKeys('UP,LEFT,RIGHT');
        this.setOrigin(0.5,0.9);

        //movement variables
        this.topSpeed = 105;
        this.jumpHeight = -100;
        this.acceleration = 10;
        this.decelSpeed = 0.85;

    }

    update() {
        //player movement code
        if (this.keys.LEFT.isDown) {
            this.setFlipX(true);
            let targetVelocity = (Math.max(this.body.velocity.x - this.acceleration, -this.topSpeed));
            this.setVelocityX(targetVelocity);
            this.anims.play('subaru_run',true);
        } else if (this.keys.RIGHT.isDown) {
            this.setFlipX(false);
            let targetVelocity = (Math.min(this.body.velocity.x + this.acceleration, this.topSpeed));
            this.setVelocityX(targetVelocity);
            this.anims.play('subaru_run',true);
        } else {
            let currentVelocity = this.body.velocity.x * this.decelSpeed;
            if (Math.abs(currentVelocity) < 1) {
                currentVelocity = 0;
                this.anims.play('subaru_idle',true);
            }
            this.setVelocityX(currentVelocity);
        }

        if (this.keys.UP.isDown){
            this.setVelocityY(this.jumpHeight);
            this.anims.play('subaru_jump',false);
        }
        
        if (this.body.velocity.y > 0) {
            this.anims.play('subaru_fall',true);
        }

        //if (this.body.blocked.down && this.body.velocity.y === 0) {
            //this.anims.play('subaru_land',true);
        //}
    }
}