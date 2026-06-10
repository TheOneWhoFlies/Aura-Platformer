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

        // Jump mechanics
        this.jumping = false;
        this.jumpHeight = -106;
        this.jumpTime = 0;
        this.maxJumpDuration = 0.3;

        // wavedash mechanics
        this.directionNum = 1;
        this.wavedashBoost = { x:120, y:120 };
        this.canWavedash = true;
        this.wavedashing = false;
        this.wavedashTime = 0;
        this.wavedashCooldown = 0.05;

        // Force variables
        this.controlledForceX = 0;
        this.controlledForceDecay = 0.90;
        this.externalForce = {x:0,y:0};
        this.externalForceDecay = 0.90;
    }

    //momentum code
    applyExternalForceDecay() {
        this.externalForce.x = this.externalForce.x * this.externalForceDecay;
        if (Math.abs(this.externalForce.x) < 1) {
            this.externalForce.x = 0;
        }
        this.externalForce.y = this.externalForce.y * this.externalForceDecay;
        if (Math.abs(this.externalForce.y) < 1) {
            this.externalForce.x = 0;
        }
    }

    //running code
    handleHorizontalMovement() {
        const movingLeft = this.keys.LEFT.isDown && !this.keys.RIGHT.isDown;
        const movingRight = this.keys.RIGHT.isDown && !this.keys.LEFT.isDown;

        if (movingLeft) {
            this.setFlipX(true);
            this.directionNum = -1;
            let targetVelocity = (Math.max(this.controlledForceX - this.acceleration, -this.topSpeed));
            this.controlledForceX = targetVelocity;
        } else if (movingRight) {
            this.setFlipX(false);
            this.directionNum = 1;
            let targetVelocity = (Math.min(this.controlledForceX + this.acceleration, this.topSpeed));
            this.controlledForceX = targetVelocity;
        } else {
            let currentVelocity = this.controlledForceX * this.decelSpeed;
            if (Math.abs(currentVelocity) < 1) {
                currentVelocity = 0;
            }
            this.controlledForceX = currentVelocity;
        }
    }

    //jump code (Still won't make you go up while holding)
    handleJumping(dt) {
        const grounded = this.body.blocked.down;
        
        if (this.keys.UP.isUp) {
            this.jumping = false;
        }
        if (grounded) {
            this.jumpTime = 0;
        }

        if(this.keys.UP.isDown){
            if (grounded && !this.jumping && this.jumpTime === 0) {
                this.jumpTime += dt;
                this.jumping = true;
            }
            if (this.jumping  && this.jumpTime < this.maxJumpDuration) {
                   console.log(this.jumpTime);
                    this.setVelocityY(this.jumpHeight);
            }
        }
    }

    //wavedash code (can only wavedash once, no horizontal boost)
    handleWavedashing(dt) {
        const shiftPressed = Phaser.Input.Keyboard.JustDown(this.keys.SHIFT);
        const grounded = this.body.blocked.down;

        if (shiftPressed && !grounded && this.canWavedash && !this.wavedashing) {
            this.wavedashing = true;
            this.externalForceX += this.wavedashBoostX * this.directionNum;
            this.body.setVelocityY(this.scene.physics.world.gravity.y + this.wavedashBoost.y);
            }
        if (this.wavedashing && grounded) {
            this.wavedashing = false;
            this.canWavedash = false;
            this.wavedashTime = 0;
            if (!this.canWavedash) {
                this.wavedashTime += dt;
                if (this.wavedashTime >= this.wavedashCooldown) {
                        this.canWavedash = true;
                    }
            }
        }
    }

    update(time,delta) {
        let deltaTime = delta / 1000;
        
        this.applyExternalForceDecay();
        this.handleHorizontalMovement();
        this.handleJumping(deltaTime);
        this.handleWavedashing(deltaTime);

        this.body.setVelocity(this.controlledForceX + this.externalForce.x,this.body.velocity.y + this.externalForce.y);
    }
}