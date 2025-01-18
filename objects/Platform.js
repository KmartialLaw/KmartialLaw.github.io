export default class Platform extends Phaser.Physics.Arcade.StaticGroup {
    constructor(scene) {
        super(scene.physics.world, scene);
        this.scene = scene;
    }

    createPlatforms(positions) {
        // Clear any existing platforms
        this.clear(true, true);

        // Create platforms based on provided positions
        positions.forEach(position => {
            this.create(position.x, position.y, 'ground').setScale(position.scaleX, position.scaleY).refreshBody();
        });
    }
}
