export class GameSettings {
  constructor() {
    this.settings = {
      trainingWheels: false,
      trackMistakes: false,
      nightMode: true
    };

    this.toggleTrainingWheels();
    $('#training-wheels').on('change', () => this.toggleTrainingWheels());
  }

  toggleTrainingWheels() {
    if (!$('#training-wheels').is(':checked')) {
      $('.inner-toggle').addClass('disabled');
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

  #saveSetting(key, value) {
    this.settings[key] = value;
    localStorage.setItem('game-settings', this.settings);
  }
}