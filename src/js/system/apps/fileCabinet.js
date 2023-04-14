//
//	FILE CABINET
//

function FileCabinet() {
	//  CREATE ELEMENTS ARRAY
	var $el = {};

    var loaded = false;


	var Init = function() {
        Bug('File Cabinet Initiated.');

        CacheEl();

        loaded = true;

        $el.fileSlideButton.click(ShowSlide);
    }



    //  CACHE ELEMENTS
    var CacheEl = function() {
        $el.body = $('body');

        $el.fileSlideButton = $('.file-slide-button');

        $el.fileSlide = $('.file-slide');

    };

    var ChangeSlide = function(event, direction, $this) {
        $('input:focus').blur();
        
        var slide_id = $this.data('file-id');

        this_slide = system.slides.core.GetSlide(slide_id);

        if ( !this_slide.CheckIfItemSelected() && direction > 0 ) {
            return;
        };


        var slide = $this.data('file-index');
        
        var next_slide = (slide + direction);

        var nextSlideId = $('[data-file-index="' + next_slide +'"]').attr('data-file-id');

        if (nextSlideId != null) {
            ShowSlide(null, nextSlideId);

            
        };

    }

    var ShowSlide = function(event, slide_id) {


        if (slide_id == null) {
            slide_id = $(this).data('file-id');
        };

        //console.log("Activating = " + slide_id);

        $slide_el = $('.file-slide[data-file-id="' + slide_id +'"]');

        slide_index = $slide_el.data('file-index');

        $slide_el.addClass("active");

        file_depth = slide_index;

        $el.fileSlide.each(function(){
            $this_slide_el = $(this);

            this_slide_id = $(this).data('file-id');
            this_slide_index = $(this).data('file-index');

            //console.log($this_slide_el, this_slide_id, this_slide_index);
                
            //console.log("Checking = " + slide_index + " - " + this_slide_index);

            if (slide_index > this_slide_index) {
                //console.log("Iterating File Slide Index = " + slide_index + " > " + this_slide_index);
                $this_slide_el.addClass("parent");
                if ( !$this_slide_el.hasClass("active")) {
                    $this_slide_el.addClass("active");
                };

                $(this).attr('data-file-depth', -slide_index + (this_slide_index + 1) );
                file_depth++;

            } else if (slide_index < this_slide_index) {
                //console.log("Iterating File Slide Index = " + slide_index + " < " + this_slide_index);
                $this_slide_el.removeClass("active");
                $this_slide_el.removeClass("parent");
                
                $(this).attr('data-file-depth', 0);
                
            } else {
                $this_slide_el.removeClass("parent");
                if (!$this_slide_el.hasClass("active")) {
                    $this_slide_el.addClass("active");
                };
                $(this).attr('data-file-depth', 0);
            };

        });



    }

    //  INITIALIZE
    Init();

    //  EXTERNAL FUNCTIONS
    return {


        ChangeSlide: function(event, slide_id, $this) {
            ChangeSlide(event, slide_id, $this);
        },

        ShowSlide: function(slide_id) {
            ShowSlide(null, slide_id);
        },

        Loaded: function() {
            return loaded;
        },



    }
}



