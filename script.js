const dropZone = document.getElementById('dropZone');
const audio = document.getElementById('audio');
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const counterSpan = document.getElementById('counter');

let loopCount = 0;

dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropZone.style.borderColor = '#0f0';
});

dropZone.addEventListener('dragleave', () => {
  dropZone.style.borderColor = '#666';
});

dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith('audio/')) {
    const url = URL.createObjectURL(file);
    audio.src = url;
    playBtn.disabled = false;
    pauseBtn.disabled = false;
    dropZone.textContent = `Loaded: ${file.name}`;
  }
  dropZone.style.borderColor = '#666';
});

playBtn.addEventListener('click', () => {
  audio.play();
});

pauseBtn.addEventListener('click', () => {
  audio.pause();
});

audio.addEventListener('ended', () => {
  loopCount++;
  counterSpan.textContent = loopCount;
});

audio.addEventListener('timeupdate', () => {
  if (audio.currentTime >= audio.duration - 0.3) {
    loopCount++;
    counterSpan.textContent = loopCount;
  }
});
