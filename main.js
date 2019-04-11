const keys = document.querySelectorAll('.song');
const sine = document.querySelector('.sine');
const square = document.querySelector('.square');
const dark = document.querySelector('#dark');
const body = document.querySelector('body');
const ctx = new AudioContext();

function playNote(freq, wave) {
  const gain = ctx.createGain();
  const oscillatorSine = ctx.createOscillator();
  const oscillatorSineSquare1 = ctx.createOscillator();
  const oscillatorSineSquare2 = ctx.createOscillator();
  switch (wave) {
    case 'sine':
      gain.connect(ctx.destination);
      gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 1);
      oscillatorSine.connect(gain);
      oscillatorSine.frequency.value = freq;
      oscillatorSine.type = 'sine';
      oscillatorSine.start();
      oscillatorSine.stop(ctx.currentTime + 2);
      oscillatorSine.onended = () => {
        gain.disconnect();
        oscillatorSine.disconnect();
      };
      break;
    case 'square':
      gain.connect(ctx.destination);
      gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 1);
      oscillatorSineSquare1.connect(gain);
      oscillatorSineSquare1.frequency.value = freq;
      oscillatorSineSquare1.type = 'sine';
      oscillatorSineSquare1.start();
      oscillatorSineSquare2.connect(gain);
      oscillatorSineSquare2.type = 'square';
      oscillatorSineSquare2.start();
      oscillatorSineSquare1.stop(ctx.currentTime + 2);
      oscillatorSineSquare1.onended = () => {
        gain.disconnect();
        oscillatorSineSquare1.disconnect();
        oscillatorSineSquare2.disconnect();
      };
      break;
    default:
      break;
  }
}

function darkMode() {
  dark.textContent = 'Light Mode';
  body.classList.add('dark-bg');
  body.classList.add('dark-color');
  dark.classList.add('dark-color');
}

let wave = 'square';

function sineFunc() {
  sine.classList.add('sineActive');
  square.classList.remove('squareActive');
  wave = 'sine';
}

function squareFunc() {
  square.classList.add('squareActive');
  sine.classList.remove('sineActive');
  wave = 'square';
}

function keyEvent(event) {
  const key = event.keyCode || event.which;
  switch (key) {
    case 32:
      if (wave === 'square') {
        sineFunc();
      } else {
        squareFunc();
      }
      break;
    case 65:
      playNote(keys[0].getAttribute('data-freq'), wave);
      break;
    case 74:
      playNote(keys[1].getAttribute('data-freq'), wave);
      break;
    case 75:
      playNote(keys[2].getAttribute('data-freq'), wave);
      break;
    case 76:
      playNote(keys[3].getAttribute('data-freq'), wave);
      break;
    case 83:
      playNote(keys[4].getAttribute('data-freq'), wave);
      break;
    default:
      break;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.theme === 'Dark') darkMode();
  sineFunc();
});

body.addEventListener('keydown', (event) => {
  keyEvent(event);
});

sine.addEventListener('click', () => {
  sineFunc();
});

square.addEventListener('click', () => {
  squareFunc();
});

dark.addEventListener('click', () => {
  if (dark.textContent === 'Dark Mode') {
    darkMode();
    localStorage.setItem('theme', 'Dark');
    return;
  }
  dark.textContent = 'Dark Mode';
  body.classList.remove('dark-bg');
  body.classList.remove('dark-color');
  dark.classList.remove('dark-color');
  localStorage.setItem('theme', 'Light');
});

keys.forEach((element) => {
  element.addEventListener('click', () => {
    playNote(element.getAttribute('data-freq'), wave);
  });
});
