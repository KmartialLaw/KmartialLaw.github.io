// BaseMissionManager.js
export default class BaseMissionManager {
    
    constructor(scene) {
        this.scene = scene;
        this.missionCompleted = false;
        this.currentStage = 1; // Add this to keep track of the current stage
    }

    update(time, delta) {
        if (!this.missionCompleted) {
            this.checkMissionCompletion();
        }
    }

    checkMissionCompletion() {
        // To be implemented by child classes
    }

    completeMission(toGameScene, duration=3000) {
        this.missionCompleted = true;
        this.showCompletionMessage();

        // Increase the stage number
        this.currentStage++;

        // Calculate new candlelight properties based on the stage
        const candleLightScale = this.currentStage * 0.1; // Increases by 0.5 each stage
        const candleLightSpeed = this.currentStage * 50; // Increases by 200 each stage
        const newFireRate = Math.max(10, 600 - (this.currentStage - 1) * 200); // Decrease fire rate, minimum 100ms      

        setTimeout(() => {            
            this.scene.scene.start(toGameScene, {                 
                candleLightScale: candleLightScale, 
                candleLightSpeed: candleLightSpeed,
                fireRate: newFireRate // Pass new fire rate to next scene 
            });          

        }, duration);       
    }
}
