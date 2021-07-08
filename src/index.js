import './index.scss';
import NPCWalk from './assets/Male-4-Walk.png';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const canvasWidth = canvas.clientWidth;
const canvasHeight = canvas.clientHeight;
const spriteW = 48;
const spriteH = 48;
const imgW = 48;
const imgH = 48;
const maxY = canvasHeight - imgH;
const maxX = canvasWidth - imgW;
const shots = 3;

let spriteX = 0;
let spriteY = 0;
let keyPressed = null;
let keyReleased = null;
let pY = canvasWidth / 2 - imgW / 2;
let pX = canvasHeight / 2 - imgH / 2;

function keyDownHandler(e) {
  switch (e.key) {
    case 'Down':
    case 'ArrowDown':
      keyPressed = 'down';
      spriteY = 0;
      break;
    case 'Up':
    case 'ArrowUp':
      keyPressed = 'up';
      spriteY = 3;
      break;
    case 'Right':
    case 'ArrowRight':
      keyPressed = 'right';
      spriteY = 2;
      break;
    case 'Left':
    case 'ArrowLeft':
      keyPressed = 'left';
      spriteY = 1;
      break;
    default:
      console.log('SomethingPressed');
      break;
  }
}

function keyUpHandler(e) {
  switch (e.key) {
    case 'Down':
    case 'ArrowDown':
      keyReleased = 'down';
      break;
    case 'Up':
    case 'ArrowUp':
      keyReleased = 'up';
      break;
    case 'Right':
    case 'ArrowRight':
      keyReleased = 'right';
      break;
    case 'Left':
    case 'ArrowLeft':
      keyReleased = 'left';
      break;
    default:
      console.log('SomethingReleased');
      break;
  }

  if (keyReleased === keyPressed) {
    keyPressed = null;
  }
}

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

const img = document.createElement('img');
img.src = NPCWalk;

function checkOverflow(val, max) {
  let newVal = val;
  if (newVal < 0) newVal = 0;
  if (newVal > max) newVal = max;
  return newVal;
}

function switchNextSpriteLoopWalk() {
  spriteX = (spriteX + 1) % shots;
}

img.addEventListener('load', () => {
  setInterval(() => {
    switch (keyPressed) {
      case 'down':
        pY += 10;
        switchNextSpriteLoopWalk();
        break;
      case 'up':
        pY -= 10;
        switchNextSpriteLoopWalk();
        break;
      case 'right':
        pX += 10;
        switchNextSpriteLoopWalk();
        break;
      case 'left':
        pX -= 10;
        switchNextSpriteLoopWalk();
        break;
      default:
        console.log('static');
        break;
    }

    pY = checkOverflow(pY, maxY);
    pX = checkOverflow(pX, maxX);

    ctx.clearRect(0, 0, 600, 600);
    ctx.drawImage(img, spriteX * spriteW, spriteY * spriteH, spriteW, spriteH, pX, pY, imgW, imgH);
  }, 120);
});
