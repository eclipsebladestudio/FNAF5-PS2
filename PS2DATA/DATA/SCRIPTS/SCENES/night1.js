import { SceneManager } from "../utils/scenemanagert.js";

class Night1SceneClass {
   constructor() {
   }

   elevatorScene() {
       const font = new Font("default");
       
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

       const nolightImage1 = new Image("PS2DATA/DATA/ASSETS/SPRITES/ELEVATOR/nolight1.png");
       const nolightImage2 = new Image("PS2DATA/DATA/ASSETS/SPRITES/ELEVATOR/nolight2.png");
       const cursorImage = new Image("PS2DATA/DATA/ASSETS/SPRITES/ELEVATOR/cursor.png");
       const lights = new Image("PS2DATA/DATA/ASSETS/SPRITES/ELEVATOR/lights.png");
       const overlay = new Image("PS2DATA/DATA/ASSETS/SPRITES/GENERAL/overlay.png");

       const tabletIntroduction = [];
       const tabletMiddle = [];
       const tabletClosing = [];
       let tabletState = "hidden";
       let tabletCurrentFrame = 0;
       let tabletFrameTimer = 0;
       const tabletFrameDelay = 100;
       let tabletTimer = 0;
       let tabletStartTime = 0;
       const tabletStartDelay = 28000;
       const tabletCycleDelay = 10000;
       
       const pointImage = new Image("PS2DATA/DATA/ASSETS/SPRITES/ELEVATOR/TABLET/point.png");
       const middleImage = new Image("PS2DATA/DATA/ASSETS/SPRITES/ELEVATOR/TABLET/middle.png");
       const errorImage = new Image("PS2DATA/DATA/ASSETS/SPRITES/ELEVATOR/TABLET/error.png");
       const eggsImage = new Image("PS2DATA/DATA/ASSETS/SPRITES/ELEVATOR/TABLET/eggs.png");
       
       let pointCount = 0;
       const maxPoints = 7;
       
       const tabletX = 250;
       const tabletY = 200;
       const pointAreaOffsetX = 70;
       const pointAreaOffsetY = 85;
       const pointAreaWidth = 150;
       const pointAreaHeight = 100;
       
       let showMiddleImage = false;
       let showErrorImage = false;
       let showEggsImage = false;
       let errorTimer = 0;
       const errorDuration = 3000;
       let eggsTimer = 0;
       const eggsDuration = 2000;

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

       const introAudio = Sound.Stream("PS2DATA/DATA/ASSETS/SOUND/STREAM/DaughterLine1.wav");
       let introPhase = "blackScreen";
       let introTimer = 0;
       const blackScreenDuration = 8000;
       const fadeInDuration = 1500;
       let fadeAlpha = 255;
       let audioStarted = false;

       for (let i = 1; i <= 10; i++) {
           const imagePath = `PS2DATA/DATA/ASSETS/SPRITES/ELEVATOR/ELEVATORSEQUENCE/1/${i}.png`;
           const image = new Image(imagePath);
           image.filter = LINEAR;
           elevatorSequence1.push(image);
       }

       for (let i = 1; i <= 10; i++) {
           const imagePath = `PS2DATA/DATA/ASSETS/SPRITES/ELEVATOR/ELEVATORSEQUENCE/2/${i}.png`;
           const image = new Image(imagePath);
           image.filter = LINEAR;
           elevatorSequence2.push(image);
       }

       for (let i = 1; i <= 10; i++) {
           const imagePath = `PS2DATA/DATA/ASSETS/SPRITES/ELEVATOR/TABLET/introduction/${i}.png`;
           const image = new Image(imagePath);
           tabletIntroduction.push(image);
       }

       for (let i = 1; i <= 11; i++) {
           const imagePath = `PS2DATA/DATA/ASSETS/SPRITES/ELEVATOR/TABLET/Midle/${i}.png`;
           const image = new Image(imagePath);
           tabletMiddle.push(image);
       }

       for (let i = 1; i <= 10; i++) {
           const imagePath = `PS2DATA/DATA/ASSETS/SPRITES/ELEVATOR/TABLET/closing/${i}.png`;
           const image = new Image(imagePath);
           tabletClosing.push(image);
       }

       Screen.display(() => {
           const currentTime = Date.now();
           const deltaTime = (currentTime - lastTime) / 1000;
           lastTime = currentTime;

           pad.update();

           if (introPhase !== "normal") {
               introTimer += deltaTime * 1000;

               if (!audioStarted) {
                   introAudio.play();
                   audioStarted = true;
                   tabletStartTime = currentTime;
               }

               if (introPhase === "blackScreen") {
                   if (introTimer >= blackScreenDuration) {
                       introPhase = "fadeIn";
                       introTimer = 0;
                   }
                   
                   Draw.rect(0, 0, 640, 448, Color.new(0, 0, 0, 255));
                   return;
               }
               
               else if (introPhase === "fadeIn") {
                   const fadeProgress = introTimer / fadeInDuration;
                   if (fadeProgress >= 1.0) {
                       introPhase = "normal";
                       fadeAlpha = 0;
                   } else {
                       fadeAlpha = 255 - (fadeProgress * 255);
                   }
               }
           }

           if (introPhase !== "blackScreen") {
               if (tabletState === "hidden" && (currentTime - tabletStartTime) >= tabletStartDelay) {
                   tabletState = "introduction";
                   tabletCurrentFrame = 0;
                   tabletFrameTimer = 0;
               }

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
                               tabletState = "hidden";
                               tabletStartTime = currentTime;
                               pointCount = 0;
                               showMiddleImage = false;
                               showErrorImage = false;
                               showEggsImage = false;
                           }
                       }
                   }
               }

