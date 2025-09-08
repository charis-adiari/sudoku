export class GameSettings {
  constructor(trainingWheels, trackMistakes, nightMode) {
    this.settings = {
      trainingWheels: trainingWheels,
      trackMistakes: trackMistakes,
      nightMode: nightMode
    };

    // TODO: use this.settings to set initial values of checkbox, leave for now; start on actual game

    this.toggleTrainingWheels();

    $('#training-wheels').on('change', () => this.toggleTrainingWheels());
    $('#track-mistakes').on('change', () => this.toggleTrackMistakes());
    $('#night-mode').on('change', () => this.toggleNightMode());
  }

  toggleTrainingWheels() {
    if (!$('#training-wheels').is(':checked')) {
      $('#inner-toggle').addClass('disabled');
      $('#track-mistakes').prop('checked', false);
      $('#track-mistakes').attr('disabled', true);
      
      this.#saveSetting('trainingWheels', false);
      this.#saveSetting('trackMistakes', false);
    }
    else {
      $('.inner-toggle').removeClass('disabled');
      $('#track-mistakes').attr('disabled', false);
      this.#saveSetting('trainingWheels', true);
    }
  };

  toggleTrackMistakes() {
    if ($('#track-mistakes').is(':checked'))
      this.#saveSetting('trackMistakes', true);
    else
      this.#saveSetting('trackMistakes', false);
  };

  toggleNightMode() {
    if ($('#night-mode').is(':checked'))
      this.#saveSetting('nightMode', true);
    else
      this.#saveSetting('nightMode', false);
  };

  #saveSetting(key, value) {
    this.settings[key] = value;
    localStorage.setItem('game-settings', JSON.stringify(this.settings));
  }
}