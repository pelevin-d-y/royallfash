import userCards from './userCard'

export default (res) => {
  $(".registration-item__content").remove()
  userCards(res.data.currentUserModel)
  const currentUsersCome = $('#registration-form__come .registration-item__content-success ').length
  const popupBtnComeText = $('.registration-popup__btn-come span')
  if (!currentUsersCome) {
    popupBtnComeText.text('Закрыть')
  } else {
    popupBtnComeText.text('Пришел')
  }

  $('.registration-popup').addClass('open-popup');
  $('.popup-overlay__registration').removeClass('hidden')
}