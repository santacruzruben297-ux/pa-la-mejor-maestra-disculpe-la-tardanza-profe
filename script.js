const wrapper = document.getElementById('letterWrapper');
const openButton = document.getElementById('openButton');
const petalField = document.getElementById('petalField');
const birthdayAudio = document.getElementById('birthdayAudio');

const playAudio = async () => {
  if (!birthdayAudio) return;

  birthdayAudio.volume = 0.55;
  birthdayAudio.muted = false;
  birthdayAudio.loop = true;

  try {
    await birthdayAudio.play();
  } catch (error) {
    console.warn('No se pudo reproducir el audio automáticamente:', error);
  }
};

const toggleCard = () => {
  const isOpen = wrapper.classList.toggle('open');
  openButton.textContent = isOpen ? 'Cerrar carta' : 'Abrir carta';
  if (isOpen) {
    openButton.classList.add('opened');
  } else {
    openButton.classList.remove('opened');
  }
};

openButton.addEventListener('click', (event) => {
  event.stopPropagation();
  toggleCard();
  playAudio();
});

wrapper.addEventListener('click', () => {
  toggleCard();
  playAudio();
});

window.addEventListener('load', () => {
  playAudio();
  document.addEventListener('pointerdown', playAudio, { once: true });
  document.addEventListener('click', playAudio, { once: true });
});

for (let i = 0; i < 28; i++) {
  const petal = document.createElement('span');
  petal.className = 'petal';
  petal.style.left = `${Math.random() * 100}%`;
  petal.style.top = `${Math.random() * 100}%`;
  petal.style.animationDelay = `${(Math.random() * 12).toFixed(2)}s`;
  petal.style.animationDuration = `${(9 + Math.random() * 7).toFixed(2)}s`;
  petal.style.transform = `scale(${(Math.random() * 0.7 + 0.7).toFixed(2)}) rotate(${Math.random() * 140}deg)`;
  petalField.appendChild(petal);
}

setTimeout(() => {
  wrapper.classList.add('open');
  openButton.textContent = 'Cerrar carta';
  openButton.classList.add('opened');
}, 550);
