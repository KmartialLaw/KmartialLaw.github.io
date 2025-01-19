import BaseGameScene from './BaseGameScene.js';
import Platform from '../objects/Platform.js';
import Bd from '../objects/Bd.js';
import MissionManager3 from '../objects/missionManager/MissionManager3.js';
import ScoreManager from '../objects/scoreManager/ScoreManager.js';

export default class GameScene3 extends BaseGameScene {
    constructor() {
        super('GameScene3');
        this.platforms = null;
        this.missionManager3 = new MissionManager3(this); 
        // this.candleLightScale = 1;
        // this.candleLightSpeed = 1500;

        this.bd = null;
        this.bdSpawnTime = 0;
        this.bdSpawnInterval = 100; // Spawn a bomb every 3 seconds
    }

    create(data) { // with no data, candlelight date doesn't received
                   // this is important

        super.create(); // Call the parent class's create method
     
        // Add background image
        this.background = this.add.image(0, 0, 'background').setOrigin(0, 0);

        // Adjust the background to cover the entire scene
        this.background.displayWidth = this.sys.game.config.width;
        this.background.displayHeight = this.sys.game.config.height;

        // Set the background depth to a very low number to ensure it's rendered first
        this.background.setDepth(-1);
        
         // Apply new candlelight properties
         this.candleLightScale = 0.9;
         this.candleLightSpeed = 1000;
         this.fireRate = 100; // Set fire rate from data

        // Add event listener for mission completion
        this.events.on('missionComplete', this.onMissionComplete, this);

        // mission target initialized
        this.missionTarget3 = this.physics.add.sprite(this.width/2, this.height/5, 'pss');
        this.missionTarget3.setScale(0.3);
        this.missionTarget3.body.allowGravity = false;

        // Create bd Using Bd class
        this.bds = this.physics.add.group({            
            classType: Bd,
            runChildUpdate: true      
        });        
            
        this.createBd();

        // Add collision between player and missionTarget3
        this.physics.add.overlap(this.player, this.missionTarget3, this.touchImpeachment, null, this);

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

        // Add colliders for platforms & bodyguards
        this.physics.add.collider(this.player, this.platforms);                
        this.physics.add.collider(this.bds, this.platforms);

        // collision player and bd
        this.physics.add.collider(this.player, this.bds, this.hitBd, null, this);
        // Add collision between candlelights and chopper
        this.physics.add.collider(this.candlelights, this.bds, this.candleLightHitBd, null, this);
    }

    update(time, delta) {
        super.update(time, delta); // Call the parent class's update method

        // check if mission is completed
        this.missionManager3.checkMissionCompletion();

        // Apply new candlelight properties when firing
        if (time > this.nextFire) {
            let candlelight = this.candlelights.get(this.player.x, this.player.y);
            candlelight.setScale(this.candleLightScale);
            if (candlelight) {
                candlelight.fire(this.player.x, this.player.y, -90, this.candleLightSpeed);
                this.nextFire = time + this.fireRate;
            }
        }

        // bd created
        if (time > this.bdSpawnTime) {
            this.createBd();
            this.bdSpawnTime = time + this.bdSpawnInterval;      
        }
        
    }

    createBd() {
            const x = Phaser.Math.Between(0, this.scale.width);
            const bd = new Bd(this, x, 16);
            this.bds.add(bd);
    
            bd.setBounce(1);
            bd.setCollideWorldBounds(true);
            bd.setVelocity(Phaser.Math.Between(-200, 200), 20);
        }
    
    candleLightHitBd(candlelight, bd) {
        candlelight.destroy();
        bd.destroy();
        ScoreManager.addScore(5); // Update score through ScoreManager
        this.scoreText.setText('민심: ' + ScoreManager.getScore());
        this.missionManager3.updateDestroyCount('bd');
    }

    touchImpeachment(player, impeachment) {
        this.missionManager3.checkImpeachmentTouch();
    }

    onMissionComplete() {        
        this.physics.pause();
        this.scene.pause();   // Pause the current scene
    }
    
}
