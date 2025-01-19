import Preloader from '../objects/Preloader.js';
import MartialLaw from '../objects/MartialLaw.js';
import SceneSkipManager from '../objects/sceneSkipper/SceneSkipManager.js';

export default class StartScene extends SceneSkipManager {
    constructor() {
        super('StartScene');
        this.preloader = new Preloader(this); // Remember this!!! It's picky to utilize!
               
    }

    preload() {
        this.preloader.preload();  // Remember this!!! It's picky to utilize!
    }

    create() {        
        this.physics.start();

        // Add a button to start the game
        const width = this.sys.game.config.width;
        const height = this.sys.game.config.height;

        // Add background image
        this.background = this.add.image(0, 0, 'background').setOrigin(0, 0);

        // Adjust the background to cover the entire scene
        this.background.displayWidth = this.sys.game.config.width;
        this.background.displayHeight = this.sys.game.config.height;
        
        // create the martialLaw object
        this.martialLawDeclared = new MartialLaw(this, width/2, width/3); 
        
        // Enable physics for martialLawDeclared
        this.physics.world.enable(this.martialLawDeclared);
        this.add.existing(this.martialLawDeclared);

        // configure MartialLaw object
        this.martialLawDeclared.body.allowGravity = false;

        this.martialLawDeclared.setAlpha(1);

        // Initialize dialogue
        this.martialLawDeclared.initializeDialogue();

        // key-down and move to next scene
        super.create('GameScene01', '비상계엄 해제하러 가자!');
    }
}
