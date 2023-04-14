<div id="inventory" data-file-id="inventory" data-file-index="2" class="file-slide row draggable" data-drag-direction="x" data-slide-min="150" data-slide-max="200">
    
    

    <div data-file-id="inventory" class="file-slide-tag file-slide-button">
        <div class="triangle-left"></div>
        <div class="tag-header">INVENTORY</div>
        <div class="triangle-right"></div>
    </div>
    


    <div class="stack-column">
        <?php 
            include("loading_animation_stack.php");
        ?>


        <div class="template stack-item-button dropdown" data-stack-item-id="">
            <div class="stack-item-button-selector">
                <div class="data" data-id=""></div>
                            
                <div class="data-output-stack-button" data-line-id="type"><span>TYPE</span></div>
                <div class="data-output-stack-button" data-line-id="grade">[<span>GRADE</span>]</div>
                <div class="data-output-stack-button" data-line-id="length">[<span>LENGTH</span>m]</div>
                <div class="selected-triangle"></div>
            </div>
            

            <div class="stack-item-drop-down">

                <button class="view-button button-blue">VIEW</button>

                <button class="view-button button-orange">EDIT</button>

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
                    <div class="header_text data-output-line" data-line-id="type">
                        <span></span>
                    </div>
                    <button class="next-button icon-right-open-big">
                    </button>
                </div>

                <div class="data-line data-output-line" data-line-id="grade">Grade: <span></span></div>
                <div class="data-line data-output-line" data-line-id="length">Length: <span></span></div>
                <div class="data-line data-output-line" data-line-id="current_weight">Current Weight: <span></span></div>
            </div>

        </div>

        <div class="create-display stack-display">

            <form class="data-input">
                <div class="header">
                    <div class="header_text ">
                        Create New Order
                    </div>

                    <div class="header-controls">
                        <button type="button" id="import-order-button" class="icon-upload">
                        </button>
                        <button type="submit" class="create-button icon-right-open-big">
                        </button>
                    </div>
                    
                </div>

                <div class="data-input-line input-line mandatory">
                    <input id="order_number" type="text" name="order_number" placeholder="Order Number">
                </div>

                <div class="data-input-line input-line mandatory">
                    <input id="customer_name" type="text" name="customer_name" placeholder="Customer Name">
                </div>

            </form>

        </div>
    </div>


</div>