export class GameSettings {
  /**
   * Initialises game settings
   * @param {boolean | null | undefined} trainingWheels - Determines whether or not mistakes should be higlighted immediately
   * @param {boolean | null | undefined} showMistakes - Determines whether or not to display the number of mistakes made. If trainingWheels is false, this must be false as well
   * @param {boolean | null | undefined} nightMode - Determines whether the page should use the night colour theme
   */
  constructor(trainingWheels, showMistakes, nightMode) {
    this.trainingWheels = trainingWheels ?? false;
    this.showMistakes = showMistakes ?? false;
    this.nightMode = nightMode ?? true;

    console.log(`Training wheels: ${this.trainingWheels}, show mistakes: ${this.showMistakes} and night mode: ${this.nightMode}`)

    this.#applyTrainingWheels(); // TODO: use this.settings to set initial values of checkbox; can't just call apply functions because they work off of current checkbox state not local storage / defaults

    $('#training-wheels').on('change', () => this.#applyTrainingWheels());
    $('#show-mistakes').on('change', () => this.#applyShowMistakes());
    $('#night-mode').on('change', () => this.#applyNightMode());
  }

  #applyTrainingWheels() {
    if (!$('#training-wheels').is(':checked')) {
      $('#inner-toggle').addClass('disabled');
      $('#show-mistakes').prop('checked', false);
      $('#show-mistakes').attr('disabled', true);
      
      this.#saveSetting('trainingWheels', false);
      this.#applyShowMistakes();
    }
    else {
      $('.inner-toggle').removeClass('disabled');
      $('#show-mistakes').attr('disabled', false);
      this.#saveSetting('trainingWheels', true);
    }
  };

  #applyShowMistakes() {
    if ($('#show-mistakes').is(':checked')) {
      $('#mistake-container').css('opacity', '1');
      this.#saveSetting('showMistakes', true);
    }
    else {
      $('#mistake-container').css('opacity', '0');
      this.#saveSetting('showMistakes', false);
    }
  };

  #applyNightMode() {
    if ($('#night-mode').is(':checked')) {
      document.documentElement.setAttribute('data-theme', 'dark');
      this.#saveSetting('nightMode', true);
    }
    else {
      document.documentElement.setAttribute('data-theme', 'light');
      this.#saveSetting('nightMode', false);
    }
  };

  #saveSetting(setting, value) {
    if (setting === 'trainingWheels') this.trainingWheels = value;
    else if (setting === 'showMistakes') this.showMistakes = value;
    else this.nightMode = value;

    localStorage.setItem('game-settings', JSON.stringify(this));
  }
}