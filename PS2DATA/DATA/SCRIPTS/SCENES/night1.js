import {ImageManager,SceneManager, StreamManager, SfxManager} from "../UTILS/scenemanager.js";
//import {DebugManager} from "../utils/debug.js";


class Night1SceneClass {
    constructor() {}



    elevatorScene() {
        
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

        let nolightImage1 = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/ELEVATOR/nolight1.png");
        let nolightImage2 = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/ELEVATOR/nolight2.png");
        let cursorImage = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/ELEVATOR/cursor.png");
        let lights = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/ELEVATOR/lights.png");
        let overlay = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/GENERAL/overlay.png");
        let condemnedImage = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/ELEVATOR/condemned.png");
        let mouse = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/GENERAL/mouse.png")

        const tabletIntroduction = [];
        const tabletMiddle = [];
        const tabletClosing = [];
        let tabletState = "hidden";
        let tabletCurrentFrame = 0;
        let tabletFrameTimer = 0;
        const tabletFrameDelay = 50;

        let pointImage = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/ELEVATOR/TABLET/point.png");
        let middleImage = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/ELEVATOR/TABLET/middle.png");
        let errorImage = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/ELEVATOR/TABLET/error.png");
        let eggsImage = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/ELEVATOR/TABLET/eggs.png");
        let cursor2Image = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/GENERAL/cursor2.png");

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


        const handunit01c = new StreamManager("PS2DATA/DATA/ASSETS/SOUND/STREAM/handunit01c.wav");
        const handunit01d = new StreamManager("PS2DATA/DATA/ASSETS/SOUND/STREAM/handunit01d.wav");
        const handunit02a = new StreamManager("PS2DATA/DATA/ASSETS/SOUND/STREAM/handunit02a.wav");
        const eggsbenedict = new StreamManager("PS2DATA/DATA/ASSETS/SOUND/STREAM/eggsbenedict.wav");
        const daughterline1 = new StreamManager("PS2DATA/DATA/ASSETS/SOUND/STREAM/DaughterLine1.wav");
        const beep = new SfxManager("PS2DATA/DATA/ASSETS/SOUND/SFX/beep.adp")
        const closetablet = new SfxManager("PS2DATA/DATA/ASSETS/SOUND/SFX/closetablet.adp")

        let handunitaudiomixed = new StreamManager("PS2DATA/DATA/ASSETS/SOUND/STREAM/Handunit02amixed.wav");

        let darkframe1 = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/ELEVATOR/nolight1.png");
        let darkframe2 = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/ELEVATOR/nolight2.png");
        let night1 = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/ELEVATOR/night1.png");

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
            let imagePath = `PS2DATA/DATA/ASSETS/SPRITES/ELEVATOR/ELEVATORSEQUENCE/1/${i}.png`;
            let image = new ImageManager(imagePath);
            image.filter = LINEAR;
            elevatorSequence1.push(image);
        }

        for (let i = 1; i <= 10; i++) {
            let imagePath = `PS2DATA/DATA/ASSETS/SPRITES/ELEVATOR/ELEVATORSEQUENCE/2/${i}.png`;
            let image = new ImageManager(imagePath);
            image.filter = LINEAR;
            elevatorSequence2.push(image);
        }

        for (let i = 1; i <= 11; i++) {
            let imagePath = `PS2DATA/DATA/ASSETS/SPRITES/ELEVATOR/ELEVATORCO/1/${i}.png`;
            let image = new ImageManager(imagePath);
            image.filter = LINEAR;
            elevatorCO1.push(image);
        }

        for (let i = 1; i <= 11; i++) {
            let imagePath = `PS2DATA/DATA/ASSETS/SPRITES/ELEVATOR/ELEVATORCO/2/${i}.png`;
            let image = new ImageManager(imagePath);
            elevatorCO2.push(image);
        }

