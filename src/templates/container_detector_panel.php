<div id="container-detector-panel" class="vertical-panel" data-event-type="" data-event-action="">

    <div id="container-detector-inner-panel">
        <div class="container-detector-header">
            <div class="header-text">
                Container Detector
            </div>
            <div class="container-detector-controls">
                <button class="system-chain-button icon-tools">
                </button>
                <button class="close-container-detector-button icon-cancel-1">
                </button>
            </div>
        </div>
        
        <div id="system-chain-stack">
            <?php 
                include("loading_animation_panel.php");
            ?>
        
            <div class="system-chain-selector hide" data-system-chain-id="-1">
                <div class="system_global_name">
                    Connecting To Container Chain Systems....
                </div> 
            </div>
            <div class="system-chain-selector hide" data-system-chain-id="-1">
                <div class="system_global_name">
                    Connecting To Container Chain Systems....
                </div> 
            </div>
            <div class="system-chain-selector hide" data-system-chain-id="-1">
                <div class="system_global_name">
                    Connecting To Container Chain Systems....
                </div> 
            </div>
            <div class="system-chain-selector hide" data-system-chain-id="-1">
                <div class="system_global_name">
                    Connecting To Container Chain Systems....
                </div> 
            </div>
            <div class="system-chain-selector hide" data-system-chain-id="-1">
                <div class="system_global_name">
                    Connecting To Container Chain Systems....
                </div> 
            </div>
            <div class="system-chain-selector hide" data-system-chain-id="-1">
                <div class="system_global_name">
                    Connecting To Container Chain Systems....
                </div> 
            </div>
            <div class="system-chain-selector hide" data-system-chain-id="-1">
                <div class="system_global_name">
                    Connecting To Container Chain Systems....
                </div> 
            </div>
            <div class="system-chain-selector hide" data-system-chain-id="-1">
                <div class="system_global_name">
                    Connecting To Container Chain Systems....
                </div> 
            </div>
            <div class="system-chain-selector hide" data-system-chain-id="-1">
                <div class="system_global_name">
                    Connecting To Container Chain Systems....
                </div> 
            </div>
            <div class="system-chain-selector hide" data-system-chain-id="-1">
                <div class="system_global_name">
                    Connecting To Container Chain Systems....
                </div> 
            </div>
            <div class="system-chain-selector hide" data-system-chain-id="-1">
                <div class="system_global_name">
                    Connecting To Container Chain Systems....
                </div> 
            </div>
            <div class="system-chain-selector hide" data-system-chain-id="-1">
                <div class="system_global_name">
                    Connecting To Container Chain Systems....
                </div> 
            </div>
        </div>

        <div class="container-detector-tools">
            <?php 
                include("loading_animation_panel.php");
            ?>

            <div class="container-detector-tool-output">
                <div id="confidence-tool-output">
                    Confidence: <span>*</span>
                </div>
            </div>

            <div id="container-detector-confidence-slider" class="container-detector-tool">
                <input type="range" min="0" max="12" value="0" class="slider">
            </div>

            <div id="comms-container-detector">

                

            <div class="chain-system" data-cd-id="-1" data-cpa-cc-id="-1" data-date-selected="Connecting...">
                    <div class="system_global_name">
                        Connecting....
                    </div>

                    <input class="chain-system-date-picker date-input date-picker" type="text" name="date" placeholder="Connecting.." data-toggle="datepicker" readonly="readonly" data-comm="cpa_process_datetime">

                    <div class="comms-row comms-cd" data-system-id="-1">

                        <button class="revert-detections-button" data-comm="revert_detection_matches">
                            <i class="icon-ccw"></i>   
                        </button>
                        
 <!--                   <button disabled class="locked-button">
                            <i class="icon-lock"></i>   
                        </button>
-->
                        <button class="save-detections-button" data-comm="save_detection_matches">
                            <i class="icon-floppy"></i>   
                        </button>

<!--                         
                        <button disabled class="locked-button">
                            <i class="icon-lock"></i>   
                        </button> 

                        <button disabled class="locked-processing">
                            <i class="icon-hourglass"></i>   
                        </button>
                        -->

                    </div>

                    <div class="comms-row comms-cpa_cc" data-system-id="-1">
                        <button class="process-detections-button" data-comm="process_detection_matches">
                            <i class="icon-paper-plane-empty"></i>   
                        </button>

<!-- 
                        <button disabled class="locked-processing">
                            <i class="icon-hourglass"></i>   
                        </button>
                        <button disabled class="locked-button">
                            <i class="icon-lock"></i>   
                        </button> -->
                    </div>
                </div>

                <div class="chain-system" data-cd-id="-1" data-cpa-cc-id="-1" data-date-selected="Connecting...">
                    <div class="system_global_name">
                        Connecting....
                    </div>

                    <input class="chain-system-date-picker date-input date-picker" type="text" name="date" placeholder="Connecting.." data-toggle="datepicker" readonly="readonly" data-comm="cpa_process_datetime">

                    <div class="comms-row comms-cd" data-system-id="-1">

                        <button class="revert-detections-button" data-comm="revert_detection_matches">
                            <i class="icon-ccw"></i>   
                        </button>
                        
 <!--                   <button disabled class="locked-button">
                            <i class="icon-lock"></i>   
                        </button>
-->
                        <button class="save-detections-button" data-comm="save_detection_matches">
                            <i class="icon-floppy"></i>   
                        </button>

<!--                         
                        <button disabled class="locked-button">
                            <i class="icon-lock"></i>   
                        </button> 

                        <button disabled class="locked-processing">
                            <i class="icon-hourglass"></i>   
                        </button>
                        -->

                    </div>

                    <div class="comms-row comms-cpa_cc" data-system-id="-1">
                        <button class="process-detections-button" data-comm="process_detection_matches">
                            <i class="icon-paper-plane-empty"></i>   
                        </button>

