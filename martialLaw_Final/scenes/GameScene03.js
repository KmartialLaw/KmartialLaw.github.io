'use strict';

import SceneSkipManager from '../objects/sceneSkipper/SceneSkipManager.js';
import MessageManager from '../objects/messages/MessageManager.js';

export default class GameScene03 extends SceneSkipManager {
    constructor() {
        super('GameScene03');
        this.messageManager = null;
    }

    create(data) {
        // Initialize the MessageManager
        this.messageManager = new MessageManager(this);

        // key-down and move to next scene
        super.create('GameScene3', '');

        // Add background image
        this.background = this.add.image(0, 0, 'background').setOrigin(0, 0);

        // Adjust the background to cover the entire scene
        this.background.displayWidth = this.sys.game.config.width;
        this.background.displayHeight = this.sys.game.config.height;

        // Set the background depth to a very low number to ensure it's rendered first
        this.background.setDepth(-1);
        
        // Show the  message for 2 seconds and then go to GameScene01
        this.messageManager.showMessage("공수처 대통령\n체포영장 집행",);

        // this.time.delayedCall(5000, () => {
        this.time.delayedCall(2000, () => {
            this.scene.start('GameScene3', data);    
        })
        
    }
}
