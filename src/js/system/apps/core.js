//
//	SYSTEM CORE
//



function Core() {
	//  CREATE ELEMENTS ARRAY
	var $el = {};

    var loaded = false;

    var settings = {};

    var errors_to_ignore = [
        'ResizeObserver loop limit exceeded'
    ];

	var Init = function() {
        Bug('System Core Initiated.');

        CacheEl();

        

        window.console.logAll = function (msg, data) {
            console.log(msg, data);
            var output_string = 'Console Output: ' + JSON.stringify(msg) + ' Script: ' + JSON.stringify(data);
            Bug(output_string);
        }
        
        window.onerror = function (errorMsg, url, lineNumber) {
            var error_string = 'Error: ' + errorMsg + ' Script: ' + url + ' Line: ' + lineNumber;

            if ( SearchIgnoreError (errorMsg) ) {
                return;
            };
            
            system.popup.PopupError(error_string);
            Bug(error_string);
            BugPopup(); 
        }


        


        if ( !userManager.IsLoggedIn() ) {
            CheckSettings();
            return;
        };


        PostLoad();
        CheckSettings();
        
    }

    var CheckSettings = function() {
        $.post(
            "database/check_settings.php",
            {}, 
            function( data ) {

                data = jQuery.parseJSON( data );


                $.each(data, function (index, value){
                    settings[value.setting] = value.value;
                });


                loaded = true;

            });
    }
    


    var SearchIgnoreError = function(errorMsg) {
        var error_found = false;
        $.each(errors_to_ignore, function (index, value){
            if ( errorMsg == value) {
                console.log("Checking Error " + value + " >>> " + errorMsg);
                error_found = true;
            };
        });
        return error_found;
    }



    //  CACHE ELEMENTS
    var CacheEl = function() {
        $el.body = $('body');
    };

    var PostLoad = function() {

        var systemLoaded = setInterval(function() {
            if ( system.loaded ) {
                Bug("Post System Loaded");

                system.router.PostLoad();

                clearInterval(systemLoaded);
            };
        });
    }


    var GetCurrentTime = function() {
        var d = new Date();
        return d.getTime();
    }


    //  INITIALIZE
    Init();

    //  EXTERNAL FUNCTIONS
    return {

        Loaded: function() {
            return loaded;
        },

        GetCurrentTime: function() {
            return GetCurrentTime();
        },

        GetSettings: function() {
            return settings;
        }

    }
}



