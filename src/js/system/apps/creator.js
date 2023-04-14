//
//	CREATOR
//


function Creator() {
	//  CREATE ELEMENTS ARRAY
	var $el = {};

    var loaded = false;


	var Init = function() {
        Bug('Creator Initiated.');

        CacheEl();


        $el.createOrder.form.submit(CreateOrderFormSumbit);
        $el.createContainer.form.submit(CreateContainerFormSumbit);

        loaded = true;
        
        PostLoad();
    }


    //  CACHE ELEMENTS
    var CacheEl = function() {
        $el.body = $('body');


        $el.createOrder = {};
        $el.createOrder.slide = $('#orders');
        $el.createOrder.parent = $('#orders .stack-display-column');
        $el.createOrder.button = $('#orders .create-item-button');
        $el.createOrder.createDisplay = $('#orders .create-display');
        $el.createOrder.dataDisplay = $('#orders .data-display');
        $el.createOrder.form = $('#orders .create-display form');
        $el.createOrder.order_number = $('#orders .create-display form #order_number');

        $el.createContainer = {};
        $el.createContainer.slide = $('#containers');
        $el.createContainer.parent = $('#containers .stack-display-column');
        $el.createContainer.button = $('#containers .create-item-button');
        $el.createContainer.createDisplay = $('#containers .create-display');
        $el.createContainer.dataDisplay = $('#containers .data-display');
        $el.createContainer.form = $('#containers .create-display form');
        $el.createContainer.container_id = $('#containers .create-display form #container_id');
        


    };



    var CreateOrderFormSumbit = function(e) {
        e.preventDefault();

        
       

        var $inputLines = $(this).children('.input-line');


        
        var errorsFound = false;

        

        $inputLines.each(function(){
            
            if ($(this).find('input').length > 0) {
                //console.log($(this).find('input')[0].value.length);

                if ( $(this).hasClass('mandatory') ) {
                    if ( $(this).find('input')[0].value.length <= 0 ) {
                        $(this).addClass('alert');
                        errorsFound = true;
                    } else {
                        $(this).removeClass('alert');
                    };
                };
    
                if ( $(this).hasClass('nospaces') ) {
                    if ( hasWhiteSpace( $(this).find('input')[0].value ) ) {
                        $(this).addClass('alert');
                        errorsFound = true;
                    } else {
                        $(this).removeClass('alert');
                    };
                };

                
    
                if ( $(this).hasClass('mandatory') && $(this).hasClass('nospaces') ) {
                    if ( $(this).find('input')[0].value.length <= 0 || hasWhiteSpace( $(this).find('input')[0].value )) {
                        $(this).addClass('alert');
                        errorsFound = true;
                    } else {
                        $(this).removeClass('alert');
                    };
                };


            };

        });


        $mandatory_input = $('.mandatory_input');

        if ( $mandatory_input.length > 0 ) {
            if ( $mandatory_input[0].value.length <= 0 ) {
                $(this).addClass('alert');
                errorsFound = true;
            } else {
                $(this).removeClass('alert');
            };
        }; 


        if (errorsFound) {
            system.popup.PopupError("Please Check Your Form.");
            return;
        }
        
        



        $.post(
            "database/create_order.php",
            $(this).closest('form').serialize(),
            function( data ) {
                
                if ( system.db.CheckData(data) ) {

                  //console.log("Pre parseJSON Data:", data);

                    data = jQuery.parseJSON( data );

                     //console.log("Received Data:", data);
                     
                    if (data == 'Duplicate Order Number') {
                        system.popup.PopupError("The Order Number <b>[" + $el.createOrder.order_number[0].value + "]</b> already exists. <br> Please enter a unique Order Number");
                        
                        $el.createOrder.order_number.parent('.input-line').CheckAndAddRemoveClass('alert');

                    } else {
                        // console.log("Received Data:", data);
                         //console.log("Order Id:" + data[0]["order_unique_id"]);
                        system.slides.orderSlide.CheckForUpdates( "*", data[0]["order_unique_id"] );
                        system.notify.Notify('Created New Order [' + data[0]["order_number"] + ']', 'success');
                    };
                    
                };
                
        });


    };



    var OpenCreateOrder = function() {
        //console.log('Create New Order');
        //
        $el.createOrder.slide.find(".stack-item-button").removeClass('selected');

        if ( !$(this).hasClass('selected') ) {
            $(this).addClass('selected');
        };

        system.fileCabinet.ShowSlide('orders');

        if ( !$el.createOrder.parent.hasClass('create') ) {
            $el.createOrder.parent.addClass('create');
            $el.createOrder.form.find('.input-line input')[0].focus();
        };
        
        
    }

    var CloseCreateOrder = function() {
        //console.log('Closing Create New Order');

        $el.createOrder.parent.removeClass('create');
        
    }













    
    var CreateContainerFormSumbit = function(e) {
        e.preventDefault();

        var $inputLines = $(this).children('.input-line');

        var processURL = system.baseURL + $(this).data('process-url');
        
        var errorsFound = false;


        $inputLines.each(function(){
            
            if ($(this).find('input').length > 0) {
                //console.log($(this).find('input')[0].value.length);

                if ( $(this).hasClass('mandatory') ) {
                    if ( $(this).find('input')[0].value.length <= 0 ) {
                        $(this).addClass('alert');
                        errorsFound = true;
                    } else {
                        $(this).removeClass('alert');
                    };
                };
    
                if ( $(this).hasClass('nospaces') ) {
                    if ( hasWhiteSpace( $(this).find('input')[0].value ) ) {
                        $(this).addClass('alert');
                        errorsFound = true;
                    } else {
                        $(this).removeClass('alert');
                    };
                };

                
    
                if ( $(this).hasClass('mandatory') && $(this).hasClass('nospaces') ) {
                    if ( $(this).find('input')[0].value.length <= 0 || hasWhiteSpace( $(this).find('input')[0].value )) {
                        $(this).addClass('alert');
                        errorsFound = true;
                    } else {
                        $(this).removeClass('alert');
                    };
                };


            };

        });


        $mandatory_input = $('.mandatory_input');

        if ( $mandatory_input.length > 0 ) {
            if ( $mandatory_input[0].value.length <= 0 ) {
                $(this).addClass('alert');
                errorsFound = true;
            } else {
                $(this).removeClass('alert');
            };
        }; 


        if (errorsFound) {
            system.popup.PopupError("Please Check Your Form.");
            return;
        }

        $(this).closest('form').find('input.order_unique_id')[0].value = $('#orders .stack-item-button.selected').find('.data').data('id');

        $.post(
            "database/create_container.php",
            $(this).closest('form').serialize(),
            function( data ) {

                if ( system.db.CheckData(data) ) {

                     //console.log("Pre parseJSON Data:", data);

                    data = jQuery.parseJSON( data );

                     //console.log("Received Data:", data);

                    if (data == 'Duplicate Container Id') {
                        system.popup.PopupError("The Container Id <b>[" + $el.createContainer.container_id[0].value + "]</b> already exists in this order. <br> Please enter a unique Container Id");
                        
                        $el.createContainer.container_id.parent('.input-line').CheckAndAddRemoveClass('alert');

                    } else {
                         //console.log("Received Data:", data);
                         //console.log("Container Id:" + data[0]["container_unique_id"]);
                        system.slides.containerSlide.CheckForUpdates( data[0]["order_unique_id"], data[0]["container_unique_id"] );
                        system.notify.Notify('Created New Container [' + data[0]["container_id"] + '] <br />in Order [' + data[0]["order_number"] + ']', 'success');
                    };
                    
                };
                
        });


    };
    

    var OpenCreateContainer = function() {
        
        $el.createContainer.slide.find(".stack-item-button").removeClass('selected');

        if ( !$(this).hasClass('selected') ) {
            $(this).addClass('selected');
        };


        system.fileCabinet.ShowSlide('containers');

        if ( !$el.createContainer.parent.hasClass('create') ) {
            $el.createContainer.parent.addClass('create');
        };
        //console.log( $('#orders .stack-item-button.selected') );
        //console.log( $('#orders .stack-item-button.selected').find('.data').data('id') );
        $el.createContainer.form.find('input:first-of-type').focus();
    }

    var CloseCreateContainer = function() {
        $el.createContainer.parent.removeClass('create');
    }



    var PostLoad = function() {
        $el.createOrder.button.click(OpenCreateOrder);
        $el.createContainer.button.click(OpenCreateContainer);
    }


    var IsActive = function() {
        //console.log( system.slides.core.GetCurrentSlideId() );

        if ( $el.createOrder.parent.hasClass('create') && system.slides.core.GetCurrentSlideId() == 'orders' ) {
            return true;
        } else if ( $el.createContainer.parent.hasClass('create') && system.slides.core.GetCurrentSlideId() == 'containers' ) {
            return true;
        } else {
            return false;
        };
         
    }


    //  INITIALIZE
    Init();

    //  EXTERNAL FUNCTIONS
    return {

        Loaded: function() {
            return loaded;
        },

        IsActive: function() {
            return IsActive();
        },

        CloseCreateOrder: function() {
            CloseCreateOrder();
        },

        OpenCreateOrder: function() {
            OpenCreateOrder();
        },

        CloseCreator: function() {
            CloseCreateOrder();
            CloseCreateContainer();
        },

        CloseCreateContainer: function() {
            CloseCreateContainer();
        },

        OpenCreateContainer: function() {
            OpenCreateContainer();
        }
    }
}



