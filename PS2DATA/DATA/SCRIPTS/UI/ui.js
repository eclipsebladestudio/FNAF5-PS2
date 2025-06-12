import { SceneManager } from "../utils/scenemanagert.js";

class MenuManagerClass {
    constructor() {
      
    }

    introUpdate() {
         const font = new Font("default")

        Screen.display(() => {
            font.print(0, 0, "teste")
        });
    }


}

export const MenuManager = new MenuManagerClass();