<!-- 
                        <button disabled class="locked-processing">
                            <i class="icon-hourglass"></i>   
                        </button>
                        <button disabled class="locked-button">
                            <i class="icon-lock"></i>   
                        </button> -->
                    </div>
                </div>

<!-- 
                <div class="chain-system" data-cd-id="-1" data-cpa-cc-id="-1">
                    <div class="system_global_name">
                        Connecting....
                    </div> 
                    <div class="comms-row comms-cd" data-system-id="-1">

                        <input class="date-input date-picker" type="text" name="date" placeholder="Connecting.." data-toggle="datepicker" readonly="readonly" data-comm="cd_process_datetime">

                        <button class="date-input-button" data-toggle="datepicker" data-comm="cpa_push" data-replace-date="<i class='icon-download-cloud'></i>">
                            <i class="icon-download-cloud"></i>   
                        </button>
                        
                        <button class="date-input-button" data-toggle="datepicker" data-comm="cpa_pull" data-replace-date="<i class='icon-download-cloud'></i>">
                            <i class="icon-upload-cloud"></i>   
                        </button>

                        <button class="date-input-button" data-toggle="datepicker" data-comm="cpa_pull" data-replace-date="<i class='icon-download-cloud'></i>">
                            <i class="icon-upload-cloud"></i>   
                        </button>
                    </div>
                    <div class="comms-row comms-cpa_cc" data-system-id="-1">

                    </div>
                </div> -->

            </div>



 
            <div class="container-detector-tool-output">
                <div id="date-selector-tool-output">
                    <input id="check-detections-input" class="date-input" type="text" name="date" placeholder="YYYY-MM-DD">
                    <button id="check-detections" class="date-input-button">
                        <i class="icon-search"></i>                          
                    </button> 
                </div>
            </div>
<!-- 
            <div class="container-detector-tool-output">
                <input id="container-detector-add-input" class="date-input" type="text" name="container-detector-add" placeholder="CONT#######, CONT#######">
                <button id="container-detector-add-button" class="icon-list-add">                      
                </button>
            </div>
            
            <div class="container-detector-tool-output" id="container-detector-meta">
                <div>
                    Unique/Total: 
                    <span id="total-unique-containers" >0</span>/<span id="total-containers" >0</span>
                </div>
                <button id="copy-unique" class="icon-share">
                </button>
            </div>

            <div class="container-detector-tool-output">
                <button id="smart-match" class="icon-fork">
                </button>
            </div>

            <div class="container-detector-tool-output">
                <button id="update-database" class="icon-right-open-big">
                </button>
            </div> -->
        </div>

        

        <div class="container-detector-inner-panel">

            <div id="manifest-list-column" class="container-detector-list-column filter-controls">
                <div class="list-header">
                    <div class="header-text">
                        MANIFEST | <span id="manifest-count">0</span>
                    </div>
                    <div class="header-filter manifest-selector">
                        <select class="filter">
                            <option value="all">All</option>
                            <option value="matched">Matched</option>
                            <option value="unmatched">Unmatched</option>
                        </select>
                    </div>
                </div>
                <div id="manifest-selector" class="manifest-stack stack-menu">
                    <div class="stack-item-button template">
                        <div class="data" data-id=""></div>
                        <div class="container_id">
                            <span>AAAA#######</span>    
                        </div>
                        <div class="meta">
                            <span class="start-datetime">
                                <span class="time">00:00:00</span> >
                            </span>
                            <span class="end-datetime">
                                <span class="time">00:00:00</span>
                            </span>
                        </div>
                        <div class="selected-triangle"></div>
                    </div>

                </div>
            </div>

            <div class="container-detector-list-column">
                <div class="list-header">
                    MATCHED <span id="matched-count">0</span>
                </div>

                <div id="matched-selector" class="matched-stack stack-menu">


                </div>
            </div>

            <div id="unassigned-list-column" class="container-detector-list-column filter-controls">
                <div class="list-header">
                    <div class="header-text">
                        UNASSIGNED | <span id="unassigned-count">0</span>
                    </div>

                    <div class="header-filter unassigned-selector">
                        <select class="sorter">
                            <option value="alpha">Alpha</option>
                            <option value="time">Time</option>
                            <option value="smart">Smatch</option>
                        </select>
                    </div>

                    <div class="header-search unassigned-selector">
                        <input class="search-input" type="text" name="search" placeholder="Search....">
                        <button class="search-button">
                            <i class="icon-search"></i>                          
                        </button> 
                    </div>
                </div>

                <div id="unassigned-selector" class="unassigned-stack stack-menu">

                    <div class="stack-item-button template">
                        <div class="data" data-id=""></div>
                        <div class="left-button item-button">+</div>
                        <div class="container_id">
                            <span>AAAA#######</span>    
                        </div>
                        <div class="meta">
                            <span class="datetime">
                                <span class="time">00:00:00</span> |
                            </span>
                            <span class="confidence">
                                <span>0</span>
                            </span>
                            <span class="smart-match hide">
                                : <span>0</span>%
                            </span>
                        </div>
                        <div class="right-button item-button">-</div>
                        <div class="selected-triangle"></div>
                    </div>

                </div>
            </div>


            <div class="container-detector-list-column">
                <div class="list-header">
                    TRASH <span id="trashed-count">0</span>
                </div>

                <div id="trashed-selector" class="trashed-stack stack-menu">


                </div>
            </div>



        </div>
        
    </div>
    
</div>