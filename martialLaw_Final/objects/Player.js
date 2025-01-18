export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'dude');
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setBounce(0.2);
        this.setCollideWorldBounds(true);

        this.moveSpeed = 160; // Define a move speed
        this.velocity = 200;

        // Player animations
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.cursors = scene.input.keyboard.createCursorKeys(); // Create keyboard controls
    }

    update(cursors, joyStick) {
        let moveX = 0;

        // Joystick controls
        if (joyStick) {
            const joyStickCursors = joyStick.createCursorKeys();

            if (joyStickCursors.left.isDown) {
                moveX = -1;
            } else if (joyStickCursors.right.isDown) {
                moveX = 1;
            }

            if (joyStickCursors.up.isDown && this.body.touching.down) {
                this.setVelocityY(-this.velocity); // Jump velocity
            }
        }

        // Keyboard controls
        if (cursors.left.isDown) {
            moveX = -1;
        } else if (cursors.right.isDown) {
            moveX = 1;
        }

        if (cursors.up.isDown && this.body.touching.down) {
            this.setVelocityY(-this.velocity); // Jump velocity
        }

        // Set horizontal velocity
        this.setVelocityX(moveX * this.moveSpeed);

        // Play animations
        if (moveX < 0) {
            this.anims.play('left', true);
        } else if (moveX > 0) {
            this.anims.play('right', true);
        } else {
            this.anims.play('turn', true);
        }
    }
}
