'use strict';

import SceneSkipManager from '../objects/sceneSkipper/SceneSkipManager.js';
import MessageManager from '../objects/messages/MessageManager.js';

export default class GameScene01 extends SceneSkipManager {
    constructor() {
        super('GameScene01');
        this.messageManager = null;
    }

    create(data) {
        // Add background image
        this.background = this.add.image(0, 0, 'background').setOrigin(0, 0);

        // Adjust the background to cover the entire scene
        this.background.displayWidth = this.sys.game.config.width;
        this.background.displayHeight = this.sys.game.config.height;

        // Initialize the MessageManager
        this.messageManager = new MessageManager(this);

        // key-down and move to next scene
        super.create('GameScene1', '');

        // Show message for 2 seconds and then go to GameScene01
        this.messageManager.showMessage("국회로 모이자!\n비상 계엄령을\n해제하자",);

        this.time.delayedCall(2000, () => {
            this.scene.start('GameScene1', data);    
        })        
    }
}
