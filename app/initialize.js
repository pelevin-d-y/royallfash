import $ from "jquery"
import fullpage from 'fullpage.js'
import axios from 'axios'
import validate from 'jquery-validation'
import 'jquery-validation/dist/additional-methods'
import './list.js'

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

// popup
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

      axios.post('http://localhost:3000/register', data, config).then((res) => {
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


// file
$(function(){
	var wrapper = $( ".file_upload" ),
			btn = wrapper.find( ".button" ),
      lbl = wrapper.find( "mark" );
  var inp = $( "#form__file" );

	// Crutches for the :focus style:
	inp.focus(function(){
			wrapper.addClass( "focus" );
	}).blur(function(){
			wrapper.removeClass( "focus" );
	});

	var file_api = ( window.File && window.FileReader && window.FileList && window.Blob ) ? true : false;

	inp.change(function(){
			var file_name;
			if( file_api && inp[ 0 ].files[ 0 ] )
					file_name = inp[ 0 ].files[ 0 ].name;
			else
					file_name = inp.val().replace( "C:\\fakepath\\", '' );

			if( ! file_name.length )
					return;

			if( lbl.is( ":visible" ) ){
					lbl.text( file_name );
					btn.text( "Прикрепить фото" );
			}else
					btn.text( file_name );
	}).change();

});
$( window ).resize(function(){
	$( ".file_upload input" ).triggerHandler( "change" );
});