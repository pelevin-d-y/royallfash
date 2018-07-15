import $ from "jquery"
import axios from 'axios'
import validate from 'jquery-validation'
import autocomplete from 'jquery-autocomplete'
import unique from './helpers/unique'
import ExistPost from './helpers/existPost'
import comePost from './helpers/comePost'

// autocomplete

const autocompleteInput = jQuery('#registration-form .registration__input')

axios.get('http://localhost:3000/fullnames').then((res) => {
  let autocompleteArray = []
  res.data.forEach(element => {
    autocompleteArray.push(element.name)
  });
  const uniqueAutocompleteArray = unique(autocompleteArray)

  autocompleteInput.autocomplete({
    source: [uniqueAutocompleteArray],
    limit: 20,
    visibleLimit: 6,
    showHint: false
  }, 4000);
})


// validation

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
        ExistPost(res)
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
      comePost()
    }).catch((err) => {
      console.log(err)
    })
  }
})


// popups
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