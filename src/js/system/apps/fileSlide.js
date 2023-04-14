//
//	MODULE: FILE SLIDE
//
fileSlides = {
    inventorySlide: {
        get_line_php    : "database/get_data.php",
        this_unique_id  : 'inventory_unique_id',
        table_unique_id : 'inventory_unique_id',
        this_slide_id   : 'inventory',
        table_id        : 'inventory',
        parent_slide_id : 'none',
        child_slide_id  : 'inbound',
        event_types     : []
    },
    inboundSlide: {
        get_line_php    : "database/get_data.php",
        this_unique_id  : 'inbound_unique_id',
        table_unique_id : 'inventory_unique_id',
        this_slide_id   : 'inbound',
        table_id        : 'inbound',
        parent_slide_id : 'inventory',
        child_slide_id  : 'none',
        event_types     : []
    },
    
    
    orderSlide: {
        get_line_php    : "database/get_data.php",
        this_unique_id  : 'order_unique_id',
        table_unique_id : 'order_unique_id',
        this_slide_id   : 'orders',
        table_id        : 'orders',
        parent_slide_id : 'none',
        child_slide_id  : 'containers',
        event_types     : []
    },
    containerSlide: {
        get_line_php    : "database/get_data.php",
        this_unique_id  : 'container_unique_id',
        table_unique_id : 'order_unique_id',
        this_slide_id   : 'containers',
        table_id        : 'containers',
        parent_slide_id : 'orders',
        child_slide_id  : 'grabs',
        event_types     : [
            'Container Chain',
            'container_down',
            'container_push',
            'container_up'
        ],
    },
    grabSlide: {
        get_line_php    : "database/get_data.php",
        this_unique_id  : 'grab_unique_id',
        table_unique_id : 'container_unique_id',
        this_slide_id   : 'grabs',
        table_id        : 'grabs',
        parent_slide_id : 'containers',
        child_slide_id  : 'logs',
        event_types     : []
    },
    logSlide: {
        get_line_php    : "database/get_data.php",
        this_unique_id  : 'log_unique_id',
        table_unique_id : 'grab_unique_id',
        this_slide_id   : 'logs',
        table_id        : 'logs',
        parent_slide_id : 'grabs',
        child_slide_id  : 'none',
        event_types     : []
    }
}

