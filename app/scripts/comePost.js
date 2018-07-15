export default () => {
  const popupBtnComeText = $('.registration-popup__btn-come span')
  if (popupBtnComeText.text() === 'Закрыть') {
    $('.registration-popup').removeClass('open-popup')
    $('.popup-overlay__registration').addClass('hidden')
    document.querySelector('#registration-form .registration__input ').value = ''
  } else {
    $('.registration-popup').removeClass('open-popup')
    $('.popup-overlay__registration').addClass('hidden')
    $('.registration-popup__success').addClass('open-popup')
    document.querySelector('#registration-form .registration__input ').value = ''
  }
}