        for (let i = 1; i <= 10; i++) {
            let imagePath = `PS2DATA/DATA/ASSETS/SPRITES/ELEVATOR/TABLET/introduction/${i}.png`;
            let image = new ImageManager(imagePath);
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
                sound: new SfxManager("PS2DATA/DATA/ASSETS/SOUND/SFX/dataphone_elevator1.adp")
            },
            {
                x: 800,
                y: 343,
                width: 83,
                height: 83,
                sound: new SfxManager("PS2DATA/DATA/ASSETS/SOUND/SFX/keypad_elevator1.adp")
            },
            {
                x: 668,
                y: 219,
                width: 20,
                height: 34,
                sound: new SfxManager("PS2DATA/DATA/ASSETS/SOUND/SFX/red_button_not_available1.adp")
            },
            {
                x: 667,
                y: 270,
                width: 26,
                height: 28,
                sound: new SfxManager("PS2DATA/DATA/ASSETS/SOUND/SFX/keypad_elevator1.adp")
            }
        ];

        let DEBUG_MODE = false;

        const elevatorCOButton = {
            x: 668,
            y: 219,
            width: 20,
            height: 34,
            sound: new SfxManager("PS2DATA/DATA/ASSETS/SOUND/SFX/clankv2.adp")
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

        function cleanupAllAudio() {

            if (handunit01c) {
                handunit01c.pause();
                handunit01c.free();
            }
            if (handunit01d) {
                handunit01d.pause();
                handunit01d.free();
            }
            if (handunit02a) {
                handunit02a.pause();
                handunit02a.free();
            }
            if (eggsbenedict) {
                eggsbenedict.pause();
                eggsbenedict.free();
            }
            if (daughterline1) {
                daughterline1.pause();
                daughterline1.free();
            }
            if (handunitaudiomixed) {
                handunitaudiomixed.pause();
                handunitaudiomixed.free();
            }


            if (beep) {

                beep.free();
            }
            if (closetablet) {

                closetablet.free();
            }


            soundAreas.forEach(area => {
                if (area.sound) {

                    area.sound.free();
                }
            });


            if (elevatorCOButton.sound) {

                elevatorCOButton.sound.free();
            }
        }

        Screen.display(() => {
            //DebugManager.update()
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

                    if (daughterLineStarted && !daughterline1.isPlaying()) {
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



            if (audioStarted && !firstAudioFinished && !handunit01c.isPlaying()) {
                firstAudioFinished = true;
                tabletState = "introduction";
                tabletCurrentFrame = 0;
                tabletFrameTimer = 0;
                handunit01d.play();
                secondAudioStarted = true;
            }

            if (tabletState === "error" && !handunit01d.isPlaying() && !errorAudioPlaying) {
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

                    if (errorAudioPlaying && !handunit02a.isPlaying()) {
                        tabletState = "eggs";
                        showErrorImage = false;
                        showEggsImage = true;
                        errorAudioPlaying = false;
                        eggsbenedict.play();
                        eggsAudioPlaying = true;
                    }
                }

                if (tabletState === "eggs") {
                    if (eggsAudioPlaying && !eggsbenedict.isPlaying()) {
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
                            if (handunit01d.isPlaying()) {
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

                    if (tabletCurrentFrame >= tabletClosing.length - 1 && !handunitaudiomixed.isPlaying()) {
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
                    } else if (night1imageTimer <= night1imageFadeDuration + night1imageDisplayDuration) {
                        night1imageAlpha = 255;
                    } else if (night1imageTimer <= night1imageFadeDuration * 2 + night1imageDisplayDuration) {
                        const fadeOutProgress = (night1imageTimer - (night1imageFadeDuration + night1imageDisplayDuration)) / night1imageFadeDuration;
                        night1imageAlpha = 255 - (fadeOutProgress * 255);
                    } else {
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
                        cleanupAllAudio()
                        
                        SceneManager.load(Night1Scene.ventcrawl1);

                    }
                }


                //DebugManager.draw();

            }
        });
    }

    ventcrawl1() {
        
        const ventcontrols = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/GENERAL/ventcrawlcontrols.png");

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
            const image = new ImageManager(`PS2DATA/DATA/ASSETS/SPRITES/VENTCRAWL/SEQUENCE/1/${i}.png`);
            image.width = frameWidth;
            ventSequence1.push(image);
        }

        const ventSequence2 = [];
        let currentFrame2 = 0;
        let frameTimer2 = 0;
        let isAnimating2 = false;

        for (let i = 1; i <= 16; i++) {
            const image = new ImageManager(`PS2DATA/DATA/ASSETS/SPRITES/VENTCRAWL/SEQUENCE/2/${i}.png`);
            image.width = frameWidth;
            ventSequence2.push(image);
        }


        const handunit02b = new StreamManager("PS2DATA/DATA/ASSETS/SOUND/Stream/handunit02b.wav");

        Screen.display(() => {
            //;
            const currentTime = Date.now();
            const deltaTime = (currentTime - lastTime) / 1000;
            lastTime = currentTime;

            pad.update();



            if (gameState === "fadein") {
                fadeAlpha -= fadeSpeed;
                if (fadeAlpha <= 0) {
                    fadeAlpha = 0;
                    gameState = "playing";
                    handunit02b.play()
                }
            } else if (gameState === "fadeout") {
                fadeAlpha += fadeSpeed;
                if (fadeAlpha >= 255) {
                    fadeAlpha = 255;
                    SceneManager.load(Night1Scene.mainhub);
                    return;
                }
            }

            if (gameState === "playing") {
                const analogRX = pad.rx / 127.0;
                const analogRY = pad.ry / 127.0;
                const deadzone = 0.1;

                if (Math.abs(analogRX) > deadzone) {
                    cameraX += analogRX * cameraSpeed * deltaTime;
                }

                if (Math.abs(analogRY) > deadzone) {
                    cameraY += analogRY * cameraSpeed * deltaTime;
                }

                cameraX = Math.max(0, Math.min(cameraX, maxWidth - screenWidth));
                cameraY = Math.max(0, Math.min(cameraY, maxHeight - screenHeight));

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

            //DebugManager.draw();
        });
    }


    mainhub() {
       
        const mouse = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/GENERAL/mouse.png")

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

        let ballorainastage = false;
        let foxyinastage = false;

        const elevatorSequence1 = [];
        const elevatorSequence2 = [];
        let currentFrame1 = 0;
        let currentFrame2 = 0;
        let frameTimer = 0;
        const frameDelay = 50;

        const balloraSequence = [];
        const foxySequence = [];
        let balloraFrame = 0;
        let foxyFrame = 0;
        let balloraTimer = 0;
        let foxyTimer = 0;
        const animatronicFrameDelay = 100;

        const leftFlash = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/MAINHUB/Shock/leftflash.png");
        const rightFlash = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/MAINHUB/Shock/rightflash.png");
        let leftFlashVisible = false;
        let rightFlashVisible = false;
        let leftFlashTimer = 0;
        let rightFlashTimer = 0;
        const flashInterval = 100;

        const noAnimatronic = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/MAINHUB/Shock/noanimatronic.png");

        const ennardImage = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/MAINHUB/ennard.png");
        const foxyImage = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/MAINHUB/foxy.png");

        const showFoxyMask = Math.random() < 0.001;

        for (let i = 1; i <= 16; i++) {
            const imagePath = `PS2DATA/DATA/ASSETS/SPRITES/MAINHUB/mainhubsequence/1/${i}.png`;
            const image = new ImageManager(imagePath);
            image.filter = LINEAR;
            elevatorSequence1.push(image);
        }

        for (let i = 1; i <= 16; i++) {
            const imagePath = `PS2DATA/DATA/ASSETS/SPRITES/MAINHUB/mainhubsequence/2/${i}.png`;
            const image = new ImageManager(imagePath);
            elevatorSequence2.push(image);
        }

        for (let i = 1; i <= 31; i++) {
            const balloraPath = `PS2DATA/DATA/ASSETS/SPRITES/MAINHUB/Shock/ballora/${i}.png`;
            const balloraImg = new ImageManager(balloraPath);
            balloraSequence.push(balloraImg);
        }

        for (let i = 1; i <= 31; i++) {
            const foxyPath = `PS2DATA/DATA/ASSETS/SPRITES/MAINHUB/Shock/foxy/${i}.png`;
            const foxyImg = new ImageManager(foxyPath);
            foxySequence.push(foxyImg);
        }

        const cursorImage = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/ELEVATOR/cursor.png");
        const overlay = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/GENERAL/overlay.png");

        const leftshockoff = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/MAINHUB/Shock/left/off.png")
        const leftshockon = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/MAINHUB/Shock/left/on.png")
        const leftshockbuzz = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/MAINHUB/Shock/left/buzz.png")
        const leftshockshock = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/MAINHUB/Shock/left/shock.png")

        const rightshockoff = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/MAINHUB/Shock/right/off.png")
        const rightshockon = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/MAINHUB/Shock/right/on.png")
        const rightshockbuzz = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/MAINHUB/Shock/right/buzz.png")
        const rightshockshock = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/MAINHUB/Shock/right/shock.png")

        const handunit04b = new StreamManager("PS2DATA/DATA/ASSETS/SOUND/STREAM/Handunit04b.wav");
        const handunit05 = new StreamManager("PS2DATA/DATA/ASSETS/SOUND/STREAM/handunit05.wav");
        const handunit06 = new StreamManager("PS2DATA/DATA/ASSETS/SOUND/STREAM/Handunit06.wav");
        const handunit07 = new StreamManager("PS2DATA/DATA/ASSETS/SOUND/STREAM/handunit07.wav");
        const handunit08 = new StreamManager("PS2DATA/DATA/ASSETS/SOUND/STREAM/handunit08.wav");
        const handunit09 = new StreamManager("PS2DATA/DATA/ASSETS/SOUND/STREAM/handunit09.wav");
        const handunit10 = new StreamManager("PS2DATA/DATA/ASSETS/SOUND/STREAM/handunit10.wav");

        const elbuzz = new SfxManager("PS2DATA/DATA/ASSETS/SOUND/SFX/elbuzz.adp");
        const energy = new SfxManager("PS2DATA/DATA/ASSETS/SOUND/SFX/energy.adp");
        const ventOpenSound = new SfxManager("PS2DATA/DATA/ASSETS/SOUND/SFX/circus_vent.adp");

        const ventleft = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/MAINHUB/left/1.png")
        const ventright = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/MAINHUB/right/1.png")
        const acessdenied = new SfxManager("PS2DATA/DATA/ASSETS/SOUND/SFX/denied.adp")
        const ennardnose = new SfxManager("PS2DATA/DATA/ASSETS/SOUND/SFX/ennard_nose.adp")
        const keypadsound = new SfxManager("PS2DATA/DATA/ASSETS/SOUND/SFX/keypad_elevator1.adp")

        const cursor2Image = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/GENERAL/cursor2.png");

        let isOverMiddleVent = false;

        const rightface = new SfxManager("PS2DATA/DATA/ASSETS/SOUND/SFX/right_face.adp")
        const centralface = new SfxManager("PS2DATA/DATA/ASSETS/SOUND/SFX/central_face.adp")
        const dataphoneelevatorsound = new SfxManager("PS2DATA/DATA/ASSETS/SOUND/SFX/dataphone_elevator1.adp")
        const gypsiesound = new SfxManager("PS2DATA/DATA/ASSETS/SOUND/SFX/gypsie.adp")

        const soundAreas = [{
                x: 328,
                y: 304,
                width: 29,
                height: 29,
                sound: centralface
            },
            {
                x: 360,
                y: 312,
                width: 29,
                height: 29,
                sound: rightface
            },
            {
                x: 587,
                y: 281,
                width: 16,
                height: 22,
                sound: keypadsound
            },
            {
                x: 115,
                y: 421,
                width: 105,
                height: 105,
                sound: acessdenied
            },
            {
                x: 777,
                y: 421,
                width: 105,
                height: 105,
                sound: acessdenied
            },
            {
                x: 440,
                y: 407,
                width: 109,
                height: 68,
                sound: acessdenied
            },
            {
                x: 492,
                y: 178,
                width: 12,
                height: 19,
                sound: ennardnose
            },
            {
                x: 613,
                y: 253,
                width: 16,
                height: 16,
                sound: dataphoneelevatorsound
            },
            {
                x: 633,
                y: 324,
                width: 16,
                height: 16,
                sound: gypsiesound
            }
        ];

        let leftShockState = 'off';
        let rightShockState = 'off';

        let leftShockTimer = 0;
        let rightShockTimer = 0;
        let leftShockDuration = 3;
        let rightShockDuration = 3;

        let leftCanPress = false;
        let rightCanPress = false;
        let leftCanBuzz = false;
        let leftCanShock = false;
        let rightCanBuzz = false;
        let rightCanShock = false;

        const ACTION_DURATION = 3;

        let gameSequence = 'initial';
        let audioPlaying = false;
        let currentAudio = null;
        let waitingForAudio = false;

        const leftButton1 = {
            x: 247,
            y: 355,
            width: 22,
            height: 12
        };
        const leftButton2 = {
            x: 250,
            y: 375,
            width: 22,
            height: 12
        };
        const rightButton1 = {
            x: 710,
            y: 355,
            width: 22,
            height: 12
        };
        const rightButton2 = {
            x: 705,
            y: 375,
            width: 22,
            height: 12
        };

        let ventmiddleclosed = true;

        let fadeOutStarted = false;
        let fadeOutAlpha = 0;
        const fadeOutSpeed = 100;


        const middleVentSequence = [];
        let middleVentFrame = 0;
        let middleVentTimer = 0;
        const middleVentFrameDelay = 100;
        let middleVentAnimating = false;

        const middleVentX = 400 - cameraX;
        const middleVentY = 200 - cameraY;

        let fadeInAlpha = 255;
        let fadeInStarted = true;
        const fadeInSpeed = 200;

        for (let i = 1; i <= 6; i++) {
            const middlePath = `PS2DATA/DATA/ASSETS/SPRITES/MAINHUB/middle/${i}.png`;
            const middleImg = new ImageManager(middlePath);
            middleVentSequence.push(middleImg);
        }

        function updateMiddleVent(deltaTime) {
            if (!ventmiddleclosed && middleVentAnimating) {
                middleVentTimer += deltaTime * 1000;
                if (middleVentTimer >= middleVentFrameDelay) {
                    middleVentTimer = 0;
                    middleVentFrame++;

                    if (middleVentFrame >= middleVentSequence.length) {
                        middleVentFrame = middleVentSequence.length - 1;
                        middleVentAnimating = false;
                    }
                }
            }
        }

        function isClickingButton(cursorX, cursorY, cursorWidth, cursorHeight, button, cameraX, cameraY) {
            const buttonScreenX = button.x - cameraX;
            const buttonScreenY = button.y - cameraY;

            const cursorScreenX = cursorX - cameraX;
            const cursorScreenY = cursorY - cameraY;

            return cursorScreenX < buttonScreenX + button.width &&
                cursorScreenX + cursorWidth > buttonScreenX &&
                cursorScreenY < buttonScreenY + button.height &&
                cursorScreenY + cursorHeight > buttonScreenY;
        }

        function isClickingSoundArea(cursorX, cursorY, cursorWidth, cursorHeight, area, cameraX, cameraY) {
            const areaScreenX = area.x - cameraX;
            const areaScreenY = area.y - cameraY;

            const cursorScreenX = cursorX - cameraX;
            const cursorScreenY = cursorY - cameraY;

            return cursorScreenX < areaScreenX + area.width &&
                cursorScreenX + cursorWidth > areaScreenX &&
                cursorScreenY < areaScreenY + area.height &&
                cursorScreenY + cursorHeight > areaScreenY;
        }

        function isBuzzOrEnergyPlaying() {
            return (elbuzz.playing && elbuzz.isPlaying()) || (energy.playing && energy.isPlaying());
        }

        function updateFlashEffect(deltaTime) {
            if (leftShockState === 'shock') {
                leftFlashTimer += deltaTime * 1000;
                if (leftFlashTimer >= flashInterval) {
                    leftFlashVisible = !leftFlashVisible;
                    leftFlashTimer = 0;
                }
            } else {
                leftFlashVisible = false;
            }

            if (rightShockState === 'shock') {
                rightFlashTimer += deltaTime * 1000;
                if (rightFlashTimer >= flashInterval) {
                    rightFlashVisible = !rightFlashVisible;
                    rightFlashTimer = 0;
                }
            } else {
                rightFlashVisible = false;
            }
        }

        function updateAnimatronics(deltaTime) {
            if (leftShockState === 'buzz') {
                if (ballorainastage) {
                    balloraTimer += deltaTime * 1000;
                    if (balloraTimer >= animatronicFrameDelay) {
                        balloraTimer = 0;
                        balloraFrame = (balloraFrame + 1) % 31;
                    }
                }
            }

            if (rightShockState === 'buzz') {
                if (foxyinastage) {
                    foxyTimer += deltaTime * 1000;
                    if (foxyTimer >= animatronicFrameDelay) {
                        foxyTimer = 0;
                        foxyFrame = (foxyFrame + 1) % 31;
                    }
                }
            }
        }

        function updateShockState(side, deltaTime) {
            if (side === 'left') {
                if (leftShockState === 'buzz' || leftShockState === 'shock') {
                    leftShockTimer += deltaTime;

                    if (leftShockTimer >= leftShockDuration) {
                    leftBuzzTriggered = false; 
                    leftShockTriggered = false; 
                    }

                    if (leftShockTimer >= leftShockDuration) {
                        if (gameSequence === 'leftBuzzPressed') {
                            leftShockState = 'on';
                            gameSequence = 'leftShockOnly';
                            ballorainastage = true;
                        } else if (gameSequence === 'leftShockPressed') {
                            leftShockState = 'on';
                            gameSequence = 'leftBuzzOnly2';
                        } else if (gameSequence === 'leftBuzzPressed2') {
                            leftShockState = 'off';
                            gameSequence = 'waitingForFinalAudio';
                            ballorainastage = false;

                            playAudio(handunit07);
                        } else {
                            leftShockState = 'on';
                        }
                        leftShockTimer = 0;
                        updateButtonStates();
                    }
                }
            } else if (side === 'right') {
                if (rightShockState === 'buzz' || rightShockState === 'shock') {
                    rightShockTimer += deltaTime;

                    if (rightShockTimer >= rightShockDuration) {
                        rightBuzzTriggered = false;
                        rightShockTriggered = false;
                        if (gameSequence === 'rightBuzzPressed1') {
                            rightShockState = 'on';
                            gameSequence = 'rightShockOnly1';
                            foxyinastage = false;

                        } else if (gameSequence === 'rightShockPressed1') {
                            rightShockState = 'on';
                            gameSequence = 'rightBuzzOnly2';
                        } else if (gameSequence === 'rightBuzzPressed2') {
                            rightShockState = 'on';
                            gameSequence = 'rightShockOnly2';
                            foxyinastage = false;
                        } else if (gameSequence === 'rightShockPressed2') {
                            rightShockState = 'on';
                            gameSequence = 'rightBuzzOnly3';
                            foxyinastage = true;
                        } else if (gameSequence === 'rightBuzzPressed3') {
                            rightShockState = 'off';

                            gameSequence = 'completed';
                        } else {
                            rightShockState = 'on';
                        }
                        rightShockTimer = 0;
                        updateButtonStates();
                    }
                }
            }
        }

        function updateButtonStates() {
            leftCanPress = false;
            rightCanPress = false;
            leftCanBuzz = false;
            leftCanShock = false;
            rightCanBuzz = false;
            rightCanShock = false;

            if (leftShockState === 'on') {
                leftCanPress = true;
                switch (gameSequence) {
                    case 'leftBuzzOnly':
                        leftCanBuzz = true;
                        break;
                    case 'leftShockOnly':
                        leftCanShock = true;
                        break;
                    case 'leftBuzzOnly2':
                        leftCanBuzz = true;
                        break;
                }
            }

            if (rightShockState === 'on') {
                rightCanPress = true;
                switch (gameSequence) {
                    case 'rightBuzzOnly1':
                        rightCanBuzz = true;
                        break;
                    case 'rightShockOnly1':
                        rightCanShock = true;
                        break;
                    case 'rightBuzzOnly2':
                        rightCanBuzz = true;
                        break;
                    case 'rightShockOnly2':
                        rightCanShock = true;
                        break;
                    case 'rightBuzzOnly3':
                        rightCanBuzz = true;
                        break;
                }
            }
        }

        function drawShockImage(side, x, y) {
            let image;

            if (side === 'left') {
                switch (leftShockState) {
                    case 'off':
                        image = leftshockoff;
                        break;
                    case 'on':
                        image = leftshockon;
                        break;
                    case 'buzz':
                        image = leftshockbuzz;
                        break;
                    case 'shock':
                        image = leftshockshock;
                        break;
                }
            } else if (side === 'right') {
                switch (rightShockState) {
                    case 'off':
                        image = rightshockoff;
                        break;
                    case 'on':
                        image = rightshockon;
                        break;
                    case 'buzz':
                        image = rightshockbuzz;
                        break;
                    case 'shock':
                        image = rightshockshock;
                        break;
                }
            }

            if (image) {
                image.draw(x, y);
            }
        }

        function drawFlashEffects() {
            if (leftFlashVisible && leftFlash) {
                leftFlash.color = Color.new(255, 255, 255, 128);
                leftFlash.draw(0 - cameraX, 0 - cameraY);
            }

            if (rightFlashVisible && rightFlash) {
                rightFlash.color = Color.new(255, 255, 255, 128);
                rightFlash.draw(500 - cameraX, 0 - cameraY);
            }
        }

        function freeAllAudio() {

            handunit04b.free();
            handunit05.free();
            handunit06.free();
            handunit07.free();
            handunit08.free();
            handunit09.free();
            handunit10.free();

            elbuzz.free();
            energy.free();
            ventOpenSound.free();
            acessdenied.free();

            soundAreas.forEach(area => area.sound.free());

        }

        function playAudio(audio) {
            if (currentAudio && currentAudio.isPlaying()) {
                currentAudio.pause();
            }
            currentAudio = audio;
            currentAudio.play();
            audioPlaying = true;
            waitingForAudio = true;
        }

        function checkAudioFinished() {
            if (waitingForAudio && currentAudio && !currentAudio.isPlaying()) {
                waitingForAudio = false;
                audioPlaying = false;
                handleAudioFinished();
            }
        }

        function openMiddleVentNow() {
            if (ventmiddleclosed) {
                ventmiddleclosed = false;
                middleVentAnimating = true;
                middleVentFrame = 0;
                middleVentTimer = 0;
                console.log("VENT ABERTA COMANDADA!");
            }
        }

        function handleAudioFinished() {
            switch (gameSequence) {
                case 'initial':

                    leftShockState = 'on';
                    gameSequence = 'leftBuzzOnly';
                    updateButtonStates();
                    break;

                case 'leftBuzzPressed':
                    gameSequence = 'leftShockOnly';
                    updateButtonStates();
                    break;

                case 'leftShockPressed':
                    gameSequence = 'leftBuzzOnly2';
                    updateButtonStates();
                    break;

                case 'leftBuzzPressed2':
                    break;

                case 'waitingForFinalAudio':

                    rightShockState = 'on';
                    gameSequence = 'rightBuzzOnly1';
                    updateButtonStates();
                    break;

                case 'rightBuzzPressed1':

                    gameSequence = 'rightShockOnly1';
                    updateButtonStates();
                    break;

                case 'rightShockPressed1':
                    break;

                case 'rightBuzzPressed2':

                    gameSequence = 'rightShockOnly2';
                    updateButtonStates();
                    break;

                case 'rightShockPressed2':

                    break;

                case 'rightBuzzOnly3':
                    gameSequence = 'rightBuzzPressed3';

                    break;
            }
        }

        let mouseTimer = 0;
        const mouseDisplayTime = 25000;
        let mouseAlpha = 255;
        let mouseFading = false;
        const mouseFadeSpeed = 2;

        playAudio(handunit04b);

        let leftBuzzTriggered = false;
        let leftShockTriggered = false;
        let rightBuzzTriggered = false;
        let rightShockTriggered = false;

        let fadeAlpha = 255;
        const fadeSpeed = 2;
        let fadeCompleted = false;

        Screen.display(() => {
            //;
            const currentTime = Date.now();
            const deltaTime = (currentTime - lastTime) / 1000;
            lastTime = currentTime;

            pad.update();

            checkAudioFinished();
            updateFlashEffect(deltaTime);
            updateAnimatronics(deltaTime);
            updateMiddleVent(deltaTime);

            if (!fadeCompleted) {
                fadeAlpha -= fadeSpeed;
                if (fadeAlpha <= 0) {
                    fadeAlpha = 0;
                    fadeCompleted = true; 
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

            targetCameraX = rectX + (rectWidth / 2) - (screenWidth / 2);
            targetCameraY = rectY + (rectHeight / 2) - (screenHeight / 2);

            if (targetCameraX < 0) targetCameraX = 0;
            if (targetCameraX > maxWidth - screenWidth) targetCameraX = maxWidth - screenWidth;
            if (targetCameraY < 0) targetCameraY = 0;
            if (targetCameraY > maxHeight - screenHeight) targetCameraY = maxHeight - screenHeight;

            const cameraLerpSpeed = cameraSpeed * deltaTime;
            cameraX += (targetCameraX - cameraX) * cameraLerpSpeed;
            cameraY += (targetCameraY - cameraY) * cameraLerpSpeed;

            isOverMiddleVent = (
                !ventmiddleclosed &&
                rectX >= 440 &&
                rectX <= 440 + 109 &&
                rectY >= 407 &&
                rectY <= 407 + 68
            );

            updateShockState('left', deltaTime);
            updateShockState('right', deltaTime);

            if (pad.justPressed(Pads.CROSS) && !audioPlaying) {
                if (
                    leftCanPress && leftCanBuzz &&
                    isClickingButton(rectX, rectY, rectWidth, rectHeight, leftButton1, cameraX, cameraY) &&
                    !leftBuzzTriggered
                ) {
                    leftBuzzTriggered = true;
                    leftShockState = 'buzz';
                    leftShockTimer = 0;
                    elbuzz.play();
                    leftShockDuration = 4;

                    if (gameSequence === 'leftBuzzOnly') {
                        gameSequence = 'leftBuzzPressed';
                        os.setTimeout(() => {
                            playAudio(handunit05);
                        }, leftShockDuration * 1000);
                    } else if (gameSequence === 'leftBuzzOnly2') {
                        gameSequence = 'leftBuzzPressed2';
                    }
                } else if (
                    leftCanPress && leftCanShock &&
                    isClickingButton(rectX, rectY, rectWidth, rectHeight, leftButton2, cameraX, cameraY) &&
                    !leftShockTriggered
                ) {
                    leftShockTriggered = true;
                    leftShockState = 'shock';
                    leftShockTimer = 0;
                    energy.play();
                    leftShockDuration = (energy.length !== undefined) ? energy.length / 1000 : 3;

                    if (gameSequence === 'leftShockOnly') {
                        gameSequence = 'leftShockPressed';
                        os.setTimeout(() => {
                            playAudio(handunit06);
                        }, leftShockDuration * 1000);
                    }
                } else if (
                    rightCanPress && rightCanBuzz &&
                    isClickingButton(rectX, rectY, rectWidth, rectHeight, rightButton1, cameraX, cameraY) &&
                    !rightBuzzTriggered
                ) {
                    rightBuzzTriggered = true;
                    rightShockState = 'buzz';
                    rightShockTimer = 0;
                    elbuzz.play();
                    rightShockDuration = 3;

                    if (gameSequence === 'rightBuzzOnly1') {
                        gameSequence = 'rightBuzzPressed1';
                        os.setTimeout(() => {
                            playAudio(handunit08);
                        }, rightShockDuration * 1000);
                    } else if (gameSequence === 'rightBuzzOnly2') {
                        gameSequence = 'rightBuzzPressed2';
                        os.setTimeout(() => {
                            playAudio(handunit09);
                        }, rightShockDuration * 1000);
                    } else if (gameSequence === 'rightBuzzOnly3') {
                        gameSequence = 'rightBuzzPressed3';
                        os.setTimeout(() => {
                            playAudio(handunit10);
                            os.setTimeout(() => {
                                ventOpenSound.play();
                                openMiddleVentNow();
                            }, 7000);
                        }, rightShockDuration * 1000);
                    }
                } else if (
                    rightCanPress && rightCanShock &&
                    isClickingButton(rectX, rectY, rectWidth, rectHeight, rightButton2, cameraX, cameraY) &&
                    !rightShockTriggered
                ) {
                    rightShockTriggered = true;
                    rightShockState = 'shock';
                    rightShockTimer = 0;
                    energy.play();
                    rightShockDuration = (energy.length !== undefined) ? energy.length / 1000 : 3;

                    if (gameSequence === 'rightShockOnly1') {
                        gameSequence = 'rightShockPressed1';
                    } else if (gameSequence === 'rightShockOnly2') {
                        gameSequence = 'rightShockPressed2';
                    }
                }
            }

            if (pad.justPressed(Pads.CROSS)) {
                const cursorScreenX = rectX;
                const cursorScreenY = rectY;

                console.log(`Cursor global: (${Math.floor(cursorScreenX)}, ${Math.floor(cursorScreenY)})`);

                if (cursorScreenX >= 440 &&
                    cursorScreenX <= 440 + 109 &&
                    cursorScreenY >= 407 &&
                    cursorScreenY <= 407 + 68) {

                    if (ventmiddleclosed) {

                        acessdenied.play();
                        console.log("Vent middle clicked while closed - sound played");
                    } else {

                        fadeOutStarted = true;
                        freeAllAudio()
                        console.log("Iniciando transição para ventcrawl1");
                    }
                }

                for (let i = 0; i < soundAreas.length; i++) {
                    const area = soundAreas[i];
                    if (cursorScreenX >= area.x &&
                        cursorScreenX <= area.x + area.width &&
                        cursorScreenY >= area.y &&
                        cursorScreenY <= area.y + area.height) {

                        if (area.x === 440 && area.y === 407) continue;

                        area.sound.play();
                        break;
                    }
                }
            }

            frameTimer += deltaTime * 1000;
            if (frameTimer >= frameDelay) {
                frameTimer = 0;
                currentFrame1 = (currentFrame1 + 1) % 16;
                currentFrame2 = (currentFrame2 + 1) % 16;
            }

            if (leftShockState === 'buzz') {
                if (ballorainastage && balloraSequence[balloraFrame]) {
                    balloraSequence[balloraFrame].draw(0 - cameraX, 0 - cameraY);
                } else if (!ballorainastage) {
                    noAnimatronic.draw(0 - cameraX, 0 - cameraY);
                }
            }

            if (rightShockState === 'buzz') {
                if (foxyinastage && (gameSequence === 'rightBuzzOnly3' || gameSequence === 'rightBuzzPressed3') && foxySequence[foxyFrame]) {
                    foxySequence[foxyFrame].draw(700 - cameraX, 0 - cameraY);
                } else {
                    noAnimatronic.draw(700 - cameraX, 0 - cameraY);
                }
            }

            if (elevatorSequence1[currentFrame1]) {
                elevatorSequence1[currentFrame1].draw(0 - cameraX, 0 - cameraY);
            }

            if (elevatorSequence2[currentFrame2]) {
                elevatorSequence2[currentFrame2].draw(500 - cameraX, 0 - cameraY);
            }

            if (ventmiddleclosed) {

                if (middleVentSequence[0]) {
                    middleVentSequence[0].draw(440 - cameraX, 407 - cameraY);
                }
            } else {

                if (middleVentSequence[middleVentFrame]) {
                    middleVentSequence[middleVentFrame].draw(440 - cameraX, 407 - cameraY);
                }
            }

            ventleft.draw(95 - cameraX, 290 - cameraY)
            ventright.draw(740 - cameraX, 290 - cameraY)

            drawFlashEffects();

            drawShockImage('left', 190 - cameraX, 300 - cameraY);
            drawShockImage('right', 660 - cameraX, 300 - cameraY);

            if (showFoxyMask) {
                foxyImage.draw(473 - cameraX, 150 - cameraY);
            } else {
                ennardImage.draw(483 - cameraX, 150 - cameraY);
            }

            if (leftShockState !== 'off' && leftCanBuzz) {

            }
            if (leftShockState !== 'off' && leftCanShock) {

            }

            if (rightShockState !== 'off' && rightCanBuzz) {

            }
            if (rightShockState !== 'off' && rightCanShock) {

            }

            if (pad.justPressed(Pads.CROSS)) {
                const cursorScreenX = rectX;
                const cursorScreenY = rectY;

                console.log(`Cursor global: (${Math.floor(cursorScreenX)}, ${Math.floor(cursorScreenY)})`);

                if (cursorScreenX >= 440 &&
                    cursorScreenX <= 440 + 109 &&
                    cursorScreenY >= 407 &&
                    cursorScreenY <= 407 + 68) {

                    if (ventmiddleclosed) {

                        acessdenied.play()
                        console.log("Vent middle clicked while closed - sound played");
                    } else {

                        console.log("definaoquevaiaconteceraqui");

                    }
                }

                for (let i = 0; i < soundAreas.length; i++) {
                    const area = soundAreas[i];
                    if (cursorScreenX >= area.x &&
                        cursorScreenX <= area.x + area.width &&
                        cursorScreenY >= area.y &&
                        cursorScreenY <= area.y + area.height) {

                        if (area.x === 440 && area.y === 407) continue;

                        area.sound.play();
                        break;
                    }
                }
            }

            overlay.height = 448;
            overlay.color = Color.new(255, 255, 255, 20);
            overlay.draw(0, 0);
            //DebugManager.draw();
            if (isOverMiddleVent) {
                cursor2Image.draw(rectX - cameraX, rectY - cameraY);
            } else {
                cursorImage.draw(rectX - cameraX, rectY - cameraY);
            }

            if (fadeOutStarted) {
                fadeOutAlpha += fadeOutSpeed * deltaTime;
                if (fadeOutAlpha >= 255) {
                    fadeOutAlpha = 255;

                    SceneManager.load(Night1Scene.ventcrawl2);
                }
            }

            


            if (fadeOutStarted && fadeOutAlpha > 0) {
                Draw.rect(0, 0, 640, 448, Color.new(0, 0, 0, fadeOutAlpha));
            }


            if (mouseTimer < mouseDisplayTime) {
                mouseTimer += deltaTime * 1000;
            } else if (!mouseFading) {
                mouseFading = true;
            }


            if (mouseFading && mouseAlpha > 0) {
                mouseAlpha -= mouseFadeSpeed;
                if (mouseAlpha < 0) mouseAlpha = 0;
            }


            if (mouseAlpha > 0) {
                mouse.color = Color.new(255, 255, 255, mouseAlpha);
                mouse.draw(14, 376);
            }

            if (fadeAlpha > 0) {
                Draw.rect(0, 0, 640, 448, Color.new(0, 0, 0, fadeAlpha));
            }



        });
    }



    ventcrawl2() {
      
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


        const circusgaleryvent = new SfxManager("PS2DATA/DATA/ASSETS/SOUND/SFX/circusgaleryvent.adp");
        let circusAudioTimer = 0;
        let circusAudioPlayed = false;
        const circusAudioDelay = 6000;

        const metal_duct_fast = new StreamManager("PS2DATA/DATA/ASSETS/SOUND/SFX/metal_duct_fast.wav");
        const metal_duct_slow = new StreamManager("PS2DATA/DATA/ASSETS/SOUND/SFX/metal_duct_slow.wav");


        const scaryamb = new SfxManager("PS2DATA/DATA/ASSETS/SOUND/STREAM/scaryamb.adp");
        let scaryambChannel = -1;
        let scaryambStarted = false;

        let isFastPlaying = false;
        let isSlowPlaying = false;

        function manageCircusAudio(deltaTime) {
            if (gameState === "playing" && !circusAudioPlayed) {
                circusAudioTimer += deltaTime * 1000;
                if (circusAudioTimer >= circusAudioDelay) {
                    circusgaleryvent.play();
                    circusAudioPlayed = true;
                }
            }
        }

        function manageScaryAmb() {
            if (gameState === "playing") {

                if (!scaryambStarted) {
                    scaryambChannel = scaryamb.play();
                    scaryambStarted = true;
                } else if (scaryambChannel !== -1 && !scaryamb.isPlaying(scaryambChannel)) {
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
                    
                        metal_duct_fast.play();
                        isFastPlaying = true;
                        isSlowPlaying = false;
                    }
                } else {
                    if (!isSlowPlaying) {
                        metal_duct_fast.pause();
          
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
            //
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
                manageCircusAudio(deltaTime);

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

                manageScaryAmb();

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

                    SceneManager.load(Night1Scene.babyroom);
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

            //DebugManager.draw();

        });
    }

    babyroom() {
        let rectX = 500;
        let rectY = 263;
        const rectWidth = 10;
        const rectHeight = 10;
        const speed = 300;
        const maxWidth = 1000;
        const maxHeight = 588;
        let lastTime = Date.now();

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

        let shockState = 'off';
        let shockTimer = 0;
        let ACTION_DURATION = 4;

        let flashVisible = false;
        let flashTimer = 0;
        const FLASH_INTERVAL = 100;

        let canPress = false;
        let canBuzz = false;
        let canShock = false;

        let sequenceState = 'FADE_IN';
        let currentAudio = null;
        let sequenceStep = 0;

        let fadeAlpha = 255;
        let fadeTimer = 0;
        const FADE_DURATION = 2000;
        let fadeInComplete = false;

        let gameComplete = false;
        let exitVisible = false;
        let exitAlpha = 0;
        let exitTimer = 0;

        let mouseTimer = 0;
        let mouseVisible = false;
        const MOUSE_DURATION = 20000;

        let fadeOutStarted = false;

        const buzzButton = {
            x: 675,
            y: 325,
            width: 22,
            height: 12
        };
        const shockButton = {
            x: 670,
            y: 343,
            width: 22,
            height: 12
        };

        const controloff = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/BABY_ROOM/off.png");
        const controlon = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/BABY_ROOM/on.png");
        const controlbuzz = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/BABY_ROOM/buzz.png");

        const shock1 = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/BABY_ROOM/shock1.png");
        const shock2 = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/BABY_ROOM/shock2.png");

        const buzzframe1 = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/BABY_ROOM/buzzframe1.png");
        const buzzframe2 = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/BABY_ROOM/buzzframe2.png");

        const mouse = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/GENERAL/mouse.png");
        const exit = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/BABY_ROOM/exit.png");

        const elbuzz = new SfxManager("PS2DATA/DATA/ASSETS/SOUND/SFX/elbuzz.adp");
        const energy = new SfxManager("PS2DATA/DATA/ASSETS/SOUND/SFX/energy.adp");

        const handunit11 = new StreamManager("PS2DATA/DATA/ASSETS/SOUND/Stream/handunit11.wav");
        const handunit12 = new StreamManager("PS2DATA/DATA/ASSETS/SOUND/Stream/handunit12.wav");
        const handunit13 = new StreamManager("PS2DATA/DATA/ASSETS/SOUND/Stream/handunit13.wav");
        const handunit14 = new StreamManager("PS2DATA/DATA/ASSETS/SOUND/Stream/handunit14.wav");

        const elevatorSequence1 = [];
        const elevatorSequence2 = [];
        let currentFrame1 = 0;
        let currentFrame2 = 0;
        let frameTimer = 0;
        const frameDelay = 30;

        for (let i = 1; i <= 11; i++) {
            const imagePath = `PS2DATA/DATA/ASSETS/SPRITES/BABY_ROOM/sequence/1/${i}.png`;
            const image = new ImageManager(imagePath);
            image.filter = LINEAR;
            elevatorSequence1.push(image);
        }

        for (let i = 1; i <= 11; i++) {
            const imagePath = `PS2DATA/DATA/ASSETS/SPRITES/BABY_ROOM/sequence/2/${i}.png`;
            const image = new ImageManager(imagePath);
            elevatorSequence2.push(image);
        }

        const cursorImage = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/ELEVATOR/cursor.png");
        const overlay = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/GENERAL/overlay.png");

        function setBuzzDuration(duration) {
            ACTION_DURATION = duration;
        }

        function updateFadeIn(deltaTime) {
            if (sequenceState === 'FADE_IN') {
                fadeTimer += deltaTime * 1000;
                fadeAlpha = 255 - Math.floor((fadeTimer / FADE_DURATION) * 255);

                if (fadeTimer >= FADE_DURATION) {
                    fadeAlpha = 0;
                    fadeInComplete = true;
                    sequenceState = 'PLAYING_HANDUNIT11';
                    mouseTimer = 0;
                    mouseVisible = true;
                }
            }
        }

        function updateButtonStates() {
            canPress = false;
            canBuzz = false;
            canShock = false;

            switch (sequenceState) {
                case 'WAIT_BUZZ':
                case 'WAIT_BUZZ_2':
                case 'WAIT_BUZZ_3':
                    canPress = true;
                    canBuzz = true;
                    canShock = false;
                    break;
                case 'WAIT_SHOCK':
                case 'WAIT_SHOCK_2':
                    canPress = true;
                    canBuzz = false;
                    canShock = true;
                    break;
                default:
                    canPress = false;
                    canBuzz = false;
                    canShock = false;
                    break;
            }
        }

        function updateSequence() {
            switch (sequenceState) {
                case 'PLAYING_HANDUNIT11':
                    if (!currentAudio || !currentAudio.isPlaying()) {
                        if (!currentAudio) {
                            currentAudio = handunit11;
                            currentAudio.play();
                        } else {
                            sequenceState = 'WAIT_BUZZ';
                            shockState = 'on';
                            updateButtonStates();
                        }
                    }
                    break;

                case 'PLAYING_HANDUNIT12':
                    if (!currentAudio || !currentAudio.isPlaying()) {
                        if (!currentAudio) {
                            currentAudio = handunit12;
                            currentAudio.play();
                        } else {
                            sequenceState = 'WAIT_SHOCK';
                            shockState = 'on';
                            updateButtonStates();
                        }
                    }
                    break;

                case 'PLAYING_HANDUNIT13':
                    if (!currentAudio || !currentAudio.isPlaying()) {
                        if (!currentAudio) {
                            currentAudio = handunit13;
                            currentAudio.play();
                        } else {
                            sequenceState = 'WAIT_SHOCK_2';
                            shockState = 'on';
                            updateButtonStates();
                        }
                    }
                    break;

                case 'PLAYING_HANDUNIT14':
                    if (!currentAudio || !currentAudio.isPlaying()) {
                        if (!currentAudio) {
                            currentAudio = handunit14;
                            currentAudio.play();
                        } else {
                            sequenceState = 'COMPLETED';
                            shockState = 'off';
                            gameComplete = true;
                            exitVisible = true;
                            updateButtonStates();
                        }
                    }
                    break;
            }
        }

        function updateShockState(deltaTime) {
            if (shockState === 'buzz' || shockState === 'shock') {
                shockTimer += deltaTime;

                if (shockTimer >= ACTION_DURATION) {
                    switch (sequenceState) {
                        case 'WAIT_BUZZ':
                            if (shockState === 'buzz') {
                                sequenceState = 'PLAYING_HANDUNIT12';
                                currentAudio = null;
                                shockState = 'off';
                            }
                            break;
                        case 'WAIT_SHOCK':
                            if (shockState === 'shock') {
                                sequenceState = 'WAIT_BUZZ_2';
                                shockState = 'on';
                            }
                            break;
                        case 'WAIT_BUZZ_2':
                            if (shockState === 'buzz') {
                                sequenceState = 'PLAYING_HANDUNIT13';
                                currentAudio = null;
                                shockState = 'off';
                            }
                            break;
                        case 'WAIT_SHOCK_2':
                            if (shockState === 'shock') {
                                sequenceState = 'WAIT_BUZZ_3';
                                shockState = 'on';
                            }
                            break;
                        case 'WAIT_BUZZ_3':
                            if (shockState === 'buzz') {
                                sequenceState = 'PLAYING_HANDUNIT14';
                                currentAudio = null;
                                shockState = 'off';
                            }
                            break;
                    }

                    shockTimer = 0;
                    flashVisible = false;
                    updateButtonStates();
                }
            }
        }

        function updateFlashEffect(deltaTime) {
            if (shockState === 'shock') {
                flashTimer += deltaTime * 1000;
                if (flashTimer >= FLASH_INTERVAL) {
                    flashVisible = !flashVisible;
                    flashTimer = 0;
                }
            } else {
                flashVisible = false;
            }
        }

        function updateMouse(deltaTime) {
            if (mouseVisible && fadeInComplete) {
                mouseTimer += deltaTime * 1000;
                if (mouseTimer >= MOUSE_DURATION) {
                    mouseVisible = false;
                }
            }
        }

        function updateExit(deltaTime) {
            if (exitVisible) {
                exitTimer += deltaTime * 1000;
                exitAlpha = Math.min(255, Math.floor((exitTimer / 1000) * 255));
            }
        }

        function updateFadeOut(deltaTime) {
            if (fadeOutStarted) {
                fadeTimer += deltaTime * 1000;
                fadeAlpha = Math.floor((fadeTimer / FADE_DURATION) * 255);

                if (fadeTimer >= FADE_DURATION) {
                    SceneManager.load(Night1Scene.ventcrawl3);
                }
            }
        }

        function drawControlShock(x, y) {
            let image;

            if (sequenceState.startsWith('PLAYING_')) {
                image = controloff;
            } else {
                switch (shockState) {
                    case 'off':
                        image = controloff;
                        break;
                    case 'on':
                        image = controlon;
                        break;
                    case 'buzz':
                        image = controlbuzz;
                        break;
                    case 'shock':
                        image = controlon;
                        break;
                }
            }

            if (image) {
                image.draw(x, y);
            }
        }

        function drawShockEffect() {
            if (shockState === 'shock' && flashVisible) {
                shock1.draw(0 - cameraX, 0 - cameraY);
                shock2.draw(500 - cameraX, 0 - cameraY);
            }
        }

        function drawBuzzEffect() {
            if (shockState === 'buzz') {
                buzzframe1.color = Color.new(128, 128, 128, 70);
                buzzframe2.color = Color.new(128, 128, 128, 70);
                buzzframe1.draw(0 - cameraX, 0 - cameraY);
                buzzframe2.draw(500 - cameraX, 0 - cameraY);
            }
        }

        function isClickingButton(cursorX, cursorY, cursorWidth, cursorHeight, button, cameraX, cameraY) {
            const buttonScreenX = button.x - cameraX;
            const buttonScreenY = button.y - cameraY;

            const cursorScreenX = cursorX - cameraX;
            const cursorScreenY = cursorY - cameraY;

            return cursorScreenX < buttonScreenX + button.width &&
                cursorScreenX + cursorWidth > buttonScreenX &&
                cursorScreenY < buttonScreenY + button.height &&
                cursorScreenY + cursorHeight > buttonScreenY;
        }

        shockState = 'off';
        updateButtonStates();

        Screen.display(() => {
            const currentTime = Date.now();
            const deltaTime = (currentTime - lastTime) / 1000;
            lastTime = currentTime;

            pad.update();

            updateFadeIn(deltaTime);
            updateSequence();
            updateShockState(deltaTime);
            updateFlashEffect(deltaTime);
            updateMouse(deltaTime);
            updateExit(deltaTime);
            updateFadeOut(deltaTime);

            if (fadeInComplete && !fadeOutStarted) {
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

                if (pad.justPressed(Pads.CROSS)) {
                    if (canPress && canBuzz &&
                        isClickingButton(rectX, rectY, rectWidth, rectHeight, buzzButton, cameraX, cameraY)) {
                        shockState = 'buzz';
                        shockTimer = 0;
                        elbuzz.play();
                    } else if (canPress && canShock &&
                        isClickingButton(rectX, rectY, rectWidth, rectHeight, shockButton, cameraX, cameraY)) {
                        shockState = 'shock';
                        shockTimer = 0;
                        flashVisible = true;
                        energy.play();
                    }
                }

                if (gameComplete && exitVisible && pad.justPressed(Pads.TRIANGLE)) {
                    fadeOutStarted = true;
                    fadeTimer = 0;
                }
            }

            frameTimer += deltaTime * 1000;
            if (frameTimer >= frameDelay) {
                frameTimer = 0;
                currentFrame1 = (currentFrame1 + 1) % 11;
                currentFrame2 = (currentFrame2 + 1) % 11;
            }

            if (elevatorSequence1[currentFrame1]) {
                elevatorSequence1[currentFrame1].draw(0 - cameraX, 0 - cameraY);
            }

            if (elevatorSequence2[currentFrame2]) {
                elevatorSequence2[currentFrame2].draw(500 - cameraX, 0 - cameraY);
            }

            if (shockState === 'buzz') {
                drawBuzzEffect();
            }

            drawShockEffect();

            drawControlShock(630 - cameraX, 270 - cameraY);

            if (mouseVisible) {
                mouse.draw(14, 376);
            }

            overlay.height = 448;
            overlay.color = Color.new(255, 255, 255, 20);
            overlay.draw(0, 0);

            if (fadeInComplete && !fadeOutStarted) {
                cursorImage.draw(rectX - cameraX, rectY - cameraY);
            }

            if (exitVisible) {
                exit.color = Color.new(255, 255, 255, exitAlpha);
                exit.draw(14, 400);
            }

            if (sequenceState === 'FADE_IN' || fadeOutStarted) {
                Draw.rect(0, 0, 640, 448, Color.new(0, 0, 0, fadeAlpha));
            }
        });
    }

    ventcrawl3() {
      
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


        const circusgaleryvent = new SfxManager("PS2DATA/DATA/ASSETS/SOUND/SFX/circusgaleryvent.adp");
        let circusAudioTimer = 0;
        let circusAudioPlayed = false;
        const circusAudioDelay = 6000;

        const metal_duct_fast = new StreamManager("PS2DATA/DATA/ASSETS/SOUND/SFX/metal_duct_fast.wav");
        const metal_duct_slow = new StreamManager("PS2DATA/DATA/ASSETS/SOUND/SFX/metal_duct_slow.wav");


        const scaryamb = new SfxManager("PS2DATA/DATA/ASSETS/SOUND/STREAM/scaryamb.adp");
        let scaryambChannel = -1;
        let scaryambStarted = false;

        let isFastPlaying = false;
        let isSlowPlaying = false;

        function manageCircusAudio(deltaTime) {
            if (gameState === "playing" && !circusAudioPlayed) {
                circusAudioTimer += deltaTime * 1000;
                if (circusAudioTimer >= circusAudioDelay) {
                    circusgaleryvent.play();
                    circusAudioPlayed = true;
                }
            }
        }

        function manageScaryAmb() {
            if (gameState === "playing") {

                if (!scaryambStarted) {
                    scaryambChannel = scaryamb.play();
                    scaryambStarted = true;
                } else if (scaryambChannel !== -1 && !scaryamb.isPlaying(scaryambChannel)) {
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
            //
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
                manageCircusAudio(deltaTime);

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

                manageScaryAmb();

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

                    SceneManager.load(Night1Scene.shiftcomplete);
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

            //DebugManager.draw();

        });




    }


    shiftcomplete() {
     
        const pop1Images = [];
        const pop2Images = [];
        const sequenceImages = [];
        let currentFrame = 0;
        let frameTimer = 0;
        const frameDelay = 100;
        let alpha = 255;
        let fadeIn = true;
        let fadeOut = false;
        let audioPlayed = false;

        let popsCounter = 0;
        let gameTimer = 0;
        let lastFireworkTime = 0;
        let initialized = false;
        let lastSoundTime = 0;

        let activePop1 = [];
        let activePop2 = [];
        let fadeCompleted = false;


        for (let i = 1; i <= 31; i++) {
            sequenceImages.push(new ImageManager(`PS2DATA/DATA/ASSETS/SPRITES/SHIFTCOMPLETE/s/${i}.PNG`));
        }

        for (let i = 1; i <= 31; i++) {
            pop1Images.push(new ImageManager(`PS2DATA/DATA/ASSETS/SPRITES/SHIFTCOMPLETE/pop1/${i}.PNG`));
        }

        for (let i = 1; i <= 31; i++) {
            pop2Images.push(new ImageManager(`PS2DATA/DATA/ASSETS/SPRITES/SHIFTCOMPLETE/pop1/${i}.PNG`));
        }

        const enjoy = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/SHIFTCOMPLETE/enjoy.png");
        const jingle_4b = new StreamManager("PS2DATA/DATA/ASSETS/SOUND/STREAM/jingle_4b.wav");
        const pop3Sound = new SfxManager("PS2DATA/DATA/ASSETS/SOUND/SFX/Pop.adp");
        const pop4Sound = new SfxManager("PS2DATA/DATA/ASSETS/SOUND/SFX/Pop.adp");

        const canvas = Screen.getMode();
        const screenWidth = canvas.width;
        const screenHeight = canvas.height;

        class Particle {
            constructor(x, y, type) {
                this.x = x;
                this.y = y;
                this.type = type;
                this.alterableValueA = 100;
                this.alterableValueB = 0;
                this.speedX = 0;
                this.speedY = 0;
                this.gravity = 0.05;
                this.animFrame = 0;
                this.animSpeed = 0;
                this.animTimer = 0;
                this.active = true;
                this.initialized = false;
                this.exploding = true;
            }

            initialize() {
                if (!this.initialized) {
                    this.alterableValueB = 1;
                    const speed = this.type === 'pop1' ? 2 + Math.random() * 3 : 1.5 + Math.random() * 2.5;
                    const angle = Math.random() * Math.PI * 2;
                    this.speedX = Math.cos(angle) * speed;
                    this.speedY = Math.sin(angle) * speed - (1 + Math.random() * 2);
                    this.animSpeed = this.type === 'pop1' ? 8 + Math.random() * 4 : 6 + Math.random() * 6;
                    this.initialized = true;
                }
            }

            update() {
                if (!this.initialized) return;

                if (this.exploding) {
                    this.x += this.speedX;
                    this.y += this.speedY;
                    this.speedX *= 0.95;
                    this.speedY *= 0.95;
                    this.speedY += this.gravity;

                    if (Math.abs(this.speedX) < 0.2 && Math.abs(this.speedY) < 0.2) {
                        this.exploding = false;
                    }
                } else {
                    this.speedY += this.gravity;
                    this.y += this.speedY;
                    this.alterableValueA -= 1;
                }

                if (this.x < -50 || this.x > screenWidth + 50 || this.y > screenHeight + 50) {
                    this.active = false;
                }

                if (this.animSpeed > 0) {
                    this.animTimer += 40;
                    if (this.animTimer >= (1000 / this.animSpeed)) {
                        this.animFrame = (this.animFrame + 1) % 31;
                        this.animTimer = 0;
                    }
                }

                if (this.alterableValueA <= 0) {
                    this.active = false;
                }
            }

            draw() {
                if (!this.active || !this.initialized) return;

                const images = this.type === 'pop1' ? pop1Images : pop2Images;
                const currentImage = images[this.animFrame];


                if (currentImage) {
                    currentImage.draw(this.x, this.y);
                }
            }
        }

        function createFirework() {
            const centerX = screenWidth * 0.2 + Math.random() * (screenWidth * 0.6);
            const centerY = screenHeight * 0.1 + Math.random() * (screenHeight * 0.3);

            for (let i = 0; i < 8; i++) {
                const particle = new Particle(centerX, centerY, 'pop1');
                particle.initialize();
                activePop1.push(particle);
            }

            for (let i = 0; i < 5; i++) {
                const particle = new Particle(centerX, centerY, 'pop2');
                particle.initialize();
                activePop2.push(particle);
            }

            if (gameTimer - lastSoundTime > 500) {
                const soundChoice = Math.floor(Math.random() * 2) + 1;
                if (soundChoice === 1) {
                    pop3Sound.play();
                } else {
                    pop4Sound.play();
                }
                lastSoundTime = gameTimer;
            }
        }

        Screen.display(() => {
            gameTimer += 40;

            if (!audioPlayed) {
                jingle_4b.play();
                audioPlayed = true;
            }

            if (gameTimer >= 1000 && !initialized) {
                popsCounter = 15;
                initialized = true;
            }

            if (popsCounter > 0 && gameTimer - lastFireworkTime >= 500) {
                if (Math.floor(Math.random() * 3) === 0) {
                    createFirework();
                    popsCounter--;
                }
                lastFireworkTime = gameTimer;
            }


            activePop1 = activePop1.filter(particle => {
                particle.update();
                particle.draw();
                return particle.active;
            });

            activePop2 = activePop2.filter(particle => {
                particle.update();
                particle.draw();
                return particle.active;
            });


            if (sequenceImages[currentFrame]) {
                const currentImage = sequenceImages[currentFrame];
                const centerX = (screenWidth - currentImage.width) / 2;
                const centerY = (screenHeight - currentImage.height) / 2;

                currentImage.draw(centerX, centerY - 50);

                frameTimer += 40;
                if (frameTimer >= frameDelay) {
                    currentFrame = (currentFrame + 1) % sequenceImages.length;
                    frameTimer = 0;
                }
            }


            if (fadeIn && alpha > 0) {
                alpha -= 5;
                if (alpha <= 0) {
                    alpha = 0;
                    fadeIn = false;
                }
            }

            if (!jingle_4b.isPlaying() && !fadeOut && alpha === 0) {
                fadeOut = true;
            }

            if (fadeOut && alpha < 255) {
                alpha += 5;
                if (alpha >= 255) {
                    alpha = 255;
                    if (!fadeCompleted) {
                        fadeCompleted = true;
                        SceneManager.load(Night1Scene.tvshowepisode1);
                    }
                }
            }


            if (enjoy) {
                enjoy.color = Color.new(255, 255, 255, 255 - alpha);
                enjoy.draw(250, 200);
            }


            if (alpha > 0) {
                Draw.rect(0, 0, screenWidth, screenHeight, Color.new(0, 0, 0, alpha));
            }
        });
    }

    tvshowepisode1 = () => {
    let eat = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/TVSHOW/eat.png");
    let rectX = 500, rectY = 263, lastTime = Date.now();
    const rectWidth = 10, rectHeight = 10, speed = 300;
    const maxWidth = 1000, maxHeight = 526;
    let targetCameraX = rectX + rectWidth / 2 - 640 / 2;
    let targetCameraY = rectY + rectHeight / 2 - 448 / 2;
    let cameraX = Math.max(0, Math.min(targetCameraX, maxWidth - 640));
    let cameraY = Math.max(0, Math.min(targetCameraY, maxHeight - 448));
    const cameraSpeed = 5, screenWidth = 640, screenHeight = 448;
    const frameDelayElevators = 30, frameDelayTv = 60, frameDelayStatic = 30;
    const staticDuration = 4000, fadeInDuration = 2000, fadeOutDuration = 2000;
    const pad = Pads.get(0);
    const elevatorSequence1 = [], elevatorSequence2 = [], staticSequence = [];
    const tvShowSequence = {}, tvFrameQueue = [];
    let currentFrame1 = 0, currentFrame2 = 0, currentFrameTv = 0, currentFrameStatic = 0;
    let frameTimerElevators = 0, frameTimerTv = 0, frameTimerStatic = 0;
    let tvSequenceComplete = false, staticSequenceStarted = false, staticSequenceComplete = false;
    let staticTimer = 0, fadeInTimer = 0, fadeOutTimer = 0;
    let showFadeOut = false, audioPlayed = false;
    const maxTvFrames = 772, maxLoadedFrames = 50;

    for (let i = 1; i <= 4; i++) {
        elevatorSequence1.push(new ImageManager(`PS2DATA/DATA/ASSETS/SPRITES/TVSHOW/1/${i}.png`));
        elevatorSequence2.push(new ImageManager(`PS2DATA/DATA/ASSETS/SPRITES/TVSHOW/2/${i}.png`));
        let s = new ImageManager(`PS2DATA/DATA/ASSETS/SPRITES/TVSHOW/static_${i}.png`);
        s.filter = LINEAR;
        staticSequence.push(s);
    }

    let cursorImage = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/ELEVATOR/cursor.png");
    let overlay = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/GENERAL/overlay.png");
    let balde = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/TVSHOW/balde.png");
    let pipoca = new ImageManager("PS2DATA/DATA/ASSETS/SPRITES/TVSHOW/pipoca.png");
    let pipocas = [], baldeX = 200, baldeY = 300;
    let episode1 = new StreamManager("PS2DATA/DATA/ASSETS/SOUND/STREAM/episode1.wav");

    Screen.display(() => {
        const currentTime = Date.now();
        const deltaTime = (currentTime - lastTime) / 1000;
        lastTime = currentTime;
        pad.update();
        const move = speed * deltaTime;
        if (pad.pressed(Pads.LEFT) && rectX > 0) rectX -= move;
        if (pad.pressed(Pads.RIGHT) && rectX < maxWidth - rectWidth) rectX += move;
        if (pad.pressed(Pads.UP) && rectY > 0) rectY -= move;
        if (pad.pressed(Pads.DOWN) && rectY < maxHeight - rectHeight) rectY += move;
        const analogX = pad.lx / 127.0, analogY = pad.ly / 127.0, deadzone = 0.15;
        if (!audioPlayed) { episode1.play(); audioPlayed = true; }
        if (Math.abs(analogX) > deadzone) rectX += analogX * move;
        if (Math.abs(analogY) > deadzone) rectY += analogY * move;
        rectX = Math.max(0, Math.min(rectX, maxWidth - rectWidth));
        rectY = Math.max(0, Math.min(rectY, maxHeight - rectHeight));
        targetCameraX = rectX + rectWidth / 2 - screenWidth / 2;
        targetCameraY = rectY + rectHeight / 2 - screenHeight / 2;
        targetCameraX = Math.max(0, Math.min(targetCameraX, maxWidth - screenWidth));
        targetCameraY = Math.max(0, Math.min(targetCameraY, maxHeight - screenHeight));
        const cameraLerpSpeed = cameraSpeed * deltaTime;
        cameraX += (targetCameraX - cameraX) * cameraLerpSpeed;
        cameraY += (targetCameraY - cameraY) * cameraLerpSpeed;

        frameTimerElevators += deltaTime * 1000;
        if (frameTimerElevators >= frameDelayElevators) {
            frameTimerElevators = 0;
            currentFrame1 = (currentFrame1 + 1) % 4;
            currentFrame2 = (currentFrame2 + 1) % 4;
        }

        if (!tvSequenceComplete) {
            frameTimerTv += deltaTime * 1000;
            if (frameTimerTv >= frameDelayTv) {
                frameTimerTv = 0;
                currentFrameTv++;
                if (currentFrameTv >= maxTvFrames) {
                    tvSequenceComplete = true;
                    staticSequenceStarted = true;
                    frameTimerStatic = frameDelayStatic;
                }
            }
        }

        if (staticSequenceStarted && !staticSequenceComplete) {
            staticTimer += deltaTime * 1000;
            frameTimerStatic += deltaTime * 1000;
            if (frameTimerStatic >= frameDelayStatic) {
                frameTimerStatic = 0;
                currentFrameStatic = (currentFrameStatic + 1) % 4;
            }
            if (staticTimer >= staticDuration) {
                staticSequenceComplete = true;
                showFadeOut = true;
            }
        }

        if (elevatorSequence1[currentFrame1]) elevatorSequence1[currentFrame1].draw(0 - cameraX, 0 - cameraY);
        if (elevatorSequence2[currentFrame2]) elevatorSequence2[currentFrame2].draw(500 - cameraX, 0 - cameraY);

        if (!tvSequenceComplete && currentFrameTv < maxTvFrames) {
            if (!tvShowSequence[currentFrameTv]) {
                let path = `PS2DATA/DATA/ASSETS/SPRITES/TVSHOW/EPISODE1/TV_${currentFrameTv.toString().padStart(3, '0')}.PNG`;
                let img = new ImageManager(path);
                img.width = 139;
                img.height = 126;
                img.filter = LINEAR;
                tvShowSequence[currentFrameTv] = img;
                tvFrameQueue.push(currentFrameTv);
                if (tvFrameQueue.length > maxLoadedFrames) {
                    let old = tvFrameQueue.shift();
                    if (tvShowSequence[old]) {
                        tvShowSequence[old].free();
                        delete tvShowSequence[old];
                    }
                }
            }
            if (tvShowSequence[currentFrameTv]) {
                tvShowSequence[currentFrameTv].draw(340 - cameraX, 203 - cameraY);
            }
        }

        if (staticSequenceStarted && !staticSequenceComplete && staticSequence[currentFrameStatic]) {
            staticSequence[currentFrameStatic].draw(340 - cameraX, 203 - cameraY);
        }

        if (pad.justPressed(Pads.SQUARE)) {
            pipocas.push({ x: baldeX + 120, y: baldeY, vx: -100, vy: -200, gravity: 800 });
            pipocas.push({ x: baldeX + 120, y: baldeY, vx: 0, vy: -250, gravity: 800 });
            pipocas.push({ x: baldeX + 120, y: baldeY, vx: 100, vy: -200, gravity: 800 });
        }

        for (let i = pipocas.length - 1; i >= 0; i--) {
            pipocas[i].x += pipocas[i].vx * deltaTime;
            pipocas[i].y += pipocas[i].vy * deltaTime;
            pipocas[i].vy += pipocas[i].gravity * deltaTime;
            if (pipocas[i].y > 500) pipocas.splice(i, 1);
        }

        balde.draw(baldeX, baldeY);
        for (const p of pipocas) pipoca.draw(p.x, p.y);
        overlay.height = 448;
        overlay.color = Color.new(255, 255, 255, 20);
        eat.draw(10, 400);
        cursorImage.draw(rectX - cameraX, rectY - cameraY);

        if (fadeInTimer < fadeInDuration) {
            fadeInTimer += deltaTime * 1000;
            const a = Math.min(255, (fadeInTimer / fadeInDuration) * 255);
            Draw.rect(0, 0, 640, 448, Color.new(0, 0, 0, 255 - a));
        }

        if (showFadeOut) {
            fadeOutTimer += deltaTime * 1000;
            const a = Math.min(255, (fadeOutTimer / fadeOutDuration) * 255);
            Draw.rect(0, 0, 640, 448, Color.new(0, 0, 0, a));
            if (fadeOutTimer >= fadeOutDuration) {
                SceneManager.load(globalThis.Night2Scene.elevatorScene);
                showFadeOut = false;
            }
        }
    });
};


    

}


export const Night1Scene = new Night1SceneClass();