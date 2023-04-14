<div id="logs" data-file-id="logs" data-file-index="5" class="file-slide row draggable" data-drag-direction="x" data-slide-min="150" data-slide-max="200">

    <div data-file-id="logs" class="file-slide-tag file-slide-button">
        <div class="triangle-left"></div>
        <div class="tag-header">LOGS</div>
        <div class="triangle-right"></div>
    </div>
   

    <div class="stack-column column-10">
        <div class="stack-item-header">
            
            <div class="img-header">
                LOG
            </div>

            <div class="img-header">
                BARCODE
            </div>
            
            <div class="text-header">Id</div>
            <div class="text-header">DIAMETER</div>
            <div class="text-header">JAS DIAMETER</div>
            <div class="text-header">JAS CBM</div>           

        </div>  

        <div class="template stack-item-button" data-stack-item-id="">
            <div class="stack-item-button-selector selector-disabled">
                <div class="data" data-id=""></div>

                <div class="data-output-stack-button-img" data-line-id="log_img_url">
                    <img src="" alt="">
                    <?php 
                        include("loading_animation_button.php");
                    ?>
                </div>

                <div class="data-output-stack-button-img" data-line-id="barcode_img_url">
                    <img src="" alt="">
                    <?php 
                        include("loading_animation_button.php");
                    ?>
                </div>
                

                <div class="data-output-stack-button" data-line-id="log_id"><span>BARCODE</span></div>
                <div class="data-output-stack-button" data-line-id="actual_diameter"><span>DIAMETER</span></div>
                <div class="data-output-stack-button" data-line-id="jas_diameter"><span>JAS DIAMETER</span></div>
                <div class="data-output-stack-button" data-line-id="jas_cbm"><span>JAS CBM</span></div>           
                
                <div class="selected-triangle"></div>
            </div> 
        </div>  

    </div>

    
<!--     <div class="column-8 stack-display-column">
        <div class="stack-display">
            
            <div class="display-data">
            </div>

            <div class="data-output">
                <div class="data-output-line" data-line-id="log_id">Log Id: <span></span></div>
             
            </div>

        </div>
    </div> -->

</div>