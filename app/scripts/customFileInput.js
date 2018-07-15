import $ from "jquery"

export default () => {
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
}