import { SceneManager } from "./UTILS/scenemanager.js";

import { MenuManager } from "./UI/ui.js";
import { Night1Scene } from "./SCENES/night1.js";
import { Night2Scene } from "./SCENES/night2.js";
import { Night5Scene } from "./SCENES/night5.js";
import { renderScreen } from "./CONFIGS/render.js";


globalThis.Night1Scene = Night1Scene;
globalThis.Night2Scene = Night2Scene;
globalThis.Night5Scene = Night5Scene;
globalThis.renderScreen = renderScreen;

function initGame() {
    SceneManager.load(MenuManager.logoUpdate);
}


initGame();