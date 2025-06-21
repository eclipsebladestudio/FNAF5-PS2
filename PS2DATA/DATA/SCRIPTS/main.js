import { SceneManager } from "./utils/scenemanagert.js";
import { MenuManager } from "./UI/ui.js";
import { Night1Scene } from "./SCENES/night1.js";

function initGame() {
    SceneManager.load(Night1Scene.ventcrawl1);
}


initGame();