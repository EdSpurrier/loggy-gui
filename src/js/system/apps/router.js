//
//	ROUTER
//


  

function Router() {
	//  CREATE ELEMENTS ARRAY
	var $el = {};

    var loaded = false;


	var Init = function() {
        Bug('Router Initiated.');

        CacheEl();

        loaded = true;

        $(window).on("hashchange", HashChange);
        SetCurrentHash(window.location.href);       
    }


    //  CACHE ELEMENTS
    var CacheEl = function() {
        $el.body = $('body');
    };


    var currentHash = null;

    var SetCurrentHash = function($new_url) {

        if ($new_url.split("#")[1]) {
            currentHash = $new_url.split("#")[1];
        } else {
            currentHash = null;
        };
        
    }

    var HashChange = function() {

        PostLoad();
        SetCurrentHash(window.location.href);

    };



    var urlPostData = {};
    
    var PostLoad = function() {
        //console.log("GET Data:", ReadURL() );
        
        
        var GetData = ReadURL();

        //console.log(GetData);

        if ( !jQuery.isEmptyObject(GetData) ) {

            search_data = {};
            search_data.open_chain = true;

            $.each(GetData, function(slide_id, unique_id) {
                if (slide_id == 'open_chain') {
                    search_data.open_chain = unique_id;
                } else {
                    search_data.slide_id = slide_id;
                    search_data.unique_id = unique_id; 
                }; 
            });


           //console.log("search_data", search_data);
    
            if (search_data.open_chain != true || !search_data.open_chain) {
                if ( !$el.body.hasClass('no-chain') ) {
                    $el.body.addClass('no-chain');
                };
            };

            slide = system.slides.core.GetSlide(search_data.slide_id);

            slide.ViewItemFromURL(search_data.unique_id, search_data.open_chain);
            

        } else {
            if (system.page == 'home') {
                system.fileCabinet.ShowSlide("orders"); 
                system.slides.orderSlide.GetData("*");
            } else if (system.page == 'inventory') {
                
                system.fileCabinet.ShowSlide("inventory"); 
                system.slides.inventorySlide.GetData("*");
            }
            
        };


    };



    
    var Get_GET = function( options ) {

        var settings = $.extend({
            no_history : false,
            clear_data : false,
        }, options );

        var unique_id = urlPostData[settings.unique_id_search];

        return unique_id;
    }


    
    var ReadURL = function() {

        var $_GET = {};
        
        var getGET = window.location;
        if (window.location.href.split("#")[1]) {
            getGET = window.location.href.split("#")[1];
            var getParts = getGET.split('&');

            //console.log(getParts);

            $.each(getParts, function(index, value) {

                $_GET[ value.split("=")[0] ] = value.split("=")[1];
            });
        };

        

       // console.log(getGetParts);

        return $_GET;

    }




    var ReturnURL = function() {
        var getURL = window.location.href.split("#")[0];
        return getURL;
    }


    var ReturnHashData = function() {
        var getHash = window.location.href.split("#")[0];
        return currentHash;
    }

    

    var UpdateDataURL = function( options ) {
        
        

        var settings = $.extend({
            no_history  : false,
            clear_data  : false,
            redirect    : false,
        }, options );

        //console.log("Updating URL:", settings.get_data);

        //console.log("Settings:", settings);


        var url_data = "";

        if (settings.clear_data) {
            urlPostData = {};
        };
        
        $.each(settings.get_data, function(id, data) {

            //console.log("ADDING GET DATA:", id + "=" + data);

            urlPostData[id] = data;
            
        });



        $.each(urlPostData, function(id, data) {

            //console.log("CREATING URL GET DATA:", id + "=" + data);

            if ( url_data.length > 0 ) {
                url_data += "&";
            };

            url_data += id + "=" + data;
            
        });

        var current_url = ReturnURL();

        var url = current_url + "#" + url_data;


        //console.log( "url_data", url_data );
        //console.log( "currentHash", currentHash );

        if (url_data != currentHash) {
            if (settings.redirect) {
                window.location.href = url;
            } else {
                //console.log("Updating State", url);
                history.pushState(null, null, url);
                SetCurrentHash(url);
            };
        };
        
        
    }


    var ClearURL = function() {
        window.location.href = ReturnURL();
    }

    //  INITIALIZE
    Init();

    //  EXTERNAL FUNCTIONS
    return {

        UpdateDataURL: function(options) {
            UpdateDataURL(options);
        },

        Get_GET: function(options) {
            return Get_GET(options);
        },

        PostLoad: function() {
            PostLoad();
        },

        Loaded: function() {
            return loaded;
        },

        ClearURL: function() {
            ClearURL( );
        },
        
        ReturnHashData: function() {
            return ReturnHashData();
        }


    }
}



