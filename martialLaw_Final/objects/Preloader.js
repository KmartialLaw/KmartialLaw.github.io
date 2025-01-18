export default class Preloader {
    constructor(scene) {
        this.scene = scene;
    }

    preload() {
        this.scene.load.image('background', 'assets/images/background.png');
        this.scene.load.image('backgroundForScene2', 'assets/images/backgroundForScene2.png');
        this.scene.load.image('martiallaw', 'assets/images/martiallaw_declared.png');  
        this.scene.load.image('bodyguard', 'assets/images/bodyguard.png');  

        // mission
        this.scene.load.image('getTogether', 'assets/images/getTogether.png');  // mission 1 
        this.scene.load.image('impeachment_1st', 'assets/images/impeachment_1st.png');  // mission 2
        this.scene.load.image('pss', 'assets/images/pss.png');  // mission 2
        

        this.scene.load.image('ground', 'assets/images/platform.png');  
        this.scene.load.image('chopper', 'assets/images/chopper.png');  // chopper
        this.scene.load.image('bomb', 'assets/images/bomb.png');        // cop
        this.scene.load.image('swat', 'assets/images/swat.png');        // swat
        this.scene.load.image('bd', 'assets/images/bodyguard.png');  // bodyguard  - mission 3  
        this.scene.load.spritesheet('dude', 'assets/images/player.png', { frameWidth: 32, frameHeight: 48 });   // player
        this.scene.load.spritesheet('ysy', 'assets/images/ysy.png', { frameWidth: 96, frameHeight: 144, endFrame: 8 }); // big boss enemy

        this.scene.load.image('candlelight', 'assets/images/candlelight.png'); // bullet
    }
}
