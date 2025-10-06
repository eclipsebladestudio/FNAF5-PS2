import { LanguageSystem } from "../UTILS/languageSystem.js";
import { ImageManager } from "../UTILS/scenemanager.js";

class MenuManagerClass {
    constructor() {
        LanguageSystem.init();
    }

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

        renderScreen(() => {
               

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
                            SceneManager.load(MenuManager.logo2Update);
                            

                        }
                    }
                    Draw.rect(0, 0, 640, 448, Color.new(0, 0, 0, fadeOutAlpha));
                }
            }
        });
    }

    logo2Update() {
    const logo = new ImageManager("PS2DATA/DATA/ASSETS/LOGO/eod.png");

    let logoAlpha = 0;
    const fadeSpeed = 0.01;
    let fadeOutAlpha = 0;
    const fadeOutSpeed = 3;

    let phase = 1; 
    let pauseTimer = 0;

    renderScreen(() => {
        if (phase === 1) { 
            logoAlpha += fadeSpeed;
            if (logoAlpha >= 1) {
                logoAlpha = 1;
                phase = 2;
                pauseTimer = Date.now();
            }
        } else if (phase === 2) { 
            if (Date.now() - pauseTimer >= 2000) { 
                phase = 3;
            }
        } else if (phase === 3) { 
            fadeOutAlpha += fadeOutSpeed;
            if (fadeOutAlpha >= 255) {
                fadeOutAlpha = 255;
                SceneManager.load(MenuManager.logo3Update); 
            }
        }

        logo.color = Color.new(128, 128, 128, logoAlpha * 255);
        logo.draw(0, 0);

        if (phase === 3) {
            Draw.rect(0, 0, 640, 448, Color.new(0, 0, 0, fadeOutAlpha));
        }
    });
}

