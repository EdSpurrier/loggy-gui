<div id="orders" data-file-id="orders" data-file-index="2" class="file-slide row draggable" data-drag-direction="x" data-slide-min="150" data-slide-max="200">
    
    

    <div data-file-id="orders" class="file-slide-tag file-slide-button">
        <div class="triangle-left"></div>
        <div class="tag-header">SHIPMENTS</div>
        <div class="triangle-right"></div>
    </div>
    


    <div class="stack-column">
        <?php 
            include("loading_animation_stack.php");
        ?>

        <?php if ($_SESSION["user_type"] == 'super_admin' || $_SESSION["user_type"] == 'admin'): ?>  
            <div data-file-id="containers" class="stack-item-button file-slide-button" data-stack-item-id="">
                <div class="stack-item-button-selector">
                    <div class="data" data-id="*"></div>
                    <div>SHOW ALL CONTAINERS</div>
                    <div class="selected-triangle"></div>
                </div>
            </div>

         
            <div class="create-item-button">
                <div class="create-item-button-selector">                           
                    <div><span>CREATE NEW  <i class='icon-plus-1'></i></span></div>
                    <div class="selected-triangle"></div>
                </div>
            </div>  
        <?php endif; ?>

        <div class="template stack-item-button dropdown" data-stack-item-id="">
            <div class="stack-item-button-selector">
                <div class="data" data-id=""></div>

                            
                <div class="data-output-stack-button" data-line-id="order_number"><span class="copyable">ORD#######</span></div>
                <!-- <div class="data-output-stack-button" data-line-id="customer_name"><span>CUSTOMER</span></div> -->

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
                    <div class="header_text data-output-line" data-line-id="order_number">
                        <span></span>
                    </div>
                    <button class="next-button icon-right-open-big">
                    </button>
                </div>

                <div class="data-line data-output-line" data-line-id="master_number">Order Number: <span></span></div>
                <div class="data-line data-output-line" data-line-id="order_number">Shipment Number: <span></span></div>
                <div class="data-line data-output-line" data-line-id="customer_name">Customer Name: <span></span></div>
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