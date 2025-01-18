'use strict';

import SceneSkipManager from '../objects/sceneSkipper/SceneSkipManager.js';
import MessageManager from '../objects/messages/MessageManager.js';

export default class GameScene04 extends SceneSkipManager {
    constructor() {
        super('GameScene04');
        this.messageManager = null;
    }

    create(data) {
        // Initialize the MessageManager
        this.messageManager = new MessageManager(this);

        // key-down and move to next scene
        super.create('GameOverScene', '');

        // Show the "haha" message for 2 seconds and then go to GameScene01
        this.messageManager.showMessage(
            "2024년 12월 3일\n" +
            "비상계엄령 선포후\n" +
            "당신은 국회로 달려가\n" +
            "국회를 지켰고\n" +
            "--------------------\n" +
            "2024년 12월 14일\n" +
            "탄핵소추안 204표\n" +
            "찬성을 이끌었고\n" +
            "--------------------\n" +
            "2025년 1월 15일\n" +
            "공수처와 함께\n" +
            "대통령을 체포 하였다\n" +
            "......\n" +
            "하지만, 민주주의로\n" +
            "가는 길은 이제 시작일 뿐이다다!"
        );       
    }
}
