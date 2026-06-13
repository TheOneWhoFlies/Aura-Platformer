import { Player } from '../Objects/subaru.js';
import { assembleAnimations } from '../Utility/anim_loader.js';

// DISCLAIMER: AI was used to make the code for loading the map and the timer.
export default class game_scene extends Phaser.Scene {
    constructor() {
        super({key: 'Game'});
    }

    preload() {
        this.load.spritesheet('subaru', '../Sprites/SubaruSheet.png', {frameWidth: 16, frameHeight: 16});
        this.load.image('target', '../Sprites/target.png');
        this.load.json('anims', '../Utility/animations.json');
        
        // 1. Keep loading it as a specialized tilemapTiledJSON
        this.load.tilemapTiledJSON('levelData', "../Levels/level1.json");
    }

    create() {
        this.elapsedSeconds = 0;
        const animationData = this.cache.json.get('anims');
        
        // FIX 1: Retrieve the map data object from Phaser's specialized tilemap cache
        const levelConfig = this.cache.tilemap.get('levelData').data;

        // 2. DUPLICATE FIX: Set up a proper count tracker for embedded assets
        let base64ToLoad = 0;
        let base64Loaded = 0;

        levelConfig.tilesets.forEach(tileset => {
            const embeddedProperty = tileset.properties?.find(p => p.name === 'embedded_png');
            if (embeddedProperty && !this.textures.exists(tileset.name)) {
                base64ToLoad++;
                // Convert raw base64 data to a usable Phaser image asset
                const dataURI = `data:image/png;base64,${embeddedProperty.value.replace(/\n/g, '')}`;
                this.textures.addBase64(tileset.name, dataURI);
            }
        });

        // 3. DUPLICATE FIX: Only fire buildTilemap once all textures finish processing
        if (base64ToLoad > 0) {
            this.textures.on('onload', () => {
                base64Loaded++;
                if (base64Loaded === base64ToLoad) {
                    this.textures.off('onload'); // Unbind to stop duplicate player generation
                    this.buildTilemap(levelConfig);
                }
            });
        } else {
            this.buildTilemap(levelConfig);
        }

        this.timer = this.add.text(120, 115, 'Time: 00:00', {
            fontSize: '12px',
        });
        this.timer.setScrollFactor(0).setDepth(100);

        // CRASH FIX: Added 'this' as the third argument so stopTimer() knows what 'this' means!
        this.events.on('playerWon', this.stopTimer, this);

        this.clockTimerEvent = this.time.addEvent({
            delay: 1000,
            callback: this.updateTimer,
            callbackScope: this,
            loop: true
        });
    }

    updateTimer() {
        this.elapsedSeconds++;
        const minutes = Math.floor(this.elapsedSeconds / 60);
        const seconds = this.elapsedSeconds % 60;

        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');
        this.timer.setText(`Time: ${formattedMinutes}:${formattedSeconds}`);
    }

    stopTimer() {
        // Safe to run now without crashing, because 'this' is properly scoped!
        if (this.clockTimerEvent) {
            this.clockTimerEvent.paused = true;
        }
        
        // Deactivate player updates and keyboard input during transition
        this.input.keyboard.enabled = false;
        if (this.Player && this.Player.body) {
            this.Player.body.setVelocity(0, 0);
        }

        // Wait 2.5 seconds so player can see their final score, then switch scenes cleanly
        this.time.delayedCall(2500, () => {
            this.scene.start('title_scene');
        }, [], this);
    }

    buildTilemap(levelConfig) {
        // Absolute safety catch to stop a duplicate player from rendering if onload double-fires
        if (this.Player) return;

        // FIX 2: Create a true grid map from your Tiled cache key instead of passing flat layer data
        const map = this.make.tilemap({ key: 'levelData' });
        
        // Link the tileset name inside the JSON ("bricks") to the loaded texture asset
        const tilesetTexture = map.addTilesetImage('bricks', 'bricks');

        // FIX 3: Create the 'ground' tile layer using its Tiled string name from your JSON file
        this.groundLayer = map.createLayer('ground', tilesetTexture, 0, 0);

        // Give your floor layer a low depth layer so it sits in the background
        this.groundLayer.setDepth(1); 

        map.setCollision(1);

        const mapWidthPx = map.widthInPixels;
        const mapHeightPx = map.heightInPixels;
        this.physics.world.setBounds(0, 0, mapWidthPx, mapHeightPx);

        // Spawn your player
        this.Player = new Player(this, levelConfig.spawnPoint.x, levelConfig.spawnPoint.y);
        this.physics.add.collider(this.Player, this.groundLayer);
        this.Player.setDepth(10); // Float above tiles safely
        
        // 1. FIXED: Initialize the group EXACTLY ONCE
        this.targetGroup = this.physics.add.staticGroup();

        // 2. Spawn target 1
        let targetItem = this.targetGroup.create(
            levelConfig.spawnPoint.x + 100, 
            levelConfig.spawnPoint.y - 50, 
            'target'
        );
        targetItem.setDepth(5);
        targetItem.refreshBody();

        // 3. Spawn target 2 (This will now show up perfectly!)
        let targetItem2 = this.targetGroup.create(
            levelConfig.spawnPoint.x + 200, 
            levelConfig.spawnPoint.y - 50, 
            'target'
        );
        targetItem2.setDepth(5);
        targetItem2.refreshBody();

        // 4. Set up your touch overlap collection logic
        this.physics.add.overlap(this.Player, this.targetGroup, (playerInstance, targetInstance) => {
            if (!targetInstance.body || !targetInstance.body.enable) return;

            playerInstance.collectTarget(targetInstance);
            targetInstance.destroy(); 
    
        });


        // Adjust Camera properties to map boundaries
        const camera = this.cameras.main;
        camera.setBounds(0, 0, mapWidthPx, mapHeightPx);
        camera.startFollow(this.Player, true, 0.5, 0.2);
        camera.setBackgroundColor("#3e3b42");
        
        assembleAnimations(this, 'anims');
    }

    update() {
        // Only run update mechanics if keyboard inputs are active
        if (this.Player && this.input.keyboard.enabled) {
            this.Player.update();
        }
    }
}