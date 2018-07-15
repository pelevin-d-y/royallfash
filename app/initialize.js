import $ from "jquery"
import fullpage from 'fullpage.js'
import axios from 'axios'
import validate from 'jquery-validation'
import 'jquery-validation/dist/additional-methods'
import './list.js'
import customFileInput from './scripts/customFileInput'

// fullpage
$(document).ready(function() {
  $('#fullpage').fullpage({
    anchors:['page-1','page-2', 'page-3', 'page-4', 'page-5'],
    menu: '#menu',
    navigation: true
  });
});

if (document.querySelector('.location__map-map')) {
  document.querySelector('.location__map-map').addEventListener('touchstart' ,function() {
    $.fn.fullpage.setAllowScrolling(false)
  })

  document.querySelector('.location__map-map').addEventListener('touchend' ,function() {
    $.fn.fullpage.setAllowScrolling(true)
  })
}


let popupButtonClose = $('.popup-close')
let popupButtonLink = $('.btn-popup__link')

// validate
$("#form").validate({
  rules: {
    form__surname: {
      required: true
    },
    form__file: {
      extension: 'png|jpg|jpeg',
      required: true
    }
  },
  messages: {
    form__surname: {
      required: 'Введите ваше ФИО'
    },

    form__file: {
      required: 'Выберите файл',
      extension: 'расширение должно быть jpg или png'
    }
  },
  submitHandler: function(form) {
    let data = new FormData(form)
    const config = { headers: { 'Content-Type': 'multipart/form-data' } }

    $('.preloader').removeClass('hidden')
    axios.post('http://localhost:3000/register', data, config).then((res) => {
      $('.preloader').addClass('hidden')
      if (res.data === 'success') {
        $('.popup__text').text('Успешно!')
        $('.popup').addClass('open-popup')
      }
    }).catch((err) => {
      console.log(err)
    })
  }
});


popupButtonLink.click(function() {
  $('.popup').removeClass('open-popup');
})

popupButtonClose.click(function() {
  $('.popup').removeClass('open-popup');
})

$('.popup-overlay').click(function(evt) {
  if ($(evt.target).closest('.popup-container').length == 0) {
    $('.popup').removeClass('open-popup');
  }
});

// navigation
$("#navToggle").click(function(evt) {
  evt.stopPropagation()
  $(this).toggleClass("active")
  $(".main-nav-overlay").toggleClass("open")
  $("body").toggleClass("locked")
});

var links = $('.main-nav__link')

links.each(function(a, link) {
  link.addEventListener('click', () => {
    $(".main-nav-overlay").removeClass("open");
    $("body").removeClass("locked");
    $("#navToggle").removeClass("active");
  })
})

// file input
customFileInput()

// next code
$('.container').click(function(evt) {
  evt.stopPropagation();
})

$('.main-nav-overlay').click(function(evt) {
  evt.stopPropagation();
})

$('#fullpage').click(function(evt) {
  evt.stopPropagation();
})

$('.popup').click(function(evt) {
  evt.stopPropagation();
})

