(function($) {

    $.fn.CheckAndAddRemoveClass = function( element_class ) {

        if ( !$(this).hasClass( element_class ) ) {
            $(this).addClass( element_class );
            return false;
        } else {
            $(this).removeClass( element_class );
            return true;
        };
/* 
        if (typeof callback == 'function') { // make sure the callback is a function
            callback.call(this); // brings the scope to the callback
        }; */



        
    }

}(jQuery));