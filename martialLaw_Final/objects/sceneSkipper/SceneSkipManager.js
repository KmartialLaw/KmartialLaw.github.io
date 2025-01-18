export default class SceneSkipManager extends Phaser.Scene {
    constructor(key) {
        super(key);
    }

    create(nextSceneKey, buttonText) {
        const width = this.sys.game.config.width;
        const height = this.sys.game.config.height;

        // Add space key event listener
        this.input.keyboard.on('keydown-SPACE', () => this.startNextScene(nextSceneKey), this);

        // Add screen touch/click event listener
        this.input.on('pointerdown', () => this.startNextScene(nextSceneKey), this);

        // start game text
        this.add.text(width/2, height/2 + 100, buttonText, { 
            fontSize: '32px',
            padding: { top: 10, bottom: 10, left: 10, right: 10 } 
        })
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => this.startNextScene(nextSceneKey));
    }

    startNextScene(nextSceneKey) {
        this.scene.start(nextSceneKey);
    }
}
