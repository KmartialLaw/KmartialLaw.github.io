import SceneSkipManager from '../objects/sceneSkipper/SceneSkipManager.js';
import ScoreManager from '../objects/scoreManager/ScoreManager.js'; // Adjust the path as necessary

export default class GameOverScene extends SceneSkipManager {
    constructor() {
        super('GameOverScene');       
    }

    init(data) {
        this.score = data.score;
    }

    startNextScene(nextSceneKey) {
        ScoreManager.resetScore();
        super.startNextScene(nextSceneKey);
    }

    create() {
        const width = this.sys.game.config.width;
        const height = this.sys.game.config.height;

        // key-down and move to next scene
        super.create('GameScene01', '');

        // Retrieve score from ScoreManager
        const finalScore = ScoreManager.getScore(); // Correctly retrieve the score

        this.add.text(width/2, height/2, '대한민국은 여기서\n멈추지 않는다', { 
            fontSize: '32px',
            lineSpacing: 10,
            padding: { top: 10, bottom: 10, left: 10, right: 10 }  
        }).setOrigin(0.5);
        
        // Display the final score
        this.add.text(width / 2, height / 2 / 2, `민심: ${finalScore}`, { fontSize: '32px' }).setOrigin(0.5);
        this.add.text(width/2, height/2/2/2, '비상 계엄령 해제\n다시 시도', { 
            fontSize: '32px',
            lineSpacing: 10,
            padding: { top: 10, bottom: 10, left: 10, right: 10 } 
        })
            .setOrigin(0.5)
            .setInteractive()           
    }
}
