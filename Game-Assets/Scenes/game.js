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
        this.add.text(160, 200, 'YOU ARE PLAYING', { fontSize: '23px', fill: '#ffffff' }).setOrigin(0.5);
        assembleAnimations(this,'anims');
        this.Player = new Player(this,100,100);
        this.Player.play('subaru_idle');

        let floor = this.add.rectangle(240, 250, 480, 20, 0x654321);
        this.physics.add.existing(floor,true);
        this.physics.add.collider(this.Player,floor);

    }
    update() {

    }
}