import $ from "jquery"
import fullpage from 'fullpage.js'
import fancybox from '@fancyapps/fancybox'

jQuery('.location__map-link').fancybox({
  afterLoad: function() {
    $.fn.fullpage.setAllowScrolling(false);
  },

  afterClose: function() {
    $.fn.fullpage.setAllowScrolling(true);
  }
})

// fullpage

$(document).ready(function() {
  $('#fullpage').fullpage({
    anchors:['page-1','page-2', 'page-3', 'page-4', 'page-5'],
    menu: '#menu',
    navigation: true
  });
});

// autocomplete and popup

var formButton = $('.btn-come');
var popupButtonClose = $('.popup-close');
var popupButtonLink = $('.btn-popup__link')

formButton.click(function(evt) {
  evt.preventDefault();
  $('.popup').addClass('open-popup');
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
  evt.stopPropagation();
  $(this).toggleClass("active");
  $(".main-nav-overlay").toggleClass("open");
  $("body").toggleClass("locked");
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

$('.filter').click(function(evt) {
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
			inp = wrapper.find( "input" ),
			btn = wrapper.find( ".button" ),
			lbl = wrapper.find( "mark" );

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
					btn.text( "Выбрать" );
			}else
					btn.text( file_name );
	}).change();

});
$( window ).resize(function(){
	$( ".file_upload input" ).triggerHandler( "change" );
});
