(function($) {

    $.fn.safeAddClass = function( element_class ) {

        if ( !$(this).hasClass( element_class ) ) {
            $(this).addClass( element_class );
        };
        
    }

}(jQuery));