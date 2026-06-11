import { Player } from '../Objects/subaru.js';
import { assembleAnimations } from '../Utility/anim_loader.js';

export default class game_scene extends Phaser.Scene {
    constructor() {
        super({key: 'Game'});
    }

    preload() {
        //ALWAYS PRELOAD GAME ASSETS HERE!!!!!
        this.load.spritesheet('subaru','/Game_Assets/Sprites/SubaruSheet.png',{frameWidth: 16,frameHeight: 16});
        this.load.image('target','/Game_Assets/Sprites/');
        this.load.json('anims','/Game_Assets/Utility/animations.json');
    }
    create() {
        const animationData = this.cache.json.get('anims')
        const camera = this.cameras.main
        this.add.text(160, 100, 'YOU ARE PLAYING', { fontSize: '23px', fill: '#ffffff' }).setOrigin(0.5);
        assembleAnimations(this,'anims');
        this.Player = new Player(this,60,20);

        
        let floor = this.add.rectangle(120, 135, 8008, 25, 0x654321);
        this.physics.add.existing(floor,true);
        this.physics.add.collider(this.Player,floor);

        camera.startFollow(this.Player, 0.005,0.4);
    }
    update() {
        if (this.Player) {
            this.Player.update();
        }
    }
}