logo3Update() {
    const logo = new ImageManager("PS2DATA/DATA/ASSETS/LOGO/warning.png");

    let logoAlpha = 0;
    const fadeSpeed = 0.01;
    let fadeOutAlpha = 0;
    const fadeOutSpeed = 3;

    let phase = 1; 
    let pauseTimer = 0;

    renderScreen(() => {
        if (phase === 1) { 
            logoAlpha += fadeSpeed;
            if (logoAlpha >= 1) {
                logoAlpha = 1;
                phase = 2;
                pauseTimer = Date.now();
            }
        } else if (phase === 2) { 
            if (Date.now() - pauseTimer >= 2000) { 
                phase = 3;
            }
        } else if (phase === 3) { 
            fadeOutAlpha += fadeOutSpeed;
            if (fadeOutAlpha >= 255) {
                fadeOutAlpha = 255;
                SceneManager.load(MenuManager.languageSelect); 
            }
        }

        logo.color = Color.new(128, 128, 128, logoAlpha * 128);
        logo.draw(0, 0);

        if (phase === 3) {
            Draw.rect(0, 0, 640, 448, Color.new(0, 0, 0, fadeOutAlpha));
        }
    });
}


    languageSelect() {
       
        const languages = LanguageSystem.getLanguages();

        const bgflag = new ImageManager("flags/freddy.png");
        const bgAudio = new StreamManager("flags/music2.wav"); 
        const screamAudio = new StreamManager("flags/scream.wav");
        let audioStarted = false;

        const jumpscareFrames = [];
        for (let i = 1; i <= 24; i++) {
            jumpscareFrames.push(new ImageManager(`flags/jumpscare/${i}.png`));
        }

        const staticFrames = [];
        for (let i = 1; i <= 4; i++) {
            const img = new ImageManager(`flags/static_${i}.png`);
            img.width = 640;
            img.height = 448;
            staticFrames.push(img);
        }

        let currentIndex = 1;
        let targetIndex = 1;
        const sideOffsetX = 160;
        const mainSize = { width: 224, height: 162 };
        const sideSize = { width: 128, height: 128 };

        const pad = Pads.get(0);
        let keyCooldown = 0;
        const screenCenterX = 320;
        const screenCenterY = 224;

        const flags = languages.map(lang => new ImageManager(lang.flagPath));
        const smooth = (current, target, speed = 0.15) => current + (target - current) * speed;
        const anim = languages.map(() => ({
            x: screenCenterX,
            y: screenCenterY,
            width: mainSize.width,
            height: mainSize.height,
            visible: false
        }));

        let pulseTime = 0;
        let sequenceStarted = false;
        let sequenceFrame = 0;
        let staticTime = 0;

        renderScreen(() => {
            pad.update();
            Draw.rect(0, 0, 640, 448, Color.new(0, 0, 0, 255));

            if (!sequenceStarted) {
                if (!audioStarted) {
                    bgAudio.play();
                    audioStarted = true;
                }

                pulseTime += 0.05;

                if (!keyCooldown) {
                    if (pad.justPressed(Pads.RIGHT)) {
                        targetIndex = (currentIndex + 1) % languages.length;
                        keyCooldown = Date.now();
                    } else if (pad.justPressed(Pads.LEFT)) {
                        targetIndex = (currentIndex - 1 + languages.length) % languages.length;
                        keyCooldown = Date.now();
                    } else if (pad.justPressed(Pads.CROSS) || pad.justPressed(Pads.CIRCLE)) {
                    
                        const selectedLang = languages[currentIndex];
                        LanguageSystem.setLanguage(selectedLang.id);
                        
                        sequenceStarted = true;
                        bgAudio.pause();
                        screamAudio.play();
                        sequenceFrame = 0;
                        return;
                    }
                }

                if (keyCooldown && Date.now() - keyCooldown > 200) {
                    keyCooldown = 0;
                    currentIndex = targetIndex;
                }

                const prevIndex = (currentIndex - 1 + languages.length) % languages.length;
                const nextIndex = (currentIndex + 1) % languages.length;

                [prevIndex, nextIndex].forEach(i => {
                    const targetX = i === prevIndex ? screenCenterX - sideOffsetX : screenCenterX + sideOffsetX;
                    const targetWidth = sideSize.width;
                    const targetHeight = sideSize.height;

                    anim[i].x = smooth(anim[i].x, targetX);
                    anim[i].y = smooth(anim[i].y, screenCenterY);
                    anim[i].width = smooth(anim[i].width, targetWidth);
                    anim[i].height = smooth(anim[i].height, targetHeight);
                    anim[i].visible = true;

                    const flag = flags[i];
                    flag.width = anim[i].width;
                    flag.height = anim[i].height;
                    flag.color = Color.new(50, 50, 50, 128);
                    flag.draw(anim[i].x - flag.width / 2, anim[i].y - flag.height / 2);
                });

                const pulseAmplitude = 10;
                const pulseScale = 1 + Math.sin(pulseTime) * (pulseAmplitude / mainSize.width);
                const pulseHeightScale = 1 + Math.sin(pulseTime) * (pulseAmplitude / mainSize.height);

                const flagCenter = flags[currentIndex];
                anim[currentIndex].x = smooth(anim[currentIndex].x, screenCenterX);
                anim[currentIndex].y = smooth(anim[currentIndex].y, screenCenterY);
                anim[currentIndex].width = mainSize.width * pulseScale;
                anim[currentIndex].height = mainSize.height * pulseHeightScale;
                anim[currentIndex].visible = true;

                flagCenter.width = anim[currentIndex].width;
                flagCenter.height = anim[currentIndex].height;
                flagCenter.color = Color.new(128, 128, 128, 128);
                flagCenter.draw(anim[currentIndex].x - flagCenter.width / 2, anim[currentIndex].y - flagCenter.height / 2);

                const text = languages[currentIndex].name;
                const textSize = font.getTextSize(text); 
                const textX = screenCenterX - textSize.width / 2;
                const textY = screenCenterY + mainSize.height / 2 + 10;

                font.color = Color.new(128, 128, 128, 200);
                font.print(textX, textY, text);

           
                const titleText = LanguageSystem.getText("language_selection");
                const titleSize = font.getTextSize(titleText); 
                const titleX = screenCenterX - titleSize.width / 2;
                const titleY = 30; 

                font.color = Color.new(255, 255, 255, 255);
                font.print(titleX, titleY, titleText);

             
                const dubText = languages[currentIndex].hasDub ? 
                    LanguageSystem.getText("dub_available") : 
                    LanguageSystem.getText("no_dub_available");

                const dubSize = font.getTextSize(dubText);
                const dubX = 640 - dubSize.width - 20;
                const dubY = 400;

                font.color = Color.new(255, 255, 0, 255);
                font.print(dubX, dubY, dubText);

            } else {
                if (sequenceFrame < jumpscareFrames.length) {
                    jumpscareFrames[sequenceFrame].draw(0, 0);
                    sequenceFrame++;
                } else if (staticTime < 180) { 
                    const frameIndex = Math.floor(staticTime / 3) % 4; 
                    staticFrames[frameIndex].draw(0, 0);
                    staticTime++;
                } else {
                    SceneManager.load(MenuManager.warningscreen);
                }
            }
        });
    }

    warningscreen() {
      
        const lineSprites = [];
        for (let i = 1; i <= 6; i++) {
            lineSprites[i] = new ImageManager(`PS2DATA/DATA/ASSETS/SPRITES/GENERAL/LINE/${i}.png`);
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

        const warningText = [
            LanguageSystem.getText("warning_title"),
            "",
            LanguageSystem.getText("warning_line1"),
            LanguageSystem.getText("warning_line2")
        ];

        

        renderScreen(() => {
            const currentTime = Date.now();
            const deltaTime = currentTime - lastTime;

            frameTime += deltaTime;
            if (frameTime >= frameDelay) {
                currentFrame++;
                if (currentFrame > 6) currentFrame = 1;
                frameTime = 0;
            }
            lastTime = currentTime;

            const currentLineSprite = lineSprites[currentFrame];
            if (currentLineSprite) {
                currentLineSprite.color = Color.new(255, 255, 255, 100);
                currentLineSprite.draw(0, 0);
            }

            defaultfont.scale = 0.6; 

            let startY = 177; 
            const lineSpacing = 15;

            warningText.forEach((line, index) => {
                const textSize = defaultfont.getTextSize(line);
                const textX = 320 - textSize.width / 2; 
                const textY = startY + index * lineSpacing;

                defaultfont.color = Color.new(0, 0, 200, 80); 
                defaultfont.print(textX - 1, textY, line);
                defaultfont.print(textX + 1, textY, line);
                defaultfont.print(textX, textY - 1, line);
                defaultfont.print(textX, textY + 1, line);

                defaultfont.color = Color.new(150, 200, 255, 128); 
                defaultfont.print(textX, textY, line);
            });

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
                    SceneManager.load(MenuManager.introAndTitle);
                }
            }

            if (fadeAlpha > 0) {
                Draw.rect(0, 0, 640, 448, Color.new(0, 0, 0, fadeAlpha));
            }
        });
    }
















 introAndTitle() {
    const footImage = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/INTRODUCTION/foot.png");
    const middleImage = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/INTRODUCTION/body.png");
    const headImage = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/INTRODUCTION/head.png");
    const faceImage = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/INTRODUCTION/face.png");

    const introAudio = new StreamManager("PS2DATA/DATA/ASSETS/SOUND/STREAM/intro.wav");
    const GradualAudio = new StreamManager("PS2DATA/DATA/ASSETS/SOUND/STREAM/gradual.wav");

    let cameraY = -886.0;
    let targetY = -100.0;
    let cameraSpeed = 0.34;
    let isMoving = true;
    let audioStarted = false;

    let fadeAlpha = 255;
    let fadeSpeed = 2;

    let faceTriggered = false;
    let faceY = 0.0;
    let faceTargetY = -115.0;
    let faceSpeed = 0.3;
    let faceAlpha = 0;
    let faceMoving = false;

    let blackScreenActive = false;
    let blackScreenTimer = 0;
    const blackScreenPauseDuration = 120;

    let inTitle = false;

    const lineSprites = [];
    for (let i = 1; i <= 6; i++) lineSprites[i] = new ImageManager(`PS2DATA/DATA/ASSETS/SPRITES/GENERAL/LINE/${i}.png`);

    const loadFrames = (folder) => {
        const arr = [];
        for (let i = 1; i <= 4; i++) arr[i] = new ImageManager(`PS2DATA/DATA/ASSETS/SPRITES/TITLE_SCREEN/AM/${folder}/${i}.PNG`);
        return arr;
    };

    const activeFrames = loadFrames(1);
    const active13Frames = loadFrames(2);
    const active14Frames = loadFrames(3);
    const active15Frames = loadFrames(4);

    const active2 = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/TITLE_SCREEN/active2.png");
    const active3 = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/TITLE_SCREEN/active3.png");
    const active4 = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/TITLE_SCREEN/active4.png");
    const active4b = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/TITLE_SCREEN/active4.png");
    const line = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/TITLE_SCREEN/qb.png");

    const sl1 = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/TITLE_SCREEN/sl1.png");
    const sl2 = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/TITLE_SCREEN/sl2.png");
    const sl3 = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/TITLE_SCREEN/sl3.png");

    let active7X = 50;
    let active7Y = 370;
    let active7A = 0;
    let active7TimerA = 0;

    let lastTime = Date.now();
    let timer2 = 0, timer3 = 0, timer4 = 0;
    let posY2 = 42, posY3 = 25, posY4 = 61;
    let alpha2 = 10, alpha3 = 10, alpha4 = 10;
    let posY4b = 0, alpha4b = 10, speed4b = 1;

    let folderTimer = 0, currentFolder = 1;
    const folderDuration = 4000;
    let frameTimer = 0;
    const frameDurations = [1000, 100, 100, 100];
    let frameIndices = [1, 1, 1, 1];

    let lineFrame = 1;
    let lineFrameTimer = 0;
    const lineFrameDelay = 100;

    const menuOptions = [
        LanguageSystem.getText("menu_new_game"),
        LanguageSystem.getText("menu_continue"),
        LanguageSystem.getText("menu_extras")
    ];

    const optionStartY = 150;
    const optionSpacing = 31;
    let selectedIndex = 0;
    const pad = Pads.get(0);
    const selectorImage = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/TITLE_SCREEN/lineselect.png");
    const selectorX = 0;

    let fadingOut = false;
    let fadeOpacity = 0;


    renderScreen(() => {
        const now = Date.now();
        const delta = now - lastTime;
        lastTime = now;

        if (!inTitle) {
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
                if (cameraY >= targetY || !introAudio.isPlaying()) {
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
                blackScreenTimer++;
                if (blackScreenTimer >= blackScreenPauseDuration && !introAudio.isPlaying()) {
                    inTitle = true;
                    GradualAudio.play();
                }
            } else if (fadeAlpha > 0) {
                Draw.rect(0, 0, 640, 448, Color.new(0, 0, 0, fadeAlpha));
            }
        } else {
            pad.update();
            if (!fadingOut) {
                if (pad.justPressed(Pads.UP)) {
                    selectedIndex--;
                    if (selectedIndex < 0) selectedIndex = menuOptions.length - 1;
                }
                if (pad.justPressed(Pads.DOWN)) {
                    selectedIndex++;
                    if (selectedIndex >= menuOptions.length) selectedIndex = 0;
                }
                if (pad.justPressed(Pads.CROSS) && selectedIndex === 0) {
                    fadingOut = true;
                }
            }

            folderTimer += delta;
            frameTimer += delta;
            lineFrameTimer += delta;
            if (lineFrameTimer >= lineFrameDelay) {
                lineFrame++;
                if (lineFrame > 6) lineFrame = 1;
                lineFrameTimer = 0;
            }

            if (folderTimer >= folderDuration) {
                folderTimer = 0;
                currentFolder++;
                if (currentFolder > 4) currentFolder = 1;
                frameIndices[currentFolder - 1] = 1;
                frameTimer = 0;
            }

            const idx = currentFolder - 1;
            if (frameTimer >= frameDurations[frameIndices[idx] - 1]) {
                frameTimer = 0;
                frameIndices[idx] = frameIndices[idx] < 4 ? frameIndices[idx] + 1 : 1;
            }

            timer2 += delta; timer3 += delta; timer4 += delta;
            if (timer2 >= 250) { posY2 = Math.random() * 448; alpha2 = 30 + Math.random() * 50; timer2 = 0; }
            if (timer3 >= 200) { posY3 = Math.random() * 448; alpha3 = 30 + Math.random() * 50; timer3 = 0; }
            if (timer4 >= 150) { posY4 = Math.random() * 448; alpha4 = 30 + Math.random() * 50; timer4 = 0; }

            posY4b += speed4b;
            if (posY4b > 448) posY4b = 0;
            alpha4b = 10 + Math.random() * 20;

            if (currentFolder === 1) activeFrames[frameIndices[0]].draw(0, 0);
            if (currentFolder === 2) active13Frames[frameIndices[1]].draw(0, 0);
            if (currentFolder === 3) active14Frames[frameIndices[2]].draw(0, 0);
            if (currentFolder === 4) active15Frames[frameIndices[3]].draw(0, 0);

            const currentLineSprite = lineSprites[lineFrame];
            if (currentLineSprite) { currentLineSprite.color = Color.new(255, 255, 255, 100); currentLineSprite.draw(0, 0); }

            const lightOpacity = 10 + Math.random() * 50;
            Draw.rect(0, 0, 640, 448, Color.new(0, 0, 0, lightOpacity));

            active2.color = Color.new(255, 255, 255, alpha2); active2.draw(0, posY2);
            active3.color = Color.new(255, 255, 255, alpha3); active3.draw(0, posY3);
            active4.color = Color.new(255, 255, 255, alpha4); active4.draw(0, posY4);
            active4b.color = Color.new(255, 255, 255, alpha4b); active4b.draw(0, posY4b);

            line.draw(0, 0);

            active7TimerA += delta;
            if (active7TimerA >= 150) {
                active7A = Math.floor(Math.random() * 3);
                active7TimerA = 0;
            }

            let active7Image = sl1;
            if (active7A === 0) active7Image = sl1;
            else if (active7A === 1) active7Image = sl2;
            else if (active7A === 2) active7Image = sl3;
            active7Image.draw(active7X, active7Y);

            const selectorY = optionStartY + selectedIndex * optionSpacing;
            selectorImage.draw(selectorX, selectorY + 4);

            CONSOLA.scale = 0.6;
            menuOptions.forEach((line, index) => {
                const textX = 420;
                const textY = optionStartY + index * optionSpacing;
                CONSOLA.scale = 0.63;
                CONSOLA.color = Color.new(15, 1, 118, 60);
                CONSOLA.print(textX - 2, textY, line);
                CONSOLA.print(textX + 2, textY, line);
                CONSOLA.print(textX, textY - 2, line);
                CONSOLA.print(textX, textY + 2, line);
                CONSOLA.scale = 0.6;
                CONSOLA.color = Color.new(201, 182, 250, 128);
                CONSOLA.print(textX, textY, line);
            });

            if (fadingOut) {
    fadeOpacity += 8;
    if (fadeOpacity > 255) fadeOpacity = 255;

    Draw.rect(0, 0, 640, 448, Color.new(0, 0, 0, fadeOpacity));

    if (fadeOpacity >= 255) {
        GradualAudio.pause(); 
        SceneManager.load(Night1Scene.elevatorScene);
    }
}


        }
    });
}









}

export const MenuManager = new MenuManagerClass();
