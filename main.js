'use strict';

import StartScene from './scenes/StartScene.js';
import GameScene01 from './scenes/GameScene01.js';
import GameScene1 from './scenes/GameScene1.js';
import GameScene02 from './scenes/GameScene02.js';
import GameScene2 from './scenes/GameScene2.js';
import GameScene03 from './scenes/GameScene03.js';
import GameScene3 from './scenes/GameScene3.js';
import GameScene04 from './scenes/GameScene04.js';
import GameOverScene from './scenes/GameOverScene.js';

var config = {
    type: Phaser.AUTO,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    plugins: {
        global: [{
            key: 'rexVirtualJoystick',
            plugin:  window.rexvirtualjoystickplugin,
            start: true
        }]
    },
    scale: {
        mode:Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 480,
        height: 800
      },
    scene: [StartScene, GameScene01, GameScene1, GameScene02, GameScene2, GameScene03, GameScene3, GameScene04,  GameOverScene]        
};

var game = new Phaser.Game(config);
