<div id="grabs" data-file-id="grabs" data-file-index="4" class="file-slide row draggable" data-drag-direction="x" data-slide-min="150" data-slide-max="200">

    <div data-file-id="grabs" class="file-slide-tag file-slide-button">
        <div class="triangle-left"></div>
        <div class="tag-header">GRABS</div>
        <div class="triangle-right"></div>
    </div>
   

    <div class="stack-column">
        <?php 
            include("loading_animation_stack.php");
        ?>

<!--         <div data-file-id="logs" class="stack-item-button file-slide-button" data-stack-item-id="">
            <div class="stack-item-button-selector">  
                <div class="data" data-id="*"></div>
                <div>SHOW ALL GRABS</div>
                <div class="selected-triangle"></div>
            </div>    
        </div>  -->

        <div class="template stack-item-button dropdown" data-stack-item-id="">
            <div class="stack-item-button-selector">
                <div class="data" data-id=""></div>

                <div class="line_number"><span></span>:</div>
                <div class="data-output-stack-button" data-line-id="grab_unique_id"><span></span></div>
                <div class="data-output-stack-button" data-line-id="weight"><span></span>kg</div>
                
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
        <div class="stack-display">

<!--             <div class="loading-overlay">
                <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div> -->
            

            <div class="no-data-display">
                <div class="header">
                    <div class="header_text" data-line-id="grab_id">
                        No Grabs<span></span>
                    </div>
                </div>
            </div>

            <div class="data-display">

                <div class="data-output">
                    <div class="header">
                        <div class="header_text" data-line-id="grab_id">
                            Grab<span></span>
                        </div>

                        <div class="header-controls">
                            <button class="prev-button icon-left-open-big">
                            </button>
                            <button class="next-button icon-right-open-big">
                            </button>
                        </div>

                    </div>
                </div>


                <div class="display-img-wrap">
                    <img class="display-img" data-line-id="grab_img_url" src="" alt="">
                    <div class="template bounding-box">
                        <div class="log-info-popup">
                            <div class="popup-triangle"></div>
                            <img class="log_img_url" src="" alt="">
                            <div>Log Id:<span class="log_id">XXXXXX</span></div>
                            <div>JAS D:<span class="jas_diameter">XX.XX</span>cm</div>
                            <div>JAS CBM:<span class="jas_cbm">XX</span>cbm</div>
                        </div>
                    </div>
                </div>

                <div class="data-output">
                    <div class="data-line data-output-line" data-line-id="timestamp">Grab Time: <span></span></div>
                    <div class="data-line">Grab Id: <span>A012XCD</span></div>
                    <div class="data-line">Log Count: <span>#</span></div>
                    <div class="data-line">Operator: <span>Bob</span></div>
                    <div class="data-line data-output-line" data-line-id="timestamp">Grab Time: <span></span></div>
                    <div class="data-line data-output-line" data-line-id="timestamp">Grab Id: <span></span></div>
                </div>

            
            </div>





        </div>
    </div>


</div>