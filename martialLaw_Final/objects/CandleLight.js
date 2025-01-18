export default class CandleLight extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, scale = 0.2) {
        super(scene, x, y, 'candlelight');

        this.scene = scene;
        
        scene.add.existing(this); // Add this sprite to the scene       
        scene.physics.world.enable(this);

        this.setScale(scale); // set the scale in the constructor
        this.body.setSize(this.width * scale, this.height * scale); // adjust physics body size
    }

    fire(x, y, angle, speed = 600) {
        this.body.reset(x, y);
        this.setActive(true);
        this.setVisible(true);        

        this.scene.physics.velocityFromAngle(angle, speed, this.body.velocity);       
    }

    setCustomScale(scale) {
        this.setScale(scale);
        this.body.setSize(this.width * scale, this.height * scale);  // Adjust physics body size
    }       

    update(time, delta) {
        if (this.y < 0 || this.y > this.scene.game.config.height) {
            this.setActive(false);
            this.setVisible(false);
        }
    }

    setScale(scale) {
        super.setScale(scale);
    }

}
