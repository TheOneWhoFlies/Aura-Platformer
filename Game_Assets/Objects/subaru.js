export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor (scene,x,y) {
        super(scene,x,y,'subaru');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.keys = scene.input.keyboard.addKeys('UP,LEFT,RIGHT,SHIFT');

        //movement variables
        this.topSpeed = 105;
        this.acceleration = 10;
        this.decelSpeed = 0.85;

        this.jumping = false;
        this.jumpHeight = -100;
        this.jumpTime = 0;
        this.maxJumpDuration = 0.16;

        this.directionNum = 1;
        this.fastFallBoost = 200;

        this.canFastFall = true;
        this.fastFalling = false;
        this.fastFallTime = 0;
        this.fastFallCooldown = 0.05;

        this.controlledForce = {x:0,y:0};
        this.externalForce = {x:0,y:0};
        this.externalForceDecay = 0.90;
    }

    update(time,delta) {
        let dt = delta / 1000;
        
        this.externalForce.x = this.externalForce.x * this.externalForceDecay
        if (Math.abs(this.externalForce.x) < 1) {
            this.externalForce.x = 0;
        }
        //running code
        this.anims.play('idle',true)
        if (this.keys.LEFT.isDown && !this.keys.RIGHT.isDown) {
            this.setFlipX(true);
            this.directionNum = -1;
            let targetVelocity = (Math.max(this.body.velocity.x - this.acceleration, -this.topSpeed));
            this.controlledForce.x = targetVelocity;
        } else if (this.keys.RIGHT.isDown && !this.keys.LEFT.isDown) {
            this.setFlipX(false);
            this.directionNum = 1;
            let targetVelocity = (Math.min(this.body.velocity.x + this.acceleration, this.topSpeed));
            this.controlledForce.x = targetVelocity;
        } else {
            let currentVelocity = this.body.velocity.x * this.decelSpeed;
            if (Math.abs(currentVelocity) < 1) {
                currentVelocity = 0;
            }
            this.controlledForce.x = targetVelocity;
        }
        //jumping code
        if (this.keys.UP.isDown && this.body.blocked.down && !this.jumping) { 
            this.jumping = true; 
            this.body.setVelocityY(this.jumpHeight);
            this.jumpTime = 0;
        } else if (this.jumping && this.body.velocity.y < 0) { 
            this.jumpTime += dt;
            if (this.jumpTime < this.maxJumpDuration) { 
                this.body.setVelocityY(this.jumpHeight); 
            } else {
                this.jumping = false;
            }
        }
        //fast-fall code
        if (this.keys.SHIFT.isDown && !this.body.blocked.down && this.canFastFall) {
            this.fastFalling = true;
            this.externalForce.x += this.fastFallBoost * this.directionNum
            this.body.setVelocityY(this.scene.physics.world.gravity.y)
        } else if (this.fastFalling && this.body.blocked.down) {
            this.fastFalling = false;
            this.canFastFall = false;
            this.fastFallTime = 0;
        }
        if (!this.canFastFall) {
            this.fastFallTime += dt;
            if (this.fastFallTime >= this.fastFallCooldown) {
                this.canFastFall = true;
            }
        }

        if (this.keys.UP.isUp) { 
            this.jumping = false; 
        }
        if (this.body.blocked.down) { 
            this.jumpTime = 0; 
        }

        setVelocityX

    }
}