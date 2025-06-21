import { SceneManager } from "../utils/scenemanagert.js";

class MenuManagerClass {
    constructor() {}
    

    warningscreen() {
        const text = new Image("PS2DATA/DATA/ASSETS/SPRITES/WARNING/text.png");
        
        const lineSprites = [];
        for (let i = 1; i <= 6; i++) {
            lineSprites[i] = new Image(`PS2DATA/DATA/ASSETS/SPRITES/GENERAL/LINE/${i}.png`);
        }

        let currentFrame = 1;
        let frameTime = 0;
        let frameDelay = 50;
        let lastTime = Date.now();

        let fadeState = 0; 
        let fadeAlpha = 255; 
        let fadeSpeed = 3; 
        let waitTime = 0;
        let waitDuration = 5000; 

        Screen.display(() => {
            const currentTime = Date.now();
            const deltaTime = currentTime - lastTime;

            frameTime += deltaTime;
            if (frameTime >= frameDelay) {
                currentFrame++;
                if (currentFrame > 6) currentFrame = 1;
                frameTime = 0;
            }
            lastTime = currentTime;

            text.draw(0, 0);
            const currentLineSprite = lineSprites[currentFrame];
            if (currentLineSprite) {
                currentLineSprite.color = Color.new(255, 255, 255, 100);
                currentLineSprite.draw(0, 0);
            }

            if (fadeState === 0) {
                fadeAlpha -= fadeSpeed;
                if (fadeAlpha <= 0) {
                    fadeAlpha = 0;
                    fadeState = 1;
                    waitTime = currentTime;
                }
            } else if (fadeState === 1) {
                if (currentTime - waitTime >= waitDuration) {
                    fadeState = 2;
                }
            } else if (fadeState === 2) {
                fadeAlpha += fadeSpeed;
                if (fadeAlpha >= 255) {
                    fadeAlpha = 255;
                    fadeState = 3;
                    SceneManager.load(MenuManager.introUpdate);
                }
            }

            if (fadeAlpha > 0) {
                Draw.rect(0, 0, 640, 448, Color.new(0, 0, 0, fadeAlpha));
            }
        });
    }

    introUpdate() {
        const footImage = new Image("PS2DATA/DATA/ASSETS/SPRITES/INTRODUCTION/foot.png");
        const middleImage = new Image("PS2DATA/DATA/ASSETS/SPRITES/INTRODUCTION/body.png");
        const headImage = new Image("PS2DATA/DATA/ASSETS/SPRITES/INTRODUCTION/head.png");
        const faceImage = new Image("PS2DATA/DATA/ASSETS/SPRITES/INTRODUCTION/face.png");
        
        const introAudio = new Sound.Stream("PS2DATA/DATA/ASSETS/SOUND/STREAM/intro.wav");
        

        let cameraY = -886.0;
        let targetY = -100.0;
        let cameraSpeed = 0.34;
        let isMoving = true;
        let audioStarted = false;
        let introDuration = 0;
        let cameraSpeedAdjusted = false;

        let fadeAlpha = 255;
        let fadeSpeed = 2;

        let faceTriggered = false;
        let faceY = 0.0;
        let faceTargetY = -115.0;
        let faceSpeed = 0.3;
        let faceAlpha = 0;
        let faceMoving = false;

        let blackScreenActive = false;


        Screen.display(() => {
    if (!audioStarted) {
        introAudio.play();
        audioStarted = true;
    }

    if (fadeAlpha > 0) {
        fadeAlpha -= fadeSpeed;
        if (fadeAlpha < 0) fadeAlpha = 0;
    }

    if (isMoving && !blackScreenActive) {
        cameraY += cameraSpeed;

        if (cameraY >= -224.0 && !faceTriggered) {
            faceTriggered = true;
            faceMoving = true;
        }

        if (cameraY >= targetY || !introAudio.playing()) {
            cameraY = targetY;
            isMoving = false;
            blackScreenActive = true;
            fadeAlpha = 0;
        }
    }

    if (faceTriggered && !blackScreenActive) {
        if (faceAlpha < 255) {
            faceAlpha += 1;
            if (faceAlpha > 255) faceAlpha = 255;
        }

        if (faceMoving) {
            faceY -= faceSpeed;
            if (faceY <= faceTargetY) {
                faceY = faceTargetY;
                faceMoving = false;
            }
        }
    }

    if (!blackScreenActive) {
        footImage.draw(0, 886 + cameraY);
        middleImage.draw(0, 448 + cameraY);
        headImage.draw(0, 0 + cameraY);

        if (faceTriggered) {
            faceImage.color = Color.new(255, 255, 255, faceAlpha);
            faceImage.draw(0, faceY);
        }
    }

    
  

    if (blackScreenActive) {
        Draw.rect(0, 0, 640, 448, Color.new(0, 0, 0, 255));
    } else if (fadeAlpha > 0) {
        Draw.rect(0, 0, 640, 448, Color.new(0, 0, 0, fadeAlpha));
    }
});
}

    titleUpdate() {
   
        Screen.display(() => {

        });
    
    }
}

export const MenuManager = new MenuManagerClass();