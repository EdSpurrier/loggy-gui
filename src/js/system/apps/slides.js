//
//	SLIDES
//


function Slides() {
    return {

        GetId : function(slide_id) {
            return "Not A Slide";
        },

        GetSlide : function(search_slide_id) {
            var slide = null;

            $.each(system.slides, function(index, this_slide) {

                if ( search_slide_id == this_slide.GetId() ) {
                    slide = this_slide;
                };
            });
            
            return slide;
        },

        GetCurrentSlide : function() {
            var slide = $(".file-slide.active").not('.parent');
            //console.log(slide);
            return slide;
        },

        GetCurrentSlideId : function() {
            var slide_id = system.slides.core.GetCurrentSlide().data('file-id');
            //console.log(slide);
            return slide_id;
        },


        NextSlide : function() {
            //$('input:focus').blur();
            system.slides.core.GetCurrentSlide().find('.stack-item-button.selected  .view-button').trigger('click');
        },

        PrevSlide : function() {
            $('input:focus').blur();
            system.fileCabinet.ChangeSlide( null, -1, system.slides.core.GetCurrentSlide() );
        },

        NextItem : function() {
            //console.log("Next Item");
            if ( system.search.IsActive() ) {
                return;
            };

            $all_buttons = system.slides.core.GetCurrentSlide().find('.stack-item-button');

            if ( $all_buttons.length == 0 ) {
                return;
            };

            $('input:focus').blur();

            $active_button = null;
            $all_buttons.each(function(){

                
                if ( $(this).hasClass('selected') ) {
                    //console.log($(this).hasClass('selected'), $(this));
                    $active_button = $(this).next();
                };
                
            });

            //console.log($active_button );
            $active_button.children('.stack-item-button-selector').trigger('click');
            //system.slides.core.GetCurrentSlide().find('.selected');
        },

        PrevItem : function() {
            //console.log("Prev Item");
            if ( system.search.IsActive()) {
                return;
            };

            //console.log("Prev Item");
            $all_buttons = system.slides.core.GetCurrentSlide().find('.stack-item-button');

            if ( $all_buttons.length == 0 ) {
                return;
            };

            $('input:focus').blur();

            $active_button = null;
            $all_buttons.each(function(){

                
                if ( $(this).hasClass('selected') ) {
                    $active_button = $(this).prev();
                };
                
            });

            //console.log( $active_button );
            $active_button.children('.stack-item-button-selector').trigger('click');
        }
    }
};