function FileSlide( slide_data ) {


	//  CREATE ELEMENTS ARRAY
    var $el = {};
    
    var tl = new TimelineMax();
    var tl_stack = new TimelineMax(); 

    var slide_data = slide_data;

    var get_line_php    = slide_data.get_line_php;
    var table_unique_id = slide_data.table_unique_id;
    var this_slide_id   = slide_data.this_slide_id;
    var child_slide_id  = slide_data.child_slide_id;
    var this_unique_id  = slide_data.this_unique_id;


    var post_data = {};
    
    post_data['table_id'] = slide_data.table_id;
    post_data['unique_id_name'] = slide_data.table_unique_id;

	var Init = function() {

        Bug('FileSlide [' + this_slide_id + '] Module Initiated.');

        CacheEl();


        $el.stack.parent.on('slide', system.fileCabinet.ChangeSlide);

        

    }


	 //  CACHE ELEMENTS
    var CacheEl = function() {
        $el.body = $('body');
        
        $el.stack = {};

        $el.stack.parent = $('#' + this_slide_id);
        $el.stack.stack = $el.stack.parent.find('.stack-column');
        $el.stack.template =  $el.stack.parent.find('.stack-item-button.template');

        $el.stack.prevButton = $el.stack.parent.find('.prev-button');
        $el.stack.nextButton = $el.stack.parent.find('.next-button');



        $el.stack.display = {};

        $el.stack.display.parent =  $el.stack.parent.find('.stack-display');
        $el.stack.display.column =  $el.stack.parent.find('.stack-display-column');
        $el.stack.display.imageWrap =  $el.stack.parent.find('.stack-display .display-img-wrap');
        $el.stack.display.image =  $el.stack.parent.find('.stack-display .display-img');
        //$el.stack.display.loader =  $el.stack.parent.find('.loading-overlay');

        $el.stack.display.loaderDisplay =  $el.stack.parent.find('.stack-display-column .loading-overlay.loading-display');
        $el.stack.display.loaderStack =  $el.stack.parent.find('.stack-column .loading-overlay.loading-stack');
        $el.stack.display.loaderButton =  $el.stack.parent.find('.stack-column .loading-overlay.loading-button');

        $el.stack.display.noData =  $el.stack.parent.find('.stack-no-data');

        //  SPECIFIC $els
        $el.stack.display.data = {};
        $el.stack.display.data.parent =   $el.stack.parent.find('.stack-display');
        $el.stack.display.data.output_lines =  $el.stack.parent.find('.stack-display .data-output-line');
        
    };

    var NewDatabaseCall = function() {
        database_call_id++;
        return database_call_id;
    }


    var CheckForUpdates = function( unique_id, selected_id ) {
        GetData(unique_id, selected_id);
    }


    var GetData = function( unique_id, selected_id ) {

        post_data['origin'] = 'GetData()';
        post_data[table_unique_id] = unique_id;

        //console.log("Searching:", post_data);


        LoadingScreen(true, $el.stack.display.loaderDisplay);
        LoadingScreen(true, $el.stack.display.loaderStack);


        var this_database_call_id = NewDatabaseCall();

        ClearStack();

        $.post(
            get_line_php, 
            post_data, 
            function( data ) {

                if ( system.db.CheckData(data) ) {

                    if (this_database_call_id != database_call_id) {
                        //console.log("Not matching Database Id Call [" + this_database_call_id + " != " + database_call_id + "]" );
                        return;
                    } else {
                        //console.log("Correct Database Id Call [" + this_database_call_id + " != " + database_call_id + "]" );
                    };

                    data = jQuery.parseJSON( data );


                    

                    data.reverse();

                    ClearStack();

                    //console.log(data);
                    //console.log("Is Empty?", jQuery.isEmptyObject(data), data );

                    ClearDataDisplay();

                    AddToStack(data, database_call_id);

                    PostDataLoad(selected_id);


                    if ( data.length == 0 ) {
                        //console.log('No Data');

                        if ( $el.stack.parent.find('.create-item-button').length > 0 ) {
                            if ( $el.stack.parent.hasClass('active') ) {
                                $el.stack.parent.find('.create-item-button').trigger('click');
                            };
                        } else {
                            //console.log($el.stack.display.column);
                            if ( !$el.stack.display.column.addClass('no-data') ) {
                                $el.stack.display.column.addClass('no-data');
                            };
                        };

                    } else {

                        $el.stack.display.column.removeClass('no-data');

                    };

     
                };
                
        });


        
    };


    var current_line_number = 1;
    
    var database_call_id = 0;
    var current_database_call_id = 0;
    
    var CheckIfItemSelected = function() {
        var selected = false;
        
        $el.stack.parent.find(".stack-item-button").each(function(){
            //console.log("Selected=",$(this).hasClass('selected'));
            if ($(this).hasClass('selected')) {
                selected = true;
            };
        });

        return selected;
    };


    var SelectFirstItem = function() {
        if ( !CheckIfItemSelected() ) {
            selected_id =  $el.stack.parent.find('.stack-item-button-selector:first-of-type .data').data('id');
            SelectStackButton( $el.stack.parent.find('.stack-item-button-selector .data[data-id="' + selected_id + '"]') );
            
        };
    };


    var ClearStack = function() {
        current_line_number = 0;
        $el.stack.parent.find(".stack-item-button").not('.file-slide-button, .control').remove();
        
    };

    var ClearDataDisplay = function() {
        //console.log("Clearing Data Display");

        //  CLEARING DATA OUTPUT
        $el.stack.display.data.output_lines.each(function() {
            $(this).find('span').html( "No Data" );
        });


        //  CLEARING IMAGE & BOUNDING BOXES
        img_id = $el.stack.display.image.data('line-id');

        if (img_id == 'grab_img_url') {
            system.grabs.ClearGrabData();
        };

        $el.stack.display.image.attr('src', null);

    };


    var AddToStack = function(data) {

        

        $.each(data, function (index, value){

            //console.log(index, value);
            $new_line = $el.stack.template.clone().appendTo( $el.stack.stack );
            $new_line.removeClass('template');
            

            //console.log("Adding To Stack:", value);

            //console.log("Checking Value=" + this_unique_id, value[this_unique_id]);
            $new_line.find(".data").attr('data-id', value[this_unique_id] );
            $new_line.find(".line_number span").html(current_line_number);

            $new_line.find(".view-button").attr('data-id', value[this_unique_id] );
            
            $new_line.attr('data-stack-item-id', value[this_unique_id] );
            


            $stack_button_data = $new_line.find("div.data-output-stack-button");

            $stack_button_data.each(function() {
                
                var line_id = $(this).data('line-id');

                $(this).find('span').html(value[line_id]);
    
            });



            $stack_button_img =  $new_line.find(".data-output-stack-button-img");



            $stack_button_img.each(function() {

                var line_id = $(this).data('line-id');


                var newImg = new Image();
        
                newImg.onload = function() {
                    //console.log("Loaded:", newImg);
                    $("[data-stack-item-id='" + value[this_unique_id] + "'] .stack-item-button-selector").addClass('active');
                    //console.log(  $("[data-stack-item-id='" + value[this_unique_id] + "'] .stack-item-button-selector") );
                };

                newImg.src = value[line_id];
                $(this).find('img').attr('src', value[line_id]);
                //console.log(newImg);
    
            });

            
            

            CheckIfItemHasEvents(value, $new_line);

            current_line_number++;

        });

        LoadingScreen(false, $el.stack.display.loaderStack);
    };


    var CheckIfItemHasEvents = function(data, $el_button) {
        if (slide_data.event_types.length <= 0) {
            return;
        };
        //console.log("Checking For Events");

        $.post(
            "database/check_container_events.php", 
            {
                container_unique_id : data['container_unique_id']
            }, 
            function( data ) {

                if ( system.db.CheckData(data) ) {

                    

                    data = jQuery.parseJSON( data );
                    //console.log("Returned Data:", data);

                    if (data.length > 0) {
                        $el_button.removeClass('no-events');
                    };
                }
            }
        );
    }


    var AddPopMenus = function($elements) {

        $elements.each(function(){
            var $this = $(this);
            var copyable = $this.find('.copyable').text();
            $(function() {
                $this.popmenu({
                    copy: {
                        label: 'Copy To Clipboard (' + copyable + ')', 
                        action: function() { 
                            input.CopyToClipboard( copyable );
                            console.log($(this));
                        }
                    },
                    open: {
                        label: 'Open', 
                        action: function() { 
                            $this.trigger('click');
                            $this.trigger('click');
                        }
                    }
                });
            });
        });

        
    }

    var PostDataLoad = function(selected_id) {


        $stack_button = $el.stack.parent.find(".stack-item-button-selector");
        $stack_button.unbind("click");
        $stack_button.click( ViewData );

        AddPopMenus( $stack_button );
        

        $stack_view_button = $el.stack.parent.find(".stack-item-button .view-button");
        $stack_view_button.unbind("click");
        $stack_view_button.click( ViewItem );

        $stack_view_button = $el.stack.parent.find(".stack-item-button .view-button");
        $stack_view_button.unbind("click");
        $stack_view_button.click( ViewItem );

        

        //  ACTIVATE SELECTED ID
        if (selected_id != null) {
            SelectStackButton( $el.stack.parent.find('.stack-item-button-selector .data[data-id="' + selected_id + '"]') );
            OpenData( selected_id );
        } else {
            selected_id =  $el.stack.parent.find('.stack-item-button-selector:first-of-type .data').data('id');
            //console.log(selected_id);
            if ( selected_id != null ) {
                $item_to_select = $el.stack.parent.find('.stack-item-button-selector .data[data-id="' + selected_id + '"]');
                if ( $item_to_select.length > 0 ) {
                    SelectStackButton( $el.stack.parent.find('.stack-item-button-selector .data[data-id="' + selected_id + '"]') );
                    OpenData( selected_id );
                };
            } else {

                
            };
        };

        $el.stack.prevButton.unbind('click');
        $el.stack.prevButton.click(system.slides.core.PrevSlide);

    };


    var ViewItemFromURL = function(unique_id, open_chain) {

        OpenParentItem(unique_id, open_chain);

        //OpenData( unique_id );

        system.fileCabinet.ShowSlide(this_slide_id); 

    };

    var OpenParentItem = function(unique_id, open_chain) {

        var this_post_data = {};
        this_post_data['origin'] = 'OpenParentItem()';
        this_post_data['table_id'] = slide_data.table_id;
        this_post_data['unique_id_name'] = slide_data.this_unique_id;
        this_post_data[this_unique_id] = unique_id;

        //console.log("Post Data:", this_post_data);


        if (slide_data.parent_slide_id != 'none') {

            $.post(
                get_line_php, 
                this_post_data, 
                function( data ) {

                    if ( system.db.CheckData(data) ) {

                        //console.log("Pre parseJSON Data:", data);

                        data = jQuery.parseJSON( data );

                        //console.log("Opening Data:", data);

                        parent_slide = system.slides.core.GetSlide(slide_data.parent_slide_id);
                        parent_table_id = parent_slide.slide_data.this_unique_id;
                        
                        //console.log("parent_table_id", parent_table_id);

                        //console.log(data[0][parent_table_id]);
                        
                        parent_unique_id = data[0][parent_table_id];
                        
                        GetData(parent_unique_id, unique_id);

                        if (open_chain != 'false') {
                            parent_slide.OpenParentItem(parent_unique_id, open_chain);
                        };
                        
                    };
                    
            });



        } else {
            OpenData( unique_id );
            GetData("*", unique_id);
        };


    };

    var ViewItemFromId = function(unique_id, selected_id) {
        
        UpdateURL(unique_id);

        //GetData( unique_id );

        LoadChainData( unique_id, true, selected_id );

    };



    var ViewItem = function() {

        var unique_id = $(this).data('id');
        
        UpdateURL(unique_id);

        SelectStackButton( $(this) );

        OpenData( unique_id );

        LoadChainData( unique_id, true );

    }



    var ViewData = function() {

        unique_id = $(this).find(".data").data('id');

        UpdateURL(unique_id);


        SelectStackButton( $(this) );

        //console.log("Disabled: ", $(this).hasClass('selector-disabled'));

        if ( $(this).hasClass('selector-disabled') ) {
            return;
        };


        OpenData(unique_id);

        if ( unique_id == "*" || input.DoubleClick( $(this) ) ) {
            
            tl.to( $el.stack.display.data.parent, 0.25, {opacity: 0} );
            

            LoadChainData( unique_id, true );


        } else {

            if ( $el.stack.parent.hasClass('active') ) {
                
                system.fileCabinet.ShowSlide(this_slide_id); 
            };

            LoadChainData( unique_id, false );

        };

    }

    var LoadingScreen = function(status, $loading_panel) {

        if ($loading_panel == null || $loading_panel == undefined) {
            //$loading_panel = $el.stack.display.loader;
        };

        var this_tl = tl;
        if ($loading_panel == $el.stack.display.loaderStack) {
            this_tl = tl_stack;
            this_tl.clear();
        };


        if (status) {
            this_tl.set($loading_panel, {display: 'flex'});

            this_tl.to($loading_panel, 0.25, {opacity: 1});
        } else {
            this_tl.to($loading_panel, 0.5, {opacity: 0, onComplete: function(){
                this_tl.set($loading_panel, {display: 'none'});
            }});
        };
    }

    
 

    var UpdateURL = function(unique_id) {
        new_get_data = {};
        new_get_data[slide_data.this_slide_id] = unique_id;

        system.router.UpdateDataURL({
            clear_data : true,
            get_data : new_get_data,  
        });
    }



    var LoadChainData = function(unique_id, load_slide, selected_id) {
        //console.log(unique_id);
        $.each(system.slides, function(index, value) {

            if ( child_slide_id == value.GetId() ) {
                
                if (load_slide) {
                    system.fileCabinet.ShowSlide(child_slide_id);
                };
                
                value.GetData(unique_id, selected_id);

            };

        });
    }


    var SelectStackButton = function($this) {

        //  CLOSE CREATOR WHEN ITEM IS SELECTED
        system.creator.CloseCreator();

        $el.stack.parent.find(".stack-item-button").not($this).removeClass('selected');
        $el.stack.parent.find(".create-item-button").removeClass('selected');

        $($this).closest(".stack-item-button").addClass('selected');

        $el.stack.nextButton.unbind('click');
        $el.stack.nextButton.click(function() {
            $el.stack.parent.find(".stack-item-button.selected .view-button").trigger('click');
        });

    }

    var OpenData = function(unique_id) {

        //console.log("Opening Data", unique_id);

        tl.clear();

        LoadingScreen(true, $el.stack.display.loaderDisplay);

        

        tl.to($el.stack.display.data.parent, 0.25, { opacity: 0, onComplete: function(){
            
    
            var this_post_data = {};
            this_post_data['origin'] = 'OpenData()';
            this_post_data['table_id'] = slide_data.table_id;
            this_post_data['unique_id_name'] = slide_data.this_unique_id;

            this_post_data[this_unique_id] = unique_id;

            
            //console.log("Post Data:", this_post_data);

            $.post(
                get_line_php, 
                this_post_data, 
                function( data ) {
    
                    if ( system.db.CheckData(data) ) {
    
                        //console.log("Pre parseJSON Data:", data);

                        

                        data = jQuery.parseJSON( data );
    
                        //console.log("Opening Data:", data);
                        if (data.length == 0) {
                            system.router.ClearURL();
                            LoadingScreen(false, $el.stack.display.loaderDisplay);
                            return;
                        };

                        DisplayData( data[0] );
                        
                        LoadingScreen(false, $el.stack.display.loaderDisplay);
                    };
                    
            });

        }});


        

                  
    };



    var DisplayData = function(data) {
        //console.log("DISPLAY DATA:Checking For Events | ", data);
        //console.log("Corresponding Data:", data);
        
        system.events.ClearEvents( $el.stack.display.parent );

        system.events.ShowEvents( data, slide_data.event_types );
    
        $el.stack.display.data.output_lines.each(function() {

            var line_id = $(this).data('line-id');

            if (line_id == "timestamp") {

                $(this).find('span').html( GetDateAndTime( data[line_id] ) );

            } else {

                $(this).find('span').html(data[line_id]);

            };
            
        });


        if ( $el.stack.display.image.length == 0 ) {

            tl.to($el.stack.display.data.parent, 0.25, {opacity: 1});

        } else {
           
            DisplayDataImage(data);

            

        };


    };





    var DisplayDataImage = function(data) {


        img_id = $el.stack.display.image.data('line-id');
        var newImg = new Image();
        

        newImg.onload = function() {
            
            if (img_id == 'grab_img_url') {
                system.grabs.GetLogsFromGrab(data['grab_unique_id'], newImg);
                
            };

            tl.to($el.stack.display.loaderDisplay, 0.5, {opacity: 0, onComplete: function(){
                tl.set($el.stack.display.loaderDisplay, {display: 'none'});
            }});
            

        };


        tl.set($el.stack.display.loaderDisplay, {display: 'flex'});

        tl.to($el.stack.display.loaderDisplay, 0, {opacity: 1});


        tl.to($el.stack.display.data.parent, 0.25, {opacity: 1, onComplete: function(){

            
           
            newImg.src = data[img_id];

            $el.stack.display.image.attr('src', newImg.src);
            
        }});

    };



    //  INITIALIZE
    Init();



    //  EXTERNAL FUNCTIONS
    return {
        GetId : function() {
            return this_slide_id;
        },

        GetData : function(unique_id, selected_id) {
            GetData(unique_id, selected_id);
        },

        OpenParentItem : function(child_unique_id) {
            OpenParentItem(child_unique_id);
        },

        ViewItemFromId: function(unique_id, selected_id) {
            ViewItemFromId(unique_id, selected_id);
        },
        
        ViewItemFromURL : function(unique_id, open_chain) {
            ViewItemFromURL(unique_id, open_chain);
        },

        CheckIfItemSelected: function() {
            return CheckIfItemSelected();
        },

        SelectFirstItem: function () {
            SelectFirstItem();
        },

        CheckForUpdates: function(unique_id, selected_id) {
            CheckForUpdates(unique_id, selected_id);
        },

        slide_data : slide_data,
    }
}