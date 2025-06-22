import {ImageManager, SceneManager} from "../utils/scenemanagert.js";
import {DebugManager} from "../utils/debug.js";

class Night1SceneClass {
    constructor() {}



    elevatorScene() {
        const font = new Font("PS2DATA/DATA/ASSETS/FONTS/calibrilight.ttf");

        let rectX = 500;
        let rectY = 263;
        const rectWidth = 10;
        const rectHeight = 10;
        const speed = 300;
        const maxWidth = 1000;
        const maxHeight = 526;
        let lastTime = Date.now();
        const rectColor = Color.new(255, 100, 100, 255);

        let targetCameraX = rectX + (rectWidth / 2) - (640 / 2);
        let targetCameraY = rectY + (rectHeight / 2) - (448 / 2);

        if (targetCameraX < 0) targetCameraX = 0;
        if (targetCameraX > maxWidth - 640) targetCameraX = maxWidth - 640;
        if (targetCameraY < 0) targetCameraY = 0;
        if (targetCameraY > maxHeight - 448) targetCameraY = maxHeight - 448;

        let cameraX = targetCameraX;
        let cameraY = targetCameraY;

        const cameraSpeed = 5;
        const screenWidth = 640;
        const screenHeight = 448;

        let screenShake = true;
        let shakeIntensity = 2;
        let shakeSpeed = 50;
        let lastShakeTime = Date.now();
        let shakeOffsetX = 0;
        let shakeOffsetY = 0;

        const pad = Pads.get(0);

        const elevatorSequence1 = [];
        const elevatorSequence2 = [];
        let currentFrame1 = 0;
        let currentFrame2 = 0;
        let frameTimer = 0;
        const frameDelay = 30;

        const nolightImage1 = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/ELEVATOR/nolight1.png");
        const nolightImage2 = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/ELEVATOR/nolight2.png");
        const cursorImage = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/ELEVATOR/cursor.png");
        const lights = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/ELEVATOR/lights.png");
        const overlay = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/GENERAL/overlay.png");
        const condemnedImage = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/ELEVATOR/condemned.png");
        const mouse = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/GENERAL/mouse.png")

        const tabletIntroduction = [];
        const tabletMiddle = [];
        const tabletClosing = [];
        let tabletState = "hidden";
        let tabletCurrentFrame = 0;
        let tabletFrameTimer = 0;
        const tabletFrameDelay = 50;

        const pointImage = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/ELEVATOR/TABLET/point.png");
        const middleImage = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/ELEVATOR/TABLET/middle.png");
        const errorImage = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/ELEVATOR/TABLET/error.png");
        const eggsImage = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/ELEVATOR/TABLET/eggs.png");
        const cursor2Image = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/GENERAL/cursor2.png");

        let pointCount = 0;
        const maxPoints = 7;

        const tabletX = 250;
        const tabletY = 200;
        const pointAreaOffsetX = 70;
        const pointAreaOffsetY = 85;
        const pointAreaWidth = 150;
        const pointAreaHeight = 100;

        let isOverElevatorButton = false;
        let isOverFadeoutButton = false;
        let fadeoutButtonClicked = false;

        let showMiddleImage = false;
        let showErrorImage = false;
        let showEggsImage = false;
        let errorTimer = 0;
        const errorDuration = 3000;
        let eggsTimer = 0;
        let endingFinished = false;
        let endingFinishedTime = 0;
        let shakeStopTimer = 0;
        let shakeStoppedTime = 0;
        let finalNoLightPhase = false;

        let showCondemnedImage = false;
        let condemnedY = 600;
        let condemnedTargetY = 200;
        let condemnedAnimationStarted = false;
        let condemnedAnimationTimer = 0;
        const condemnedAnimationSpeed = 40;
        const condemnedAnimationDuration = 5000;
        let condemnedStartTimer = 0;
        const condemnedStartDelay = 10000;

        const ramStats = System.getMemoryStats();
        const freeVRAM = Screen.getFreeVRAM()

        const ramUsedMB = (ramStats.used / 1048576).toFixed(2);
        const ramFreeMB = (32 - ramUsedMB).toFixed(2);

        let lightsDisabled = false;

        lights.filter = LINEAR;
        lights.width = 1000;
        lights.height = 526;

        let lightsY = 526;
        const lightsSpeed = 80;

        let showNolightImages = false;
        let nolightTimer = 0;
        let nolightInterval = Math.random() * 2500 + 1500;
        let nolightDisplayTime = 0;
        let nolightDuration = Math.random() * 600 + 200;
        const nolightFrequency = 0.3;

        const elevatorCO1 = [];
        const elevatorCO2 = [];
        let elevatorCOCurrentFrame1 = 0;
        let elevatorCOCurrentFrame2 = 0;
        let elevatorCOFrameTimer = 0;
        const elevatorCOFrameDelay = 50;
        let elevatorCOSequencePlaying = false;
        let elevatorCOSequenceFinished = false;
        let showElevatorCOButton = false;
        let showFadeOutButton = false;
        let fadeOutStarted = false;
        let fadeOutAlpha = 0;
        const fadeOutSpeed = 100;

        const elevatorCOButtonX = 320;
        const elevatorCOButtonY = 350;
        const elevatorCOButtonWidth = 100;
        const elevatorCOButtonHeight = 50;

        const fadeOutButtonX = 320;
        const fadeOutButtonY = 350;
        const fadeOutButtonWidth = 100;
        const fadeOutButtonHeight = 50;


        const handunit01c = Sound.Stream("PS2DATA/DATA/ASSETS/SOUND/STREAM/handunit01c.wav");
        const handunit01d = Sound.Stream("PS2DATA/DATA/ASSETS/SOUND/STREAM/handunit01d.wav");
        const handunit02a = Sound.Stream("PS2DATA/DATA/ASSETS/SOUND/STREAM/handunit02a.wav");
        const eggsbenedict = Sound.Stream("PS2DATA/DATA/ASSETS/SOUND/STREAM/eggsbenedict.wav");
        const daughterline1 = Sound.Stream("PS2DATA/DATA/ASSETS/SOUND/STREAM/DaughterLine1.wav");
        const beep = Sound.Sfx("PS2DATA/DATA/ASSETS/SOUND/SFX/beep.adp")
        const closetablet = Sound.Sfx("PS2DATA/DATA/ASSETS/SOUND/SFX/closetablet.adp")

        const handunitaudiomixed = Sound.Stream("PS2DATA/DATA/ASSETS/SOUND/STREAM/Handunit02amixed.wav");

        const darkframe1 = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/ELEVATOR/nolight1.png");
        const darkframe2 = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/ELEVATOR/nolight2.png");
        const night1 = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/ELEVATOR/night1.png");

        let showDarkFrames = false;
        let darkFrameTimer = 0;
        let darkFrameInterval = Math.random() * 2500 + 1500;
        let darkFrameDisplayTime = 0;
        let darkFrameDuration = Math.random() * 600 + 200; 
        const darkFrameFrequency = 0.3; 



        let introPhase = "daughterLine";
        let introTimer = 0;
        const daughterLineDuration = 0;
        const blackScreenDuration = 1000;
        const fadeInDuration = 1000;
        let fadeAlpha = 255;
        let audioStarted = false;
        let firstAudioFinished = false;
        let secondAudioStarted = false;
        let audioStartTime = 0;
        let audioDuration = 0;
        let errorAudioPlaying = false;
        let eggsAudioPlaying = false;
        let daughterLineStarted = false;

        for (let i = 1; i <= 10; i++) {
            const imagePath = `PS2DATA/DATA/ASSETS/SPRITES/ELEVATOR/ELEVATORSEQUENCE/1/${i}.png`;
            const image = new ImageManager(imagePath);
            image.filter = LINEAR;
            elevatorSequence1.push(image);
        }

        for (let i = 1; i <= 10; i++) {
            const imagePath = `PS2DATA/DATA/ASSETS/SPRITES/ELEVATOR/ELEVATORSEQUENCE/2/${i}.png`;
            const image = new ImageManager(imagePath);
            image.filter = LINEAR;
            elevatorSequence2.push(image);
        }

        for (let i = 1; i <= 11; i++) {
            const imagePath = `PS2DATA/DATA/ASSETS/SPRITES/ELEVATOR/ELEVATORCO/1/${i}.png`;
            const image = new ImageManager(imagePath);
            image.filter = LINEAR;
            elevatorCO1.push(image);
        }

        for (let i = 1; i <= 11; i++) {
            const imagePath = `PS2DATA/DATA/ASSETS/SPRITES/ELEVATOR/ELEVATORCO/2/${i}.png`;
            const image = new ImageManager(imagePath);
            elevatorCO2.push(image);
        }

        for (let i = 1; i <= 10; i++) {
            const imagePath = `PS2DATA/DATA/ASSETS/SPRITES/ELEVATOR/TABLET/introduction/${i}.png`;
            const image = new ImageManager(imagePath);
            tabletIntroduction.push(image);
        }

        for (let i = 1; i <= 11; i++) {
            const imagePath = `PS2DATA/DATA/ASSETS/SPRITES/ELEVATOR/TABLET/Midle/${i}.png`;
            const image = new ImageManager(imagePath);
            tabletMiddle.push(image);
        }

        for (let i = 1; i <= 10; i++) {
            const imagePath = `PS2DATA/DATA/ASSETS/SPRITES/ELEVATOR/TABLET/closing/${i}.png`;
            const image = new ImageManager(imagePath);
            tabletClosing.push(image);
        }

        const soundAreas = [{
                x: 302,
                y: 220,
                width: 40,
                height: 53,
                sound: Sound.Sfx("PS2DATA/DATA/ASSETS/SOUND/SFX/dataphone_elevator1.adp")
            },
            {
                x: 800,
                y: 343,
                width: 83,
                height: 83,
                sound: Sound.Sfx("PS2DATA/DATA/ASSETS/SOUND/SFX/keypad_elevator1.adp")
            },
            {
                x: 668,
                y: 219,
                width: 20,
                height: 34,
                sound: Sound.Sfx("PS2DATA/DATA/ASSETS/SOUND/SFX/red_button_not_available1.adp")
            },
            {
                x: 667,
                y: 270,
                width: 26,
                height: 28,
                sound: Sound.Sfx("PS2DATA/DATA/ASSETS/SOUND/SFX/keypad_elevator1.adp")
            }
        ];

        let DEBUG_MODE = false;

        const elevatorCOButton = {
            x: 668,
            y: 219,
            width: 20,
            height: 34,
            sound: Sound.Sfx("PS2DATA/DATA/ASSETS/SOUND/SFX/clankv2.adp")
        };

        const fadeOutButton = {
            x: 450,
            y: 350,
            width: 100,
            height: 50
        };

        let mouseTimer = 0;
        const mouseDisplayTime = 25000;
        let mouseAlpha = 255;
        let mouseFading = false;
        const mouseFadeSpeed = 2;

        let night1image = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/ELEVATOR/night1.png");
        let shownight1image = false;
        let night1imageAlpha = 0;
        let night1imageTimer = 0;
        const night1imageFadeDuration = 2000; 
        const night1imageDisplayDuration = 7000; 

        Screen.display(() => {
            const currentTime = Date.now();
            const deltaTime = (currentTime - lastTime) / 1000;
            lastTime = currentTime;

            pad.update();

            if (mouseTimer < mouseDisplayTime) {
                mouseTimer += deltaTime * 1000;
            } else if (!mouseFading) {
                mouseFading = true;
            }


            if (mouseFading && mouseAlpha > 0) {
                mouseAlpha -= mouseFadeSpeed;
                if (mouseAlpha < 0) mouseAlpha = 0;
            }

            if (introPhase !== "normal") {
                introTimer += deltaTime * 1000;

                if (introPhase === "daughterLine") {
                    if (!daughterLineStarted) {
                        daughterline1.play();


                        daughterLineStarted = true;
                    }

                    if (daughterLineStarted && !daughterline1.playing()) {
                        introPhase = "blackScreen";
                        introTimer = 0;
                    }

                    Draw.rect(0, 0, 640, 448, Color.new(0, 0, 0, 255));
                    return;
                }

                if (introPhase === "blackScreen") {
                    if (introTimer >= blackScreenDuration) {
                        introPhase = "fadeIn";
                        introTimer = 0;
                    }

                    Draw.rect(0, 0, 640, 448, Color.new(0, 0, 0, 255));
                    return;
                } else if (introPhase === "fadeIn") {
                    if (!audioStarted) {

                        handunit01c.play();
                        audioStarted = true;
                        audioStartTime = currentTime;
                        audioDuration = handunit01c.length;
                    }

                    const fadeProgress = introTimer / fadeInDuration;
                    if (fadeProgress >= 1.0) {
                        introPhase = "normal";
                        fadeAlpha = 0;
                    } else {
                        fadeAlpha = Math.floor(255 * (1 - fadeProgress));
                    }
                }
            }

            

            if (audioStarted && !firstAudioFinished && !handunit01c.playing()) {
                firstAudioFinished = true;
                tabletState = "introduction";
                tabletCurrentFrame = 0;
                tabletFrameTimer = 0;
                handunit01d.play();
                secondAudioStarted = true;
            }

            if (tabletState === "error" && !handunit01d.playing() && !errorAudioPlaying) {
                handunit02a.play();
                errorAudioPlaying = true;
            }


            if (introPhase !== "blackScreen" && introPhase !== "daughterLine") {
                if (tabletState === "introduction" || tabletState === "middle" || tabletState === "closing") {
                    tabletFrameTimer += deltaTime * 1000;
                    if (tabletFrameTimer >= tabletFrameDelay) {
                        tabletFrameTimer = 0;
                        tabletCurrentFrame++;

                        if (tabletState === "introduction") {
                            if (tabletCurrentFrame >= tabletIntroduction.length) {
                                tabletState = "middle";
                                tabletCurrentFrame = 0;
                            }
                        } else if (tabletState === "middle") {
                            if (tabletCurrentFrame >= tabletMiddle.length) {
                                tabletCurrentFrame = 0;
                            }
                        } else if (tabletState === "closing") {
                            if (tabletCurrentFrame >= tabletClosing.length) {
                                if (!endingFinished) {
                                    endingFinished = true;
                                    endingFinishedTime = currentTime;
                                }
                                tabletState = "hidden";
                                pointCount = 0;
                                showMiddleImage = false;
                                showErrorImage = false;
                                showEggsImage = false;
                            }
                        }
                    }
                }

                if (tabletState === "error") {
                    if (!errorAudioPlaying) {
                        handunit02a.play();
                        errorAudioPlaying = true;
                    }

                    if (errorAudioPlaying && !handunit02a.playing()) {
                        tabletState = "eggs";
                        showErrorImage = false;
                        showEggsImage = true;
                        errorAudioPlaying = false;
                        eggsbenedict.play();
                        eggsAudioPlaying = true;
                    }
                }

                if (tabletState === "eggs") {
                    if (eggsAudioPlaying && !eggsbenedict.playing()) {
                        tabletState = "closing";
                        showEggsImage = false;
                        showMiddleImage = false;
                        tabletCurrentFrame = 0;
                        tabletFrameTimer = 0;
                        eggsAudioPlaying = false;
                    }
                }

                const isTabletActive = tabletState !== "hidden";

                if (tabletState === "middle" && pad.justPressed(Pads.CROSS)) {
                    const tabletScreenX = tabletX + shakeOffsetX;
                    const tabletScreenY = tabletY + shakeOffsetY;
                    const pointAreaX = tabletScreenX + pointAreaOffsetX;
                    const pointAreaY = tabletScreenY + pointAreaOffsetY;

                    const cursorScreenX = rectX - cameraX;
                    const cursorScreenY = rectY - cameraY;


                    if (cursorScreenX >= pointAreaX && cursorScreenX <= pointAreaX + pointAreaWidth &&
                        cursorScreenY >= pointAreaY && cursorScreenY <= pointAreaY + pointAreaHeight) {

                        pointCount++;
                        beep.play();


                        if (pointCount >= maxPoints) {
                            if (handunit01d.playing()) {
                                handunit01d.pause();
                            }
                            tabletState = "error";
                            showMiddleImage = true;
                            showErrorImage = true;
                            errorTimer = 0;
                        }
                    }
                }

                if (finalNoLightPhase && showElevatorCOButton && !elevatorCOSequencePlaying && !elevatorCOSequenceFinished && pad.justPressed(Pads.CROSS)) {
                    const cursorScreenX = rectX;
                    const cursorScreenY = rectY;

                    if (cursorScreenX >= elevatorCOButton.x && cursorScreenX <= elevatorCOButton.x + elevatorCOButton.width &&
                        cursorScreenY >= elevatorCOButton.y && cursorScreenY <= elevatorCOButton.y + elevatorCOButton.height) {
                        elevatorCOButton.sound.play();
                        elevatorCOSequencePlaying = true;
                        elevatorCOCurrentFrame1 = 0;
                        elevatorCOCurrentFrame2 = 0;
                        elevatorCOFrameTimer = 0;
                        showElevatorCOButton = false;
                    }
                }

                if (elevatorCOSequenceFinished && showFadeOutButton && !fadeOutStarted && pad.justPressed(Pads.CROSS)) {
                    const cursorScreenX = rectX - cameraX;
                    const cursorScreenY = rectY - cameraY;

                    if (cursorScreenX >= fadeOutButton.x - cameraX &&
                        cursorScreenX <= (fadeOutButton.x - cameraX) + fadeOutButton.width &&
                        cursorScreenY >= fadeOutButton.y - cameraY &&
                        cursorScreenY <= (fadeOutButton.y - cameraY) + fadeOutButton.height) {

                        fadeOutStarted = true;
                        showFadeOutButton = false;
                        fadeoutButtonClicked = true; 
                    }
                }


                if (elevatorCOSequencePlaying && !elevatorCOSequenceFinished) {
                    elevatorCOFrameTimer += deltaTime * 1000;
                    if (elevatorCOFrameTimer >= elevatorCOFrameDelay) {
                        elevatorCOFrameTimer = 0;
                        elevatorCOCurrentFrame1++;
                        elevatorCOCurrentFrame2++;

                        if (elevatorCOCurrentFrame1 >= elevatorCO1.length && elevatorCOCurrentFrame2 >= elevatorCO2.length) {
                            elevatorCOSequencePlaying = false;
                            elevatorCOSequenceFinished = true;
                            elevatorCOCurrentFrame1 = elevatorCO1.length - 1;
                            elevatorCOCurrentFrame2 = elevatorCO2.length - 1;
                            showFadeOutButton = true;
                        }
                    }
                }

                if (fadeOutStarted) {
                    fadeOutAlpha += fadeOutSpeed * deltaTime;
                    if (fadeOutAlpha >= 255) {
                        fadeOutAlpha = 255;
                    }
                }

                const moveDistance = speed * deltaTime;

                if (pad.pressed(Pads.LEFT) && rectX > 0) {
                    rectX -= moveDistance;
                }
                if (pad.pressed(Pads.RIGHT) && rectX < maxWidth - rectWidth) {
                    rectX += moveDistance;
                }
                if (pad.pressed(Pads.UP) && rectY > 0) {
                    rectY -= moveDistance;
                }
                if (pad.pressed(Pads.DOWN) && rectY < maxHeight - rectHeight) {
                    rectY += moveDistance;
                }

                const analogX = pad.lx / 127.0;
                const analogY = pad.ly / 127.0;
                const deadzone = 0.15;

                if (Math.abs(analogX) > deadzone) {
                    const analogMoveX = analogX * moveDistance;
                    rectX += analogMoveX;
                }

                if (Math.abs(analogY) > deadzone) {
                    const analogMoveY = analogY * moveDistance;
                    rectY += analogMoveY;
                }

                if (rectX < 0) rectX = 0;
                if (rectX > maxWidth - rectWidth) rectX = maxWidth - rectWidth;
                if (rectY < 0) rectY = 0;
                if (rectY > maxHeight - rectHeight) rectY = maxHeight - rectHeight;

                if (!isTabletActive) {
                    targetCameraX = rectX + (rectWidth / 2) - (screenWidth / 2);
                    targetCameraY = rectY + (rectHeight / 2) - (screenHeight / 2);

                    if (targetCameraX < 0) targetCameraX = 0;
                    if (targetCameraX > maxWidth - screenWidth) targetCameraX = maxWidth - screenWidth;
                    if (targetCameraY < 0) targetCameraY = 0;
                    if (targetCameraY > maxHeight - screenHeight) targetCameraY = maxHeight - screenHeight;

                    const cameraLerpSpeed = cameraSpeed * deltaTime;
                    cameraX += (targetCameraX - cameraX) * cameraLerpSpeed;
                    cameraY += (targetCameraY - cameraY) * cameraLerpSpeed;
                }

                if (endingFinished && !condemnedAnimationStarted) {
                    if (condemnedStartTimer === 0) {
                        condemnedStartTimer = currentTime;
                    }


                    if ((currentTime - condemnedStartTimer) >= condemnedStartDelay) {
                        showCondemnedImage = true;
                        condemnedAnimationStarted = true;
                        condemnedAnimationTimer = 0;
                        lightsDisabled = true;
                    }
                }

                if (showCondemnedImage && condemnedAnimationStarted) {
                    condemnedAnimationTimer += deltaTime * 1000;

                    if (condemnedY > condemnedTargetY) {
                        condemnedY -= condemnedAnimationSpeed * deltaTime;

                        if (condemnedY < condemnedTargetY) {
                            
                            condemnedY = condemnedTargetY;
                            elevatorCOButton.sound.play();
                        }
                    }
                }

                if (endingFinished && !finalNoLightPhase) {
                    if (shakeStopTimer === 0) {
                        shakeStopTimer = currentTime;
                    }
                
                    if ((currentTime - shakeStopTimer) >= 20000) {
                        screenShake = false;
                        if (shakeStoppedTime === 0) {
                            shakeStoppedTime = currentTime;
                            shownight1image = true; 
                            night1imageAlpha = 0; 
                            night1imageTimer = 0;
                        }
                
                        if ((currentTime - shakeStoppedTime) >= 11000) {
                            finalNoLightPhase = true;
                            showNolightImages = true;
                            showElevatorCOButton = true;
                        }
                    }
                }

                if (screenShake && !finalNoLightPhase) {
                    const shakeTime = Date.now();
                    if (shakeTime - lastShakeTime >= shakeSpeed) {
                        shakeOffsetX = (Math.random() - 0.5) * 2 * shakeIntensity;
                        shakeOffsetY = (Math.random() - 0.5) * 2 * shakeIntensity;
                        lastShakeTime = shakeTime;
                    }
                } else {
                    shakeOffsetX = 0;
                    shakeOffsetY = 0;
                }

                if (!lightsDisabled) {
                    lightsY -= lightsSpeed * deltaTime;

                    if (lightsY <= -200) {
                        lightsY = 526;
                    }
                }

          
if (screenShake && !finalNoLightPhase) { 
    darkFrameTimer += deltaTime * 1000;

    if (!showDarkFrames && darkFrameTimer >= darkFrameInterval && Math.random() < darkFrameFrequency) {
        showDarkFrames = true;
        darkFrameDisplayTime = 0;
        darkFrameDuration = Math.random() * 600 + 200;
    }

    if (showDarkFrames) {
        darkFrameDisplayTime += deltaTime * 1000;
        if (darkFrameDisplayTime >= darkFrameDuration) {
            showDarkFrames = false;
            darkFrameTimer = 0;
            darkFrameInterval = Math.random() * 2500 + 1500;
        }
    }
} else {
    showDarkFrames = false; 
}

                frameTimer += deltaTime * 1000;
                if (frameTimer >= frameDelay) {
                    frameTimer = 0;
                    currentFrame1 = (currentFrame1 + 1) % 10;
                    currentFrame2 = (currentFrame2 + 1) % 10;
                }

                if (!lightsDisabled) {
                    lights.draw(0 - cameraX, lightsY - cameraY);
                }

                if (showCondemnedImage) {
                    condemnedImage.draw(350 - cameraX + shakeOffsetX, condemnedY - cameraY + shakeOffsetY);
                }

                const cursorScreenX = rectX;
                const cursorScreenY = rectY;

                isOverElevatorButton = (
                    showElevatorCOButton &&
                    cursorScreenX >= elevatorCOButton.x &&
                    cursorScreenX <= elevatorCOButton.x + elevatorCOButton.width &&
                    cursorScreenY >= elevatorCOButton.y &&
                    cursorScreenY <= elevatorCOButton.y + elevatorCOButton.height
                );


                isOverFadeoutButton = (
                    showFadeOutButton &&
                    cursorScreenX >= fadeOutButton.x &&
                    cursorScreenX <= fadeOutButton.x + fadeOutButton.width &&
                    cursorScreenY >= fadeOutButton.y &&
                    cursorScreenY <= fadeOutButton.y + fadeOutButton.height
                );

                if (!showNolightImages || (!finalNoLightPhase && !elevatorCOSequencePlaying && !elevatorCOSequenceFinished)) {
                    if (elevatorSequence1[currentFrame1]) {
                        elevatorSequence1[currentFrame1].draw(0 - cameraX + shakeOffsetX, 0 - cameraY + shakeOffsetY);
                    }

                    if (elevatorSequence2[currentFrame2]) {
                        elevatorSequence2[currentFrame2].draw(500 - cameraX + shakeOffsetX, 0 - cameraY + shakeOffsetY);
                    }
                } else if (showNolightImages && !elevatorCOSequencePlaying && !elevatorCOSequenceFinished) {
                    nolightImage1.draw(0 - cameraX + shakeOffsetX, 0 - cameraY + shakeOffsetY);
                    nolightImage2.draw(500 - cameraX + shakeOffsetX, 0 - cameraY + shakeOffsetY);
                }
                if (showDarkFrames && !elevatorCOSequencePlaying && !elevatorCOSequenceFinished) {
    darkframe1.draw(0 - cameraX + shakeOffsetX, 0 - cameraY + shakeOffsetY);
    darkframe2.draw(500 - cameraX + shakeOffsetX, 0 - cameraY + shakeOffsetY);
}

                if (elevatorCOSequencePlaying || elevatorCOSequenceFinished) {
                    const frame1Index = Math.min(elevatorCOCurrentFrame1, elevatorCO1.length - 1);
                    const frame2Index = Math.min(elevatorCOCurrentFrame2, elevatorCO2.length - 1);

                    if (elevatorCO1[frame1Index]) {
                        elevatorCO1[frame1Index].draw(0 - cameraX + shakeOffsetX, 0 - cameraY + shakeOffsetY);
                    }

                    if (elevatorCO2[frame2Index]) {
                        elevatorCO2[frame2Index].draw(500 - cameraX + shakeOffsetX, 0 - cameraY + shakeOffsetY);
                    }
                }

                if (tabletState === "introduction" && tabletIntroduction[tabletCurrentFrame]) {
                    tabletIntroduction[tabletCurrentFrame].draw(tabletX + shakeOffsetX, tabletY + shakeOffsetY);
                } else if (tabletState === "middle" && tabletMiddle[tabletCurrentFrame]) {
                    tabletMiddle[tabletCurrentFrame].draw(tabletX + shakeOffsetX, tabletY + shakeOffsetY);

                    if (!showEggsImage) {
                        for (let i = 0; i < pointCount; i++) {
                            pointImage.draw((tabletX + 80 + i * 15) + shakeOffsetX, (tabletY + 73) + shakeOffsetY);
                        }
                    }
                } else if (tabletState === "closing" && tabletClosing[tabletCurrentFrame]) {
                    tabletClosing[tabletCurrentFrame].draw(tabletX + shakeOffsetX, tabletY + shakeOffsetY);

                    if (tabletCurrentFrame >= tabletClosing.length - 1 && !handunitaudiomixed.playing()) {
                        handunitaudiomixed.play();
                        closetablet.play();
                    }
                }

                if (showMiddleImage) {
                    middleImage.draw(tabletX + shakeOffsetX, tabletY + shakeOffsetY);
                }

                if (showErrorImage) {
                    errorImage.draw(tabletX + 130 + shakeOffsetX, tabletY + 130 + shakeOffsetY);
                }

                if (showEggsImage) {
                    eggsImage.draw(tabletX + 80 + shakeOffsetX, tabletY + 70 + shakeOffsetY);
                }




                if (pad.justPressed(Pads.CROSS)) {
                    const cursorScreenX = rectX;
                    const cursorScreenY = rectY;

                    console.log(`Cursor global: (${Math.floor(cursorScreenX)}, ${Math.floor(cursorScreenY)})`);

                    for (let i = 0; i < soundAreas.length; i++) {
                        const area = soundAreas[i];
                        if (cursorScreenX >= area.x &&
                            cursorScreenX <= area.x + area.width &&
                            cursorScreenY >= area.y &&
                            cursorScreenY <= area.y + area.height) {

                            area.sound.play();

                            break;
                        }
                    }
                }


                if (DEBUG_MODE) {
                    for (const area of soundAreas) {
                        Draw.rect(
                            area.x - cameraX,
                            area.y - cameraY,
                            area.width,
                            area.height,
                            Color.new(255, 0, 0, 100)
                        );

                        font.print(0, 50, "Using RAM: " + ramUsedMB + "MB / 32MB");
                        font.print(0, 100, "Free RAM: " + ramFreeMB + "MB / 32MB");
                        font.print(0, 150, "Used RAM: " + ramStats.used + " B");
                        font.print(0, 200, "Free VRAM: " + freeVRAM + " KB");

                    }
                }

                overlay.height = 448;
                overlay.color = Color.new(255, 255, 255, 20);
                overlay.draw(0, 0);

                if (isOverElevatorButton || (isOverFadeoutButton && !fadeoutButtonClicked)) {
                    cursor2Image.draw(rectX - cameraX, rectY - cameraY);
                } else {
                    cursorImage.draw(rectX - cameraX, rectY - cameraY);
                }

                if (mouseAlpha > 0) {
                    mouse.color = Color.new(255, 255, 255, mouseAlpha);
                    mouse.draw(14, 376);
                }

                if (shownight1image) {
                    night1imageTimer += deltaTime * 1000;
                    
                  
                    if (night1imageTimer <= night1imageFadeDuration) {
                        night1imageAlpha = (night1imageTimer / night1imageFadeDuration) * 255;
                    } 
          
                    else if (night1imageTimer <= night1imageFadeDuration + night1imageDisplayDuration) {
                        night1imageAlpha = 255;
                    }
                  
                    else if (night1imageTimer <= night1imageFadeDuration * 2 + night1imageDisplayDuration) {
                        const fadeOutProgress = (night1imageTimer - (night1imageFadeDuration + night1imageDisplayDuration)) / night1imageFadeDuration;
                        night1imageAlpha = 255 - (fadeOutProgress * 255);
                    }
                
                    else {
                        shownight1image = false;
                    }
                    
                   
                    night1image.color = Color.new(255, 255, 255, night1imageAlpha);
                    night1image.draw(0, 0);
                }




                if (introPhase === "fadeIn" && fadeAlpha > 0) {
                    Draw.rect(0, 0, 640, 448, Color.new(0, 0, 0, fadeAlpha));
                }

                if (fadeOutStarted && fadeOutAlpha > 0) {
                    Draw.rect(0, 0, 640, 448, Color.new(0, 0, 0, fadeOutAlpha));
                }


                if (fadeOutStarted && fadeOutAlpha > 0) {
                    Draw.rect(0, 0, 640, 448, Color.new(0, 0, 0, fadeOutAlpha));
                    
                
                    if (fadeOutAlpha >= 255) {
                      SceneManager.load(Night1Scene.ventcrawl1);
                        
                    }
                }

            }
        });
    }

