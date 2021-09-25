import { io } from 'socket.io-client';
import './index.scss';
import ClientGame from './client/ClientGame';
import { getTime } from './common/util';
// import NPCWalk from './assets/Male-4-Walk.png';
// import terrainAtlas from './assets/terrain.png';
// import worldCfg from './configs/world.json';
// import sprites from './configs/sprites.js';

// const canvas = document.getElementById('game');
// const ctx = canvas.getContext('2d');

// const spriteW = 48;
// const spriteH = 48;

// const terrain = document.createElement('img');

// terrain.src = terrainAtlas;

// terrain.addEventListener('load', () => {
//   console.log(sprites)
//   const {map} = worldCfg;
//   map.forEach((cfgRow, y) => {
//     cfgRow.forEach((cfgCell, x) => {
//       const [sX, sY, sW, sH] = sprites.terrain[cfgCell[0]].frames[0];
//       ctx.drawImage(terrain, sX, sY, sW, sH, x * spriteW, y * spriteH, spriteW, spriteH);
//     });
//   });
// });

// const canvasWidth = canvas.clientWidth;
// const canvasHeight = canvas.clientHeight;
// const imgW = 48;
// const imgH = 48;
// const maxY = canvasHeight - imgH;
// const maxX = canvasWidth - imgW;
// const shots = 3;

// let spriteX = 0;
// let spriteY = 0;
// let keyPressed = null;
// let keyReleased = null;
// let pY = canvasWidth / 2 - imgW / 2;
// let pX = canvasHeight / 2 - imgH / 2;

// function keyDownHandler(e) {
//   switch (e.key) {
//     case 'Down':
//     case 'ArrowDown':
//       keyPressed = 'down';
//       spriteY = 0;
//       break;
//     case 'Up':
//     case 'ArrowUp':
//       keyPressed = 'up';
//       spriteY = 3;
//       break;
//     case 'Right':
//     case 'ArrowRight':
//       keyPressed = 'right';
//       spriteY = 2;
//       break;
//     case 'Left':
//     case 'ArrowLeft':
//       keyPressed = 'left';
//       spriteY = 1;
//       break;
//     default:
//       console.log('SomethingPressed');
//       break;
//   }
// }

// function keyUpHandler(e) {
//   switch (e.key) {
//     case 'Down':
//     case 'ArrowDown':
//       keyReleased = 'down';
//       break;
//     case 'Up':
//     case 'ArrowUp':
//       keyReleased = 'up';
//       break;
//     case 'Right':
//     case 'ArrowRight':
//       keyReleased = 'right';
//       break;
//     case 'Left':
//     case 'ArrowLeft':
//       keyReleased = 'left';
//       break;
//     default:
//       console.log('SomethingReleased');
//       break;
//   }

//   if (keyReleased === keyPressed) {
//     keyPressed = null;
//   }
// }

// document.addEventListener('keydown', keyDownHandler);
// document.addEventListener('keyup', keyUpHandler);

// const img = document.createElement('img');
// img.src = NPCWalk;

// function checkOverflow(val, max) {
//   let newVal = val;
//   if (newVal < 0) newVal = 0;
//   if (newVal > max) newVal = max;
//   return newVal;
// }

// function switchNextSpriteLoopWalk() {
//   spriteX = (spriteX + 1) % shots;
// }

// function walk(timestamp) {
//   // console.log(timestamp);
//   switch (keyPressed) {
//     case 'down':
//       pY += 10;
//       switchNextSpriteLoopWalk();
//       break;
//     case 'up':
//       pY -= 10;
//       switchNextSpriteLoopWalk();
//       break;
//     case 'right':
//       pX += 10;
//       switchNextSpriteLoopWalk();
//       break;
//     case 'left':
//       pX -= 10;
//       switchNextSpriteLoopWalk();
//       break;
//     default:
//       // console.log('static');
//       break;
//   }

//   pY = checkOverflow(pY, maxY);
//   pX = checkOverflow(pX, maxX);

