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
let bottomPressed = false;
let topPressed = false;
let rightPressed = false;
let leftPressed = false;
let pY = canvasWidth / 2 - imgW / 2;
let pX = canvasHeight / 2 - imgH / 2;

function keyDownHandler(e) {
  switch (e.key) {
    case 'Down':
    case 'ArrowDown':
      bottomPressed = true;
      topPressed = false;
      rightPressed = false;
      leftPressed = false;
      spriteY = 0;
      break;
    case 'Up':
    case 'ArrowUp':
      topPressed = true;
      bottomPressed = false;
      leftPressed = false;
      rightPressed = false;
      spriteY = 3;
      break;
    case 'Right':
    case 'ArrowRight':
      rightPressed = true;
      bottomPressed = false;
      leftPressed = false;
      topPressed = false;
      spriteY = 2;
      break;
    case 'Left':
    case 'ArrowLeft':
      leftPressed = true;
      bottomPressed = false;
      rightPressed = false;
      topPressed = false;
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
      bottomPressed = false;
      break;
    case 'Up':
    case 'ArrowUp':
      topPressed = false;
      break;
    case 'Right':
    case 'ArrowRight':
      rightPressed = false;
      break;
    case 'Left':
    case 'ArrowLeft':
      leftPressed = false;
      break;
    default:
      console.log('SomethingReleased');
      break;
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
    switch (true) {
      case bottomPressed:
        pY += 10;
        switchNextSpriteLoopWalk();
        break;
      case topPressed:
        pY -= 10;
        switchNextSpriteLoopWalk();
        break;
      case rightPressed:
        pX += 10;
        switchNextSpriteLoopWalk();
        break;
      case leftPressed:
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
