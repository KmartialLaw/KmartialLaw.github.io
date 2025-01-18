'use strict';

import SceneSkipManager from '../objects/sceneSkipper/SceneSkipManager.js';
import MessageManager from '../objects/messages/MessageManager.js';

export default class GameScene02 extends SceneSkipManager {
    constructor() {
        super('GameScene02');
        this.messageManager = null;
    }

    create(data) {
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

        // Initialize the MessageManager
        this.messageManager = new MessageManager(this);

        // key-down and move to next scene
        super.create('GameScene2', '');

        // Show message for 2 seconds and then go to GameScene01
        this.messageManager.showMessage("대통령 탄핵안!\n정족수 200표를 \n달성하라!",);

        // this.time.delayedCall(5000, () => {
        this.time.delayedCall(2000, () => {
            this.scene.start('GameScene2', data);    
        })
        
    }
}
