'use strict'
// import BaseGameScene from './BaseGameScene.js';
import ScoreManager from '../objects/scoreManager/ScoreManager.js';
import Platform from '../objects/Platform.js';
import Chopper from '../objects/Chopper.js';
import MissionManager2 from '../objects/missionManager/MissionManager2.js';
import GameScene1 from './GameScene1.js';

export default class GameScene2 extends GameScene1 {
    constructor() {
        super('GameScene2');
        this.platforms = null;
        this.missionManager2 = new MissionManager2(this); 
        
        this.chopper = null;
        this.chopperSpawnTime = 0;
        this.chopperSpawnInterval = 2000; // Spawn a bomb every 2 seconds
    }

    create(data) { // with no data, candlelight date doesn't received
                   // this is important                   

        super.create(); // Call the parent class's create method

        this.platforms.clear(true, true); // GameScene1's platfroms cleared

        // Add background image
        this.backgroundForScene2 = this.add.image(0, 0, 'backgroundForScene2').setOrigin(0, 0);

        // Adjust the background to cover the entire scene
        this.backgroundForScene2.displayWidth = this.sys.game.config.width;
        this.backgroundForScene2.displayHeight = this.sys.game.config.height;

        // Set the background depth to a very low number to ensure it's rendered first
        this.backgroundForScene2.setDepth(-1);

        // Set the alpha value to make the image transparent
        // 0 is fully transparent, 1 is fully opaque
        // Adjust this value as needed (e.g., 0.5 for 50% transparency)
        this.backgroundForScene2.setAlpha(0.2);
        
        // Apply new candlelight properties
        this.candleLightScale = 0.6;
        this.candleLightSpeed = 1000;
        this.fireRate = 150; // Set fire rate from data

        this.nextFire = 0;

        // mission target initialized
        this.missionTarget2 = this.physics.add.sprite(this.width/2, this.height/5, 'impeachment_1st');
        this.missionTarget2.setScale(0.3);
        this.missionTarget2.body.allowGravity = false;

        // Add collision between player and missionTarget2
        this.physics.add.overlap(this.player, this.missionTarget2, this.touchImpeachment, null, this);
        
        // Add event listener for mission completion
        this.events.on('missionComplete', this.onMissionComplete, this);

        // Create chopper Using Chopper class
        this.choppers = this.physics.add.group({            
            classType: Chopper,
            runChildUpdate: true      
        });        
          
        this.createChopper();

        // Define platform positions for GameScene2
        // 480 * 800
        const platformPositions = [
            // { x: 150, y: 200, scaleX: 6, scaleY: 0.2 },  // the roof

            { x: 30, y: 315, scaleX: 0.5, scaleY: 0.5 }, { x: 200, y: 315, scaleX: 0.5, scaleY: 0.5 }, { x: 350, y: 315, scaleX: 0.5, scaleY: 0.5 },   
                                            
        { x: 50, y: 370, scaleX: 0.5, scaleY: 0.5 },  
                                            { x: 290, y: 400, scaleX: 0.2, scaleY: 0.5 },  { x: 450, y: 400, scaleX: 0.3, scaleY: 0.5 },  
               { x: 110, y: 420, scaleX: 0.5, scaleY: 0.2 },     
                                           { x: 415, y: 445, scaleX: 0.5, scaleY: 0.2 },     
                         { x: 210, y: 450, scaleX: 0.5, scaleY: 0.2 },     
                                  { x: 350, y: 490, scaleX: 0.5, scaleY: 0.5 },  
            { x: 50, y: 500, scaleX: 0.5, scaleY: 0.5 },     
                                               { x: 450, y: 520, scaleX: 0.5, scaleY: 0.5 },  
                        { x: 255, y: 550, scaleX: 0.5, scaleY: 0.5 },   
            { x: 155, y: 510, scaleX: 0.5, scaleY: 0.2 },   

            { x: 200, y: 600, scaleX: 6, scaleY: 2 },
        ];

        // Create platforms with specified positions
        this.platforms = new Platform(this);
        this.platforms.createPlatforms(platformPositions);

        // Add colliders for platforms
        this.physics.add.collider(this.player, this.platforms);                
        this.physics.add.collider(this.bombs, this.platforms);
        this.physics.add.collider(this.swats, this.platforms);

        // Add colliders for chopper
        this.physics.add.collider(this.choppers, this.platforms);

        // Add colliders for chopper
        this.physics.add.collider(this.choppers, this.bombs);        

        // collision player and chopper
        this.physics.add.collider(this.player, this.choppers, this.hitChopper, null, this);

        // Add collision between candlelights and chopper
        this.physics.add.collider(this.candlelights, this.choppers, this.candleLightHitChopper, null, this);
    }

    update(time, delta) {
       
        super.update(time, delta); // Call the parent class's update method

        // check if mission is completed
        this.missionManager2.checkMissionCompletion();

        // Use the new properties when firing candlelights
        if (time > this.nextFire) {
            let candlelight = this.candlelights.get(this.player.x, this.player.y);
            if (candlelight) {
                candlelight.setCustomScale(this.candleLightScale);
                candlelight.fire(this.player.x, this.player.y, -90, this.candleLightSpeed);
                this.nextFire = time + this.fireRate;
            }
        }       

        // chopper created
        if (time > this.chopperSpawnTime) {
            this.createChopper();
            this.chopperSpawnTime = time + this.chopperSpawnInterval;

            // console.log(`time: ${time} > this.chopperSpawnTime: ${this.chopperSpawnTime}`);
        }

        // Flip Chopper periodically
        this.choppers.children.iterate((chopper) => {
            if (Phaser.Math.Between(0, 100) < 0.5) { // 2% chance to flip each frame
                chopper.setFlipX(!chopper.flipX); // Toggle flip state
            }
        });

    }

    hitBomb(player, bomb) {
        super.hitBomb(player, bomb);
    }
    
    
    createChopper() {
        const x = Phaser.Math.Between(0, this.scale.width);
        const chopper = new Chopper(this, x, 16);
        this.choppers.add(chopper);

        chopper.setBounce(1);
        chopper.setCollideWorldBounds(true);
        chopper.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }

    hitChopper (player, chopper)     {
        this.physics.pause();

        player.setTint(0xff0000);

        player.anims.play('turn');

        this.scene.start('GameOverScene', { 민심: ScoreManager.getScore() });
        }

    candleLightHitBomb(candlelight, bomb) {
        candlelight.destroy();
        bomb.destroy();
        ScoreManager.addScore(5); // Update score through ScoreManager
        this.scoreText.setText('민심: ' + ScoreManager.getScore());
        this.missionManager2.updateDestroyCount('bomb');
    }

    candleLightHitChopper(candlelight, chopper) {
        candlelight.destroy();
        chopper.destroy();
        ScoreManager.addScore(20); // Update score through ScoreManager
        this.scoreText.setText('민심: ' + ScoreManager.getScore());
        this.missionManager2.updateDestroyCount('chopper');
    }

    touchImpeachment(player, impeachment) {
        this.missionManager2.checkImpeachmentTouch();
    }

    onMissionComplete() {        
        this.physics.pause();
        this.scene.pause();   // Pause the current scene
    }
    
}