//   ctx.clearRect(0, 0, 600, 600);
//   ctx.drawImage(img, spriteX * spriteW, spriteY * spriteH, spriteW, spriteH, pX, pY, imgW, imgH);

//   window.requestAnimationFrame(walk);
// }

// img.addEventListener('load', () => {
//   window.requestAnimationFrame(walk);
// });
//
window.addEventListener('load', () => {
  // const socket = io('https://jsprochat.herokuapp.com');
  const socket = io('https://jspromarathonchat.herokuapp.com/');
  // const socket = io('http://localhost:3001');
  // const world = await fetch('https://jsmarathonpro.herokuapp.com/api/v1/world').then((res) => res.json());
  // const sprites = await fetch('https://jsmarathonpro.herokuapp.com/api/v1/sprites').then((res) => res.json());
  // const gameObjects = await fetch('https://jsmarathonpro.herokuapp.com/api/v1/gameObjects').then((res) => res.json());

  const $startGame = document.querySelector('.start-game');
  const $nameForm = document.getElementById('nameForm');
  const $inputName = document.querySelector('input');

  const $chat = document.querySelector('.chat-wrap');

  const $chatForm = document.getElementById('form');
  const $chatInput = document.getElementById('input');
  const $chatMessage = document.querySelector('.message');
  const $audio = document.querySelector('.audio');

  // $startGame.style.display = 'flex';

  let myID = null;

  const funcSumbitForm = (e) => {
    e.preventDefault();

    if ($inputName.value) {
      ClientGame.init({
        tagId: 'game',
        playerName: $inputName.value,
        // world,
        // sprites,
        // gameObjects,
        apiCfg: {
          url: 'https://jsmarathonpro.herokuapp.com/',
          path: '/game',
        },
      });

      socket.emit('start', $inputName.value);

      $chat.style.display = 'block';
      $nameForm.removeEventListener('submit', funcSumbitForm);
      $startGame.remove();
      $audio.play();
    }
  };

  $nameForm.addEventListener('submit', funcSumbitForm);

  $chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if ($chatInput.value) {
      socket.emit('chat message', $chatInput.value);

      $chatInput.value = '';
    }
  });

  socket.on('connect', () => {
    myID = socket.id;
  });

  socket.on('chat connection', (data) => {
    $chatMessage.insertAdjacentHTML(
      'beforeend',
      `<p><strong>${getTime(data.time)} - </strong>${data.msg.substr(0, data.msg.length - 10)} has joined the chat</p>`,
    );
  });

  socket.on('chat disconnect', (data) => {
    $chatMessage.insertAdjacentHTML(
      'beforeend',
      `<p><strong>${getTime(data.time)} - </strong>${data.msg.substr(0, data.msg.length - 11)} has left the chat</p>`,
    );
  });

  socket.on('chat online', (data) => {
    $chatMessage.insertAdjacentHTML(
      'beforeend',
      `<p><strong>${getTime(data.time)} - </strong>${data.online} user${data.online > 1 ? 's' : ''} online</p>`,
    );
    // data.names.forEach((obj) => {
    //   $chatMessage.insertAdjacentHTML('beforeend', `<p>Пользователь - ${obj.name} - в сети!</p>`);
    // });
  });

  socket.on('chat message', (data) => {
    let userName = `<b>${data.name}:</b>`;

    if (data.id === myID) {
      userName = `<u>${userName}</u>`;
    }

    $chatMessage.insertAdjacentHTML(
      'beforeend',
      `<p><b>${getTime(data.time)} </b><span style="color: #0633ff;">${userName}</span> ${data.msg}</p>`,
    );

    $chatMessage.scrollTop = $chatMessage.scrollHeight;

    // if (data.id === myID) {
    //   $chatMessage.lastChild.style.cssText
    //     += 'text-shadow:-1px -1px #fff,-2px -2px #fff,-1px 1px #fff,-2px 2px #fff,1px 1px #fff,2px 2px #fff,1px -1px #fff,2px -2px #fff,-3px -3px 2px #bbb,-3px 3px 2px #bbb,3px 3px 2px #bbb,3px -3px 2px #bbb;color:#4682b4';
    // }
  });
});
