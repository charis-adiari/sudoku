export class GameSettings {
  constructor() {
    this.trainingWheels = false;
    this.showMistakes = false;
    this.nightMode = true;

    const savedSettings = this.#getSettingsFromLocalStorage();
    
    //TODO: If no night mode in saved settings, set night mode according to
    // browser preferences
    if (savedSettings) {
      this.trainingWheels = savedSettings.trainingWheels;
      this.showMistakes = savedSettings.showMistakes;
      this.nightMode = savedSettings.nightMode;
    }

    this.#initToggleDisplays();

    this.#applyTrainingWheels();
    this.#applyShowMistakes();
    this.#applyNightMode();
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

  #getSettingsFromLocalStorage() {
    return JSON.parse(localStorage.getItem('game-settings'))
  }

  #initToggleDisplays() {
    if (this.trainingWheels) {
      $('#training-wheels').prop('checked', true);

      if (this.showMistakes) $('#show-mistakes').prop('checked', true);
      else $('#show-mistakes').prop('checked', false);
    }
    else {
      $('#training-wheels').prop('checked', false);
      $('#inner-toggle').addClass('disabled');
      $('#show-mistakes').prop('checked', false);
      $('#show-mistakes').attr('disabled', true);
    }

    if (this.nightMode) $('#night-mode').prop('checked', true);
    else $('#night-mode').prop('checked', false);
  }
}