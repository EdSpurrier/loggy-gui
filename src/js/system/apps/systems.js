//
//	MODULE: SYSTEMS
//


function Systems() {

    

	//  CREATE ELEMENTS ARRAY
    var $el = {};
    
    var tl = new TimelineMax();


	var Init = function() {

        Bug('Systems Module Initiated.');

        CacheEl();


    }

    

	//  CACHE ELEMENTS
    var CacheEl = function() {

        $el.body = $('body');
        
        $el.systems = {};
        $el.systems.stack = $('#system-stack');



        $el.systems.systemsTemplate = $('.system-item.template');
    };

    var systems_settings = [];

    var internal_system = {
        external_ip : 'Not Found',
        device_server_ip : 'Not Found',
        system_status : 'Not Found',
        system_internal_name : 'Not Found',
        timestamp : 'Not Found',
        error : 'Not Found',
        settings: []
    };

    var internal_systems = {};

    var CheckSystems = function() {
        var post_data = {};

        $.post(
            "database/check_systems.php", 
            post_data, 

            function( data ) {

                

                if ( system.db.CheckData(data) ) {

                    data = jQuery.parseJSON( data );
                
        
                    if (data.length > 0) {

                        
                        //console.log("Systems Init Data:", data);

                        var systems_data = [];


                        $.each(data[0], function (index, value){


                            systems_data.push(value);
                            //CreateNewInternalSystem(value);


                        });



                        $.each(systems_data, function (index, systems_value){

                            $.each(data[1], function (index, value){
                                
                                if (
                                    systems_value.external_ip == value.external_ip && 
                                    systems_value.window_title == value.system_internal_name) {
                                        //console.log(systems_value.external_ip + " == " + value.external_ip);
                                        //console.log(systems_value.window_title + " == " + value.system_internal_name);
                                        //console.log("System: Active");
                                        
                                        systems_value.device_server_ip = value.device_server_ip;
                                        systems_value.interval_check = value.interval_check;
                                        systems_value.system_status = value.system_status;
                                        systems_value.timestamp = value.timestamp;
                                        systems_value.system_internal_name = value.system_internal_name;
                           
                                } else {
                                        systems_value.device_server_ip = "N/A";        
                                        systems_value.interval_check = "20000";
                                        systems_value.system_status = "Not Active";
                                        systems_value.timestamp = 0;
                                        systems_value.system_internal_name = systems_value.window_title;
                                };

                            });
                            



                        });

                        systems_settings = data[2];

                        //console.log("Systems Found:", systems_data);
                        
                        //system.notify.Notify('Systems Check [systems found="' + data.length + '"]');
                        $.each(systems_data, function (index, value){
                            CreateNewInternalSystem(value);
                        });

                        CheckAllWatchGods();

                        system.containerDetector.UpdateSystemsUI(GetSystemByType('cd'), GetSystemByType('cpa_cc'));


                    } else {

                        system.notify.Notify('No Systems Attached', 'alert');
                    };
                };
                
        });

    };

    var CreateNewInternalSystem = function(data) {
        
        var id = data['watchgod_id'] + "-" + data['process_id_number'];

        //console.log(id);

        if ( internal_systems[ id ] == null) {
            //console.log('Connected To New System ["' + data['system_internal_name'] + '"] >> ' + id);
            system.notify.Notify('Connected To New System ["' + data['system_internal_name'] + '"]');

            internal_systems[ id ] = {};
            internal_systems[ id ].system_unique_id = data['system_unique_id'];
            internal_systems[ id ].settings = [];
            internal_systems[ id ].element = $el.systems.systemsTemplate.clone().appendTo( $el.systems.stack );
            internal_systems[ id ].element.removeClass('template');

            internal_systems[ id ].enable_switch_element = internal_systems[ id ].element.find('.switch-watchgod-enable input[type="checkbox"]');

            internal_systems[ id ].enable_switch_element.prop('checked', (data['status'] == 'True'));

            internal_systems[ id ].enable_switch_element.bind('change', function(){

                var comms_data = {
                    destination: "Watchgod",
                    destination_id: data['watchgod_id'],
                    target_id: data['process_id_number'],
                    comm: "Enable Process Watch",
                    comm_data: internal_systems[ id ].enable_switch_element.prop('checked')
                };

                system.comms.SendCommand(comms_data);

            });

        };

        internal_systems[ id ].external_ip = data['external_ip'] + " [" + data['watchgod_id'] + "]";
        internal_systems[ id ].device_server_ip = data['device_server_ip'];
        internal_systems[ id ].system_status = data['system_status'];
        internal_systems[ id ].system_internal_name = data['system_internal_name'];


        internal_systems[ id ].system_type = data['system_internal_name'].split('[').pop().split(']');
        if (internal_systems[ id ].system_type != null) {
            internal_systems[ id ].system_type = internal_systems[ id ].system_type[0];
        };

        internal_systems[ id ].system_global_name = data['system_internal_name'].match("{(.*)}");
        if (internal_systems[ id ].system_global_name != null) {
            internal_systems[ id ].system_global_name = internal_systems[ id ].system_global_name[1];
        };

        
        internal_systems[ id ].timestamp = data['timestamp'];
        internal_systems[ id ].error = data['error'];
        internal_systems[ id ].interval_check = (data['interval_check'] / 1000);

        internal_systems[ id ].status = (data['status'] == 'True');
        internal_systems[ id ].enable_switch_element.prop('checked', (data['status'] == 'True'));
        internal_systems[ id ].init_datetime = data['init_datetime'];
        internal_systems[ id ].last_checkin_datetime = data['last_checkin_datetime'];
        internal_systems[ id ].watchgod_id = data['watchgod_id'];
        internal_systems[ id ].process_id_number = data['process_id_number'];

        internal_systems[ id ].settings = CheckSystemSettings(data['system_unique_id']);

        UpdateInternalSystem( internal_systems[ id ] );
        
        //console.log('This SYstem settings: ', internal_systems[ id ].settings);
        //console.log("Creating System: ", internal_systems);

    }



    var UpdateInternalSystem = function(internal_system) {
        internal_system.element.find(".system_internal_name").html( internal_system.system_internal_name );
        internal_system.element.find(".external_ip").html( internal_system.external_ip );
        

        var comparisonTimestamp = GetTimeStamp( Date.now() ) - internal_system.timestamp;
        var activity = 'active';

        if (comparisonTimestamp > (internal_system.interval_check) + 10) {
            activity = 'inactive';
        } else if (comparisonTimestamp > (internal_system.interval_check) ) {
            activity = 'warning';
        };



        internal_system.element.find(".activity").attr('data-status', activity);

        system_status_active = SystemStatus_Active(internal_system, activity);

        internal_system.element.attr('data-status', system_status_active );

        
        internal_system.element.find(".watch_status").attr('data-status', SystemWatchStatus(internal_system) );
        

        if (system_status_active == 'inactive') {
            internal_system.element.find(".last_active").html( "-" );
            internal_system.element.find(".live_time").html( "-" );
            internal_system.element.find(".error").html( "-" );
            internal_system.element.find(".device_server_ip").html( "-" );
        } else {
            internal_system.element.find(".last_active").html( internal_system.last_checkin_datetime );
            internal_system.element.find(".error").html( internal_system.error );
            internal_system.element.find(".device_server_ip").html( internal_system.device_server_ip );
            internal_system.element.find(".live_time").html( 
                GetTimeDifferenceVisionCoreTime( 
                    internal_system.last_checkin_datetime,
                    internal_system.init_datetime
                    ) 
                ); 
        };
    }



    var CheckAllWatchGods = function() {
        var watchgod_group = {};
        $.each(internal_systems, function(id, system){
            if (watchgod_group[system.watchgod_id] == null) {
                watchgod_group[system.watchgod_id] = [];
            };
            watchgod_group[system.watchgod_id].push(system);
        });

        $.each(watchgod_group, function(id, watchgod){
            var error = false;
            var smallest_diff = -1000;

            $.each(watchgod, function(id, system){

                var diff = GetSecondsDifferenceVisionCoreTimeAndNow(system.last_checkin_datetime);
                //console.log("diff: " + diff + " == " + (smallest_diff < -30));
                if (diff > smallest_diff) {
                    smallest_diff = diff;
                };
                //console.log("smallest_diff: " + smallest_diff + " == " + (smallest_diff < -30));
            });

            
            if (smallest_diff < -30) {
                error = true;
            };

            $.each(watchgod, function(id, system){
                if (error) {
                    system.element.attr('data-status', 'watchgod-error' );
                };
            });
        });




    };


    var SystemStatus_Active = function(internal_system, activity) {
        if (internal_system.system_internal_name == "None" || !internal_system.status && activity == 'inactive') {
            return 'inactive';
        } else if (internal_system.status && activity == 'inactive' || !internal_system.status && activity == 'active' || internal_system.device_server_ip == "Not Connected"){
            return 'error';
        } else {
            return 'no-error';
        };
    }

    var SystemWatchStatus = function(internal_system) {
        if (internal_system.system_internal_name == "None") {
            return 'inactive';
        } else if (!internal_system.status){
            return 'error';
        } else {
            return 'no-error';
        };
    }
    
    var GetSystemById = function(system_unique_id) {
        var this_system = null;
        $.each(internal_systems, function (index, internal_system){
            if(internal_system.system_unique_id == system_unique_id) {
                this_system = internal_system;
            };
        });
        return this_system;
    }

    var GetSystemByType = function(type) {
        var systems_to_return = [];
        $.each(internal_systems, function (index, internal_system){
            if (internal_system.system_internal_name.indexOf(type) >= 0 ) {
                systems_to_return.push(internal_system);
            };
        });
        return systems_to_return;
    }

    var CheckSystemSettings = function(system_unique_id) {
        //console.log("Searching For Settings - S_U_ID: " + system_unique_id);

        var this_system_settings = [];

        $.each(systems_settings, function (index, system_setting){

            if (system_unique_id == system_setting['system_unique_id']) {
                this_system_settings[system_setting['setting_name']] = system_setting['setting_data'];
            };
        });
        
        return this_system_settings;

    }


    //  INITIALIZE
    Init();



    //  EXTERNAL FUNCTIONS
    return {

        CheckSystems: function() {
            CheckSystems();
        },

        IsActive: function() {
            return $el.event.panel.hasClass('active');
        },

        GetSystemByType: function(type) {
            return GetSystemByType(type);
        },

        GetSystemById: function(system_unique_id) {
            return GetSystemById(system_unique_id);
        }

    }
};
