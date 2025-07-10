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
        this.freed = false;
        
       
        SceneManager.trackImage(this);
        this.load();
    }

    load() {
        if (!this.loaded && !this.freed) {
            try {
                this.image = new Image(this.path);
                this.width = this.image.width;
                this.height = this.image.height;
                this.loaded = true;
            } catch (error) {
               
            }
        }
    }

    draw(x, y) {
       
        if (!this.loaded || this.freed || !this.image) return;

        try {
            this.image.width = this.width;
            this.image.height = this.height;
            
            if (this.color) {
                this.image.color = this.color;
            }
            
            this.image.draw(x, y);
        } catch (error) {
         
        }
    }

    free() {
        if (this.image && !this.freed) {
            try {
                this.image.free();
            } catch (error) {
                
            }
            this.image = null;
        }
        this.loaded = false;
        this.freed = true;
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
        this.currentScene = null;
       
        const imagesToFree = Array.from(this.loadedImages);
        this.loadedImages.clear();
        
        imagesToFree.forEach(image => {
            if (image && typeof image.free === 'function' && !image.freed) {
                try {
                    image.free();
                } catch (error) {
               
                }
            }
        });
        
        if (typeof std !== 'undefined' && std.gc) {
            std.gc();
        }
    },

    load(sceneFunction) {

        this.sceneLoading = true;
        
        try {
       
            this.clear();
            this.currentScene = sceneFunction;
            
            sceneFunction();
            
        } catch (error) {
            this.currentScene = null;
        } finally {
           
            this.sceneLoading = false;
        }
    },

    update() {
        
        if (!this.sceneLoading && this.currentScene) {
            try {
                this.currentScene();
            } catch (error) {
               
               
                this.currentScene = null;
            }
        }
    },


    forceCleanup() {
        this.clear();
        if (typeof std !== 'undefined' && std.gc) {
            std.gc();
        }
    },


    getStats() {
        return {
            loadedImages: this.loadedImages.size,
            sceneLoading: this.sceneLoading,
            hasCurrentScene: this.currentScene !== null
        };
    }
};