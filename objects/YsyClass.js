export default class YsyClass extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'ysy');
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // this.setBounce(0.2);
        this.setCollideWorldBounds(true);

        this.isTurning = false;
        this.turnDuration = 3000; // Duration of turn animation in milliseconds
        this.direction = 1; // 1 for right, -1 for left
        this.moveSpeed = 200; // Adjust this value to change speed
        this.directionChangeTimer = 0;
        // this.directionChangeDuration = Phaser.Math.Between(2000, 5000); // Random duration between 2-5 seconds
        this.directionChangeDuration = Phaser.Math.Between(4000, 6000); // Random duration between 2-5 seconds8

        //  Our player animations, turning, walking left and walking right.
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('ysy', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'ysy', frame: 4 } ],
            frameRate: 5,            
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('ysy', { start: 5, end: 8 }),
            frameRate: 5,
            repeat: -1
        });    
        
        this.cursors = scene.input.keyboard.createCursorKeys();

    }

    update(time, delta) {
        if (this.isTurning) {
            // Ensure the sprite stays still during the turn
            this.setVelocityX(0);

            } else {
                //Existeing update logic
                this.directionChangeTimer += delta;

                if (this.directionChangeTimer >= this.directionChangeDuration) {
                    this.changeDirection();
                }
    
                this.setVelocityX(this.direction * this.moveSpeed);
    
                if (this.direction === 1) {
                    this.anims.play('right', true);
                } else {
                    this.anims.play('left', true);
                }
            }     
    }
    
    changeDirection() {
        if (!this.isTurning) {
            this.isTurning = true;
            this.setVelocityX(0); // Stop moving           
            this.anims.play('turn', true); // Play turn animation

            this.scene.time.delayedCall(this.turnDuration, () => {
                this.isTurning = false;
                this.direction = -this.direction; // Reverse direction
                this.directionChangeTimer = 0;
                this.directionChangeDuration = Phaser.Math.Between(1000, 2000);
            });
        }
    }  
}
