export default class Swat extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'swat');
        
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(0.3);
        this.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));        

    }
}