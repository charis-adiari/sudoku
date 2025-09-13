export class Timer {
  constructor() {
    this.seconds = 0;
    this.interval = null;
    this.isRunning = false;
    $('#pause').on('click', () => this.#toggleTimer(this.isRunning));
    $('#play').on('click', () => this.#toggleTimer(this.isRunning));
  }

  restartTimer() {
    if (!this.isRunning) this.#toggleTimer(false); //play if paused

    this.reset();
    this.#startTimer();
  }

  reset() {
    this.#stopTimer();
    this.seconds = 0;
    this.#updateDisplay();
  }

  #formatTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const pad = (num) => num.toString().padStart(2, '0');

    if (hours > 0) {
      return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    } else {
      return `${pad(minutes)}:${pad(seconds)}`;
    }
  }

  #updateDisplay() {
    $('#timer').text(this.#formatTime(this.seconds));
  }

  #startTimer() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.interval = setInterval(() => {
        this.seconds++;
        this.#updateDisplay();
      }, 1000);
    }
  }

  #stopTimer() {
    if (this.isRunning) {
      this.isRunning = false;
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  #toggleTimer(isRunning) {
    if (isRunning) {
      $('#pause>i').removeClass('bi bi-pause-fill').addClass('bi bi-play-fill');
      $('#play').removeClass('hidden');
      this.#stopTimer();
    } else {
      $('#pause>i').removeClass('bi bi-play-fill').addClass('bi bi-pause-fill');
      $('#play').addClass('hidden');
      this.#startTimer();
    }
  }
}

export const toggleActive = () => {
  const isTakingNotes = $('#notes').hasClass('active');

  if (isTakingNotes) {
    $('#notes').removeClass('active');
    $('#notes>i').removeClass('bi-pencil-fill').addClass('bi-pencil');
  }
  else {
    $('#notes').addClass('active');
    $('#notes>i').addClass('bi-pencil-fill').removeClass('bi-pencil');
  }

  return isTakingNotes;
};

export const toggleDropdown = () => {
  if ($('.dropdown').hasClass('show'))
    $('.dropdown').removeClass('show');
  else
    $('.dropdown').addClass('show');
};