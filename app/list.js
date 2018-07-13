import $ from "jquery"
import axios from 'axios'
import validate from 'jquery-validation'
import userCards from './userCard'
import autocomplete from 'jquery-autocomplete'

$("#registration-form").validate({
  rules: {
    name: {
      required: true
    }
  },
  messages: {
    name: {
      required: 'Введите ваше ФИО'
    }
  },
  submitHandler: function(form) {
    let data = new FormData(form)
    let fieldData = data.get('name')

    axios.post('http://localhost:3000/exist', {'name': fieldData}).then((res) => {
      if (res.data.exist === 'exist') {
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
    }).catch((err) => {
      console.log(err)
    })
  }
});

$("#registration-form__come").validate({
  rules: {
    card: {
      required: true
    },
  },
  messages: {
    card: {
      required: ''
    }
  },
  submitHandler: function(form) {
    let data = new FormData(form)
    let fieldData = data.get('card')

    axios.post('http://localhost:3000/come', {'name': fieldData}).then((res) => {
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
    }).catch((err) => {
      console.log(err)
    })
  }
})

let popupButtonClose = $('.popup-close')
let popupButtonLink = $('.btn-popup__link')

popupButtonLink.click(function() {
  $('.popup').removeClass('open-popup');
})

popupButtonClose.click(function() {
  $('.popup').removeClass('open-popup');
})

$('.registration-popup').click(function(evt) {
  const registrationPopup = document.querySelector('.registration-popup')
  if (evt.target === registrationPopup) {
    $('.popup').removeClass('open-popup');
    $('.popup-overlay__registration').addClass('hidden')
  }
})

$('.registration-popup .popup-close').click(function() {
  $('.popup').removeClass('open-popup');
  $('.popup-overlay__registration').addClass('hidden')
})

$('.popup-overlay').click(function(evt) {
  if ($(evt.target).closest('.popup-container').length == 0) {
    $('.popup').removeClass('open-popup');
  }
});


// autocomplete


const autocompleteInput = $('#registration-form .registration__input')


axios.get('http://localhost:3000/fullnames').then((res) => {
  let autocompleteArray = []

  res.data.forEach(element => {
    autocompleteArray.push(element.name)
  });

  let filtredAutocompliteArray = [];
  autocompleteArray.forEach(element => {

    autocompleteArray.forEach((someElement) => {
      if (element === someElement) {
        filtredAutocompliteArray.push(element)
      }
    })
  })
  console.log(filtredAutocompliteArray)
})

// let FullNameArray = dataList.map((element) => {
//   return element['ФИО'];
// })
