import $ from "jquery"
import axios from 'axios'
import validate from 'jquery-validation'
import autocomplete from 'jquery-autocomplete'
import unique from './helpers/unique'
import ExistPost from './scripts/existPost'
import comePost from './scripts/comePost'

// autocomplete
const autocompleteInput = jQuery('#registration-form .registration__input')
const config = { headers: {
  'Access-Control-Allow-Origin': '*'
 }}
axios.get('https://pridebeeline.party/fullnames', config).then((res) => {
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
    $('.preloader').removeClass('hidden')

    axios.post('https://pridebeeline.party/exist', {'name': fieldData}, config).then((res) => {
      $('.preloader').addClass('hidden')
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
    $('.preloader').removeClass('hidden')

    axios.post('https://pridebeeline.party/come', {'name': fieldData}, config).then((res) => {
      $('.preloader').addClass('hidden')
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


// data.js

$('.list-btn').click(() => {
  axios.get('http://pridebeeline.party/data', config).then((res) => {
    console.log(res.data)
  })
})