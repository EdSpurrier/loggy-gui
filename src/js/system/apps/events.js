//
//	MODULE: EVENTS
//

function Events() {

	//  CREATE ELEMENTS ARRAY
    var $el = {};
    
    var tl = new TimelineMax();

    var eventAssignment = {
        active              : false,
        type                : 'none',   
        event_unique_id     : -1,
        alarm_unique_id     : -1,
        count               : 0,
    }

    var all_events = {};

	var Init = function() {

        Bug('Events Module Initiated.');

        CacheEl();
 
        $el.event.button.click(TogglePanel);
    }

    var database_call_id = 0;
    var current_database_call_id = 0;

    var NewDatabaseCall = function() {
        database_call_id++;
        return database_call_id;
    }

	//  CACHE ELEMENTS
    var CacheEl = function() {

        $el.body = $('body');
        
        $el.event = {};
        $el.event.panel = $('#event-panel');
        $el.event.dataLine = $el.event.panel.find('.data-output-event-line');
        $el.event.downloadVideo = $el.event.panel.find('.download-video');
        $el.event.stack = $el.event.panel.find('.stack-menu');
        $el.event.containerSelector = $el.event.panel.find('#container-selector');
        $el.event.containerSelectorTemplate = $el.event.panel.find('#container-selector .stack-item-button.template');
        
        $el.event.eventSelectorTemplate = $el.event.panel.find('#event-selector .stack-item-button.template');
        $el.event.eventSelector = $el.event.panel.find('#event-selector');
        

        $el.event.count = $('.events-count');
        $el.event.button = $('#events-button, .close-events-button');
        $el.event.headerButton =  $('#events-button');

        $el.eventTemplates = $('.event-output.template');

    };


    var CheckForEvents = function(update) {
        var post_data = {};

        if (eventAssignment.active && !update) {
            return;  
        };

        
        var this_database_call_id = NewDatabaseCall();

        $.post(
            "database/assign_parented_events.php", 
            {}, 

            function( data ) {

                if (this_database_call_id != database_call_id) {
                    return;
                };

                ClearStack();
                if (data.length > 0) {

                    //system.notify.Notify('No Events Updated', 'important');
                    return;
                };


                if ( system.db.CheckData(data) ) {

                    data = jQuery.parseJSON( data );

                    
                    $.each(data, function (index, value){

                        system.notify.Notify('Event Updated > ' + value, 'success');

                    });
                };
        });


        eventAssignment.active = true;

        var this_database_call_id = NewDatabaseCall();

        $.post(
            "database/check_events.php", 
            post_data, 

            function( data ) {
                if (this_database_call_id != database_call_id) {
                    return;
                };
                

                if ( system.db.CheckData(data) ) {

                    data = jQuery.parseJSON( data );
        

                    if (data.length > 0) {

                        system.notify.Notify('Found [' + data.length + '] UNASSIGNED Events.');

/*                         system.notify.Notify('Found UNASSIGNED ' + data[0]['event_type'] + ' event [' + data[0]['event_unique_id'] + ']');


                        //system.popup.Popup("You have an unassigned event.<br>Please assign the event.");

                        
                        eventAssignment.event_unique_id = data[0]['event_unique_id'];
                        eventAssignment.alarm_unique_id = data[0]['alarm_unique_id'];
                        eventAssignment.type = data[0]['event_type']; */



                        //$el.body.safeAddClass('assigning-event');
                        

                        //

                        all_events = [];

                        var unassigned_event_count = 0;

                        $.each(data, function (index, value){
                            AddToStack( value );
                            all_events[ value['video_unique_id'] ] = value;
                            if ( value['container_unique_id'] == '0' || value['container_id'] == 'Container Number' ) {
                                unassigned_event_count++;
                            };
                        });

                        UpdateEventCount( unassigned_event_count );

                        PostDataLoad();


                    } else {
                        eventAssignment.active = false;
                        var unassigned_event_count = 0;
                        UpdateEventCount( unassigned_event_count );
                    };
                };
                
        });

    };

    var ClearStack = function() {
        $el.event.stack.find(".stack-item-button").not('.template').remove();
    };

    var AddToStack = function(data) {

        $new_selector = $el.event.eventSelectorTemplate.clone().appendTo( $el.event.eventSelector );
        $new_selector.removeClass('template');
        $new_selector.find(".event_unique_id span").html( data['event_unique_id'] );
        $new_selector.find(".video_unique_id span").html( data['video_unique_id'] );
        $new_selector.find('.data').data('id', data['video_unique_id']);

        if ( data['container_unique_id'] == '-1' || data['container_id'] == 'Container Number' ) {
            $new_selector.addClass('unassigned');
        };
    }

    var PostDataLoad = function() {

        $event_button = $el.event.panel.find('#event-selector .stack-item-button').not('.template');
        $event_button.unbind("click");
        $event_button.click( ViewData );

        $event_button.first().trigger('click');
        
    }

    var ViewData = function() {
        unique_id = $(this).find(".data").data('id');
        SelectStackButton( $(this) );


        UpdateEventPanel(all_events[unique_id]);
    }


    var SelectStackButton = function($this) {

        $el.event.stack.find(".stack-item-button").not($this).removeClass('selected');
        $($this).closest(".stack-item-button").addClass('selected');

    }


    var TogglePanel = function(status) {
        if (status == null) {
            $el.event.panel.removeClass('active');
            $el.event.headerButton.removeClass('active');
            return;
        };
        
        if( !$el.event.panel.CheckAndAddRemoveClass('active') ) {
            system.navigation.CloseAllPanels('events');
            CheckForEvents(true);
            $el.event.headerButton.safeAddClass('active');
        } else {
            $el.event.headerButton.removeClass('active');
        };
        
    }

    var UpdateEventCount = function(count) {
        eventAssignment.count = count;
        $el.event.count.html(eventAssignment.count);


        if ( eventAssignment.count > 0) {
            $el.event.count.removeClass('hide');
        } else {
            $el.event.count.safeAddClass('hide');
        };
    }

    var UpdateEventPanel = function(data) {
        
        //$el.event.stack.safeAddClass('hide');

        $el.event.panel.find('#container-selector .stack-item-button').not('.template').remove();

        ActivateSelectContainers( data['container_unique_id'] );

        eventAssignment.event_unique_id = data['event_unique_id'];
        eventAssignment.alarm_unique_id = data['alarm_unique_id'];
        eventAssignment.type = data['event_type']; 

        $el.event.dataLine.each(function() {
            
            var line_id = $(this).data('line-id');

            if (line_id == "timestamp") {

                $(this).find('span').html( GetDateAndTime( data[line_id] ) );

            } else {

                $(this).find('span').html(data[line_id]);

            };
        });

        var video = $('#event-view video')[0];
        var sources = $('#event-view source.data-event-display-url');
        sources[0].src = data['ftp_url'];
        video.load();


        $el.event.downloadVideo.attr('href', data['ftp_url']);
    };


    var ActivateSelectContainers = function( event_reference_id ) {
        $el.event.containerSelector.removeClass('hide');
        
        var post_data = {};
    
        post_data['table_id'] = "containers";
        post_data['unique_id_name'] = "containers";    
        post_data['origin'] = 'Event_Containers()';
        post_data["containers"] = "*";


        var this_database_call_id = NewDatabaseCall();

        $.post(
            "database/get_data.php", 
            post_data, 

            function( data ) {

                if (this_database_call_id != database_call_id) {
                    //console.log("Not matching Database Id Call [" + this_database_call_id + " != " + database_call_id + "]" );
                    return;
                };

                if ( system.db.CheckData(data) ) {

                    data = jQuery.parseJSON( data );

                    if (event_reference_id == null || event_reference_id == 0) {
                        $.each(data, function (index, value){
                            if (value['event_unique_id'] == null) {
                                $new_selector = $el.event.containerSelectorTemplate.clone().appendTo( $el.event.containerSelector );
                                $new_selector.removeClass('template');
                            
                                $new_selector.find(".container_id").html( value['container_id'] );
                                $new_selector.data('unique_id', value['container_unique_id']);
                                $new_selector.data('id', value['container_id']);
                            };
                        });
    
                        $el.event.panel.safeAddClass('active');
    
                        PostLoad();

                    } else {

                        $.each(data, function (index, value){
                            if (event_reference_id == value['container_unique_id']) {

                                $new_selector = $el.event.containerSelectorTemplate.clone().appendTo( $el.event.containerSelector );
                                $new_selector.removeClass('template');
                            
                                $new_selector.find(".container_id").html( value['container_id'] );
                                $new_selector.data('unique_id', value['container_unique_id']);
                                $new_selector.data('id', value['container_id']);

                                $new_selector.click(ShowReferencedEventItem);
                            };
                        });

                    };
                };
        });

    };

    var PostLoad = function() {
        $el.event.panel.find('#container-selector .stack-item-button').unbind('click');
        $el.event.panel.find('#container-selector .stack-item-button').click(AssignToEvent);
    };

    var ShowReferencedEventItem = function() {

        type = 'containers';
        unique_id = $(this).data('unique_id');

        new_get_data = {};
        new_get_data[type] = unique_id;

        system.router.UpdateDataURL({
            clear_data  : true,
            get_data    : new_get_data,
            redirect    : true
        });

        TogglePanel();
    }

    var AssignToEvent = function() {
        //  MAKE SURE YOU DONT DOUBLE CLICK & CREATE ERRORS
        if (eventAssignment.active) {
            var unique_id = $(this).data('unique_id');
            var id = $(this).data('id');
    
            system.popup.PopupQuestionImportant("Assign Container [" + id + "] To:<br />Event Type: [" + eventAssignment.type + "]<br />Event Id: [" + eventAssignment.event_unique_id + "]?", system.events.ConfirmAssignment, unique_id);

            Bug( $(this).data('id') );
        }
        
    };

    var ConfirmAssignment = function(unique_id) {
        system.popup.ClosePopup();
        //console.log('UID=', unique_id);

        var post_data = {};

        post_data['origin'] = 'ConfirmAssignment()';
        post_data['container_unique_id'] = unique_id;  
        post_data['event_unique_id'] = eventAssignment.event_unique_id;


        $el.event.panel.removeClass('active');

        var this_database_call_id = NewDatabaseCall();

        $.post(
            "database/assign_container_event.php", 
            post_data, 

            function( data ) {
                //console.log(data);
                if (this_database_call_id != database_call_id) {
                    //console.log("Not matching Database Id Call [" + this_database_call_id + " != " + database_call_id + "]" );
                    return;
                };

                if ( system.db.CheckData(data) ) {
                    data = jQuery.parseJSON( data );
                    //console.log(data);
                    if (data == "Assigned Successfully.") {
                        system.popup.Popup("Event Assigned Successfully.<br />Thank You.");


                        system.router.UpdateDataURL({
                            clear_data  : true,
                            get_data    : {
                                containers : unique_id
                            },
                            redirect    : true
                        });
                    } else {
                        system.popup.PopupError("There was an Database Error.");

                    };
                    Reset();
                };

        });


    }


    var CloseEventPanel = function() {
        $el.event.panel.removeClass('active');
    }

    var Reset = function() {

        $el.event.panel.removeClass('active');

        eventAssignment = {
            active              : false,
            type                : 'none',
            event_unique_id     : -1,
            alarm_unique_id     : -1,
        };
    }


    var ShowEvents = function(data, event_types) {
        //console.log(data, event_types);

        //console.log("Search:", data['event_unique_id']);


        if (event_types.length <= 0) {
            return;
        };
        //console.log(data, event_types);

        //console.log("Search:", data['event_unique_id']);

        var post_data = {};

        post_data['origin'] = 'ShowEvents()';
        post_data['container_unique_id'] = data['container_unique_id'];  

        var this_database_call_id = NewDatabaseCall();

        $.post(
            "database/get_events.php", 
            post_data, 

            function( data ) {

                if (this_database_call_id != database_call_id) {
                    //console.log("Not matching Database Id Call [" + this_database_call_id + " != " + database_call_id + "]" );
                    return;
                }
 
                if ( system.db.CheckData(data) ) {
                    data = jQuery.parseJSON( data );

                    
                    $.each(data, function (index, value){
                        
                        CreateEvent(value);
                        
                    });

                };

            }
        );


    }



    var CreateEvent = function(data) {

        $template = null;
        $el.eventTemplates.each(function(){
            //console.log('Comparing - ' + $(this).data('event-type') + " == " +  data['event_type'] );
            if ( $(this).data('event-type') == data['type']  ) {
                $template = $(this);
                return false;
            };
        });

        if ($template == null) {
            system.popup.Popup('No Template For Event Type [' + data['type'] + ']', 'error');
            return;
        };




        $new_event = $template.clone().appendTo( $el.eventTemplates.parent('.data-output') );
        $new_event.removeClass('template');


        $event_data_line =  $new_event.find("div.data-output-event-line");
        $event_data_line.each(function() {
                
            var line_id = $(this).data('line-id');

            if (line_id == "timestamp") {

                $(this).find('span').html( GetDateAndTime( data[line_id] ) );

            } else {

                $(this).find('span').html(data[line_id]);

            };

            

        });



        $event_data_display =  $new_event.find("div.data-output-event-display");
        $event_data_display.each(function() {
            
            var display_id = $(this).data('display-id');


            if ( data[display_id] == null || data[display_id] == undefined || data[display_id] == "") {
                $(this).find('.event-display-data').remove();
            } else {
                //var url = data[display_id];
                //data[display_id] = url.split("ftp://lumigear.net/")[1];
                //data[display_id] = "http://lumigear.net/loggy/" + data[display_id];
    
                $(this).find('.data-event-display-url').attr('src', data[display_id]);
                //console.log('display-url', display_id, data[display_id]);

                $(this).find('.event-display-null').remove();

                $new_event.find('.download-video').attr('href', data[display_id]);
                //$new_event.find('.download-video').attr('download', data[display_id]);
            };

            

        });
    };


    var ClearEvents = function($parent) {
        $parent.find(".event-output").not('.template').remove();
    }

    //  INITIALIZE
    Init();



    //  EXTERNAL FUNCTIONS
    return {

        CheckForEvents: function() {
            CheckForEvents();
        },

        ConfirmAssignment: function(param) {
            ConfirmAssignment(param.data.param1);
        },

        ShowEvents: function(data, event_types) {
            ShowEvents(data, event_types);
        },

        ClearEvents: function($parent) {
            ClearEvents($parent);
        },

        CloseEventPanel: function() {
            CloseEventPanel();
        },

        IsActive: function() {
            return $el.event.panel.hasClass('active');
        },

        TogglePanel: function(status) {
            TogglePanel(status);
        }

    }
};
