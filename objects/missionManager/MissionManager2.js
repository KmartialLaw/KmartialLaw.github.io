// MissionManager2.js
import BaseMissionManager from '/objects/missionManager/BaseMissionManager.js';

export default class MissionManager2 extends BaseMissionManager {
    constructor(scene) {
        super(scene);
        this.bombsDestroyed = 0;
        this.choppersDestroyed = 0;
        this.requiredDestroys = 200;
        this.firstConditionMet = false;
    }

    checkMissionCompletion() {
        if (this.firstConditionMet && this.missionCompleted) {
            this.completeMission('GameScene03');
        }
    }

    updateDestroyCount(type) {
        if (type === 'bomb') {
            this.bombsDestroyed++;
        } else if (type === 'chopper') {
            this.choppersDestroyed++;
        }

        if (this.bombsDestroyed >= this.requiredDestroys && 
            this.choppersDestroyed >= this.requiredDestroys) {
            this.firstConditionMet = true;
        }
    }

    checkImpeachmentTouch() {
        if (!this.firstConditionMet) {
            this.showInsufficientMessage();
        } else {
            this.setMissionComplete();
        }
    }

    showInsufficientMessage() {
        const message = this.scene.add.text(
            this.scene.scale.width / 2, 
            this.scene.scale.height / 2, 
            '민심이 충분히 모이지 않았어요', 
            { fontSize: '24px', fill: '#FF0000', lineSpacing: 10, fontStyle: 'bold' }
        );
        message.setOrigin(0.5);
        this.scene.time.delayedCall(2000, () => message.destroy());
    }

    setMissionComplete() {        
        this.missionCompleted = true;
        this.scene.events.emit('missionComplete');
        this.checkMissionCompletion();
    }

    showCompletionMessage(duration = 3000) {
        const width = this.scene.scale.width;
        const height = this.scene.scale.height;
    
        // Define message text and common styles
        const messageText = '탄핵소추안 가결 성공!';
        const commonTextStyle = { fontSize: '32px', fontStyle: 'bold' };
    
        // Create a temporary text to measure its dimensions
        const tempText = this.scene.add.text(0, 0, messageText, commonTextStyle);
        const textWidth = tempText.width;
        const textHeight = tempText.height;
        tempText.destroy();
    
        // Calculate background dimensions
        const padding = 20;
        const bgWidth = textWidth + padding * 2;
        const bgHeight = textHeight + padding * 2;
    
        // Create a semi-transparent background for the message box
        const background = this.scene.add.rectangle(
            width / 2,
            height / 2,
            bgWidth,
            bgHeight,
            0x000000,
            0.7 // Opacity
        ).setOrigin(0.5);
    
        // Add a border to the background
        const border = this.scene.add.rectangle(
            width / 2,
            height / 2,
            bgWidth,
            bgHeight
        ).setOrigin(0.5);
        border.setStrokeStyle(2, 0xffffff); // 2px white border
    
        // Add the message text with additional properties
        const message = this.scene.add.text(
            width / 2,
            height / 2,
            messageText,
            {
                ...commonTextStyle,
                fill: '#FFFFFF',
                lineSpacing: 10,
                align: 'center'
            }
        ).setOrigin(0.5);
    
        // Remove the message, background, and border after the specified duration
        this.scene.time.delayedCall(duration, () => {
            background.destroy();
            border.destroy();
            message.destroy();
        });
    }

}