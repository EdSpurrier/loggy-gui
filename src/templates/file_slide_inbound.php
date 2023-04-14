<div id="inbound" data-file-id="inbound" data-file-index="3" class="file-slide row draggable" data-drag-direction="x" data-slide-min="150" data-slide-max="200">
    
    <div data-file-id="inbound" class="file-slide-tag file-slide-button">
        <div class="triangle-left"></div>
        <div class="tag-header">INBOUND</div>
        <div class="triangle-right"></div>
    </div>
   

    <div class="stack-column">
        <?php 
            include("loading_animation_stack.php");
        ?>


        <div class="template stack-item-button dropdown" data-stack-item-id="">
            <div class="stack-item-button-selector">
                <div class="data" data-id=""></div>

                
                <div class="data-output-stack-button" data-line-id="number_plate_mover"><span>XXX###</span></div>
                <div class="data-output-stack-button" data-line-id="weight"><span>weight</span>kg</div>
                
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
                
                    <div class="header_text data-output-line" data-line-id="number_plate_mover">
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
                <div class="data-line data-output-line" data-line-id="inbound_datetime">Time: <span></span></div>
                <div class="data-line data-output-line" data-line-id="weight">Weight: <span></span>kg</div>
                <div class="data-line data-output-line" data-line-id="status">Status: <span></span></div>
                <div class="data-line data-output-line" data-line-id="number_plate_mover">Prime Mover Number Plate: <span></span></div>
                <div class="data-line data-output-line" data-line-id="number_plate_trailer">Trailer Number Plate: <span></span></div>
                <div class="data-line data-output-line" data-line-id="driver_name">Driver Name: <span></span></div>
                
                

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