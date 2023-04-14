//
//	MODULE: DATABASE
//


function Database() {


	//  CREATE ELEMENTS ARRAY
    var $el = {};
    
    var tl = new TimelineMax();


	var Init = function() {

        Bug('Database Module Initiated.');

        CacheEl();


    }


	 //  CACHE ELEMENTS
    var CacheEl = function() {
        $el.body = $('body');
        $el.databaseProcessingOverlay = $("#database-processing-overlay");
        $el.databaseProcessingLoader = $("#database-processing-overlay .loading-overlay");
    }



	//  CACHE ELEMENTS
    var CheckData = function(data) {
        var IS_JSON = true;

        try {
            data = jQuery.parseJSON( data );
        } catch(err) {
            IS_JSON = false;
            system.popup.PopupError("Database Error");
            

            Bug(data);
            BugPopup();
        };

        return IS_JSON;

    };


    var ShowProcessingOverlay = function() {
        tl.clear();
        tl.set([$el.databaseProcessingOverlay, $el.databaseProcessingLoader], {display: 'flex'});
        tl.to([$el.databaseProcessingOverlay, $el.databaseProcessingLoader], 0.75, {opacity: 1});

    }

    var HideProcessingOverlay = function() {
        tl.clear();
        tl.to([$el.databaseProcessingOverlay, $el.databaseProcessingLoader], 0.75, {opacity: 0, onComplete: function(){
            tl.set([$el.databaseProcessingOverlay, $el.databaseProcessingLoader], {display: 'none'});
        }});
    }



    Init();




    //  EXTERNAL FUNCTIONS
    return {



        CheckData: function(data) {
            return CheckData(data);
        },

        ShowProcessingOverlay: function() {
            ShowProcessingOverlay();
        },

        HideProcessingOverlay: function() {
            HideProcessingOverlay();
        }

    }

};