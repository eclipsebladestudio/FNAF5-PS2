import { SceneManager, ImageManager, SfxManager, StreamManager } from "../UTILS/scenemanager.js";

class MenuManagerClass {
    constructor() {}

    logoUpdate() {
        
        const eclipseSound = new StreamManager("PS2DATA/DATA/ASSETS/LOGO/eclipsesound.wav");
        const logo = new ImageManager("PS2DATA/DATA/ASSETS/LOGO/eclipse.png");
        const eclipsetext = new ImageManager("PS2DATA/DATA/ASSETS/LOGO/eclipsetext.png");

        let width = 594;
        let height = 634;
        const initialTargetWidth = 164;
        const initialTargetHeight = 204;
        const screenWidth = 640;
        const screenHeight = 448;
        const finalX = 40;

        const finalWidth = 194;
        const finalHeight = 234;

        let x = (screenWidth - width) / 2;
        let y = (screenHeight - height) / 2;

        let phase = 1;
        let showText = false;
        let textAlpha = 0;
        let logoAlpha = 0;
        const fadeSpeed = 0.01;
        let pauseTimer = 0;

        let fadeOutAlpha = 0;
        const fadeOutSpeed = 3;
        let textShownTime = null;

        let startX = x;
        let startWidth = initialTargetWidth;
        let startHeight = initialTargetHeight;

        const totalMoveFrames = Math.abs(startX - finalX) / 3;
        let moveProgress = 0;

        let eclipseSoundPlayed = false;

        const fadeInLogo = () => {
            if (logoAlpha < 1) {
                logoAlpha += fadeSpeed;
                logoAlpha = Math.min(logoAlpha, 1);
            }
        };

        const fadeInText = () => {
            if (textAlpha < 1) {
                textAlpha += fadeSpeed;
                textAlpha = Math.min(textAlpha, 1);
            }
        };

        Screen.display(() => {
            if (phase === 1) {
                fadeInLogo();

                if (!eclipseSoundPlayed) {
                    eclipseSound.play();
                    eclipseSoundPlayed = true;
                }

                if (width > initialTargetWidth) width -= 3;
                if (height > initialTargetHeight) height -= 3;

                width = Math.max(width, initialTargetWidth);
                height = Math.max(height, initialTargetHeight);

                x = (screenWidth - width) / 2;
                y = (screenHeight - height) / 2;

                if (width === initialTargetWidth && height === initialTargetHeight) {
                    phase = 2;
                    pauseTimer = Date.now();
                    x = (screenWidth - initialTargetWidth) / 2;
                    startX = x;
                }
            } else if (phase === 2) {
                fadeInLogo();

                if (Date.now() - pauseTimer >= 200) {
                    phase = 3;
                }

                if (Date.now() - pauseTimer < 1000) {
                    logo.color = Color.new(128, 128, 128, logoAlpha * 128);
                    logo.width = width;
                    logo.height = height;
                    logo.draw(x, y);
                    return;
                }
            } else if (phase === 3) {
                if (x > finalX) {
                    moveProgress += 0.01;
                    moveProgress = Math.min(moveProgress, 1);

                    x = startX + (finalX - startX) * moveProgress;
                    width = initialTargetWidth + (finalWidth - initialTargetWidth) * moveProgress;
                    height = initialTargetHeight + (finalHeight - initialTargetHeight) * moveProgress;

                    y = (screenHeight - height) / 2;
                } else {
                    x = finalX;
                    width = finalWidth;
                    height = finalHeight;
                    y = (screenHeight - height) / 2;

                    if (!showText) {
                        showText = true;
                        textShownTime = Date.now();
                    }
                }
            }

            logo.color = Color.new(128, 128, 128, logoAlpha * 128);
            logo.width = width;
            logo.height = height;
            logo.draw(x, y);

            if (showText) {
                fadeInText();
                eclipsetext.color = Color.new(255, 255, 255, textAlpha * 128);
                eclipsetext.draw(-30, 0);

                if (textShownTime && Date.now() - textShownTime >= 5000) {
                    if (fadeOutAlpha < 255) {
                        fadeOutAlpha += fadeOutSpeed;
                        if (fadeOutAlpha > 255) fadeOutAlpha = 255;
                        if (fadeOutAlpha >= 255) {
                            SceneManager.load(MenuManager.warningscreen);
                        }
                    }
                    Draw.rect(0, 0, 640, 448, Color.new(0, 0, 0, fadeOutAlpha));
                }
            }
        });
    }

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
                    SceneManager.load(globalThis.Night1Scene.elevatorScene);
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

   



}

export const MenuManager = new MenuManagerClass();
