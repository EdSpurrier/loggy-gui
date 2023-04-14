//
//	MODULE: CONTAINER DETECTOR
//

function ContainerDetector() {


	//  CREATE ELEMENTS ARRAY
    var $el = {};
    
    var tl = new TimelineMax();
   

    var chain_systems = [];


    var detections = new Array();

    var detection_item_template = {
        Init : function(data) {
            this.data = data;
            this.alarm_unique_id = data['alarm_unique_id'];
            this.container_id = data['related_data'];
            this.event_datetime = data['event_datetime'];
            this.confidence = parseInt(data['confidence']);
            if (data['process_status'] == "DELETED") {
                this.status = "trashed";
            } else {
                this.status = "unassigned";
            }
            
            this.element = AddToDetectionStack(this);
            this.match_percentage = 0;
        }
    };

    var total_unique_detections = new Array();

    var manifest_item_template = {
        Init : function(container_id) {
            this.selected = false;
            this.status = "unmatched";
            this.container_id = container_id;
            this.element = AddToManifestStack(this);
            this.matched_detections = new Array();
        }
    };

    var manifest = new Array();


    var imported_container_ids = new Array();

	var Init = function() {

        Bug('Container Detector Module Initiated.');

        CacheEl();
 
        $el.containerDetector.button.click(TogglePanel);
        SetUpSliders();
        

        ImportManifestList(imported_container_ids);

        $el.containerDetector.systemChainButton.click(ToggleSystemChainsStack);
        $el.containerDetector.systemChainSelectors.click(SelectSystemChain);
        $el.containerDetector.systemChainStackConnecting.safeAddClass('active');

        $el.containerDetector.systemDatePicker.datepicker({
            autoHide: true,
            format: 'yyyy-mm-dd',
            endDate: new Date()
        });

        $el.containerDetector.systemDatePicker.on('pick.datepicker', PickSystemDate);
        $el.containerDetector.systemRevertButton.click(RevertDetectionMatches);
        $el.containerDetector.systemSaveButton.click(SaveDetectionMatches);
        $el.containerDetector.systemProcessButton.click(ProcessDetectionMatches);



        $el.containerDetector.searchButton_unassigned.click(Search_Unassigned);
        $el.containerDetector.dateSearchButton.click(SearchDates);
        $el.containerDetector.smartMatchButton.click(ToggleSmartMatch);
        $el.containerDetector.manifestFilter.change(FilterManifest);
        $el.containerDetector.unassignedSorter.change(SortUnassigned);
        $el.containerDetector.checkForDetections.click(CheckForDetections);
        $el.containerDetector.updateDatabaseDetections.click(UpdateDatabaseDetections);

        $el.containerDetector.addContainersToManifestButton.click(AddContainersToManifest);

        $el.containerDetector.tools.copyUniqueButton.click(CopyUniqueContainerToClipboard);
        $el.containerDetector.checkForDetectionsInput[0].value = GetCurrentDate();
        


      
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
        
        $el.containerDetector = {};
        $el.containerDetector.panel = $('#container-detector-panel');
        $el.containerDetector.stack = $el.containerDetector.panel.find('.database-stack, .match-stack');

        $el.containerDetector.button = $('#container-detector-button, .close-container-detector-button');

        $el.containerDetector.headerButton = $('#container-detector-button');
        
        $el.containerDetector.systemChainButton = $el.containerDetector.panel.find(".system-chain-button");
        $el.containerDetector.systemChainStack = $el.containerDetector.panel.find("#system-chain-stack");
        $el.containerDetector.systemChainSelectors = $el.containerDetector.panel.find(".system-chain-selector");
        $el.containerDetector.systemChainStackConnecting = $el.containerDetector.panel.find(".loading-panel");
        $el.containerDetector.systemDatePicker =  $el.containerDetector.panel.find(".date-picker");
        $el.containerDetector.systemRevertButton =  $el.containerDetector.panel.find(".revert-detections-button");
        $el.containerDetector.systemSaveButton =  $el.containerDetector.panel.find(".save-detections-button");
        $el.containerDetector.systemProcessButton =  $el.containerDetector.panel.find(".process-detections-button");

        $el.containerDetector.commsButton = $el.containerDetector.panel.find(".comms-container-detector-button");

        $el.containerDetector.commsControls = $el.containerDetector.panel.find("#comms-container-detector .chain-system");




        
        $el.containerDetector.manifestSelectorTemplate = $el.containerDetector.panel.find('#manifest-selector .stack-item-button.template');
        $el.containerDetector.manifestSelector = $el.containerDetector.panel.find('#manifest-selector');

        $el.containerDetector.manifestButtons = $el.containerDetector.panel.find('#manifest-selector .stack-item-button');

        $el.containerDetector.detectionButtons = {};
        $el.containerDetector.detectionButtons.rightButtons = $el.containerDetector.panel.find('#matched-selector .stack-item-button .right-button, #unassigned-selector .stack-item-button .right-button, #trashed-selector .stack-item-button .right-button');
        $el.containerDetector.detectionButtons.leftButtons = $el.containerDetector.panel.find('#matched-selector .stack-item-button .left-button, #unassigned-selector .stack-item-button .left-button, #trashed-selector .stack-item-button .left-button');
        

        $el.containerDetector.databaseSelectorTemplate = $el.containerDetector.panel.find('#unassigned-selector .stack-item-button.template');  


        $el.containerDetector.matchedColumn = $el.containerDetector.panel.find('#matched-selector');
        $el.containerDetector.unassignedColumn = $el.containerDetector.panel.find('#unassigned-selector');
        $el.containerDetector.trashedColumn = $el.containerDetector.panel.find('#trashed-selector');
        

        $el.containerDetector.tools = {};

        $el.containerDetector.tools.confidenceSlider = $('#container-detector-confidence-slider .slider');
        $el.containerDetector.tools.confidenceOutput = $('#confidence-tool-output span');
        $el.containerDetector.tools.metaTotalUnique = $('#container-detector-meta #total-unique-containers');
        $el.containerDetector.tools.metaTotal = $('#container-detector-meta #total-containers');
        $el.containerDetector.tools.copyUniqueButton = $('#container-detector-meta #copy-unique');

        $el.containerDetector.output = {};



        $el.containerDetector.output.match = $('.container-detector-output #matched-tool-output span');

        $el.containerDetector.searchInput_unassigned = $('.unassigned-selector input.search-input');
        $el.containerDetector.searchButton_unassigned = $('.unassigned-selector .search-button');


        $el.containerDetector.manifestCount = $('#manifest-count');
        $el.containerDetector.matchedCount = $('#matched-count');
        $el.containerDetector.unassignedCount = $('#unassigned-count');
        $el.containerDetector.trashedCount = $('#trashed-count');

        $el.containerDetector.dateSearchButton = $('.container-detector-tools #date-search');

        $el.containerDetector.smartMatchButton = $('.container-detector-tools #smart-match');


        $el.containerDetector.addContainersToManifestInput = $('#container-detector-add-input');
        $el.containerDetector.addContainersToManifestButton = $('#container-detector-add-button');


        $el.containerDetector.unassignedSorter = $('.unassigned-selector select.sorter');

        $el.containerDetector.manifestFilter = $('.manifest-selector select.filter');


        $el.containerDetector.checkForDetectionsInput = $('#check-detections-input');
        $el.containerDetector.checkForDetections = $('#check-detections');
        

        $el.containerDetector.updateDatabaseDetections = $('#update-database');
        
    };


    var TogglePanel = function(status) {
            if (status == null) {
                $el.containerDetector.panel.removeClass('active');
                $el.containerDetector.headerButton.removeClass('active');
                return;
            };

        if( !$el.containerDetector.panel.CheckAndAddRemoveClass('active') ) {
            //CheckForDetections();  
            system.navigation.CloseAllPanels('containerDetector');
            $el.containerDetector.headerButton.safeAddClass('active');
        } else {
            $el.containerDetector.headerButton.removeClass('active');
        };
    }




    var ToggleSystemChainsStack = function () {
        if( !$el.containerDetector.systemChainStack.CheckAndAddRemoveClass('active') ) {
            
        };

    }


    var SelectSystemChain = function() {
        var system_chain_id = $(this).attr('data-system-chain-id');

        $el.containerDetector.commsControls.removeClass('active');
        $el.containerDetector.commsControls.eq(system_chain_id).safeAddClass('active');

        $el.containerDetector.systemChainStack.removeClass('active');

    }

    
    var PickSystemDate = function() {
        var $this_el = $(this);

        var system_unique_id = $this_el.closest(".chain-system").attr('data-cpa-cc-id');

        if (system_unique_id == -1) {
            system.popup.PopupError("This System Is Not Connected. Try Again Later.");
            return;
        };

        var this_system = system.systems.GetSystemById(system_unique_id);
        var comm = "retreive_cd_by_date";

        var comm_date = ConvertDatetimeVisionCore( $this_el.datepicker('getDate') );

        if (this_system == null) {
            system.popup.PopupError("System Syncing Try Again Later.");
            return;
        };

        $this_el.closest(".chain-system").attr('data-date-selected', comm_date);

        var comms_data = {
            destination: this_system.system_internal_name,
            destination_id: this_system.watchgod_id,
            target_id: -1,
            comm: comm,
            comm_data: comm_date
        };

        system.comms.SendCommand(comms_data);
    }


    var RevertDetectionMatches = function() {
        var $this_el = $(this);
        var system_unique_id = $this_el.closest(".comms-row").attr('data-system-id');
        
        if (system_unique_id == -1) {
            system.popup.PopupError("This System Is Not Connected. Try Again Later.");
            return;
        };

        var this_system = system.systems.GetSystemById(system_unique_id);
        var comm = $this_el.attr("data-comm");

        if (this_system == null) {
            system.popup.PopupError("System Syncing Try Again Later.");
            return;
        };

        var comm_date = $this_el.closest(".chain-system").attr('data-date-selected');
        var comms_data = {
            destination: this_system.system_internal_name,
            destination_id: this_system.watchgod_id,
            target_id: -1,
            comm: comm,
            comm_data: comm_date
        };

        var popup_output = "Reverting Match Changes.<br />Are You Sure?<br /><br />Date: " + comm_date;
        
        system.popup.PopupQuestion(popup_output, system.comms.SendCommandPopupCallback, comms_data);


    };

    var SaveDetectionMatches = function() {
        var $this_el = $(this);
        var system_unique_id = $this_el.closest(".comms-row").attr('data-system-id');
        
        alert("system_unique_id: " + system_unique_id);
    }

    var ProcessDetectionMatches = function() {
        var $this_el = $(this);
        var system_unique_id = $this_el.closest(".comms-row").attr('data-system-id');
        
        alert("system_unique_id: " + system_unique_id);
    }



    var PickCommsDate = function() {

        var $this_el = $(this);

        var system_unique_id = $this_el.closest(".comms-row").attr('data-system-id');

        if (system_unique_id == -1) {
            system.popup.PopupError("This System Is Not Connected. Try Again Later.");
            return;
        };

        var this_system = system.systems.GetSystemById(system_unique_id);
        var comm = $this_el.attr("data-comm");

        if (this_system == null) {
            system.popup.PopupError("System Syncing Try Again Later.");
            return;
        };

        var comms_data = {
            destination: this_system.system_internal_name,
            destination_id: this_system.watchgod_id,
            target_id: -1,
            comm: comm,
            comm_data: ConvertDatetimeVisionCore($this_el.datepicker('getDate'))
        };

        var popup_output = "Error";

        if (comm == "cd_process_datetime") {
            popup_output = "Are You Sure You Want To Set The Process Date For Container Detection?<br />(This Will Start Processing And Costing $)<br/><br /> Date: " + moment($this_el.datepicker('getDate')).format('YYYY-MM-DD');
        } else if (comm == "cpa_push") {
            popup_output = "Do You Want To Revert The Container Matching Changes You Have Made?<br />(This Cannot Be Reversed)?<br/><br /> Date: " + moment($this_el.datepicker('getDate')).format('YYYY-MM-DD');
        } else if (comm == "cpa_pull") {
            popup_output = "Do You Want To Save The Container Matching Changes To The Vision Cloud?<br/><br /> Date: " + moment($this_el.datepicker('getDate')).format('YYYY-MM-DD');
        } else if (comm == "cpa_process_datetime") {
            popup_output = "Are You Sure You Want To Start Processing The Container Videos From The Matched Detections?<br />(This Cannot Be Reversed)<br/><br /> Date: " + moment($this_el.datepicker('getDate')).format('YYYY-MM-DD');
        };
        
        system.popup.PopupQuestion(popup_output, system.comms.SendCommandPopupCallback, comms_data);

    }

    var UpdateSystemsUI = function(systems_cd, systems_cpa_cc) {

        chain_systems = [];

        $.each(systems_cd, function (index, system_cd){
            if (system_cd.system_global_name != null && system_cd.system_global_name != 'null') {
                $.each(systems_cpa_cc, function (index, system_cpa_cc){
                    if (system_cpa_cc.system_global_name != null && system_cpa_cc.system_global_name != 'null') {
                        if (system_cd.system_global_name == system_cpa_cc.system_global_name) {
                            chain_systems.push({
                                cd : system_cd,
                                cpa_cc : system_cpa_cc
                            });
                        };
                    };
                    
                });
            };
        });

        //console.log("chain_systems: ", chain_systems);
        var thisRow = 0;

        $el.containerDetector.systemChainSelectors.safeAddClass('hide');

        $.each(chain_systems, function (index, chain_system){
            var $this_el = $el.containerDetector.systemChainSelectors.eq(thisRow);

            var system_global_name = chain_system.cd['system_global_name'];

            $this_el.attr('data-system-chain-id', thisRow);

            $this_el.find('.system_global_name').html(system_global_name);

            $this_el.removeClass('hide');

            //  UPDATE COMMS CONTROLS
            var $this_comms = $el.containerDetector.commsControls.eq(thisRow);

            if (chain_system.cd['settings']['cpa_process_datetime'] != undefined) {
                $this_comms.find('input.chain-system-date-picker').eq(0)[0].value = ConvertDatetimeToDate(chain_system.cd['settings']['cpa_process_datetime']);
            };
            
            var $this_comms_cd = $this_comms.find('.comms-cd');
            var $this_comms_cpa_cc = $this_comms.find('.comms-cpa_cc');

            $this_comms.find('.system_global_name').html(system_global_name);
            $this_comms_cd.attr('data-system-id', chain_system.cd['system_unique_id']);
            $this_comms_cpa_cc.attr('data-system-id', chain_system.cpa_cc['system_unique_id']);

            $this_comms.attr('data-cpa-cc-id', chain_system.cpa_cc['system_unique_id']);
            $this_comms.attr('data-cd-id', chain_system.cd['system_unique_id']);   
            $this_comms.attr('data-date-selected', ConvertDatetimeVisionCore( ConvertDatetimeToDate(chain_system.cd['settings']['cpa_process_datetime']) ) );

            thisRow++;
        });



        if (chain_systems.length == 0) {
            $el.containerDetector.systemChainStackConnecting.safeAddClass('active');
        } else {
            $el.containerDetector.systemChainStackConnecting.removeClass('active');
        };

    }



    var Search_Unassigned = function() {


        confidence = $el.containerDetector.tools.confidenceSlider[0].value;

        var search_string = $el.containerDetector.searchInput_unassigned[0].value.toUpperCase();

        $.each(detections, function (index, detection_item){
        
            if (detection_item.status == 'unassigned') {
                var $this_el = detection_item.element;
                $this_el.safeAddClass('hide');

                Compare(detection_item.container_id, search_string);
                
                if (confidence == parseInt(0)) {
                    if (detection_item.container_id.indexOf(search_string) >= 0) {
                        $this_el.removeClass('hide');
                    };
                } else if (parseInt(detection_item.confidence) == confidence) {
                    if (detection_item.container_id.indexOf(search_string) >= 0) {
                        $this_el.removeClass('hide');
                    };
                    
                }; 
            };
            
        });


    }

    var SearchDates = function() {
        alert("Searching Dates...");
    }


    var match_chunks_in_sequence = 9
    var percentage_for_single_match = parseInt(100/match_chunks_in_sequence);

    var smart_match_active = false;

    var ToggleSmartMatch = function() {
        if (smart_match_active) {
            smart_match_active = false;
            $el.containerDetector.smartMatchButton.removeClass('active');
            $.each(detections, function (index, detection_item){
                detection_item.match_percentage = 0;
                detection_item.element.find('.smart-match').safeAddClass('hide');
            });
            return;
        } else {
            smart_match_active = true;
            $el.containerDetector.smartMatchButton.safeAddClass('active');
            $el.containerDetector.unassignedSorter.find("option[value='smart']").prop('selected', true);
            SmartMatch();
        };
    }

    var SmartMatch = function() {

        var manifest_item = GetSelectedManifestItem();
        if (manifest.length <= 0) {
            system.popup.PopupError("There Are No Containers In The Manifest To Cross-Reference.");
            ToggleSmartMatch();
            return;
        };

        var match_chunks = new Array();

        var first_chunk = manifest_item;
        for (i = 0; i <= (first_chunk.container_id.length - 3); i++) {
            match_chunks.push(first_chunk.container_id.slice(i, (i+3)));
        };
        

        OrderAlphabetically();

        $.each(detections, function (index, detection_item){
            detection_item.match_percentage = 0;


            if (detection_item.status == "unassigned") {
                $.each(match_chunks, function (index, chunk){ 
                    if (detection_item.container_id.indexOf(chunk) >= 0) {
                        detection_item.match_percentage += percentage_for_single_match;
                    };
                });

                //console.log("Match Percentage [" + detection_item.container_id + "] = " + detection_item.match_percentage + "%");

            };


            detection_item.element.attr('data-match', detection_item.match_percentage);

            detection_item.element.find('.smart-match span').html(detection_item.match_percentage);
            detection_item.element.find('.smart-match').removeClass('hide');
        });

        var mylist = $el.containerDetector.unassignedColumn;
        var listitems = mylist.children('.stack-item-button').not('.template').get();

        listitems.sort(function(b, a) {
           return $(a).attr('data-match').toUpperCase().localeCompare($(b).attr('data-match').toUpperCase());
        })
        $.each(listitems, function(idx, itm) { mylist.append(itm); });

    }


    var SortUnassigned = function() {
        var filter = $el.containerDetector.unassignedSorter.find("option:selected").attr('value');

        if (filter == "smart") {
            if (smart_match_active) {
                SmartMatch();
            } else {
                OrderAlphabetically();
            };
        } else if (filter == "alpha") {
            OrderAlphabetically();
        } else if (filter == "time") {
            OrderByTime_Unassigned();
        };

    }


    var FilterManifest = function() {
        var filter = $el.containerDetector.manifestFilter.find("option:selected").attr('value');

        $.each(manifest, function (index, manifest_item){
            manifest_item.element.removeClass('hide');

            if (filter == 'all') {

            } else if (filter != manifest_item.status) {
                manifest_item.element.safeAddClass('hide');
            };

        });
    }



    var ImportManifestList = function(manifest_list) {

        $.each(manifest_list, function (index, container_id){
            
            manifest.push( new manifest_item_template.Init(container_id) );

        });

        var mylist = $el.containerDetector.manifestSelector;
        var listitems = mylist.children('.stack-item-button').not('.template').get();

        listitems.sort(function(a, b) {
           return $(a).attr('data-container-id').toUpperCase().localeCompare($(b).attr('data-container-id').toUpperCase());
        })
        $.each(listitems, function(idx, itm) { mylist.append(itm); });

        //console.log(manifest);
        
        PostLoad();
    };
    

    var AddToManifestStack = function(this_manifest_item) {

        $new_selector = $el.containerDetector.manifestSelectorTemplate.clone().appendTo( $el.containerDetector.manifestSelector );
        $new_selector.removeClass('template');
        
        
        
        $new_selector.attr('data-container-id', this_manifest_item.container_id);
        $new_selector.find(".container_id span").html( this_manifest_item.container_id );

        $new_selector.find(".start-datetime .time").html( "00:00:00" );
        $new_selector.find(".end-datetime .time").html( "00:00:00" );

        $new_selector.attr('data-status','unmatched');

        return $new_selector;
    }


    var currentTime = 0;
    var nextTriggerTime = 0;
    var debounceTime = 50;


    var DebounceSlide = function() {
        currentTime = system.core.GetCurrentTime();
        if ( currentTime > nextTriggerTime ) {
            nextTriggerTime = currentTime + debounceTime;
            return true;
        } else {
            return false;
        };
    }

    var listenForChanges_slider = false;

    var SetUpSliders = function() {

        $el.containerDetector.tools.confidenceSlider.on("mousedown", function() {
            listenForChanges_slider = true;
        });

        $el.containerDetector.tools.confidenceSlider.on("mouseup", function() {
            listenForChanges_slider = false;
        });

        $el.body.on("mouseleave", function() {
            listenForChanges_slider = false;
        });


        $el.body.on("mousemove", function() {
            if ( !DebounceSlide() ) {
                return;
            };

            if (listenForChanges_slider) {
                SliderChange(event.target.value);
            };
        });

        $el.containerDetector.tools.confidenceSlider.bind("change", function(event, ui) {
                // use ui.value to get a number
                // do your functions
                SliderChange(event.target.value);
                
            }
        );


        last_confidence = $el.containerDetector.tools.confidenceSlider.value;


    }

    var last_confidence = 0;


    var SliderChange = function(confidence) {
        
        if (last_confidence == confidence) {
            return;
        };
        last_confidence = confidence;

        if (confidence == parseInt(0)) {
            $el.containerDetector.tools.confidenceOutput.html("*");
        } else {
            $el.containerDetector.tools.confidenceOutput.html(confidence);
        };
        



        $.each(detections, function (index, detection_item){
            
            if (detection_item.status == 'unassigned') {
                var $this_el = detection_item.element;
                $this_el.safeAddClass('hide');
                //Compare(detection_item.confidence, confidence);

                if (confidence == parseInt(0)) {
                    $this_el.removeClass('hide');
                } else if (detection_item.confidence == confidence) {
                
                    $this_el.removeClass('hide');
                }; 
            };
            
        });


    }






    var ClearAll = function() {
        ClearManifestStack();
        $.each(detections, function (index, detection_item){
            detection_item.element.remove();
        });

        detections = new Array();

    }

    var ClearStack = function() {
        $.each(detections, function (index, detection_item){
            Unmatch(detection_item);
            detection_item.element.remove();
        });

        detections = new Array();

    };

    var ClearManifestStack = function() {
        $.each(manifest, function (index, manifest_item){
            manifest_item.element.remove();
        });

        manifest = new Array();

    };



    var AddContainersToManifest = function() {

        var container_numbers = $el.containerDetector.addContainersToManifestInput[0].value;

        if (container_numbers.length == 0 || container_numbers == "") {
            system.popup.PopupError("Please Add Container Numbers Separated By A Comma ,");
            return;
        };

        if( container_numbers.indexOf(',') != -1 ){
            var clean_container_numbers = CleanString(container_numbers);
            var containers = clean_container_numbers.split(',');
        }
        else if ( container_numbers.indexOf('[') != -1 ) {

            var good = new Array();
            var bad = new Array();
            var constructed = new Array();
    
            var good_containers = new Array();
    
            var clean_container_numbers = CleanString(container_numbers);
    
            var containers = clean_container_numbers.split(']');
    
            $.each(containers, function(index, value) {
                if( value.indexOf('[Good') != -1 ){
                    var new_value = value.replace('[Good', '');
                    good.push(new_value);
                    good_containers.push(new_value);
                } else if( value.indexOf('[Bad') != -1 ){
                    bad.push(value);
                } else if ( value.indexOf('[') != -1 ) {
                    var new_value = value.replace('[', '');
                    constructed.push(new_value);
                    good_containers.push(new_value);
                };
            }); 


            //  SORT UNIQUE
            var unique_containers = new Array();
            $.each(good_containers, function(index, value) {
                if(jQuery.inArray(value, unique_containers) == -1) {
                    unique_containers.push(value);
                };
            });

            containers = unique_containers;

            console.log("Unique: " + unique_containers.length + " vs. Total: " + good_containers.length);
        } else {
            var containers = container_numbers.split(' ');
        };


        var containerArray = new Array();

        var valid = true;




        //console.log(containers);
        //console.log("bad", bad);
        //console.log("good", good);
        //console.log("constructed", constructed);
        //console.log("good_containers", good_containers);





        $.each(containers, function(index, value) {
            if (value == "") {
                return;
            };
            
            if (value.length != 11) {
                valid = false;
                return;
            };

            containerArray.push(value);
        });

        if (!valid) {
            system.popup.PopupError("There Is An Invalid Container In Your List.");
            return;
        };

        //console.log(containerArray);
        
        ImportManifestList(containerArray);
    }





    var CheckForDetections = function() {
        var post_data = {};
        
        

        post_data['search_date'] = $el.containerDetector.checkForDetectionsInput[0].value;

        if (post_data['search_date'].length == 0 || post_data['search_date'] == "") {
            system.popup.PopupError("Please Enter A Date To Search For Detections.");
            return;
        };

        var this_database_call_id = NewDatabaseCall();

        $.post(
            "database/get_container_detections.php", 
            post_data, 

            function( data ) {

                if (this_database_call_id != database_call_id) {
                    return;
                };

                ClearStack();

                if ( system.db.CheckData(data) ) {


                    data = jQuery.parseJSON( data );


                    if (data.length <= 0) {
                        system.notify.Notify('No Container Detections....', 'important');
                        system.popup.Popup('No Container Detections Found For Search String [' + post_data['search_date'] + "]");
                        return;
                    };


                    system.notify.Notify('Container Detections Found > ' + data.length, 'success');
                    
                    $.each(data, function (index, detection){
                        CreateDetection(detection);
                    });


                    AutoMatch();

                    PostLoad();
                    
                };
        });
    };

    var CheckIfAllDetectionsAreAssigned = function() {
        var all_assigned = true;
        $.each(detections, function (index, detection_item){
            
            if (detection_item.status == 'unassigned' ) {
                all_assigned = false;
            };
        });
        return all_assigned;
    }


    var UpdateDatabaseDetections_CallBack = function() {
        system.popup.ClosePopup();
        

        var post_data = {};


        
        post_data['owner'] = system.core.GetSettings()['owner'];

        
        post_data['search_date'] = $el.containerDetector.checkForDetectionsInput[0].value;

        post_data['assigned'] = new Array();

        $.each(manifest, function (index, manifest_item){
            

            $.each(manifest_item.matched_detections, function (index, detection_item){
                var assigned_item = {};

                assigned_item['alarm_unique_id'] = detection_item.alarm_unique_id;
                assigned_item['container_id'] = manifest_item.container_id;

                post_data['assigned'].push(assigned_item);

            });
        });


        post_data['unassigned'] = new Array();

        $.each(detections, function (index, detection_item){

            if (detection_item.status == 'unassigned' ) {
                var unassigned_item = {};
                unassigned_item['alarm_unique_id'] = detection_item.alarm_unique_id;
                post_data['unassigned'].push(unassigned_item);
            };

        });
        

        post_data['trashed'] = new Array();

        $.each(detections, function (index, detection_item){
            
            if (detection_item.status == 'trashed' ) {
                var trashed_item = {};
                trashed_item['alarm_unique_id'] = detection_item.alarm_unique_id;
                post_data['trashed'].push(trashed_item);
            };
        });



        //UPDATE `event_alarms` SET `related_unique_id`='', `confidence`='12' WHERE `alarm_unique_id`=[value-1]

        console.log('Created Post Data:', post_data);

       //SELECT * FROM `event_alarms` WHERE `event_datetime` LIKE '%2019-06-15%'

        var this_database_call_id = NewDatabaseCall();

        

        system.db.ShowProcessingOverlay();
        $.post(
            "database/update_container_detections.php", 
            post_data, 

            function( data ) {

                if (this_database_call_id != database_call_id) {
                    return;
                };

                console.log(data);

                if ( system.db.CheckData(data) ) {


                    data = jQuery.parseJSON( data );


                    system.popup.Popup("Detections Successfully Updated!");

                    system.notify.Notify('Detections Successfully Updated!');

                    ClearAll();
                    
                    TogglePanel();

                    system.db.HideProcessingOverlay();
                   

                    PostLoad();
                };

        });

    }

    var UpdateDatabaseDetections = function() {

        if (detections.length == 0) {
            system.popup.PopupError("There Are No Detections To Update.");
            return;
        } else if ( !CheckIfAllDetectionsAreAssigned() ) {
            system.popup.PopupQuestionImportant("You Have Not Assigned Or Trashed All Detections.<br /> Are You Sure You Want To Continue?", system.containerDetector.UpdateDatabaseDetections);
            return;
        } else {
            system.popup.PopupQuestion("Updating Vision Core Database.<br /> Are You Sure?", system.containerDetector.UpdateDatabaseDetections);
        };


    };



    var PostLoad = function() {
        $el.containerDetector.manifestButtons.unbind('click');
        $el.containerDetector.manifestButtons = $el.containerDetector.panel.find('#manifest-selector .stack-item-button').not('.template');
        $el.containerDetector.manifestButtons.click(SelectManifestItem);
        $el.containerDetector.manifestButtons.first().trigger('click');
        
        $el.containerDetector.detectionButtons.rightButtons.unbind('click');
        $el.containerDetector.detectionButtons.leftButtons.unbind('click');

        $el.containerDetector.detectionButtons.rightButtons = $el.containerDetector.panel.find('#matched-selector .stack-item-button .right-button, #unassigned-selector .stack-item-button .right-button, #trashed-selector .stack-item-button .right-button');
        $el.containerDetector.detectionButtons.leftButtons = $el.containerDetector.panel.find('#matched-selector .stack-item-button .left-button, #unassigned-selector .stack-item-button .left-button, #trashed-selector .stack-item-button .left-button');
        
        $el.containerDetector.detectionButtons.leftButtons.click(MoveLeft);
        $el.containerDetector.detectionButtons.rightButtons.click(MoveRight);


    }


    var CreateDetection = function(detection) {
        detections.push( new detection_item_template.Init( detection ) );
    };



    var AddToDetectionStack = function(detection) {

        if (detection.status == 'trashed') {
            $new_selector = $el.containerDetector.databaseSelectorTemplate.clone().appendTo( $el.containerDetector.trashedColumn );
        } else {
            $new_selector = $el.containerDetector.databaseSelectorTemplate.clone().appendTo( $el.containerDetector.unassignedColumn );
        };
        

        $new_selector.removeClass('template');

        $new_selector.attr('data-alarm-unique-id', detection.alarm_unique_id);

        $new_selector.find(".container_id span").html( detection.container_id );
        $new_selector.find(".datetime span").html( detection.event_datetime.slice(11, detection.event_datetime.length+1) );
        $new_selector.find(".confidence span").html( detection.confidence );
        $new_selector.attr('data-status', 'unassigned');
        $new_selector.attr('data-container-id', detection.container_id);

        return $new_selector;
    }


    var AutoMatch = function() {

        $.each(manifest, function (index, manifest_item){
            $.map(detections, function(detection_item) {
                if( detection_item.container_id == manifest_item.container_id ) {
                    
                    if (detection_item.status != 'matched') {
                        Match(manifest_item, detection_item);
                    };
                    
                };
            });
        });


        RefreshColumns();
    };

    
    var Unmatch = function(detection_item) {

        $.each(manifest, function (index, manifest_item){
            
            var detection_to_remove = null;
            $.map(manifest_item.matched_detections, function(this_detection_item) {
                //console.log(this_detection_item, detection_item);


                if( detection_item.container_id == this_detection_item.container_id ) {

                    console.log("Unmatched ", this_detection_item.container_id);
                    detection_to_remove = this_detection_item;
                    


                    manifest_item.matched_detections.splice($.inArray(detection_to_remove, manifest_item.matched_detections),1);
                };

              
                
                


            });

            if (manifest_item.matched_detections.length > 0) {
                var new_list =  manifest_item.matched_detections.sort(function(a, b) {
                    var string_1 = a.event_datetime.slice(11, manifest_item.matched_detections[0].event_datetime.length+1).toUpperCase().replace(':', '');
                    var string_2 = b.event_datetime.slice(11, manifest_item.matched_detections[0].event_datetime.length+1).toUpperCase().replace(':', '');
                    //console.log(string_1 + " -- " + string_2 + " = " + string_1.localeCompare(string_2));
                    return string_1.localeCompare(string_2);
                });

                manifest_item.matched_detections = new Array();

                $.each(new_list, function(idx, itm) { manifest_item.matched_detections.push(itm); });

                //console.log("first: " + manifest_item.matched_detections[0].event_datetime.slice(11, manifest_item.matched_detections[0].event_datetime.length+1) );
                //console.log("last: " + manifest_item.matched_detections[manifest_item.matched_detections.length-1].event_datetime.slice(11, manifest_item.matched_detections[0].event_datetime.length+1) );

                manifest_item.element.find('.start-datetime .time').html(manifest_item.matched_detections[0].event_datetime.slice(11, manifest_item.matched_detections[0].event_datetime.length+1));
                manifest_item.element.find('.end-datetime .time').html(manifest_item.matched_detections[manifest_item.matched_detections.length-1].event_datetime.slice(11, manifest_item.matched_detections[0].event_datetime.length+1));
            };

            

            if (manifest_item.matched_detections.length <= 0) {
                manifest_item.status = "unmatched";
                manifest_item.element.attr('data-status', 'unmatched');
            };
        });
    };


    var Match = function(manifest_item, detection_item) {
        detection_item.status = "matched";
        detection_item.element.attr('data-status', 'matched');

        manifest_item.status = "matched";
        manifest_item.element.attr('data-status', 'matched');
        
        MoveDetectionToColumn(detection_item, $el.containerDetector.matchedColumn);

        if (jQuery.inArray(detection_item, manifest_item.matched_detections) < 0) {
            manifest_item.matched_detections.push(detection_item);
        };


        if (manifest_item.matched_detections.length > 0) {
            var new_list =  manifest_item.matched_detections.sort(function(a, b) {
                var string_1 = a.event_datetime.slice(11, manifest_item.matched_detections[0].event_datetime.length+1).toUpperCase().replace(':', '');
                var string_2 = b.event_datetime.slice(11, manifest_item.matched_detections[0].event_datetime.length+1).toUpperCase().replace(':', '');
                //console.log(string_1 + " -- " + string_2 + " = " + string_1.localeCompare(string_2));
                return string_1.localeCompare(string_2);
            });

            manifest_item.matched_detections = new Array();

            $.each(new_list, function(idx, itm) { manifest_item.matched_detections.push(itm); });

            //console.log("first: " + manifest_item.matched_detections[0].event_datetime.slice(11, manifest_item.matched_detections[0].event_datetime.length+1) );
            //console.log("last: " + manifest_item.matched_detections[manifest_item.matched_detections.length-1].event_datetime.slice(11, manifest_item.matched_detections[0].event_datetime.length+1) );

            manifest_item.element.find('.start-datetime .time').html(manifest_item.matched_detections[0].event_datetime.slice(11, manifest_item.matched_detections[0].event_datetime.length+1));
            manifest_item.element.find('.end-datetime .time').html(manifest_item.matched_detections[manifest_item.matched_detections.length-1].event_datetime.slice(11, manifest_item.matched_detections[0].event_datetime.length+1));
        };
        
        
    };


    var MoveRight = function() {
        var alarm_unique_id = $(this).closest('.stack-item-button').attr('data-alarm-unique-id');

        var detection = GetDetectionFromAlarmId(alarm_unique_id);

        

        if (detection.status == 'unassigned') {
            UpdateStatus(detection, 'trashed');
            MoveDetectionToColumn(detection, $el.containerDetector.trashedColumn);
        }if (detection.status == 'matched') {
            Unmatch(detection);
            UpdateStatus(detection, 'unassigned');
            MoveDetectionToColumn(detection, $el.containerDetector.unassignedColumn);
        };

        RefreshColumns();

    };




    var MoveLeft = function() {
        var alarm_unique_id = $(this).closest('.stack-item-button').attr('data-alarm-unique-id');

        var detection = GetDetectionFromAlarmId(alarm_unique_id);

        if (detection.status == 'unassigned') {
            var manifest_item = GetSelectedManifestItem()
            if (manifest_item != null) {
                Match(manifest_item, detection);
                UpdateStatus(detection, 'matched');
                MoveDetectionToColumn(detection, $el.containerDetector.matchedColumn);
            };
        }if (detection.status == 'trashed') {
            UpdateStatus(detection, 'unassigned');
            MoveDetectionToColumn(detection, $el.containerDetector.unassignedColumn);
        };
      
        RefreshColumns();
    };



    var UpdateStatus = function(detection, status) {
        detection.status = status;
        detection.element.attr('data-status', status);
    }

    var MoveDetectionToColumn = function(detection_item, $column) {
        detection_item.element.prependTo($column);
    };


    var GetSelectedManifestItem = function() {
        var container_id = $el.containerDetector.panel.find('#manifest-selector .stack-item-button.selected').attr('data-container-id');
        return GetManifestItemFromContainerId(container_id);
    }



    var SelectManifestItem = function() {
        
        $el.containerDetector.manifestButtons.removeClass('selected');

        $(this).safeAddClass('selected');
        
        ShowSelectedItemMatches($(this).attr('data-container-id'));
        
        RefreshColumns();
    }



    var ShowSelectedItemMatches = function(container_id) {

        $.each(manifest, function (index, manifest_item){

            //Compare(manifest_item.container_id, container_id);

            if (manifest_item.container_id == container_id) {
                manifest_item.selected = true;
            } else {
                manifest_item.selected = false;
            };


        });
    }

    var RefreshColumns = function() {

        $.each(detections, function (index, detection_item){
            if (detection_item.status == "matched") {
                detection_item.element.removeClass('active');
            };
        });


        $.map(manifest, function(manifest_item) {
            
            if( manifest_item.selected ) {
                //console.log(manifest_item);
                $.each(manifest_item.matched_detections, function (index, detection){
                    detection.element.safeAddClass('active');
                });
            };
        });


        
        

        SortUnassigned();

        UpdateColumnCounts();

        OrderByTime_Matched();
        OrderByTime_Manifest();
        FilterManifest();
        CountTotalUniqueContainers();
    };


    var OrderByTime_Unassigned = function() {
        var mylist = $el.containerDetector.unassignedColumn;
        var listitems = mylist.children('.stack-item-button').not('.template').get();

        listitems.sort(function(a, b) {
           return $(a).find('.datetime .time').html().toUpperCase().localeCompare($(b).find('.datetime .time').html().toUpperCase());
        })
        $.each(listitems, function(idx, itm) { mylist.append(itm); });
    }


    var OrderAlphabetically = function() {
        var mylist = $el.containerDetector.unassignedColumn;
        var listitems = mylist.children('.stack-item-button').not('.template').get();

        listitems.sort(function(a, b) {
           return $(a).attr('data-container-id').toUpperCase().localeCompare($(b).attr('data-container-id').toUpperCase());
        })
        $.each(listitems, function(idx, itm) { mylist.append(itm); });
    }


    var OrderByTime_Matched = function() {
        var mylist = $el.containerDetector.matchedColumn;
        var listitems = mylist.children('.stack-item-button').not('.template').get();

        listitems.sort(function(a, b) {
           return $(a).find('.datetime .time').html().toUpperCase().localeCompare($(b).find('.datetime .time').html().toUpperCase());
        })
        $.each(listitems, function(idx, itm) { mylist.append(itm); });
    }

    var OrderByTime_Manifest = function() {
        var mylist = $el.containerDetector.manifestSelector;
        var listitems = mylist.children('.stack-item-button').not('.template').get();

        listitems.sort(function(a, b) {
           return $(a).find('.start-datetime .time').html().toUpperCase().localeCompare($(b).find('.start-datetime .time').html().toUpperCase());
        })
        $.each(listitems, function(idx, itm) { mylist.append(itm); });
    }


    var UpdateColumnCounts = function() {
        //  COLUMN COUNTS
        $el.containerDetector.manifestCount.html(manifest.length);

        var matched = 0;
        var unassigned = 0;
        var trashed = 0;

        $.each(detections, function (index, detection_item){
            if (detection_item.status == "matched") {
                matched++;
            } else if (detection_item.status == "unassigned") {
                unassigned++;
            } else if (detection_item.status == "trashed") {
                trashed++;
            } else;
        });

        $el.containerDetector.matchedCount.html(matched);
        $el.containerDetector.unassignedCount.html(unassigned);
        $el.containerDetector.trashedCount.html(trashed);
    }

    var GetManifestItemFromContainerId = function(container_id) {
        var manifest_item = null;

        $.map(manifest, function(this_manifest_item) {
            
            if( this_manifest_item.container_id == container_id ) {
                manifest_item = this_manifest_item;
            };

        });

        return manifest_item;
    };

    var GetDetectionFromAlarmId = function(alarm_unique_id) {
        var detection = null;

        $.map(detections, function(detection_item) {
            
            if( detection_item.alarm_unique_id == alarm_unique_id ) {
                detection = detection_item;
            };

        });

        return detection;
    };


    var CountTotalUniqueContainers = function() {
        //console.log("CountTotalUniqueContainers()");
        
        UpdateTotalUniqueContainers();

        $el.containerDetector.tools.metaTotalUnique.html(total_unique_detections.length);
        $el.containerDetector.tools.metaTotal.html(detections.length);
    }

    var CopyUniqueContainerToClipboard = function() {
        UpdateTotalUniqueContainers();
        var copy_string = "";

        var last_item = total_unique_detections.reverse()[0];

        total_unique_detections.reverse();

        $.each(total_unique_detections, function(index, value) {
            copy_string += value;
            if ( last_item != value) {
                copy_string += "\n";
            };
        });


        input.CopyToClipboard(copy_string);
    }

    var UpdateTotalUniqueContainers = function() {
        total_unique_detections = new Array();
        $.each(detections, function(index, value) {
            if(jQuery.inArray(value.container_id, total_unique_detections) == -1) {
                total_unique_detections.push(value.container_id);
            };
        });

    }





    //  INITIALIZE
    Init();



    //  EXTERNAL FUNCTIONS
    return {


        IsActive: function() {
            return $el.event.panel.hasClass('active');
        },

        UpdateDatabaseDetections: function() {
            UpdateDatabaseDetections_CallBack();
        },

        TogglePanel: function(status) {
            TogglePanel(status );
        },

        UpdateSystemsUI: function(systems_cd, systems_cpa_cc) {
            UpdateSystemsUI(systems_cd, systems_cpa_cc);   
        }

    }
};
