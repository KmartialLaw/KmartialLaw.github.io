export default class MartialLaw extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'martiallaw');
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // martial law declared setting
        this.dialogueInitialized = false;
    }

    initializeDialogue() {
        if (!this.dialogueInitialized) {
            this.showDialogue("2024년 12월 3일\n대한민국에 비상 계엄을 선포한다\n-대통령 트럼프-\nMartial Law\nDeclared in Korea!!!", () => {
                console.log("Dialogue finished");
                // You can add any additional logic here
            });
            this.dialogueInitialized = true;
        }
    }

    // Add this new method
    showDialogue(text, callback) {
        const textConfig = {
            fontSize: '25px',
            fontStyle: 'bold',
            fill: '#ff0000',
            align: 'center',
            lineSpacing: 10,  // Add this line to increase space between lines            
            padding: { top: 10, bottom: 10, left: 10, right: 10 }
        };

        // this.dialogueText = this.scene.add.text(this.x - 160, this.y + 125, text, textConfig);
        this.dialogueText = this.scene.add.text(this.x - 190, this.y + 125, text, textConfig);
        this.dialogueText.setOrigin(0, 0);

    }     
}
