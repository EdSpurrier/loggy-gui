(function($) {

    $.fn.example = function( options, callback ) {

        // Establish our default settings
        var settings = $.extend({
            text         : 'Hello, World!',
            color        : null,
            fontStyle    : null
        }, options);

        if (typeof callback == 'function') { // make sure the callback is a function
            callback.call(this); // brings the scope to the callback
        };

        return this.each( function() {
            // We'll get back to this in a moment
            $(this).text( settings.text );
        });

        
    }

}(jQuery));