'use strict'

export default class MessageManager {
    constructor(scene) {
        this.scene = scene;
        this.currentMessage = null;
    }

    showMessage(message, duration = 2000) {
    // showMessage(message, duration = 1000) {
        const width = this.scene.scale.width;
        const height = this.scene.scale.height;

        // Create a temporary text object to measure dimensions
        const tempText = this.scene.add.text(0, 0, message, { fontSize: '24px', fontStyle: 'bold' });
        const textWidth = tempText.width + 20; // Add some padding
        const textHeight = tempText.height + 20; // Add some padding

        // Remove the temporary text object
        tempText.destroy();        

        // Create a semi-transparent background for the message box
        const background = this.scene.add.rectangle(
            width / 2,
            height / 2,
            Math.min(textWidth, width * 0.8), // Limit width to 80% of screen
            Math.min(textHeight, height * 0.4), // Limit height to 40% of screen
            0x000000,
            0.1 // Opacity
        ).setOrigin(0.5);

        // Add the message text
        const text = this.scene.add.text(
            width / 2,
            height / 2,
            message,
            { fontSize: '24px', fill: '#FFFFFF', lineSpacing: 10, align: 'center' }
        ).setOrigin(0.5);

        // Set word wrap to make sure it fits within the box
        text.setWordWrapWidth(background.width - 20); // Wrap within background with padding

        // Optional: Automatically remove after duration
        this.scene.time.delayedCall(duration, () => {
            background.destroy(); // Remove background
            text.destroy(); // Remove text
        });
    }
}
