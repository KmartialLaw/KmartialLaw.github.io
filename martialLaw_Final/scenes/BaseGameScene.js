'use strict';

import Preloader from '../objects/Preloader.js';
import ScoreManager from '../objects/scoreManager/ScoreManager.js';
import Player from '../objects/Player.js';
import YsyClass from '../objects/YsyClass.js';
import CandleLight from '../objects/CandleLight.js';

export default class BaseGameScene extends Phaser.Scene {
    constructor(key) {
        super(key);
        this.preloader = new Preloader(this);
        this.nextFire = 0;
        this.fireRate = 300;
        this.joyStick = null;
    }

    preload() {
        this.preloader.preload();
    }

    create() {
        this.width = this.scale.width;
        this.height = this.scale.height;

        // Create joystick
        this.joyStick = this.plugins.get('rexVirtualJoystick').add(this, {
            x: this.width/2,
            y: this.height - 100,
            radius: 50,
            base: this.add.circle(0, 0, 50, 0x888888),
            thumb: this.add.circle(0, 0, 25, 0xcccccc)
        });

        // The score
        this.scoreText = this.add.text(16, 16, '민심: ' + ScoreManager.getScore(), {
            fontSize: '32px',
            fill: '#FFF'
        });

        // Create player
        this.player = new Player(this, 100, 450);

        // Create ysy
        this.ysy = new YsyClass(this, 100, 10);
        this.ysy.body.allowGravity = false;
        this.ysy.setVelocityX(100); // Move right initially

        // Candlelight group
        this.candlelights = this.physics.add.group({
            classType: CandleLight,
            maxSize: 10,
            runChildUpdate: true
        });
    }

    update(time, delta) {
        // Update player (handle joystick and keyboard inputs)
        if (this.player) {
            this.player.update(this.player.cursors, this.joyStick);
        }

        // Update ysy random movement
        if (this.ysy) {
            this.ysy.update(time, delta);
        }

        // Candlelight firing logic
        if (time > this.nextFire) {
            let candlelight = this.candlelights.get(this.player.x, this.player.y);

            if (candlelight) {
                candlelight.setCustomScale(this.candleLightScale);
                candlelight.fire(this.player.x, this.player.y, -90, this.candleLightSpeed);
                this.nextFire = time + this.fireRate;
            }
        }
    }
}
