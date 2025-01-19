'use strict'

import BaseGameScene from '../scenes/BaseGameScene.js';
import Platform from '../objects/Platform.js';
import MissionManager1 from '../objects/missionManager/MissionManager1.js';
import ScoreManager from '../objects/scoreManager/ScoreManager.js';
import Bomb from '../objects/Bomb.js';
import Swat from '../objects/Swat.js';

export default class GameScene1 extends BaseGameScene {
    constructor(key = 'GameScene1') {
        super(key);
        this.platforms = null;
        this.bombs = null;  // police initiated
        this.bombSpawnTime = 0;
        this.bombSpawnInterval = 2000; // Spawn a bomb every 2 seconds
        this.swat = null;  // swat initiated
        this.swatSpawnTime = 0;        
        this.swatSpawnInterval = 1800; // Spawn a swat every 2 seconds
        this.missionManager1 = new MissionManager1(this);        
    }

    create(data) {
        super.create(); // Call the parent class's create method      
        
        // Add background image
        this.background = this.add.image(0, 0, 'background').setOrigin(0, 0);

        // Adjust the background to cover the entire scene
        this.background.displayWidth = this.sys.game.config.width;
        this.background.displayHeight = this.sys.game.config.height;

        // Set the background depth to a very low number to ensure it's rendered first
        this.background.setDepth(-1);
        
        // Apply new candlelight properties
        this.candleLightScale = 0.4;
        this.candleLightSpeed = 1000;
        this.fireRate = 200;
        // this.fireRate = data?.fireRate || 600; // Set fire rate from data
      
        // mission target initialized
        this.missionTarget1 = this.physics.add.sprite(this.width/2, this.height/5, 'getTogether');
        this.missionTarget1.setScale(0.4);
        this.missionTarget1.body.allowGravity = false;

        // Add collision detection between player and mission target
        this.physics.add.overlap(this.player, this.missionTarget1, this.onMissionTargetReached, null, this);

        // // Add event listener for mission completion
        this.events.on('missionComplete', this.onMissionComplete, this);

        // Define platform positions for GameScene1
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

        // Create cop Using bombs class
        this.bombs = this.physics.add.group({            
            classType: Bomb,
            runChildUpdate: true
        });        
        
        this.createBomb();  // police created

        // Create swat Using swat class
        this.swats = this.physics.add.group({            
            classType: Swat,
            runChildUpdate: true
        });

        this.createSwat();  // police created

        // collision player and swat
        this.physics.add.collider(this.player, this.swats, this.hitSwat, null, this);        
        
        // Add collision between candlelights and swats
        this.physics.add.collider(this.candlelights, this.swats, this.candleLightHitSwat, null, this);

        // collision player and bomb
        this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);    

        // Add collision between candlelights and bombs
        this.physics.add.collider(this.candlelights, this.bombs, this.candleLightHitBomb, null, this);

        // Create platforms with specified positions
        this.platforms = new Platform(this);
        this.platforms.createPlatforms(platformPositions);

        // Add colliders for platforms
        this.physics.add.collider(this.player, this.platforms);        
        // collider cops & platforms
        this.physics.add.collider(this.bombs, this.platforms);
        // collider swats & platforms
        this.physics.add.collider(this.swats, this.platforms);
    }

    update(time, delta) {
        super.update(time, delta); // Call the parent class's update method

        // Use the new properties when firing candlelights
        if (time > this.nextFire) {
            let candlelight = this.candlelights.get(this.player.x, this.player.y);
            if (candlelight) {
                candlelight.setCustomScale(this.candleLightScale);
                candlelight.fire(this.player.x, this.player.y, -90, this.candleLightSpeed);
                this.nextFire = time + this.fireRate;
            }
        }

        this.missionManager1.update(time, delta);

        // bomb(police) created
        if (time > this.bombSpawnTime) {
            this.createBomb();
            this.bombSpawnTime = time + this.bombSpawnInterval;
        }

        // Swat creation
        if (time > this.swatSpawnTime) {
            this.createSwat();
            this.swatSpawnTime = time + this.swatSpawnInterval;
        }

        // Flip Swats periodically
        this.swats.children.iterate((swat) => {
            if (Phaser.Math.Between(0, 100) < 2) { // 2% chance to flip each frame
                swat.setFlipX(!swat.flipX); // Toggle flip state
            }
        });
    }

    createBomb() {
        const x = Phaser.Math.Between(0, this.scale.width);
        const bomb = new Bomb(this, x, 16);
        this.bombs.add(bomb);

        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }   
    
    hitBomb (player, bomb) {
        this.physics.pause();

        player.setTint(0xff0000);

        player.anims.play('turn');

        // Pass the score to GameOverScene if needed
        this.scene.start('GameOverScene', { 민심: ScoreManager.getScore() });
    }

    onMissionTargetReached(player, getTogether) {
        this.missionManager1.checkGetTogether();
    }   

    hitSwat (player, swat)     {
        this.physics.pause();

        player.setTint(0xff0000);

        player.anims.play('turn');

        // Pass the score to GameOverScene if needed
        this.scene.start('GameOverScene', { 민심: ScoreManager.getScore() });
        }

    candleLightHitBomb(candlelight, bomb) {
        // Destroy both the candlelight and the bomb
        candlelight.destroy();
        bomb.destroy();
    
        // Update score through ScoreManager
        ScoreManager.addScore(5); 
        this.scoreText.setText('민심: ' + ScoreManager.getScore());
        this.missionManager1.updateDestroyCount('bomb');
    }

    candleLightHitSwat(candlelight, swat) {
        // Destroy both the candlelight and the bomb
        candlelight.destroy();
        swat.destroy();
    
        // Update score through ScoreManager
        ScoreManager.addScore(5); 
        this.scoreText.setText('민심: ' + ScoreManager.getScore());
        this.missionManager1.updateDestroyCount('swat');                             
    }

    createSwat() {
        const x = Phaser.Math.Between(0, this.scale.width);
        const swat = new Swat(this, x, 16);
        this.swats.add(swat);

        swat.setBounce(1);
        swat.setCollideWorldBounds(true);
        swat.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }    

    onMissionComplete() {        
        this.physics.pause();
        this.scene.pause();   // Pause the current scene
    }

}
