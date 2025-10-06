import { SceneManager, ImageManager, SfxManager, StreamManager } from "../UTILS/scenemanager.js";
import { Night1Scene } from "../SCENES/night1.js";
import { Night2Scene } from "../SCENES/night2.js";
import { Night5Scene } from "../SCENES/night5.js";
import { MenuManager } from "../UI/ui.js";
import { renderScreen } from "./render.js";
import { LanguageSystem } from "../UTILS/languageSystem.js";

const font = new Font("flags/fnaf.ttf");
const defaultfont = new Font("default");
const nimbusmonl = new Font("PS2DATA/DATA/ASSETS/FONTS/nimbusmonl-bold.ttf")
const NudMotoyaMaruW55 = new Font("PS2DATA/DATA/ASSETS/FONTS/TAHOMABD.TTF")
const CONSOLA = new Font("PS2DATA/DATA/ASSETS/FONTS/Candara_Bold.TTF")
const NudMotoyaMaruW552 = new Font("PS2DATA/DATA/ASSETS/FONTS/calibril.TTF")

export function setupGlobals() {
    globalThis.ImageManager = ImageManager;
    globalThis.StreamManager = StreamManager;
    globalThis.SfxManager = SfxManager;
    globalThis.SceneManager = SceneManager;
    globalThis.renderScreen = renderScreen;
    globalThis.LanguageSystem = LanguageSystem;
    
    globalThis.Night1Scene = Night1Scene;
    globalThis.Night2Scene = Night2Scene;
    globalThis.Night5Scene = Night5Scene;
    globalThis.MenuManager = MenuManager;

    globalThis.font = font;
    globalThis.defaultfont = defaultfont;
    globalThis.nimbusmonl = nimbusmonl;
    globalThis.NudMotoyaMaruW55 = NudMotoyaMaruW55;
    globalThis.NudMotoyaMaruW552 = NudMotoyaMaruW552;
    globalThis.CONSOLA = CONSOLA;
}
