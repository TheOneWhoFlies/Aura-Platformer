import Player from '../Objects/subaru.js';
import { assembleAnimations } from '../Utility/anim_loader.js';

export default class game_scene extends Phaser.Scene {
    constructor() {
        super({key: 'Game'});
    }

    preload() {
        //ALWAYS PRELOAD GAME ASSETS HERE!!!!!
        this.load.spritesheet('subaru','/Game-Assets/Sprites/SubaruSheet.png',{frameWidth: 16,frameHeight: 16});
        this.load.json('anims','/Game-Assets/Utility/animations.json');
    }
    create() {
        const animationData = this.cache.json.get('anims')
        assembleAnimations(this,'anims');
        this.Player = new Player(this,50,0);
        this.Player.play('subaru_idle');

        let floor = this.add.rectangle(0, 120, 480, 10, 0x654321);
        this.physics.add.existing(floor,true);
        this.physics.add.collider(this.Player,floor);

    }
    update() {

    }
}