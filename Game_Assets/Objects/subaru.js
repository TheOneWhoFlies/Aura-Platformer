
export class Player extends Phaser.Physics.Arcade.Sprite {
    constructor (scene,x,y) {
        super(scene,x,y,'subaru');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.keys = scene.input.keyboard.addKeys('UP,LEFT,RIGHT,SHIFT');
        this.body.setSize(7,16);

        this.targets = 0;
        this.targetCount = 5;
        //movement variables
        this.topSpeed = 105;
        this.acceleration = 10;
        this.decelSpeed = 0.85;

        // Jump variables
        this.jumping = false;
        this.jumpHeight = -186;
        this.jumpDuration = 0.2;

        // wavedash mechanics
        this.directionNum = 1;
        this.wavedashBoost = { x:90, y:1 };
        this.canWavedash = true;
        this.wavedashing = false;
        this.waveDashBegan = false;
        this.wavedashCooldown = 250; //milliseconds
        this.wavedashCooldownActive = false;

        // Force variables
        this.controlledForceX = 0;
        this.controlledForceDecay = 0.90;
        this.externalForce = {x:0,y:0};
        this.externalForceDecay = 0.90;
        this.aerialExternalDecay = 0.97;
    }

    //momentum code
    applyExternalForceDecay() {
        const currentDecayX = this.body.blocked.down ? this.externalForceDecay : this.aerialExternalDecay;
        this.externalForce.x = this.externalForce.x * currentDecayX;
        if (Math.abs(this.externalForce.x) < 1) {
            this.externalForce.x = 0;
        }
        this.externalForce.y = this.externalForce.y * this.externalForceDecay;
        if (Math.abs(this.externalForce.y) < 1) {
            this.externalForce.y = 0;
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
    handleJumping(time) {
        const grounded = this.body.blocked.down;
        
        if (this.keys.UP.isUp || this.jumpTime >= this.jumpDuration) {
            this.jumping = false;
        }
        if (grounded) {
            this.jumpTime = 0;
        }

        if(this.keys.UP.isDown){
            if (grounded && !this.jumping && this.jumpTime === 0) {
                this.jumping = true;
                this.setVelocityY(this.jumpHeight);
            }
        }
    }

    //wavedash code (double wavedash bug when holding shift & up at once)
    handleWavedashing() {
        const shiftPressed = Phaser.Input.Keyboard.JustDown(this.keys.SHIFT);
        const grounded = this.body.blocked.down;
        
        if (this.wavedashing && !grounded && !this.waveDashBegan) {
            this.jumping = false;
            this.waveDashBegan = true;
            this.externalForce.x += this.wavedashBoost.x * this.directionNum;
            this.body.setVelocityY(this.scene.physics.world.gravity.y + this.wavedashBoost.y);
        } 
        
        if (this.wavedashing && grounded && !this.wavedashCooldownActive) {
            this.wavedashing = false;
            this.waveDashBegan = false;
            this.wavedashCooldownActive = true; 
            this.scene.time.delayedCall(this.wavedashCooldown, this.resetWavedashCooldown, [], this);
        }
    
        if (shiftPressed && !this.wavedashCooldownActive) {
            if (!grounded && this.canWavedash && !this.wavedashing) {
                this.wavedashing = true;
                this.canWavedash = false;
            }
        }
    
    }
    // resets your wavedash, self explanatory, dude.
    resetWavedashCooldown() {
        this.canWavedash = true;
        this.wavedashCooldownActive = false;
    }

    collectTarget(target) {
        if (!target.body.enable||!target || !target.body) return
            target.body.enable =false;
            this.targetCount += 1;
            this.checkWinCondition();
    }
    checkWinCondition() {
        if (this.targets >= this.targetCount) {
            this.anims.play('victory');
            this.scene.events.emit('playerWon', true);
        }
    }
    
    update(time) {
        this.applyExternalForceDecay();
        this.handleHorizontalMovement();
        this.handleWavedashing();
        this.checkWinCondition();
        this.handleJumping(time);
        this.body.setVelocity(this.controlledForceX + this.externalForce.x,this.body.velocity.y + this.externalForce.y);
    }
}