import { SceneManager } from "./utils/scenemanagert.js";
import { MenuManager } from "./UI/ui.js";

function initGame() {
    SceneManager.load(MenuManager.introUpdate);
}


initGame();