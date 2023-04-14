//
//	CYCLE PROCESSOR
//

function CycleProcessor() {

    var comms_cycle = {
        interval : 5000,
        cycle : null,
        process : function() {
            system.comms.CheckForComms();
        }
    }
    
    var grab_cycle = {
        interval : 2000,
        cycle : null,
        process : function() {
            system.grabs.CheckForGrabs();
        }
    }

    var event_cycle = {
        interval : 1000,
        cycle : null,
        process : function() {
            system.events.CheckForEvents();
        }
    };

    var systems_cycle = {
        interval : 5000,
        cycle : null,
        process : function() {
            system.systems.CheckSystems();
        }
    }
    

    var Init = function() {
        Bug('CycleProcessor Module Initiated.');

        var systemsReady = setInterval(function() {
            Bug("Systems Ready Starting Cycle..");
            clearInterval(systemsReady);
            StartCycle(grab_cycle);
            StartCycle(event_cycle);
            StartCycle(systems_cycle);
            StartCycle(comms_cycle);
        }, 10);

    };


    var StartCycle = function(cycle_data) {
        cycle_data.cycle =  setInterval(cycle_data.process, cycle_data.interval);
    }


    //  INITIALIZE
    Init();



    //  EXTERNAL FUNCTIONS
    return {
    }
}
