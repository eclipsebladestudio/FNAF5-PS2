export class ImageManager {
    constructor(path) {
        this.path = path;
        this.image = null;
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.color = null;
        this.loaded = false;

    
        if (SceneManager.isCurrentSceneActive()) {
            this.load();
        }
        
        SceneManager.trackImage(this);
    }

    load() {
        if (!this.loaded) {
            this.image = new Image(this.path);
            this.width = this.image.width;
            this.height = this.image.height;
            this.loaded = true;
        }
    }

    draw(x, y) {
        if (!this.loaded) return; 
        
        if (this.image) {
            this.image.width = this.width;
            this.image.height = this.height;

            if (this.color) {
                this.image.color = this.color;
            }

            this.image.draw(x, y);
        }
    }

    free() {
        if (this.image) {
            this.image.free();
            this.image = null;
        }
        this.loaded = false;
    }
}

export const SceneManager = {
    currentScene: null,
    loadedImages: new Set(),
    sceneLoading: false,

    isCurrentSceneActive() {
        return !this.sceneLoading && this.currentScene !== null;
    },

    trackImage(image) {
        this.loadedImages.add(image);
    },

    clear() {
     
        this.sceneLoading = true;
        

        this.loadedImages.forEach(image => {
            if (image && image.free) {
                image.free();
            }
        });
        this.loadedImages.clear();
        
        this.sceneLoading = false;
    },

    load(sceneFunction) {
        this.clear(); 
        this.currentScene = sceneFunction;
        sceneFunction(); 
    },

    update() {
        if (this.currentScene) {
            this.currentScene();
        }
    }
};