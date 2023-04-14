<div id="importer-panel">
    <div id="importer-header">
        <div class="header-text">
            Importing Order Data From File
        </div>
        <div class="importer-controls">
            <button id="cancel-import-button" class="icon-cancel-1">
            </button>
            <button class="import-now-button icon-right-open-big">
            </button>
        </div>
    </div>

    <div class="data-input-line input-line mandatory">
        <input class="order_number" type="text" name="order_number" placeholder="Order Number">
    </div>
    <div class="data-input-line input-line mandatory">
        <input class="customer_name" type="text" name="customer_name" placeholder="Customer Name">
    </div>

    <div id="assignment-form">

        <div class="data-input-line input-line mandatory">
            <input id="importer-add-container-id" type="text" name="container_id" placeholder="Add Container Id">
        </div>
        <div id="container-selector" class="dropdown-menu">

            <div class="container-add-button template check" data-id="">
                <div class="container_id">
                    <span>CONTAINER00001</span>    
                </div>
                <button class="create-button icon-check">
                </button>
            </div>

        </div>
    </div>
</div>