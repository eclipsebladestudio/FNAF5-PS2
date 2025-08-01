import { SceneManager } from "./UTILS/scenemanager.js";

import { MenuManager } from "./UI/ui.js";
import { Night1Scene } from "./SCENES/night1.js";
import { Night2Scene } from "./SCENES/night2.js";


globalThis.Night1Scene = Night1Scene;
globalThis.Night2Scene = Night2Scene;

function initGame() {
    SceneManager.load(Night1Scene.elevatorScene);
}


initGame();