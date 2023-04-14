<div id="containers" data-file-id="containers" data-file-index="3" class="file-slide row draggable" data-drag-direction="x" data-slide-min="150" data-slide-max="200">
    
    <div data-file-id="containers" class="file-slide-tag file-slide-button">
        <div class="triangle-left"></div>
        <div class="tag-header">CONTAINERS</div>
        <div class="triangle-right"></div>
    </div>
   

    <div class="stack-column">
        <?php 
            include("loading_animation_stack.php");
        ?>

<!--         <div data-file-id="grabs" class="stack-item-button file-slide-button" data-stack-item-id="">
            <div class="stack-item-button-selector">    
                <div class="data" data-id="*"></div>
                <div>SHOW ALL CONTAINERS</div>
                <div class="selected-triangle"></div>
            </div>
        </div>  -->

        <?php if ($_SESSION["user_type"] == 'super_admin' || $_SESSION["user_type"] == 'admin'): ?>  
            <div class="create-item-button">
                <div class="create-item-button-selector">
                    <div><span>CREATE NEW <i class='icon-plus-1'></i></span></div>
                    <div class="selected-triangle"></div>
                </div>
            </div>  
        <?php endif; ?>

        <div class="template stack-item-button dropdown no-events" data-stack-item-id="">
            <div class="stack-item-button-selector">
                <div class="data" data-id=""></div>

                
                <div class="data-output-stack-button" data-line-id="container_id"><span class="copyable">CONT#######</span></div>
                
                <div class="selected-triangle"></div>
            </div>

            <div class="stack-item-drop-down">
                <button class="view-button button-blue">VIEW</button>
            </div>
        </div>  

    </div>

    
    <div class="stack-display-column">
        <?php 
            include("loading_animation.php");
        ?>

        <div class="data-display stack-display">
            
            <div class="display-data">
            </div>

            <div class="data-output">
                <div class="header">
                
                    <div class="header_text data-output-line" data-line-id="container_id">
                        <span></span>
                    </div>
                
                    <div class="header-controls">
                        <button class="prev-button icon-left-open-big">
                        </button>

                        <?php if ($_SESSION["user_type"] == 'super_admin' || $_SESSION["user_type"] == 'admin'): ?>   
                            <button class="next-button icon-right-open-big">
                            </button>
                        <?php endif; ?>  

                    </div>
                    
                </div>

                <div class="data-line data-output-line" data-line-id="container_id">Container Id: <span></span></div>
                
                <div class="template event-output" data-event-type="Container_Chain">
                    <div class="event-meta">
                        <div class="event-header"><i class="icon-truck"></i>CONTAINER CHAIN</div>
                        <div class="data-output-event-line" data-line-id="event_unique_id"><i class="icon-bell-alt"></i> Event Id: <span></span></div>
                        <div class="data-output-event-line" data-line-id="video_unique_id"><i class="icon-star"></i> Video Id: <span></span></div>
                        <div class="data-output-event-line" data-line-id="start_datetime"><i class="icon-calendar"></i> Start: <span></span></div>
                        <div class="data-output-event-line" data-line-id="end_datetime"><i class="icon-calendar"></i> End: <span></span></div>
                        <div class="data-output-event-line" data-line-id="channel_number"><i class="icon-fork"></i> Video Channel: <span></span></div>
                        <a class="download-video" target="_blank" href="" download><i class="icon-download"></i> Download</a>
                        <!-- <div class="data-output-event-line" data-line-id="event_type">event_type: <span></span></div>
                        <div class="data-output-event-line" data-line-id="event_unique_id">event_unique_id: <span></span></div>
                        
                        <div class="data-output-event-line" data-line-id="event_action">event_action: <span></span></div>
                        <div class="data-output-event-line" data-line-id="event_status">event_status: <span></span></div> -->
                    </div>
                    <div class="data-output-event-display" data-display-id="ftp_url">
                        <video width="320" controls>
                            <source class="data-event-display-url" src="" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                        <img src="" alt="">
                    </div>
                </div>

                <div class="template event-output" data-event-type="container_down">
                    <div class="event-meta">
                        <div class="event-header"><i class="icon-down-bold"></i>CONTAINER DOWN</div>
                        <div class="data-output-event-line" data-line-id="timestamp"><i class="icon-calendar"></i> <span></span></div>
                        <div class="data-output-event-line" data-line-id="alarm_unique_id"><i class="icon-star"></i> Alarm Id: <span></span></div>                     
                        <a class="download-video" target="_blank" href="" download><i class="icon-download"></i> Download</a>
                        <!-- <div class="data-output-event-line" data-line-id="event_type">event_type: <span></span></div>
                        <div class="data-output-event-line" data-line-id="event_unique_id">event_unique_id: <span></span></div>
                        <div class="data-output-event-line" data-line-id="alarm_unique_id">alarm_unique_id: <span></span></div>
                        <div class="data-output-event-line" data-line-id="event_action">event_action: <span></span></div>
                        <div class="data-output-event-line" data-line-id="event_status">event_status: <span></span></div> -->
                    </div>
                    <div class="data-output-event-display" data-display-id="video_url">
                        <div class="event-display-null">Uploading...</div>
                        <div class="event-display-data">
                            <video width="320" controls>
                                <source class="data-event-display-url" src="" type="video/mp4">
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                </div>

                <div class="template event-output" data-event-type="container_push">
                    <div class="event-meta">
                    <div class="event-header"><i class="icon-right-bold"></i>CONTAINER PUSH</div>
                        <div class="data-output-event-line" data-line-id="timestamp"><i class="icon-calendar"></i> <span></span></div>
                        <div class="data-output-event-line" data-line-id="alarm_unique_id"><i class="icon-star"></i> Alarm Id: <span></span></div>                     
                        <a class="download-video" target="_blank" href="" download><i class="icon-download"></i> Download</a>
                        <!-- <div class="data-output-event-line" data-line-id="event_type">event_type: <span></span></div>
                        <div class="data-output-event-line" data-line-id="event_unique_id">event_unique_id: <span></span></div>
                        <div class="data-output-event-line" data-line-id="alarm_unique_id">alarm_unique_id: <span></span></div>
                        <div class="data-output-event-line" data-line-id="event_action">event_action: <span></span></div>
                        <div class="data-output-event-line" data-line-id="event_status">event_status: <span></span></div> -->
                    </div>
                    <div class="data-output-event-display" data-display-id="video_url">
                        <div class="event-display-null">Uploading...</div>
                        <div class="event-display-data">
                            <video width="320" controls>
                                <source class="data-event-display-url" src="" type="video/mp4">
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                </div>

                <div class="template event-output" data-event-type="container_up">
                    <div class="event-meta">
                    <div class="event-header"><i class="icon-up-bold"></i>CONTAINER UP</div>
                        <div class="data-output-event-line" data-line-id="timestamp"><i class="icon-calendar"></i> <span></span></div>
                        <div class="data-output-event-line" data-line-id="alarm_unique_id"><i class="icon-star"></i> Alarm Id: <span></span></div>                   
                        <a class="download-video" target="_blank" href="" download><i class="icon-download"></i> Download</a>
                        <!-- <div class="data-output-event-line" data-line-id="event_type">event_type: <span></span></div>
                        <div class="data-output-event-line" data-line-id="event_unique_id">event_unique_id: <span></span></div>
                        <div class="data-output-event-line" data-line-id="alarm_unique_id">alarm_unique_id: <span></span></div>
                        <div class="data-output-event-line" data-line-id="event_action">event_action: <span></span></div>
                        <div class="data-output-event-line" data-line-id="event_status">event_status: <span></span></div> -->
                    </div>
                    <div class="data-output-event-display" data-display-id="video_url">
                        <video width="320" controls>
                            <source class="data-event-display-url" class="" src="" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                        <img src="" alt="">
                    </div>
                </div>

            </div>
            
        </div>

        <div class="create-display stack-display">

                <form class="data-input">

                    <input class="hide order_unique_id" type="text" name="order_unique_id" placeholder="order_unique_id">

                    <div class="header">
                        <div class="header_text">
                            Create New Container
                        </div>
                        <div class="header-controls">
                            <button type="submit" class="create-button icon-right-open-big">
                            </button>
                        </div>
                    </div>

                    <div class="data-input-line input-line mandatory">
                        <input id="container_id" type="text" name="container_id" placeholder="Container Id">
                    </div>

                </form>

            </div>

    </div>


</div>