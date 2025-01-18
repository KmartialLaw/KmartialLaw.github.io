'use strict';

export default class Chopper extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'chopper');
              
        // These lines are crucial
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(0.4);

        this.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    }

    // Add this method to make it compatible with Phaser's object pooling
    static create(scene, x, y) {
        return new Chopper(scene, x, y);
    }
}