               if (tabletState === "error") {
                   errorTimer += deltaTime * 1000;
                   if (errorTimer >= errorDuration) {
                       tabletState = "eggs";
                       showErrorImage = false;
                       showEggsImage = true;
                       eggsTimer = 0;
                   }
               }

               if (tabletState === "eggs") {
                   eggsTimer += deltaTime * 1000;
                   if (eggsTimer >= eggsDuration) {
                       tabletState = "closing";
                       showEggsImage = false;
                       showMiddleImage = false;
                       tabletCurrentFrame = 0;
                       tabletFrameTimer = 0;
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
                       
                       if (pointCount >= maxPoints) {
                           tabletState = "error";
                           showMiddleImage = true;
                           showErrorImage = true;
                           pointCount = 0;
                           errorTimer = 0;
                       }
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

               if (screenShake) {
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

               lightsY -= lightsSpeed * deltaTime;
               
               if (lightsY <= -200) {
                   lightsY = 526; 
               }

               nolightTimer += deltaTime * 1000;
               
               if (!showNolightImages && nolightTimer >= nolightInterval && Math.random() < nolightFrequency) {
                   showNolightImages = true;
                   nolightDisplayTime = 0;
                   nolightDuration = Math.random() * 600 + 200;
               }
               
               if (showNolightImages) {
                   nolightDisplayTime += deltaTime * 1000;
                   if (nolightDisplayTime >= nolightDuration) {
                       showNolightImages = false;
                       nolightTimer = 0;
                       nolightInterval = Math.random() * 2500 + 1500;
                   }
               }

               frameTimer += deltaTime * 1000;
               if (frameTimer >= frameDelay) {
                   frameTimer = 0;
                   currentFrame1 = (currentFrame1 + 1) % 10;
                   currentFrame2 = (currentFrame2 + 1) % 10;
               }

               lights.draw(0 - cameraX, lightsY - cameraY);

               if (!showNolightImages) {
                   if (elevatorSequence1[currentFrame1]) {
                       elevatorSequence1[currentFrame1].draw(0 - cameraX + shakeOffsetX, 0 - cameraY + shakeOffsetY);
                   }

                   if (elevatorSequence2[currentFrame2]) {
                       elevatorSequence2[currentFrame2].draw(500 - cameraX + shakeOffsetX, 0 - cameraY + shakeOffsetY);
                   }
               } else {
                   nolightImage1.draw(0 - cameraX + shakeOffsetX, 0 - cameraY + shakeOffsetY);
                   nolightImage2.draw(500 - cameraX + shakeOffsetX, 0 - cameraY + shakeOffsetY);
               }

               if (tabletState === "introduction" && tabletIntroduction[tabletCurrentFrame]) {
                   tabletIntroduction[tabletCurrentFrame].draw(tabletX + shakeOffsetX, tabletY + shakeOffsetY);
               } else if (tabletState === "middle" && tabletMiddle[tabletCurrentFrame]) {
                   tabletMiddle[tabletCurrentFrame].draw(tabletX + shakeOffsetX, tabletY + shakeOffsetY);
                   
                   for (let i = 0; i < pointCount; i++) {
                       pointImage.draw((tabletX + 80 + i * 15) + shakeOffsetX, (tabletY + 76) + shakeOffsetY);
                   }
               } else if (tabletState === "closing" && tabletClosing[tabletCurrentFrame]) {
                   tabletClosing[tabletCurrentFrame].draw(tabletX + shakeOffsetX, tabletY + shakeOffsetY);
               }

               if (showMiddleImage) {
                   middleImage.draw(tabletX + shakeOffsetX, tabletY + shakeOffsetY);
               }
               
               if (showErrorImage) {
                   errorImage.draw(tabletX  + 130 + shakeOffsetX, tabletY + 130 + shakeOffsetY);
               }
               
               if (showEggsImage) {
                   eggsImage.draw(tabletX + 80 + shakeOffsetX, tabletY + 70 + shakeOffsetY);
               }

               overlay.height = 448;
               overlay.color = Color.new(255, 255, 255, 20);
               overlay.draw(0, 0);
               
               cursorImage.draw(rectX - cameraX, rectY - cameraY);


               if (introPhase === "fadeIn" && fadeAlpha > 0) {
                   Draw.rect(0, 0, 640, 448, Color.new(0, 0, 0, 0));
               }
           }
       });
   }
}

export const Night1Scene = new Night1SceneClass();