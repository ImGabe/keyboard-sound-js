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

document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.theme === 'Dark') {
    darkMode();
  }
});

let wave = 'sine';

sine.addEventListener('click', () => {
  sine.classList.add('sineActive');
  square.classList.remove('squareActive');
  wave = 'sine';
});

square.addEventListener('click', () => {
  square.classList.add('squareActive');
  sine.classList.remove('sineActive');
  wave = 'square';
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
