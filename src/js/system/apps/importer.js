//
//	MODULE: Importer
//


function Importer() {

    
    var orderNumber = "";
    var customerName = "";
    var order_unique_id = null;
    var containers = [];
    var oJS;

	//  CREATE ELEMENTS ARRAY
    var $el = {};
    
    var validator = new ContainerValidator();



	var Init = function() {

        Bug('Importer Module Initiated.');

        CacheEl();
 
        $el.importer.importButton.click({ import: 'all' }, SelectFile);
/*         $el.importer.importOrderButton.click({ import: 'all' }, SelectFile);
        $el.importer.importContainersButton.click({ import: 'containers' }, SelectFile); */
        $el.importer.importNowButton.click(Import);
        $el.importer.cancelButton.click(ClosePanel);

        $(document).bind('keydown', function(e) {

            var code = e.keyCode || e.which;
            if ( $el.importer.containerInput.is(":focus") ) {

                if(e.which == 13) {
                    e.preventDefault();
                    var container_id = $el.importer.containerInput[0].value;
                    
                    if ( $el.importer.panel.find('.container-add-button[data-id="' + container_id + '"]').length > 0 ) {
                        system.popup.PopupError("The Container[" + container_id + "] Is Already Within The Import List.");
                    } else {
                        containers.push(container_id);
                        AddContainer( container_id );
                        $el.importer.containerInput[0].value = "";
                    };
                    
                    
                };
            };

        });
    }

    

	//  CACHE ELEMENTS
    var CacheEl = function() {

        $el.body = $('body');
        
        $el.importer = {};
        $el.importer.panel = $('#importer-panel');

        $el.importer.order_number =  $el.importer.panel.find('.order_number');
        $el.importer.customer_name =  $el.importer.panel.find('.customer_name');
        

        $el.importer.importButton = $('#import-button, #import-order-button, #import-containers-button');
/*         $el.importer.importOrderButton = $('#import-order-button');
        $el.importer.importContainersButton = $('#import-containers-button'); */
        

        $el.importer.containerTemplates = $el.importer.panel.find('.container-add-button.template');
        $el.importer.containerSelector = $el.importer.panel.find('#container-selector');

        $el.importer.containerInput = $el.importer.panel.find('input#importer-add-container-id');

        $el.importer.importNowButton = $el.importer.panel.find('.import-now-button');
        $el.importer.cancelButton = $el.importer.panel.find('#cancel-import-button');
    };

    var GetSelectedOrderNumber = function() {
        var hash = system.router.ReturnHashData();
        if (hash.split("=")[0] == "orders") {
            return hash.split("=")[1];
        } else {
            return null
        };
    }

    var SelectFile = function(event) {

        orderNumber = "";
        customerName = "";
        order_unique_id = null;
        containers = [];

        if (event.data.import == "containers") {
            order_unique_id = GetSelectedOrderNumber();
        };


        $('#file-uploader').remove();
        $('body').append('<input type="file" name="file" id="file-uploader" value=""><input type="button" id="csv-upload-button" value="Add Containers From Excel File" name="importButton" />');
        oFileIn = document.querySelectorAll( '#file-uploader' );

        if(oFileIn.addEventListener) {
            oFileIn.addEventListener('change', filePicked, false);
        };

        var inputs = document.querySelectorAll( '#file-uploader' );
        Array.prototype.forEach.call( inputs, function( input )
        {
            var label	 = input.nextElementSibling,
                labelVal = label.innerHTML;

            input.addEventListener( 'change', function( e )
            {
                var fileName = '';
                if( this.files && this.files.length > 1 ) {
                    fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
                } else {
                    fileName = e.target.value.split( '\\' ).pop();
                };
                if( fileName ) {
                    filePicked(e);
                    //label.querySelector( 'span' ).innerHTML = fileName;
                } else {
                    //label.innerHTML = labelVal;
                };
            });
        });

        $('#file-uploader').trigger('click');
    }



    function filePicked(oEvent) {

        // Get The File From The Input
        var oFile = oEvent.target.files[0];
        var sFilename = oFile.name;
        
        var file_ext = oFile.name.split('.')[1];

        $('#file-uploader').remove();

        // Create A File Reader HTML5
        var reader = new FileReader();
        
        if ( file_ext == 'xlsx') {

            $el.importer.panel.safeAddClass('active');
            reader.onload = function(e) {
                var data = new Uint8Array(e.target.result);
                
                var workbook = XLSX.read(data, {type: 'array'});
                
                var sheet_name_list = workbook.SheetNames;
                var sheet_json = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]], {raw: true});

                SearchForMetaData(sheet_json);
                SearchForData_XLSX(sheet_json);
            };

            reader.readAsArrayBuffer(oFile);


        } else {
            system.popup.PopupError('Please Upload A XLSX File');
        };

    };


    var SearchForData_XLSX = function(sheet_json) {

        var container_row_index = null;
        var container_column_index = null;

        var row_number = 0;
        
        ClearContainers();

        $.each(sheet_json, function (row_index, row_value) {    
            //  SEARCH EACH ROW TO FIND "CONTAINER"

            //console.log("Row Index:", row_index);
            var column_number = 0;

            $.each(row_value, function (column_index, column_data) {
                //console.log("Column[" + column_index + "]:", column_data);
                
                if (column_data.toString().toLowerCase().indexOf("container") >= 0 || column_index.toString().toLowerCase().indexOf("container") >= 0) {
                    //console.log("Found CONTAINER @ Row[" + row_index + "], Column[" + column_index + "] = " + column_data);
                    container_row_index = row_number;
                    container_column_index = column_index;
                };

                if (container_row_index != null) {
                    return false;
                };

                column_number++;
            });

            if (container_row_index != null) {
                return false;
            };
            row_number++;
        });

        //console.log("All Containers @ " + container_row_index + " x " + container_column_index);


        //console.log("Number of Rows = " + sheet_json.length);
        
        for (i = (container_row_index + 1); i < sheet_json.length; i++) {
            //console.log("Reading Row [" + i + "/" + sheet_json.length + "][" + container_column_index + "]:");
            //console.log("[data]]>> " + sheet_json[i][container_column_index] + " valid=" + validator.isValid(sheet_json[i][container_column_index]) );

            if (validator.isValid(sheet_json[i][container_column_index]) ) {
                containers.push(sheet_json[i][container_column_index]);
            };
            
        };

        var output_string = 'Found [' + containers.length + '] Containers would you like to add them?';

        $.each(containers, function (index, value) {
            output_string += '<br/>' + value;
            AddContainer(value);
        });


    }






    var SearchForMetaData = function(sheet_json) {
        
        var stringSearch = 'order';
        var stringSearch2 = 'customer';
        

        //console.log('Imported Data:', sheet_json);

        $.each(sheet_json, function (index, value) {
                        
            $.each(value, function (index, this_value) {
                if (index.toLowerCase().indexOf(stringSearch) >= 0) {
                    orderNumber = this_value;
                } else if (index.toLowerCase().indexOf(stringSearch2) >= 0) {
                    customerName = this_value;
                };
            });

        });

        if (orderNumber == "" && customerName == "") {
            system.popup.PopupError('No Customer Name & No Order Number Found');
        
        } else if (customerName == "") {
            system.popup.PopupError('No Customer Name Found');
            AddOrderNumberToForm();
        } else if (orderNumber == "") {
            system.popup.PopupError('No Order Number Found');
            AddCustomerNameToForm();
        } else {
            //system.popup.PopupQuestion('Is This Order Number Correct [' + orderNumber + ']?', system.importer.AddOrderNumberToForm );
            AddOrderNumberToForm();
            AddCustomerNameToForm();
        };

    }

    var AddCustomerNameToForm = function() {
        $el.importer.customer_name.attr('value', customer_name);
    }

    var AddOrderNumberToForm = function() {
        $el.importer.order_number.attr('value', orderNumber);
    }


    var ClearContainers = function() {
        containers= [];
        $el.importer.panel.find('.container-add-button').not('.template').remove();
    }

    var AddContainer = function(container_id) {
        var $new_container = $el.importer.containerTemplates.clone().prependTo( $el.importer.containerSelector );
        $new_container.removeClass('template');
        $new_container.find('.container_id span').html(container_id);
        $new_container.attr('data-id', container_id);
        
        $new_container.click(AddRemoveContainer);
    }

    var AddRemoveContainer = function() {
        var container_id = $(this).attr('data-id');
        if ( $(this).CheckAndAddRemoveClass('check') ) {
            containers.splice( $.inArray(container_id, containers), 1 );
        } else {
            containers.push(container_id);
            $(this).safeAddClass('check');
        };
        console.log(containers);
    }



    var Import = function() {
        orderNumber = $el.importer.order_number[0].value;
        customerName = $el.importer.customer_name[0].value;


        if (orderNumber == "" || orderNumber == undefined) {
            system.popup.PopupError("You Need To Input An Order Number.");
            return;
        };

        if (customerName == "" || customerName == undefined) {
            system.popup.PopupError("You Need To Input An Customer Name.");
            return;
        };

        var output_string = "Are You Sure You Want To Continue?<br/><br />Creating Order [" + orderNumber + "]<br/>For Customer [" + customerName + "]<br/><br/>Adding Containers:";

        $.each(containers, function (index, value) {
            output_string += '<br/>' + value;
            AddContainer(value);
        });

        output_string += '<br/>';

        system.popup.PopupQuestion(output_string, system.importer.AddOrderToDatabase);


    }

    var AddOrderToDatabase = function() {
        system.popup.ClosePopup();
        
        ClosePanel();

        var this_post_data = {};
        this_post_data['origin'] = 'AddOrderToDatabase()';
        this_post_data['order_number'] = orderNumber;
        this_post_data['customer_name'] = customerName;
        this_post_data['containers'] = containers;
        this_post_data['order_unique_id'] = order_unique_id == null ? -1 : order_unique_id;

        
        console.log("Post Data:", this_post_data);

        $.post(
            "database/import_order.php",
            this_post_data, 
            function( data ) {

                if ( system.db.CheckData(data) ) {

                    //console.log("Pre parseJSON Data:", data);

                    data = jQuery.parseJSON( data );

                    //console.log("Post parseJSON Data:", data);

                    system.popup.Popup(data);

                    new_get_data = {};
                    new_get_data['orders'] = orderNumber;
                    new_get_data['open_chain'] = false;

                    system.router.UpdateDataURL({
                        redirect: true,
                        clear_data : true,
                        get_data : new_get_data,  
                    });
                };
                
        });
        
    }


    var ClosePanel = function() {
        $el.importer.panel.removeClass('active');
    }

    //  INITIALIZE
    Init();



    //  EXTERNAL FUNCTIONS
    return {


        IsActive: function() {
            return $el.event.panel.hasClass('active');
        },

        SearchForContainers: function() {
            SearchForContainers();
        },

        AddOrderToDatabase: function() {
            AddOrderToDatabase();
        },

        AddOrderNumberToForm: function() {
            AddOrderNumberToForm();
        },


    }
};
