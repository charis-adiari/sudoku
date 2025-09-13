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