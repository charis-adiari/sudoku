//TODO: Dropdown should also hide when user clicks anywhere else on page 
// (i.e. btn not active anymore)
export const toggleDropdown = () => {
  if ($('.dropdown').hasClass('show'))
    $('.dropdown').removeClass('show');
  else
    $('.dropdown').addClass('show');
};

export const changeButtonBackgroundColour = (e) => {
  const button = e.target.closest('button');

  if (button.id === 'notes') return;

  button.classList.add('clicked');
  
  setTimeout(() => {
    button.classList.remove('clicked');
  }, 400);
}