const toggleTrainingWheels = () => {
  if (!$('#training-wheels').is(':checked')) {
    $('.inner-toggle').addClass('disabled');
    $('#track-mistakes').prop('checked', false);
  }
  else
    $('.inner-toggle').removeClass('disabled');
};

toggleTrainingWheels();

$('#training-wheels').on('change', toggleTrainingWheels);