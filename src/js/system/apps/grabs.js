//
//	MODULE: GRABS
//


function Grabs() {


    var post_data = {};
    post_data['table_id'] = 'logs';
    post_data['unique_id_name'] = 'grab_unique_id';
    

	//  CREATE ELEMENTS ARRAY
    var $el = {};
    
    var tl = new TimelineMax();


	var Init = function() {

        Bug('Grabs Module Initiated.');

		CacheEl();

    }


	 //  CACHE ELEMENTS
    var CacheEl = function() {

        $el.body = $('body');
        
        $el.grabs = {};

        $el.grabs.parent = $('#grabs');


        $el.grabs.display = {};

        $el.grabs.display.image =  $el.grabs.parent.find('.stack-display .display-img');

        $el.grabs.display.imageWrap = $el.grabs.parent.find('.stack-display .display-img-wrap');

        $el.grabs.display.boundingBoxTemplate = $('#grabs .stack-display .bounding-box.template');

    };




    var updateGrabActive = false;

    var CheckForGrabs = function() {
        if (updateGrabActive) {
            return;
        };

        $.post(
            "database/check_grabs.php", 
            post_data, 

            function( data ) {

                data = jQuery.parseJSON( data );

                if (data.length > 0) {
                    console.log('Found NULL grab = ' + data[0]['grab_unique_id']);
                    updateGrabActive = true;

                    system.popup.Popup("You have an unassigned grab.<br>Please assign the grab a location.");


                    new_get_data = {};
                    new_get_data['grabs'] = data[0]['grab_unique_id'];
                    new_get_data['open_chain'] = false;

                    system.router.UpdateDataURL({
                        redirect: true,
                        clear_data : true,
                        get_data : new_get_data,  
                    });
                };
                
        });
    }




    var GetLogsFromGrab = function(grab_unique_id, grab_image) {

        tl.clear();

        //  REMOVE OLD BOUNDING BOXES
        $el.grabs.parent.find('.stack-display .bounding-box').not('.template').remove();
        
        post_data[post_data['unique_id_name']] = grab_unique_id;

        $.post(


            "database/get_data.php", 
            post_data, 

            function( data ) {

                data = jQuery.parseJSON( data );

                $.each(data, function (index, value){
                    ShowLogOnGrab( value, grab_image );
                });

                
        });

    };



    var ShowLogOnGrab = function(log_data, grab_image) {
        
        

        //console.log(log_data);

        //console.log($el.logLinePopupMeta.grabImg.width() + 'x' + $el.logLinePopupMeta.grabImg.height() );

        var percentageImageSize = grab_image.width / $el.grabs.display.image.width();


        //console.log(percentageImageSize);

        //console.log( grab_image.height + " = " + percentageImageSize * $el.grabs.display.image.height() );
        

        var positionX = (log_data["grab_position_x"] / percentageImageSize);
        var positionY = (log_data["grab_position_y"] / percentageImageSize);



        //console.log("Actual Position: " + log_data["logs"][id]["X"] + "x" + log_data["logs"][id]["Y"]);
        //console.log("Relative Position: " + positionX + "x" + positionY);

        var widthBB = log_data["grab_width"] / percentageImageSize;
        var heightBB = log_data["grab_width"] / percentageImageSize;

        //console.log($el.grabs.display.data.boundingBoxTemplate);

        $new_log_bounding_box = $el.grabs.display.boundingBoxTemplate.clone().appendTo( $el.grabs.display.imageWrap );

        $new_log_bounding_box.css({
            top: (positionY - (widthBB/2)),
            left: (positionX - (heightBB/2)),
            width: widthBB,
            height: heightBB
        });
        
        $new_log_bounding_box.data('log-id', log_data["log_unique_id"]);
        $new_log_bounding_box.data('grab-id', log_data["grab_unique_id"]);


        $new_log_bounding_box.removeClass('template');
        $new_log_info = $new_log_bounding_box.find(".log-info-popup");

        $new_log_info.find('.log_img_url').attr('src', log_data['log_img_url']);
        $new_log_info.find('.log_id').html(log_data["log_id"]);
        $new_log_info.find('.jas_diameter').html(log_data["jas_diameter"]);
        $new_log_info.find('.jas_cbm').html(log_data["jas_cbm"]);

        $new_log_info.css({
            left: ( -widthBB - $new_log_info.width() - 10 ),
            top: (heightBB/2) - 10
        });
        

        $new_log_bounding_box.click(ShowLog);

    }


    var ShowLog = function() {

        var log_id = $(this).data('log-id');
        var grab_id = $(this).data('grab-id');

        //console.log( "Loading Log: ", log_id );
        //console.log( "Loading Grab: ", grab_id );

        system.slides.grabSlide.ViewItemFromId(grab_id, log_id);

    };


    var ClearGrabData = function() {
        $el.grabs.parent.find('.stack-display .bounding-box').not('.template').remove();
    }

    //  INITIALIZE
    Init();



    //  EXTERNAL FUNCTIONS
    return {

        GetLogsFromGrab: function(grab_unique_id, grab_image) {
            GetLogsFromGrab(grab_unique_id, grab_image);
        },

        ClearGrabData: function() {
            ClearGrabData();
        },

        CheckForGrabs: function() {
            CheckForGrabs();
        }

    }
}