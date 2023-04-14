//
//	MODULE: COMMS
//

function Comms() {


    var comm_data_demo = {
        comms_datetime: ConvertDatetimeVisionCore(Date.now()),
        destination: "App process name(id)",
        destination_id: "App Id - for determining between apps of same process name(id)",
        target_id: "additional id data for reference within that application",
        comm: "Communications type",
        comm_data: "Comminication data"
    };

	//  CREATE ELEMENTS ARRAY
    var $el = {};

    var tl = new TimelineMax();

    var database_call_id = 0;
    var current_database_call_id = 0;

    var NewDatabaseCall = function() {
        database_call_id++;
        return database_call_id;
    }


    var comms = {};

    
    var Init = function() {

        Bug('Comms Module Initiated.');

        CacheEl();

        $el.comms.button.click(TogglePanel);
        $el.comms.testButton.click(TestButton);


        system.notify.Notify('Comms Connected To Vision Core', 'success');
        
        ReadCommands();
    }



    var CacheEl = function() {

        $el.comms = {};

        $el.comms.panel = $('#comms-panel');
        $el.comms.list = $('#comms-list');
        $el.comms.itemTemplate = $('.comms-item.template');

        $el.comms.button = $('#comms-button, .close-comms-button');
        $el.comms.headerButton = $('#comms-button');

        $el.comms.testButton = $('#comms-test-button');
    }

    
    var TestButton = function() {
        var comms_data = {
            comms_datetime: ConvertDatetimeVisionCore(Date.now()),
            destination: "Watchgod",
            destination_id: data['watchgod_id'],
            target_id: data['process_id_number'],
            comm: "Enable Process Watch",
            comm_data: internal_systems[ id ].enable_switch_element.prop('checked')
        };

        system.comms.SendCommand(comms_data);
    }

    var TogglePanel = function(status) {
        if (status == null) {
            $el.comms.panel.removeClass('active');
            $el.comms.headerButton.removeClass('active');
            return;
        };

        if( !$el.comms.panel.CheckAndAddRemoveClass('active')) {
            system.navigation.CloseAllPanels('comms');
            ReadCommands();
            $el.comms.headerButton.safeAddClass('active');
        } else {
            $el.comms.headerButton.removeClass('active');
        };
        
    }


    var SendCommand = function(comm_data) {
        console.log("Sending Comms Data:", comm_data);

        console.log();

        comm_data.comms_datetime = ConvertDatetimeVisionCore(Date.now());
        var post_data = comm_data;


        $.post(
            "database/send_comms.php", 
            post_data, 

            function( data ) {
                if ( system.db.CheckData(data) ) {
                    data = jQuery.parseJSON( data );
                
                    if (data = "success") {
                        system.notify.Notify('Comms Sent To: ' + comm_data.destination, 'success');
                    };
                };
            });

    }


    var ReadCommands = function() {


        var post_data = {};
        post_data['comms_datetime'] = GetCurrentDate();

        var this_database_call_id = NewDatabaseCall();

        $.post(
            "database/check_comms.php", 
            post_data, 

            function( data ) {

                if (this_database_call_id != database_call_id) {
                    return;
                };


                if ( system.db.CheckData(data) ) {
                    data = jQuery.parseJSON( data );
                


                    if (data.length <= 0) {
                        system.notify.Notify('No Comms');
                        return;
                    };


                    
                    
                    ClearComms();

                    $.each(data, function (index, comm_data){
                        CreateComm(comm_data);
                    });


                };
            });


    }

    var ClearComms = function() {
        $('.comms-item').not('.template').remove();
        comms = {};
    }    

    var CreateComm = function(comm_data) {
        var id = comm_data['comms_unique_id'];

        comms[ id ] = {};
        comms[ id ].element = $el.comms.itemTemplate.clone().appendTo( $el.comms.list );
        comms[ id ].element.removeClass('template');


        comms[ id ].element.find(".comms_unique_id").html( comm_data['comms_unique_id'] );
        comms[ id ].element.find(".comms_datetime").html( comm_data['comms_datetime'] );
        comms[ id ].element.find(".destination").html( comm_data['destination'] );
        comms[ id ].element.find(".destination_id").html( comm_data['destination_id'] );
        comms[ id ].element.find(".comm").html( comm_data['comm'] );
        comms[ id ].element.find(".comm_data").html( comm_data['comm_data'] );
        comms[ id ].element.find(".status").html( comm_data['status'] );
        comms[ id ].element.find(".actions").html( comm_data['actions'] );
        comms[ id ].element.attr('data-status', comm_data['status']);

        comms[ id ].element.find(".actions .button-delete").click(function(){
            UpdateCommand(comm_data['comms_unique_id'], "delete");
        });

        comms[ id ].element.find(".actions .button-retry").click(function(){
            UpdateCommand(comm_data['comms_unique_id'], "retry");
        });


    };

    var UpdateCommand = function (comms_unique_id, command) {

        var post_data = {};
        post_data['comms_datetime'] = GetCurrentDate();
        post_data['comms_datetime_fulllength'] = ConvertDatetimeVisionCore( Date.now() );
        post_data['comms_unique_id'] = comms_unique_id;
        post_data['command'] = command;

        var this_database_call_id = NewDatabaseCall();

        $.post(
            "database/check_comms.php", 
            post_data, 

            function( data ) {

                if (this_database_call_id != database_call_id) {
                    return;
                };


                if ( system.db.CheckData(data) ) {
                    data = jQuery.parseJSON( data );
                


                    if (data.length <= 0) {
                        system.notify.Notify('No Comms');
                        return;
                    };


                    
                    
                    ClearComms();

                    $.each(data, function (index, comm_data){
                        CreateComm(comm_data);
                    });


                };
            });
    }



    Init();

     //  EXTERNAL FUNCTIONS
     return {

        SendCommand: function(comm_data) {
            SendCommand(comm_data);
        },

        SendCommandPopupCallback: function(data) {
            SendCommand(data.data.param1);
            system.popup.ClosePopup();
        },

        CheckForComms: function() {
            ReadCommands();
        },

        TogglePanel: function(status) {
            TogglePanel(status);
        }

    }
}