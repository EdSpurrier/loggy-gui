//
//	SEARCH
//


  

function Search() {
	//  CREATE ELEMENTS ARRAY
	var $el = {};

    var loaded = false;


	var Init = function() {
        Bug('Search Initiated.');

        CacheEl();

        loaded = true;

        if ($el.searchInput.length <= 0) {
            return;
        };

        //$el.searchInput.keydown(KeyUpSearchInput);
        $el.searchButton.click(SearchInput);

        $el.body.keyup(AppendSearchInput);

        $(document).bind('keydown', function(e) {
            
            var code = e.keyCode || e.which;

            if(e.ctrlKey && (e.which == 83)) {
                e.preventDefault();
                OpenSearchPanel("toggle");
                return false;
            };

            if (!($("input").is(":focus"))) {

                if (code == 8) {
                    $el.searchInput[0].focus();
                };

            };
        });

        $el.body.click(function(e){

            var $this = event.target;
            result = $.contains( document.getElementById("search-panel"), $this );

            if ( !result ) {
                if ($this.id == 'search-panel') {
                    result = true; 
                };
            };
            
            if (!result) {
                OpenSearchPanel(false);
            };


        });


        $el.searchPanel.on('slide', function(event, direction, element){
            
            if (direction < 0) {
                OpenSearchPanel(false);
            };
            
        });
    }


    //  CACHE ELEMENTS
    var CacheEl = function() {
        $el.body = $('body');
        $el.searchButton = $('#search-button');
        $el.searchInput = $('#search-input');
        $el.searchPanel = $('#search-panel');
        $el.results = $('#results');

        $el.resultTemplate = $('#results .template');
        $el.resultCount = $("#result-count");
        $el.resultKeyword = $("#result-keyword");
        $el.noResult = $(".no-result");
        
    };

    var OpenSearchPanel = function(state) {
        if (state == "toggle") {
            if ( !$el.searchPanel.hasClass('active') ) {
                $el.searchPanel.addClass('active');
            } else {
                $el.searchPanel.removeClass('active');
            }; 
        } else if (state) {
            if ( !$el.searchPanel.hasClass('active') ) {
                $el.searchPanel.addClass('active');
            };
        } else {
            $el.searchPanel.removeClass('active');
        };
    };



    var AppendSearchInput = function(e) {

        var code = e.keyCode || e.which;

        //console.log(code);
        if (!($("input").is(":focus"))) {

            
            //console.log("Key Input = ", e.key);
            //console.log(e.key.length);

            if (!e.ctrlKey) {
                if (e.key.length == 1) {
                    $el.searchInput[0].value += e.key;

                    KeyUpSearchInput();
                } else if (code == 8) {
                    KeyUpSearchInput();
                    $el.searchInput[0].blur();

                };
            };
            
            
        } else if ( $el.searchInput.is(":focus") ) {
            //  IF NOT ESCAPE THEN SEARCH
            if (!e.ctrlKey) {
                if (e.key.length == 1) {
                    if (e.which != 27 || e.which == 13) {
                        KeyUpSearchInput();
                    };
                } else if (code == 8) {
                    KeyUpSearchInput();
                    $el.searchInput.blur();
                };
            };
            
            
        };


    }

    var KeyUpSearchInput = function() {
        if ($el.searchInput[0].value.length >= 2 || IsActive() && $el.searchInput[0].value.length > 0 ) {
            SearchInput();
        } else {
            ClearSearchResults();
        };
        
    }


    var post_data = {
        search_keyword : "null"
    };

    var SearchInput = function() {

        if ($el.searchInput[0].value.length < 1) {
            return;
        };

        if ( post_data['search_keyword'] == $el.searchInput[0].value && $el.searchPanel.hasClass('active') ) {
            //console.log("Already Searched:", $el.searchInput[0].value);
            return;
        };


        

        post_data['search_keyword'] =  $el.searchInput[0].value;

        $.post(
            "database/search_keyword.php", 
            post_data, 
            function( data ) {

                if ( system.db.CheckData(data) ) {

                    //console.log("Pre parseJSON Data:", data);

                    data = jQuery.parseJSON( data );

                    //console.log("Search Data:", post_data, "Opening Data:", data);
                    
                    
                    ClearSearchResults();

                    OpenSearchPanel(true);

                    AddSearchResult(data);

                   

                    $el.resultCount.html("Results Found: " + data.length);
                    $el.resultKeyword.html("Search keyword: " + post_data['search_keyword']);

                    if (data.length > 0){
                        if(!$el.noResult.hasClass('hide')) {
                            $el.noResult.addClass('hide');
                        };
                    };
                    
                    PostLoad();
                };
                
        });
    }


    var ClearSearchResults = function() {
        $el.searchPanel.find('.result').not('.template, .no-result').remove();
        $el.noResult.removeClass('hide');
        $el.resultCount.html("Results Found: " + 0);
        $el.resultKeyword.html("Search keyword: " + $el.searchInput[0].value);
    }


    var AddSearchResult = function(data) {
        
        var current_result_id = 1;

        $.each(data, function(index, value) {

            $new_line = $el.resultTemplate.clone().appendTo( $el.results );
            $new_line.removeClass('template');
            $new_line.find('.result_id').html(current_result_id);
            

            
            
            if (value['type'] == 'orders') {

                $data = $new_line.find('.data');
                $data.attr('data-id', value['order_unique_id']);
                $data.attr('data-type', value['type']);

                $new_line.find('.type').html("ORDER");
                $new_line.find('.result_unique_id').html("ORDER NUMBER");
                $new_line.find('.keyword_found').html(value['order_number']);

            } else if (value['type'] == 'logs') {

                $data = $new_line.find('.data');
                $data.attr('data-id', value['log_unique_id']);
                $data.attr('data-type', value['type']);

                $new_line.find('.type').html("LOG");
                $new_line.find('.result_unique_id').html("LOG ID");
                $new_line.find('.keyword_found').html(value['log_id']);

            } else if (value['type'] == 'containers') {

                $data = $new_line.find('.data');
                $data.attr('data-id', value['container_unique_id']);
                $data.attr('data-type', value['type']);

                $new_line.find('.type').html("CONTAINER");
                $new_line.find('.result_unique_id').html("CONTAINER ID");
                $new_line.find('.keyword_found').html(value['container_id']);

            };
            


            current_result_id++;        
        });


    };


    var PostLoad = function() {
        $result_buttons = $el.results.find('.result').not('.no-result');
        $result_buttons.unbind('click');
        $result_buttons.click(OpenSearchResult);
        $result_buttons.not('.template, .no-result').first().addClass('selected');
        //console.log($result_buttons.first());
    }

    var OpenSearchResult = function() {
        
        type = $(this).find('.data').data('type');
        unique_id = $(this).find('.data').data('id');
        //console.log(type, unique_id);

        new_get_data = {};
        new_get_data[type] = unique_id;

        system.router.UpdateDataURL({
            clear_data  : true,
            get_data    : new_get_data,
            redirect    : true
        });

        OpenSearchPanel(false);
    };

    var IsActive = function() {
        return $el.searchPanel.hasClass('active'); 
    }


    var GetSelected = function() {
        return $el.results.find('.result.selected');
    }

    //  INITIALIZE
    Init();

    //  EXTERNAL FUNCTIONS
    return {
        CloseSearchPanel : function() {
            OpenSearchPanel(false);
        },

        SelectItem : function() {
            if ( !system.search.IsActive() ) {
                return;
            };

            GetSelected().trigger('click');
        },

        NextItem : function() {
            //console.log("Next Item");
            if ( !system.search.IsActive() ) {
                return;
            };
            //console.log('Changing');

            $all_buttons = $el.results.find('.result').not('.template, .no-result');
            $active_button = null;
            $all_buttons.each(function(){

                
                if ( $(this).hasClass('selected') ) {
                    //console.log($(this).hasClass('selected'), $(this));
                    
                    $active_button = $(this).next();
                    if ( $active_button.length > 0 && !$active_button.hasClass('template') && !$active_button.hasClass('no-result') ) {
                        $(this).removeClass('selected');
                        if (!$active_button.hasClass('selected')) {
                            $active_button.addClass('selected');
                        };
                    };
                };
                
            });

            //console.log($active_button );
            
                

        },

        PrevItem : function() {
            //console.log("Next Item");
            if ( !system.search.IsActive() ) {
                return;
            };
            //console.log('Changing');

            $all_buttons = $el.results.find('.result');
            $active_button = null;
            $all_buttons.each(function(){

                
                if ( $(this).hasClass('selected') ) {
                   // console.log($(this).hasClass('selected'), $(this));
                    
                    $active_button = $(this).prev();
                    if ( $active_button.length > 0 && !$active_button.hasClass('template') && !$active_button.hasClass('no-result') ) {
                        $(this).removeClass('selected');
                        if (!$active_button.hasClass('selected')) {
                            $active_button.addClass('selected');
                        };
                    };
                };
                
            });

            //console.log($active_button );
            
                

        },

        IsActive: function() {
            return IsActive();
        },

        Loaded: function() {
            return loaded;
        }

    }
}