    ventcrawl1() {
    const font = new Font("PS2DATA/DATA/ASSETS/FONTS/calibrilight.ttf");
    const ventcontrols = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/GENERAL/ventcrawlcontrols.png")
    
    let progress = 0;
    const maxProgress = 1350;
    const progressSpeed = 50; 
    let lastTime = Date.now();
    
    let fadeAlpha = 255;
    let fadeSpeed = 2;
    let gameState = "fadein";
    

    const cameraSpeed = 300;
    const maxWidth = 894;
    const maxHeight = 526;
    const screenWidth = 640;
    const screenHeight = 448;
    
    const frameWidth = 447;

       
    let cameraX = (maxWidth - screenWidth) / 2;
    let cameraY = (maxHeight - screenHeight) / 2;
    const pad = Pads.get(0);

 
    const ventSequence1 = [];
    let currentFrame1 = 0;
    let frameTimer1 = 0;
    let isAnimating1 = false;
    const frameDelay = 50;
    const runningFrameDelay = 30;

    for (let i = 1; i <= 16; i++) {
        const imagePath = `PS2DATA/DATA/ASSETS/SPRITES/VENTCRAWL/SEQUENCE/1/${i}.png`;
        const image = new ImageManager(imagePath);
        image.width = frameWidth;
        ventSequence1.push(image);
    }

    const ventSequence2 = [];
    let currentFrame2 = 0;
    let frameTimer2 = 0;
    let isAnimating2 = false;

    for (let i = 1; i <= 16; i++) {
        const imagePath = `PS2DATA/DATA/ASSETS/SPRITES/VENTCRAWL/SEQUENCE/2/${i}.png`;
        const image = new ImageManager(imagePath);
        image.width = frameWidth;
        ventSequence2.push(image);
    }

  
    const handunit04ap1 = Sound.Sfx("PS2DATA/DATA/ASSETS/SOUND/STREAM/handunit04apt1.adp");
    const handunit04ap2 = Sound.Sfx("PS2DATA/DATA/ASSETS/SOUND/STREAM/handunit04apt2.adp");
    const handunit04ap3 = Sound.Sfx("PS2DATA/DATA/ASSETS/SOUND/STREAM/handunit04apt3.adp");

    const metal_duct_fast = Sound.Stream("PS2DATA/DATA/ASSETS/SOUND/SFX/metal_duct_fast.wav");
    const metal_duct_slow = Sound.Stream("PS2DATA/DATA/ASSETS/SOUND/SFX/metal_duct_slow.wav");
    

    const scaryamb = Sound.Sfx("PS2DATA/DATA/ASSETS/SOUND/STREAM/scaryamb.adp");
    let scaryambChannel = -1;
    let scaryambStarted = false;
    
    let isFastPlaying = false;
    let isSlowPlaying = false;
    let audioState = "ap1";
    let currentAudioChannel = -1;
    let audioStarted = false;

    function manageAudio() {
        if (!audioStarted && gameState === "playing") {
            currentAudioChannel = handunit04ap1.play();
            audioStarted = true;
            audioState = "ap1";
        }

        if (audioStarted) {
            if (audioState === "ap1" && !handunit04ap1.playing(currentAudioChannel)) {
                currentAudioChannel = handunit04ap2.play();
                audioState = "ap2";
            } else if (audioState === "ap2" && !handunit04ap2.playing(currentAudioChannel)) {
                currentAudioChannel = handunit04ap3.play();
                audioState = "ap3";
            }
        }
    }

    function manageScaryAmb() {
        if (gameState === "playing") {
           
            if (!scaryambStarted) {
                scaryambChannel = scaryamb.play();
                scaryambStarted = true;
            }
           
            else if (scaryambChannel !== -1 && !scaryamb.playing(scaryambChannel)) {
                scaryambChannel = scaryamb.play();
            }
        } else if (gameState === "fadeout") {
            
            if (scaryambStarted && scaryambChannel !== -1) {
               
                scaryambStarted = false;
                scaryambChannel = -1;
            }
        }
    }

    function handleDuctSounds() {
        const isMoving = pad.pressed(Pads.UP);
        const isRunning = pad.pressed(Pads.L1);
        
        if (isMoving) {
            if (isRunning) {
                if (!isFastPlaying) {
                    metal_duct_slow.pause();
                    metal_duct_fast.play();
                    isFastPlaying = true;
                    isSlowPlaying = false;
                }
            } else {
                if (!isSlowPlaying) {
                    metal_duct_fast.pause();
                    metal_duct_slow.play();
                    isSlowPlaying = true;
                    isFastPlaying = false;
                }
            }
        } else {
            if (isFastPlaying || isSlowPlaying) {
                metal_duct_fast.pause();
                metal_duct_slow.pause();
                isFastPlaying = false;
                isSlowPlaying = false;
            }
        }
    }

    Screen.display(() => {
        const currentTime = Date.now();
        const deltaTime = (currentTime - lastTime) / 1000;
        lastTime = currentTime;

        pad.update();

       
        if (gameState === "fadein") {
            fadeAlpha -= fadeSpeed;
            if (fadeAlpha <= 0) {
                fadeAlpha = 0;
                gameState = "playing";
            }
        } else if (gameState === "fadeout") {
            fadeAlpha += fadeSpeed;
            if (fadeAlpha >= 255) {
                fadeAlpha = 255;
            }
        }

        if (gameState === "playing") {
            manageAudio();
            manageScaryAmb(); 
            handleDuctSounds();

          
            const analogRX = pad.rx / 127.0;
            const analogRY = pad.ry / 127.0;
            const deadzone = 0.1;
            

            
            if (Math.abs(analogRX) > deadzone) {
                const analogMoveX = analogRX * cameraSpeed * deltaTime;
                cameraX += analogMoveX;
              
            }
            
            if (Math.abs(analogRY) > deadzone) {
                const analogMoveY = analogRY * cameraSpeed * deltaTime;
                cameraY += analogMoveY;
            
            }

    
            if (cameraX < 0) cameraX = 0;
            if (cameraX > maxWidth - screenWidth) cameraX = maxWidth - screenWidth;
            if (cameraY < 0) cameraY = 0;
            if (cameraY > maxHeight - screenHeight) cameraY = maxHeight - screenHeight;

            
            if (pad.pressed(Pads.UP)) {
                progress += progressSpeed * deltaTime;
                isAnimating1 = true;
                isAnimating2 = true;
                
                if (progress >= maxProgress) {
                    progress = maxProgress;
                    gameState = "fadeout";
                }
            } else {
                isAnimating1 = false;
                isAnimating2 = false;
                frameTimer1 = 0;
                frameTimer2 = 0;
            }
        } else if (gameState === "fadeout") {
          
            fadeAlpha += fadeSpeed;
            if (fadeAlpha >= 255) {
                fadeAlpha = 255;
                
                SceneManager.load(Night1Scene.mainhub);
            }
            manageScaryAmb();
        }


        const currentFrameDelay = pad.pressed(Pads.L1) ? runningFrameDelay : frameDelay;

        if (isAnimating1) {
            frameTimer1 += deltaTime * 1000;
            if (frameTimer1 >= currentFrameDelay) {
                frameTimer1 = 0;
                currentFrame1 = (currentFrame1 + 1) % 16;
            }
        }

        if (isAnimating2) {
            frameTimer2 += deltaTime * 1000;
            if (frameTimer2 >= currentFrameDelay) {
                frameTimer2 = 0;
                currentFrame2 = (currentFrame2 + 1) % 16;
            }
        }


        if (ventSequence1[currentFrame1]) {
            ventSequence1[currentFrame1].draw(0 - cameraX, 0 - cameraY);
        }

        if (ventSequence2[currentFrame2]) {
            ventSequence2[currentFrame2].draw(447 - cameraX, 0 - cameraY);
        }

    
        ventcontrols.draw(0, 0);

    

        if (fadeAlpha > 0) {
            Draw.rect(0, 0, 640, 448, Color.new(0, 0, 0, fadeAlpha));
        }

        

    });
}

mainhub() {
    const font = new Font("PS2DATA/DATA/ASSETS/FONTS/calibrilight.ttf");
    
    let rectX = 500;
    let rectY = 263;
    const rectWidth = 10;
    const rectHeight = 10;
    const speed = 300;
    const maxWidth = 1000;
    const maxHeight = 526;
    let lastTime = Date.now();
    const rectColor = Color.new(255, 100, 100, 255);
    
    let targetCameraX = rectX + (rectWidth / 2) - (640 / 2);
    let targetCameraY = rectY + (rectHeight / 2) - (448 / 2);
    
    if (targetCameraX < 0) targetCameraX = 0;
    if (targetCameraX > maxWidth - 640) targetCameraX = maxWidth - 640;
    if (targetCameraY < 0) targetCameraY = 0;
    if (targetCameraY > maxHeight - 448) targetCameraY = maxHeight - 448;
    
    let cameraX = targetCameraX;
    let cameraY = targetCameraY;
    
    const cameraSpeed = 5;
    const screenWidth = 640;
    const screenHeight = 448;
    
    const pad = Pads.get(0);

    const elevatorSequence1 = [];
    const elevatorSequence2 = [];
    let currentFrame1 = 0;
    let currentFrame2 = 0;
    let frameTimer = 0;
    const frameDelay = 30;

    for (let i = 1; i <= 10; i++) {
        const imagePath = `PS2DATA/DATA/ASSETS/SPRITES/MAINHUB/mainhubsequence/1/${i}.png`;
        const image = new Image(imagePath);
        image.filter = LINEAR;
        elevatorSequence1.push(image);
    }

    for (let i = 1; i <= 10; i++) {
        const imagePath = `PS2DATA/DATA/ASSETS/SPRITES/MAINHUB/mainhubsequence/2/${i}.png`;
        const image = new Image(imagePath);
        elevatorSequence2.push(image);
    }

    const cursorImage = new Image("PS2DATA/DATA/ASSETS/SPRITES/ELEVATOR/cursor.png");
    const overlay = new Image("PS2DATA/DATA/ASSETS/SPRITES/GENERAL/overlay.png");

    Screen.display(() => {
        DebugManager.update();
        const currentTime = Date.now();
        const deltaTime = (currentTime - lastTime) / 1000;
        lastTime = currentTime;

        pad.update();

        const moveDistance = speed * deltaTime;

        if (pad.pressed(Pads.LEFT) && rectX > 0) {
            rectX -= moveDistance;
        }
        if (pad.pressed(Pads.RIGHT) && rectX < maxWidth - rectWidth) {
            rectX += moveDistance;
        }
        if (pad.pressed(Pads.UP) && rectY > 0) {
            rectY -= moveDistance;
        }
        if (pad.pressed(Pads.DOWN) && rectY < maxHeight - rectHeight) {
            rectY += moveDistance;
        }

        const analogX = pad.lx / 127.0;
        const analogY = pad.ly / 127.0;
        const deadzone = 0.15;
        
        if (Math.abs(analogX) > deadzone) {
            const analogMoveX = analogX * moveDistance;
            rectX += analogMoveX;
        }
        
        if (Math.abs(analogY) > deadzone) {
            const analogMoveY = analogY * moveDistance;
            rectY += analogMoveY;
        }

        if (rectX < 0) rectX = 0;
        if (rectX > maxWidth - rectWidth) rectX = maxWidth - rectWidth;
        if (rectY < 0) rectY = 0;
        if (rectY > maxHeight - rectHeight) rectY = maxHeight - rectHeight;

        targetCameraX = rectX + (rectWidth / 2) - (screenWidth / 2);
        targetCameraY = rectY + (rectHeight / 2) - (screenHeight / 2);

        if (targetCameraX < 0) targetCameraX = 0;
        if (targetCameraX > maxWidth - screenWidth) targetCameraX = maxWidth - screenWidth;
        if (targetCameraY < 0) targetCameraY = 0;
        if (targetCameraY > maxHeight - screenHeight) targetCameraY = maxHeight - screenHeight;

        const cameraLerpSpeed = cameraSpeed * deltaTime;
        cameraX += (targetCameraX - cameraX) * cameraLerpSpeed;
        cameraY += (targetCameraY - cameraY) * cameraLerpSpeed;

        frameTimer += deltaTime * 1000;
        if (frameTimer >= frameDelay) {
            frameTimer = 0;
            currentFrame1 = (currentFrame1 + 1) % 10;
            currentFrame2 = (currentFrame2 + 1) % 10;
        }

        if (elevatorSequence1[currentFrame1]) {
            elevatorSequence1[currentFrame1].draw(0 - cameraX, 0 - cameraY);
        }

        if (elevatorSequence2[currentFrame2]) {
            elevatorSequence2[currentFrame2].draw(500 - cameraX, 0 - cameraY);
        }

        overlay.height = 448;
        overlay.color = Color.new(255, 255, 255, 20);
        overlay.draw(0, 0);
        DebugManager.draw();
        cursorImage.draw(rectX - cameraX, rectY - cameraY);
    });
}

}

export const Night1Scene = new Night1SceneClass();